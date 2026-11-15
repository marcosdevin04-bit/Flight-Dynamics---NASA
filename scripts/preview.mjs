import http from 'node:http';
import worker from '../.build/server/index.js';
const port=Number(process.env.PORT||4173);
const env={ANTHROPIC_API_KEY:process.env.ANTHROPIC_API_KEY,ANTHROPIC_MODEL:process.env.ANTHROPIC_MODEL};
http.createServer(async(req,res)=>{
  try{
    let body='';for await(const chunk of req){body+=chunk;if(body.length>3000){res.writeHead(413).end();return;}}
    const url=new URL(req.url,'http://127.0.0.1:'+port);
    const request=new Request(url,{method:req.method,headers:req.headers,body:body||undefined});
    const result=await worker.fetch(request,env);
    res.writeHead(result.status,Object.fromEntries(result.headers));
    res.end(Buffer.from(await result.arrayBuffer()));
  }catch{res.writeHead(500).end('Preview request failed');}
}).listen(port,'127.0.0.1',()=>console.log('Preview at http://127.0.0.1:'+port));
