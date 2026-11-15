import {expect,it,vi,afterEach} from "vitest";
import {answer} from "../lib/ask";
import {makeLimiter} from "../lib/request-limit";
import {interpretQuestion} from "../lib/lunar-question";
const env={ANTHROPIC_API_KEY:"test-only",ANTHROPIC_MODEL:"test-only"};
const reply=(text:string)=>Response.json({content:[{type:"text",text}]});
afterEach(()=>vi.unstubAllGlobals());
it("parses a question then retries a citation that is outside the retrieved set",async()=>{
 const queue=[JSON.stringify({material:"polycarbonate",oxygen:null,flow:null,pressure:"56.5 kPa"}),"Spontaneous ignition [not-in-set].","The study reports a higher lunar extinction limit for the tested sample [policarbonato]."];
 const f=vi.fn(async()=>reply(queue.shift()!));vi.stubGlobal("fetch",f);
 const a=await answer({question:"polycarbonate at 56.5 kPa"},env);
 expect(f).toHaveBeenCalledTimes(3);expect(a.mode).toContain("live AI");expect(a.citations).toEqual(["policarbonato"]);
});
it("does not use an oxygen value added by the parser",async()=>{
 vi.stubGlobal("fetch",async()=>reply(JSON.stringify({material:"Mylar",oxygen:"25%",pressure:null,flow:null})));
 expect(await interpretQuestion("Mylar at 21%",env,AbortSignal.timeout(500))).toBeNull();
});
it("limits each client independently and expires the window",()=>{
 const hit=makeLimiter();for(let i=0;i<15;i++)expect(hit("first",0)).toBe(0);
 expect(hit("first",1000)).toBe(59);expect(hit("second",1000)).toBe(0);expect(hit("first",60000)).toBe(0);
});

it.each(["Mylar at 295 K","Mylar on Earth at 21%","SIBAL or Mylar at 18%"])("asks for clarification before discarding constraints: %s",async text=>{
 expect(await interpretQuestion(text,{},AbortSignal.timeout(500))).toBeNull();
});
