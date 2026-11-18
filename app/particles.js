// Massless tracer particles advected by the chamber model's velocity field.
// They visualize the simulated flow; they are not soot, smoke or measured particles.
import {nx,ny,nz,layer} from './reactor.js';
const clip=(v,a,b)=>Math.max(a,Math.min(b,v));
// Trilinear sample of a cell-centred field (cells), clamped to the domain.
export function sample(f,x,y,z){
 x=clip(x,0,nx-1.001);y=clip(y,0,ny-1.001);z=clip(z,0,nz-1.001);
 const i=(x|0)+nx*(y|0)+layer*(z|0),ax=x%1,ay=y%1,az=z%1,l=i+layer;
 return (1-az)*((1-ay)*(f[i]*(1-ax)+f[i+1]*ax)+ay*(f[i+nx]*(1-ax)+f[i+nx+1]*ax))+az*((1-ay)*(f[l]*(1-ax)+f[l+1]*ax)+ay*(f[l+nx]*(1-ax)+f[l+nx+1]*ax));
}
export function tracers(count=1600,seed=7){
 const px=new Float32Array(count),py=new Float32Array(count),pz=new Float32Array(count),age=new Float32Array(count),life=new Float32Array(count);
 const x0=new Float32Array(count),y0=new Float32Array(count),z0=new Float32Array(count),heat=new Float32Array(count);
 let s=seed>>>0,model=null,last=0;const rand=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};
 // Most particles enter with the ventilation; the rest start near the fuel source.
 function spawn(k,anywhere){
  if(rand()<.55){px[k]=1+rand()*(anywhere?nx-3:1.5);py[k]=1.5+rand()*(ny-4);pz[k]=1.5+rand()*(nz-4);}
  else{px[k]=12+(rand()-.5)*5;py[k]=2+rand()*3;pz[k]=11+(rand()-.5)*5;}
  x0[k]=px[k];y0[k]=py[k];z0[k]=pz[k];age[k]=anywhere?rand()*4:0;life[k]=3+rand()*3;heat[k]=0;
 }
 function reseed(){s=seed>>>0;for(let k=0;k<count;k++)spawn(k,true);}
 // Moves every particle by the model time elapsed since the last call (zero while paused).
 function advance(m){
  if(m!==model||m.time<last){model=m;last=m.time;reseed();return;}
  const dt=Math.min(.12,m.time-last);last=m.time;if(dt<=0)return;
  for(let k=0;k<count;k++){
   x0[k]=px[k];y0[k]=py[k];z0[k]=pz[k];
   px[k]+=sample(m.u,px[k],py[k],pz[k])*dt;py[k]+=sample(m.v,px[k],py[k],pz[k])*dt;pz[k]+=sample(m.w,px[k],py[k],pz[k])*dt;age[k]+=dt;
   if(px[k]<.5||px[k]>nx-1.5||py[k]<1||py[k]>ny-1.5||pz[k]<.5||pz[k]>nz-1.5||age[k]>life[k]){spawn(k,false);continue;}
   heat[k]=sample(m.t,px[k],py[k],pz[k]);
  }
 }
 // Cool particles blue, hot ones orange to pale yellow (relative excess heat of the model).
 const color=t=>{const a=Math.min(1,t/1.1);return a<.5?`rgb(${79+326*a|0},163,${217-318*a|0})`:`rgb(242,${163+126*(a-.5)|0},${58+220*(a-.5)|0})`;};
 function draw(ctx,project){
  ctx.save();ctx.lineCap='round';
  for(let k=0;k<count;k++){
   if(age[k]===0)continue;
   const A=project(x0[k],y0[k],z0[k]),B=project(px[k],py[k],pz[k]),fade=Math.min(1,age[k]/.4)*Math.min(1,(life[k]-age[k])/.6);
   ctx.globalAlpha=.8*clip(fade,0,1);ctx.strokeStyle=color(heat[k]);ctx.lineWidth=Math.max(1.2,B[2]*.11);
   ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0]+(B[0]===A[0]?.6:0),B[1]);ctx.stroke();
  }
  ctx.restore();
 }
 return {advance,draw,get count(){return count;},positions:()=>({px,py,pz})};
}
