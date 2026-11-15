import {describe,it,expect,vi} from 'vitest';
import {answer,handle,demos,parseQuestion} from '../lib/ask';
import {loadEvidence} from '../lib/evidence/rank';
describe('public evidence service',()=>{
 it('returns all three cases with citations restricted to retrieved records',async()=>{
  const answers=await Promise.all(demos.map(scenario=>answer({scenario})));
  expect(answers.map(a=>a.case)).toEqual([1,2,3]);expect(answers[1].results.some(r=>r.id.startsWith('psi-'))).toBe(true);
  expect(answers[1].citations).toEqual(expect.arrayContaining(['csv-1','GMT190-T23','GMT190-T24']));
  for(const a of answers){for(const id of a.citations)expect(a.results.some(r=>r.id===id)).toBe(true);}
  expect(answers[2].results).toHaveLength(0);expect(answers[2].explanation).toBe('No matching test in the data we reviewed.');expect(answers[2].fm2_note).toContain('FM2');
 });
 it('keeps PSI rows tied to files and separates Earth comparisons from flight; variable flow stays unspecified',()=>{
 const rows=loadEvidence().filter(r=>r.dataset==='psi_bounds_evidence.csv');expect(rows.length).toBe(159);
 expect(rows.every(r=>r.fuente.psi?.startsWith('https://doi.org/')&&r.fuente.ubicacion.includes('row'))).toBe(true);
 expect(rows.filter(r=>r.fuente.ubicacion.includes('2-9')).every(r=>r.warnings_en.some(s=>s.includes('inferred')))).toBe(true);
 expect(rows.some(r=>r.display.flow.startsWith('Variable')&&r.flow_cm_s===null)).toBe(true);
 expect(new Set(rows.map(r=>r.gravity_regime))).toEqual(new Set(['1g','microgravity']));
 });
 it('parses the habitat example and does not invent parameters for unrecognized questions',async()=>{
 const a=await answer({question:'Mylar at 34% oxygen, 8.2 psi, no forced flow'});expect(a.case).toBe(3);expect(a.scenario.pressure_kPa).toBe(56.5);
 expect(parseQuestion('Compare 18% to 32% for SIBAL')).toBeNull();await expect(answer({question:'What about this?' })).rejects.toThrow();
 });
 it('rejects an ungrounded provider response and keeps the verified fallback',async()=>{
 vi.stubGlobal('fetch',async()=>Response.json({content:[{type:'text',text:'It burned at 99% [invented].'}]}));
 try{const a=await answer({scenario:{material:'polycarbonate',pressure_kPa:56.5}},{ANTHROPIC_API_KEY:'fake',ANTHROPIC_MODEL:'fake'});expect(a.mode).toBe('verified template');expect(a.citations).toContain('policarbonato');}finally{vi.unstubAllGlobals();}
 });
 it('rejects malformed requests',async()=>{expect((await handle(new Request('https://x/api/ask'))).status).toBe(405);expect((await handle(new Request('https://x/api/ask',{method:'POST',body:'{'}))).status).toBe(400);});
});
