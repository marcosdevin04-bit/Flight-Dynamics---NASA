import assert from 'node:assert/strict';
import {chamber,nx,ny,nz} from '../app/reactor.js';
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
console.log('3D chamber checks passed; reaction centroid (cells):',{low,earth,vent});
