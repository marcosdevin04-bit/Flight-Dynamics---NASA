import {build} from 'esbuild';
import {build as buildClient} from 'vite';
import {mkdir,copyFile,readdir,readFile,writeFile} from 'node:fs/promises';
import {extname} from 'node:path';
await mkdir('.build',{recursive:true});await mkdir('dist/data',{recursive:true});await mkdir('dist/app',{recursive:true});
await build({entryPoints:['lib/ask.ts'],outfile:'.build/engine.mjs',bundle:true,platform:'neutral',format:'esm',conditions:['import'],logLevel:'silent'});
const {answer,demos}=await import('../.build/engine.mjs');
const cache=await Promise.all(demos.map(scenario=>answer({scenario})));
await buildClient({configFile:false,publicDir:false, logLevel:'warn', define:{'process.env.NODE_ENV':'"production"'}, build:{
  outDir:'dist/app',emptyOutDir:false,lib:{entry:'ui/coverage.jsx',formats:['es'],fileName:()=>'coverage-chart.js'}
}});
const files=['index.html','PREDICTION.md',...(await readdir('app')).filter(f=>/\.(js|css)$/.test(f)).map(f=>'app/'+f),...['curva_gravedad','prediction','luci','psi_coverage'].map(k=>'data/'+k+'.json')];
for(const f of files)await copyFile(f,'dist/'+f);
// Binary media (hero video) is served statically by Vercel; it stays out of the text-only worker asset map.
await mkdir('dist/app/media',{recursive:true});for(const f of await readdir('app/media'))await copyFile('app/media/'+f,'dist/app/media/'+f);
files.push('app/coverage-chart.js');
await writeFile('dist/data/demo-cache.json',JSON.stringify(cache));files.push('data/demo-cache.json');
const mime={'.html':'text/html','.json':'application/json','.js':'text/javascript','.md':'text/plain','.css':'text/css'};
const assets=Object.fromEntries(await Promise.all(files.map(async f=>['/'+f,[mime[extname(f)]+'; charset=utf-8',await readFile('dist/'+f,'utf8')]])));
await writeFile('.build/worker.mjs','import {handle} from "./engine.mjs";const assets='+JSON.stringify(assets)+';export default {async fetch(req,env){const path=new URL(req.url).pathname;if(path==="/api/ask")return handle(req,env,req.headers.get("cf-connecting-ip")||"local");if(!["GET","HEAD"].includes(req.method))return new Response(null,{status:405});const a=assets[path==="/"?"/index.html":path];if(!a)return new Response("Not found",{status:404});return new Response(req.method==="HEAD"?null:a[1],{headers:{"Content-Type":a[0],"X-Content-Type-Options":"nosniff","Cache-Control":"no-cache"}});}};');
await build({entryPoints:['.build/worker.mjs'],outfile:'.build/server/index.js',bundle:true,platform:'neutral',format:'esm',minify:true});
console.log('Published assets:',files.length,'· demo cases:',cache.map(a=>a.case+' / '+a.mode).join(', '));
