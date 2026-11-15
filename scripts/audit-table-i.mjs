// Independent transcription of Table I on PDF p. 6 (NTRS 20130010991).
// Columns are [burn limit, extinction limit], both volume % oxygen.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const expected={
 'mylar-g':[[21.2,20],[18,17],[15.6,14.1],[17,16]],
 'ultem-1000':[[23.5,23],[22,21.1],[21,19.9],[24,23]],
 'nomex-ht90-40':[[23.5,22.1],[19.9,19],[21,19.9],[23,22]]};
const curve=JSON.parse(readFileSync(new URL('../data/curva_gravedad.json',import.meta.url)));
let matches=0;
for(const [id,pairs] of Object.entries(expected)){
 const material=curve.materiales.find(m=>m.id===id);
 for(const [i,gravity] of ['1 g','Marte','Luna','0 g'].entries()){
  const point=material.puntos.find(p=>p.gravedad===gravity);
  assert.deepEqual([point.uloi,point.moc],pairs[i],id+' / '+gravity);
  matches++;
 }
}
console.log(matches+' of 12 material/gravity rows matched both limits (24 values). Scope: Olson & Ferkul 2012, Table I only.');
