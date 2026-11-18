import assert from 'node:assert/strict';
import {chamber,nx,ny,nz} from '../app/reactor.js';
import {tracers} from '../app/particles.js';
const run=(gravity,flow,oxygen,pressure)=>{
 const m=chamber({gravity,flow,oxygen,pressure});for(let i=0;i<130;i++)m.step();
 let sum=0,sx=0,sy=0;
 for(let i=0;i<m.rate.length;i++){const r=m.rate[i];assert.ok(Number.isFinite(r)&&r>=0&&r<20);sum+=r;sx+=r*(i%nx);sy+=r*(Math.floor(i/nx)%ny);}
 return {sum,x:sx/sum,y:sy/sum};
};
const low=run(0,2,21,101.3),earth=run(1,2,21,101.3),vent=run(0,16,21,101.3);
assert.deepEqual(run(.16,10,21,101.3),run(.16,10,21,101.3),'Identical settings must give identical fields, so the split view isolates gravity.');
assert.ok(earth.y>low.y+1,'Buoyancy must raise the reaction centroid.');
assert.ok(vent.x>low.x+1,'Ventilation must move the reaction centroid downstream.');
assert.equal(run(.16,10,0,50).sum,0,'Without ambient oxygen the source cannot generate a reaction.');
assert.ok(run(1,30,35,50).sum>0);
// Tracer particles: deterministic, always inside the chamber, and carried upward by buoyancy.
const trace=gravity=>{
 const m=chamber({gravity,flow:10,oxygen:18,pressure:101.3,shape:'sheet'});for(let i=0;i<45;i++)m.step();
 const t=tracers(800,7);t.advance(m);for(let i=0;i<150;i++){m.step();t.advance(m);}
 const {px,py,pz}=t.positions();let y=0;
 for(let k=0;k<t.count;k++){assert.ok(Number.isFinite(px[k])&&px[k]>=0&&px[k]<nx&&py[k]>=0&&py[k]<ny&&pz[k]>=0&&pz[k]<nz,'Tracers must stay inside the chamber.');y+=py[k];}
 return {y:y/t.count,first:[px[0],py[0],pz[0]]};
};
const moonTrace=trace(.16),earthTrace=trace(1);
assert.deepEqual(trace(.16),moonTrace,'Same model and seed must give the same tracer paths.');
assert.ok(earthTrace.y>moonTrace.y+1,'With Earth gravity the tracers must rise higher than with lunar gravity.');
console.log('3D chamber checks passed; reaction centroid (cells):',{low,earth,vent},'· tracer mean height (cells):',{moon:moonTrace.y,earth:earthTrace.y});
