import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { request } from 'node:http';

const privateBody = '<h1>MAINEE_PRIVATE_TEST_ONLY</h1>';
const password = 'Fictitious_access_test_2026';
const user = 'mainee';
const basic = (name = user, secret = password) => `Basic ${Buffer.from(`${name}:${secret}`).toString('base64')}`;
const source = await readFile(fileURLToPath(new URL('../server.js', import.meta.url)), 'utf8');

async function startServer(secret = password, includePrivate = true) {
  const folder = await mkdtemp(join(tmpdir(), 'mainee-access-'));
  await mkdir(join(folder, 'public'));
  await mkdir(join(folder, 'private'));
  await mkdir(join(folder, 'public-neighbor'));
  await writeFile(join(folder, 'package.json'), '{"type":"module"}');
  await writeFile(join(folder, 'server.js'), source);
  await writeFile(join(folder, 'public', 'index.html'), '<h1>PUBLIC_TEST_ONLY</h1>');
  await writeFile(join(folder, 'public', 'styles.css'), 'body { color: navy; }');
  if (includePrivate) await writeFile(join(folder, 'private', 'prive.html'), privateBody);
  await writeFile(join(folder, 'public-neighbor', 'secret.html'), 'OUTSIDE_PUBLIC_TEST_ONLY');
  await symlink(join(folder, 'public-neighbor', 'secret.html'), join(folder, 'public', 'outside.html'));
  if (includePrivate) await symlink(join(folder, 'private', 'prive.html'), join(folder, 'public', 'atelier-link.html'));
  await symlink(join(folder, 'public', 'styles.css'), join(folder, 'public', 'styles-link.css'));

  const child = spawn(process.execPath, ['server.js'], {
    cwd: folder,
    env: { ...process.env, PORT: '0', MAINEE_PRIVATE_PASSWORD: secret, MAINEE_PRIVATE_USER: user, MAINEE_DEV_AUTOPULL: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let errors = '';
  child.stderr.on('data', data => { errors += data; });
  async function stop() {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, 'exit');
      child.kill();
      await exited;
    }
    await rm(folder, { recursive: true, force: true });
  }
  let port;
  try {
    port = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Startup timeout: ${errors}`)), 10000);
      let output = '';
      child.stdout.on('data', data => {
        output += data;
        const match = /Mainée écoute sur le port (\d+)/.exec(output);
        if (match) { clearTimeout(timeout); resolve(Number(match[1])); }
      });
      child.once('error', err => { clearTimeout(timeout); reject(err); });
      child.once('exit', code => { clearTimeout(timeout); reject(new Error(`Server exited ${code}: ${errors}`)); });
    });
  } catch (err) { await stop(); throw err; }

  async function get(path, authorization, method = 'GET') {
    return new Promise((resolve, reject) => {
      // request() preserves encoded and dot paths for these HTTP regression cases.
      const req = request({ host: '127.0.0.1', port, path, method, headers: authorization ? { authorization } : {} }, res => {
        const chunks = [];
        res.on('data', data => chunks.push(data));
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
      });
      req.once('error', reject);
      req.setTimeout(5000, () => req.destroy(new Error('Request timeout')));
      req.end();
    });
  }
  return { get, stop };
}

let server;
before(async () => { server = await startServer(); });
after(async () => { await server?.stop(); });

test('public HTML, CSS and an internal asset symlink remain accessible', async () => {
  for (const path of ['/', '/index.html', '/styles.css', '/styles-link.css']) {
    const res = await server.get(path);
    assert.equal(res.status, 200, path);
    assert.ok(!res.body.includes('PRIVATE_TEST_ONLY'));
  }
  assert.equal((await server.get('/styles.css')).headers['cache-control'], 'public, max-age=86400');
});

const protectedPaths = [
  '/prive', '/prive/', '/prive.html', '/%70rive', '/%70rive.html', '/p%72ive.html',
  '/prive%2ehtml', '/%70%72%69%76%65%2e%68%74%6d%6c', '/%2fprive.html', '//prive.html',
  '/temp/%2e%2e/%70rive.html', '/temp/..%2fprive.html', '/prive%2f',
  '/prive%2f../prive.html', '/prive%2Fsecret', '/prive.html?download=1',
];
for (const path of protectedPaths) {
  test(`private path requires authentication: ${path}`, async () => {
    const res = await server.get(path);
    assert.equal(res.status, 401);
    assert.match(res.headers['www-authenticate'], /^Basic /);
    assert.match(res.headers['cache-control'], /no-store/);
    assert.match(res.headers['x-robots-tag'], /noindex/);
    assert.ok(!res.body.includes('PRIVATE_TEST_ONLY'));
  });
}

test('valid credentials open normal and encoded private aliases without caching', async () => {
  for (const path of ['/prive', '/prive/', '/prive.html', '/%70rive.html', '/p%72ive.html', '//prive.html']) {
    const res = await server.get(path, basic());
    assert.equal(res.status, 200, path);
    assert.equal(res.body, privateBody);
    assert.equal(res.headers['cache-control'], 'private, no-store');
    assert.match(res.headers['x-robots-tag'], /noindex/);
  }
});

test('wrong users, wrong passwords, suffixes and malformed credentials are refused', async () => {
  const invalid = [basic('other'), basic(user, 'wrong'), basic(user, `${password}:extra`),
    'Bearer anything', 'Basic invalid###', `Basic ${Buffer.from('no-colon').toString('base64')}`];
  for (const authorization of invalid) {
    const res = await server.get('/%70rive.html', authorization);
    assert.equal(res.status, 401);
    assert.ok(!res.body.includes('PRIVATE_TEST_ONLY'));
  }
});

test('a password containing a colon is accepted in full', async () => {
  const secret = 'Test_password:with_a_colon';
  const other = await startServer(secret);
  try {
    assert.equal((await other.get('/prive', basic(user, secret))).status, 200);
    assert.equal((await other.get('/prive', basic(user, 'Test_password'))).status, 401);
  } finally { await other.stop(); }
});

test('all aliases stay closed when the password is not configured', async () => {
  const other = await startServer('');
  try {
    for (const path of ['/prive', '/%70rive.html', '/p%72ive.html']) {
      assert.equal((await other.get(path, basic(user, ''))).status, 401);
    }
    assert.equal((await other.get('/')).status, 200);
  } finally { await other.stop(); }
});

test('the private template cannot be downloaded through static or traversal paths', async () => {
  for (const path of ['/private/prive.html', '/%2e%2e%2fprivate/prive.html', '/%2570rive.html']) {
    const res = await server.get(path);
    assert.equal(res.status, 404, path);
    assert.ok(!res.body.includes('PRIVATE_TEST_ONLY'));
  }
});

test('public symlinks cannot expose the private template or a neighboring directory', async () => {
  for (const path of ['/atelier-link.html', '/outside.html']) {
    const res = await server.get(path, basic());
    assert.equal(res.status, 403, path);
    assert.ok(!res.body.includes('PRIVATE_TEST_ONLY'));
    assert.ok(!res.body.includes('OUTSIDE_PUBLIC_TEST_ONLY'));
  }
});

test('malformed paths return 400 and leave the server usable', async () => {
  for (const path of ['/%', '/%ZZ', '/%C3%28', '/%00', '/%5cprive.html']) {
    assert.equal((await server.get(path)).status, 400, path);
  }
  assert.equal((await server.get('/')).status, 200);
  assert.equal((await server.get('/prive', basic())).status, 200);
});

test('HEAD preserves authentication and does not return a body', async () => {
  const denied = await server.get('/%70rive.html', undefined, 'HEAD');
  assert.equal(denied.status, 401);
  assert.equal(denied.body, '');
  const allowed = await server.get('/prive', basic(), 'HEAD');
  assert.equal(allowed.status, 200);
  assert.equal(allowed.body, '');
});

test('unknown private subpaths remain closed and return 404 after authentication', async () => {
  assert.equal((await server.get('/prive/inexistant')).status, 401);
  assert.equal((await server.get('/prive/inexistant', basic())).status, 404);
});

test('an unavailable private template does not crash the public server', async () => {
  const other = await startServer(password, false);
  try {
    assert.equal((await other.get('/prive')).status, 401);
    assert.equal((await other.get('/prive', basic())).status, 503);
    assert.equal((await other.get('/')).status, 200);
  } finally { await other.stop(); }
});
