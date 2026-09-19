import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync=promisify(execFile);
const root=fileURLToPath(new URL('.',import.meta.url));
const repoRoot=normalize(join(root,'..'));
const publicDir=join(root,'public');
const port=Number(process.env.PORT||3000);
const privateUser=process.env.MAINEE_PRIVATE_USER||'mainee';
const privatePassword=process.env.MAINEE_PRIVATE_PASSWORD||'';
const devAutoPull=process.env.MAINEE_DEV_AUTOPULL==='1';
let devVersion='startup';
let pulling=false;

const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'};
function authorized(req){if(!privatePassword)return false;const h=req.headers.authorization||'';if(!h.startsWith('Basic '))return false;try{const [u,p]=Buffer.from(h.slice(6),'base64').toString('utf8').split(':');return u===privateUser&&p===privatePassword}catch{return false}}
function send(res,code,body,type='text/plain; charset=utf-8',headers={}){res.writeHead(code,{'Content-Type':type,...headers});res.end(body)}

async function gitHead(){
  try{const {stdout}=await execFileAsync('git',['-C',repoRoot,'rev-parse','HEAD']);return stdout.trim()}catch{return String(Date.now())}
}

async function pullLatest(){
  if(!devAutoPull||pulling)return;
  pulling=true;
  try{
    const before=await gitHead();
    await execFileAsync('git',['-C',repoRoot,'pull','--ff-only','origin','main']);
    const after=await gitHead();
    if(after!==before){devVersion=after;console.log('Mainée mise à jour automatiquement :',after.slice(0,8));}
  }catch(err){
    console.warn('Auto-update Mainée ignorée :',err?.message||err);
  }finally{pulling=false}
}

const server=http.createServer(async(req,res)=>{
  const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);
  if(url.pathname==='/__dev-version')return send(res,200,devVersion,'text/plain; charset=utf-8',{'Cache-Control':'no-store'});
  if(url.pathname.startsWith('/prive')){
    if(!authorized(req))return send(res,401,'Accès privé Mainée','text/plain; charset=utf-8',{'WWW-Authenticate':'Basic realm="Atelier privé Mainée", charset="UTF-8"','Cache-Control':'no-store'});
    const html=await readFile(join(publicDir,'prive.html'));return send(res,200,html,mime['.html'],{'Cache-Control':'no-store'});
  }
  let pathname=decodeURIComponent(url.pathname);if(pathname==='/')pathname='/index.html';
  const safePath=normalize(pathname).replace(/^([.][.][/\\])+/,'');
  const filePath=join(publicDir,safePath);
  if(!filePath.startsWith(publicDir))return send(res,403,'Interdit');
  try{
    const info=await stat(filePath);if(!info.isFile())throw new Error('not file');
    const data=await readFile(filePath);const type=mime[extname(filePath).toLowerCase()]||'application/octet-stream';
    send(res,200,data,type,{'Cache-Control':devAutoPull?'no-store':extname(filePath)==='.html'?'no-cache':'public, max-age=86400'});
  }catch{send(res,404,'Page introuvable')}
});

server.listen(port,'0.0.0.0',async()=>{
  devVersion=await gitHead();
  console.log(`Mainée écoute sur le port ${port}`);
  if(devAutoPull){console.log('Mode atelier : synchronisation GitHub + rechargement automatique actifs.');setInterval(pullLatest,3000)}
  if(!privatePassword)console.warn('MAINEE_PRIVATE_PASSWORD absent : /prive reste fermé.');
});
