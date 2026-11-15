import type {IncomingMessage,ServerResponse} from "node:http";
import {handle} from "../lib/ask.js";
export default async function handler(req:IncomingMessage & {body?:unknown},res:ServerResponse){
 const env={ANTHROPIC_API_KEY:process.env.ANTHROPIC_API_KEY,ANTHROPIC_MODEL:process.env.ANTHROPIC_MODEL};
 if(req.method!=="POST"){res.writeHead(405,{Allow:"POST"}).end();return;}
 let raw=typeof req.body==="string"?req.body:req.body===undefined?"":JSON.stringify(req.body);
 if(req.body===undefined){for await (const chunk of req){raw+=chunk;if(raw.length>3000){res.writeHead(413).end();return;}}}
 const r=await handle(new Request("https://"+req.headers.host+"/api/ask",{method:"POST",headers:req.headers.origin?{Origin:req.headers.origin}:{},body:raw}),env,String(req.headers["x-vercel-forwarded-for"]??req.socket.remoteAddress??"local").split(",")[0].trim());
 res.writeHead(r.status,Object.fromEntries(r.headers));res.end(await r.text());
}
