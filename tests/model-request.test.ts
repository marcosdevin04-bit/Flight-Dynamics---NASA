import {expect,it,vi,afterEach} from "vitest";
import {interpretQuestion,modelText} from "../lib/lunar-question";
afterEach(()=>vi.unstubAllGlobals());
const reply=(text:string)=>Response.json({content:[{type:"text",text}]});
function capture(){const bodies:any[]=[];vi.stubGlobal("fetch",async(_u:string,init:RequestInit)=>{bodies.push(JSON.parse(String(init.body)));return reply("ok");});return bodies;}

it("turns thinking off for Haiku 5.5 so it cannot use up max_tokens",async()=>{
 const bodies=capture();
 await modelText({ANTHROPIC_API_KEY:"test-only",ANTHROPIC_MODEL:"claude-haiku-5-5"},"s","c",AbortSignal.timeout(500));
 expect(bodies[0].thinking).toEqual({type:"disabled"});
});
it("sends no thinking field for other models",async()=>{
 const bodies=capture();
 await modelText({ANTHROPIC_API_KEY:"test-only",ANTHROPIC_MODEL:"claude-sonnet-5-5"},"s","c",AbortSignal.timeout(500));
 expect(bodies[0].thinking).toBeUndefined();
});
it("accepts parser JSON wrapped in a code fence",async()=>{
 vi.stubGlobal("fetch",async()=>reply("```json\n"+JSON.stringify({material:"Mylar",oxygen:"34%",flow:null,pressure:"8.2 psi"})+"\n```"));
 const q=await interpretQuestion("Mylar at 34% and 8.2 psi on the Moon",{ANTHROPIC_API_KEY:"test-only",ANTHROPIC_MODEL:"claude-haiku-5-5"},AbortSignal.timeout(500));
 expect(q).toMatchObject({material:"Mylar",o2_pct:34,pressure_kPa:56.5});
});

import {answer} from "../lib/ask";
it("asks again when a sentence has no citation, then accepts plain cited text",async()=>{
 const queue=[JSON.stringify({material:"polycarbonate",oxygen:null,flow:null,pressure:"56.5 kPa"}),
  "**Scenario and match.** The record is the same test [policarbonato].",
  "**The** record matches the requested pressure of 56.5 kPa [policarbonato]. Its lunar extinction limit was substantially higher than at 1 g [policarbonato]."];
 const prompts:string[]=[];
 vi.stubGlobal("fetch",async(_u:string,init:RequestInit)=>{prompts.push(JSON.parse(String(init.body)).system);return reply(queue.shift()!);});
 const a=await answer({question:"polycarbonate at 56.5 kPa on the Moon"},{ANTHROPIC_API_KEY:"test-only",ANTHROPIC_MODEL:"claude-haiku-5-5"});
 expect(a.mode).toBe("live AI · citations checked");
 expect(a.explanation).not.toContain("**");
 expect(prompts[2]).toContain("had no [id]");
});
