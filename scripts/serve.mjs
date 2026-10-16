import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };

function match(pattern, pathname) {
  const names=[];
  const expression=pattern.split('/').map(part => {
    if (part.startsWith(':')) { names.push(part.replace(/^:|\*$/g, '')); return part.endsWith('*') ? '(.*)' : '([^/]+)'; }
    return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('/');
  const result=pathname.match(new RegExp('^'+expression+'$'));
  return result ? Object.fromEntries(names.map((name,i)=>[name,result[i+1]])) : null;
}

function destination(rule, values) {
  return rule.destination.replace(/:([a-zA-Z]+)\*?/g, (_,name)=>values[name]);
}

export function createServer() {
  return http.createServer(async (req,res)=>{
    try {
      const url=new URL(req.url, 'http://localhost');
      let pathname=decodeURIComponent(url.pathname);
      for (const rule of config.redirects || []) {
        const values=match(rule.source,pathname);
        if (values) {
          const target=destination(rule,values);
          if (!target.startsWith('/') || target.startsWith('//')) { res.writeHead(400);res.end();return; }
          res.writeHead(rule.permanent?308:307,{Location:target+url.search});res.end();return;
        }
      }
      for (const rule of config.rewrites || []) {
        const values=match(rule.source,pathname);
        if(values){pathname=destination(rule,values);break;}
      }
      if(pathname.endsWith('/'))pathname+='index.html';
      const file=resolve(root,'.'+pathname);
      if(!file.startsWith(root)||pathname.split('/').some(p=>p.startsWith('.'))||/\/(?:docs|scripts|tests)\//.test(pathname)||!types[extname(file)]){
        res.writeHead(404);res.end('Not found');return;
      }
      let body=await readFile(file);
      // Local previews must not send development traffic to production analytics.
      if(extname(file)==='.html')body=Buffer.from(body.toString().replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,tag=>/googletagmanager\.com|gtag\(/.test(tag)?'':tag).replace(/<noscript>[\s\S]*?<\/noscript>/gi,''));
      res.writeHead(200,{'Content-Type':types[extname(file)],'Cache-Control':'no-store'});res.end(body);
    } catch(error) {res.writeHead(error.code==='ENOENT'?404:400);res.end('Not found');}
  });
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const server=createServer();
  server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Compare Fones local: http://127.0.0.1:'+server.address().port));
}
