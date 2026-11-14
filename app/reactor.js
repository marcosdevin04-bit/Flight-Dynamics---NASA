// Reduced three-dimensional reacting flow. Cell-centred velocities in cells/s.
// The transported scalars and reaction rate are normalized, not calibrated chemistry.
export const nx=33, ny=29, nz=23, layer=nx*ny, count=layer*nz, dx=.65, dt=.024;
const field=()=>new Float32Array(count), clip=(v,a,b)=>Math.max(a,Math.min(b,v));
export function chamber({gravity,flow,pressure,oxygen}){
 const t=field(), f=field(), o=field(), rate=field(), u=field(), v=field(), w=field(), div=field(), p=field(), q=field();
 const a=field(), b=field(), c=field(), d=field(), e=field(), h=field();
 const ambient=oxygen/100, inlet=flow/dx, diff=.062*101.3/pressure; o.fill(ambient);u.fill(inlet);
 const seed=field(); let time=0;
 for(let z=1;z<nz-1;z++)for(let y=1;y<ny-1;y++)for(let x=1;x<nx-1;x++){
  const i=x+nx*y+layer*z;seed[i]=Math.exp(-((x-12)**2+(z-11)**2)/4.5-(y-3)**2/1.6);
 }
 function step(){
  for(let z=1;z<nz-1;z++)for(let y=1;y<ny-1;y++)for(let x=1;x<nx-1;x++){
   const i=x+nx*y+layer*z,X=clip(x-dt*u[i],0,nx-1.001),Y=clip(y-dt*v[i],0,ny-1.001),Z=clip(z-dt*w[i],0,nz-1.001);
   const j=(X|0)+nx*(Y|0)+layer*(Z|0), ax=X%1,ay=Y%1,az=Z%1;
   const interp=(s)=>{const l=j+layer;return (1-az)*((1-ay)*(s[j]*(1-ax)+s[j+1]*ax)+ay*(s[j+nx]*(1-ax)+s[j+nx+1]*ax))+az*((1-ay)*(s[l]*(1-ax)+s[l+1]*ax)+ay*(s[l+nx]*(1-ax)+s[l+nx+1]*ax));};
   const transport=s=>(1-6*diff)*interp(s)+diff*(s[i-1]+s[i+1]+s[i-nx]+s[i+nx]+s[i-layer]+s[i+layer]);
   const fuel=Math.max(0,transport(f)+.46*seed[i]),ox=Math.max(0,transport(o)),heat=Math.max(0,transport(t));
   const react=Math.min(fuel,ox/.65,.15*Math.min(fuel,ox/.65)*Math.min(1,(heat+.7*seed[i])*7));
   a[i]=fuel-react;b[i]=ox-react*.65;c[i]=Math.min(2,heat*.983+4*react+.10*seed[i]);rate[i]=react/dt;
   d[i]=inlet+(interp(u)-inlet)*.994;
   e[i]=clip(interp(v)*.981+dt*(135*gravity*heat/(1+heat)+38*seed[i]),-32,50);
   h[i]=interp(w)*.98;
  }
  t.set(c);f.set(a);o.set(b);u.set(d);v.set(e);w.set(h);
  // Open faces replenish ambient scalars. Prescribed inlet; zero-gradient outlet velocity.
  for(let z=0;z<nz;z++)for(let y=0;y<ny;y++){const i=z*layer+y*nx;u[i]=inlet;u[i+nx-1]=u[i+nx-2];}
  for(let z=0;z<nz;z++)for(let x=0;x<nx;x++){const i=z*layer+x;v[i+nx*(ny-1)]=v[i+nx*(ny-2)];}
  for(let z=0;z<nz;z++)for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){if(!x||x===nx-1||!y||y===ny-1||!z||z===nz-1)o[x+nx*y+layer*z]=ambient;}
  for(let z=1;z<nz-1;z++)for(let y=1;y<ny-1;y++)for(let x=1;x<nx-1;x++){let i=x+nx*y+layer*z;div[i]=.5*(u[i+1]-u[i-1]+v[i+nx]-v[i-nx]+w[i+layer]-w[i-layer]);}
  let r=p,s=q;
  for(let n=0;n<10;n++){for(let z=1;z<nz-1;z++)for(let y=1;y<ny-1;y++)for(let x=1;x<nx-1;x++){let i=x+nx*y+layer*z;s[i]=(r[i-1]+r[i+1]+r[i-nx]+r[i+nx]+r[i-layer]+r[i+layer]-div[i])/6;}[r,s]=[s,r];}
  for(let z=1;z<nz-1;z++)for(let y=1;y<ny-1;y++)for(let x=1;x<nx-1;x++){let i=x+nx*y+layer*z;u[i]-=.5*(r[i+1]-r[i-1]);v[i]-=.5*(r[i+nx]-r[i-nx]);w[i]-=.5*(r[i+layer]-r[i-layer]);}
  time+=dt;
 }
 return {step,t,rate,u,v,w,get time(){return time;}};
}
