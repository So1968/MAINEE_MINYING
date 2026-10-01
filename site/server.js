import http from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, isAbsolute, join, normalize, posix, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { timingSafeEqual } from 'node:crypto';

const execFileAsync = promisify(execFile);
const root = fileURLToPath(new URL('.', import.meta.url));
const repoRoot = normalize(join(root, '..'));
const publicDir = join(root, 'public');
const publicRoot = await realpath(publicDir);
const privatePage = join(root, 'private', 'prive.html');
const port = Number(process.env.PORT || 3000);
const privateUser = Buffer.from(process.env.MAINEE_PRIVATE_USER || 'mainee');
const privatePassword = Buffer.from(process.env.MAINEE_PRIVATE_PASSWORD || '');
const devAutoPull = process.env.MAINEE_DEV_AUTOPULL === '1';
let devVersion = 'startup';
let pulling = false;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.webp': 'image/webp',
};
const privateHeaders = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};
const privateRoutes = new Set(['/prive', '/prive/', '/prive.html']);

function authorized(req) {
  if (privatePassword.length === 0) return false;
  const match = /^Basic[ \t]+([A-Za-z0-9+/]+={0,2})$/i.exec(req.headers.authorization || '');
  if (!match) return false;
  const encoded = match[1].replace(/=+$/, '');
  const credentials = Buffer.from(encoded, 'base64');
  if (credentials.toString('base64').replace(/=+$/, '') !== encoded) return false;
  const separator = credentials.indexOf(0x3a);
  if (separator < 0) return false;
  const user = credentials.subarray(0, separator);
  const password = credentials.subarray(separator + 1);
  return user.equals(privateUser)
    && password.length === privatePassword.length
    && timingSafeEqual(password, privatePassword);
}

function send(res, code, body, type = 'text/plain; charset=utf-8', headers = {}) {
  res.writeHead(code, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', ...headers });
  res.end(body);
}

function requestPath(req) {
  // Origin-form paths only; a leading // must remain a path, not become a host.
  if (!req.url?.startsWith('/')) throw new URIError('Invalid request target');
  const url = new URL(`http://localhost${req.url}`);
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.includes('\0') || pathname.includes('\\')) throw new URIError('Invalid path');
  return posix.normalize(pathname);
}

function insidePublic(filePath) {
  const fromRoot = relative(publicRoot, filePath);
  return fromRoot !== '..' && !fromRoot.startsWith(`..${sep}`) && !isAbsolute(fromRoot);
}

async function gitHead() {
  try {
    const { stdout } = await execFileAsync('git', ['-C', repoRoot, 'rev-parse', 'HEAD']);
    return stdout.trim();
  } catch { return String(Date.now()); }
}

async function pullLatest() {
  if (!devAutoPull || pulling) return;
  pulling = true;
  try {
    const before = await gitHead();
    await execFileAsync('git', ['-C', repoRoot, 'pull', '--ff-only', 'origin', 'main']);
    const after = await gitHead();
    if (after !== before) {
      devVersion = after;
      console.log('Mainée mise à jour automatiquement :', after.slice(0, 8));
    }
  } catch (err) {
    console.warn('Auto-update Mainée ignorée :', err?.message || err);
  } finally { pulling = false; }
}

const server = http.createServer(async (req, res) => {
  let pathname;
  try { pathname = requestPath(req); }
  catch { return send(res, 400, 'Adresse invalide', undefined, { 'Cache-Control': 'no-store' }); }

  if (pathname === '/__dev-version') {
    return send(res, 200, devVersion, undefined, { 'Cache-Control': 'no-store' });
  }

  // Decode and normalize before deciding access. Private HTML never goes through static serving.
  if (privateRoutes.has(pathname) || pathname.startsWith('/prive/')) {
    if (!authorized(req)) {
      return send(res, 401, 'Accès privé Mainée', undefined, {
        ...privateHeaders,
        'WWW-Authenticate': 'Basic realm="Atelier privé Mainée", charset="UTF-8"',
      });
    }
    if (!privateRoutes.has(pathname)) return send(res, 404, 'Page introuvable', undefined, privateHeaders);
    try {
      const html = await readFile(privatePage);
      return send(res, 200, html, mime['.html'], privateHeaders);
    } catch {
      return send(res, 503, 'Atelier temporairement indisponible', undefined, privateHeaders);
    }
  }

  if (pathname === '/') pathname = '/index.html';
  const filePath = join(publicDir, pathname);
  try {
    // realpath also prevents a public symlink from exposing a file outside the public directory.
    const actualPath = await realpath(filePath);
    if (!insidePublic(actualPath)) return send(res, 403, 'Interdit', undefined, { 'Cache-Control': 'no-store' });
    const info = await stat(actualPath);
    if (!info.isFile()) return send(res, 404, 'Page introuvable');
    const data = await readFile(actualPath);
    const extension = extname(actualPath).toLowerCase();
    return send(res, 200, data, mime[extension] || 'application/octet-stream', {
      'Cache-Control': devAutoPull ? 'no-store' : extension === '.html' ? 'no-cache' : 'public, max-age=86400',
    });
  } catch { return send(res, 404, 'Page introuvable'); }
});

server.listen(port, '0.0.0.0', async () => {
  devVersion = await gitHead();
  console.log(`Mainée écoute sur le port ${server.address().port}`);
  if (devAutoPull) {
    console.log('Mode atelier : synchronisation GitHub + rechargement automatique actifs.');
    setInterval(pullLatest, 3000);
  }
  if (privatePassword.length === 0) console.warn('MAINEE_PRIVATE_PASSWORD absent : /prive reste fermé.');
});
