export function buildModel(){
 // Two-dimensional incompressible Boussinesq flow, on a staggered MAC grid.
 // Distances in metres, time in seconds, velocities in m/s; temperature in kelvin.
 const nx=64,ny=32,stride=nx+2,n=stride*(ny+2),dx=.005,ambient=295;
 let u=new Float64Array(n),v=new Float64Array(n),temp=new Float64Array(n).fill(ambient);
 let pu=new Float64Array(n),pv=new Float64Array(n),tNext=new Float64Array(n);
 const phi=new Float64Array(n),rhs=new Float64Array(n);
 let time=0,divergence=0;
 const clamp=(a,min,max)=>Math.max(min,Math.min(max,a));
 function boundaries(flow){
 for(let j=1;j<=ny;j++){let k=j*stride;
 u[k]=flow;u[k+nx]=u[k+nx-1];v[k]=-v[k+1];v[k+nx+1]=v[k+nx];
 temp[k]=ambient;temp[k+nx+1]=temp[k+nx];}
 for(let i=0;i<=nx+1;i++){u[i]=-u[i+stride];u[i+(ny+1)*stride]=-u[i+ny*stride];
 v[i]=0;v[i+ny*stride]=0;temp[i]=ambient;temp[i+(ny+1)*stride]=ambient;}
 }
 function step(cfg){
 const inlet=cfg.flow/100,nu=1.55e-5*101.325/cfg.pressure,alpha=2.2e-5*101.325/cfg.pressure;
 boundaries(inlet);
 let fastest=Math.max(.01,inlet);
 for(let j=1;j<=ny;j++)for(let i=1;i<=nx;i++){
 const k=i+j*stride;fastest=Math.max(fastest,Math.abs(u[k])+Math.abs(v[k]));}
 const dt=Math.min(.018,.35*dx/fastest,.19*dx*dx/Math.max(nu,alpha));
 function transport(a,k,ux,vy,diff){
 const gx=ux>=0?a[k]-a[k-1]:a[k+1]-a[k],gy=vy>=0?a[k]-a[k-stride]:a[k+stride]-a[k];
 const lap=a[k-1]+a[k+1]+a[k-stride]+a[k+stride]-4*a[k];
 return a[k]+dt*(-(ux*gx+vy*gy)/dx+diff*lap/(dx*dx));
 }
 pu.set(u);pv.set(v);
 for(let j=1;j<=ny;j++)for(let i=1;i<=nx;i++){
 const k=i+j*stride;
 if(i<nx)pu[k]=transport(u,k,u[k],.25*(v[k]+v[k+1]+v[k-stride]+v[k-stride+1]),nu);
 if(j<ny)pv[k]=transport(v,k,.25*(u[k]+u[k-1]+u[k+stride]+u[k+stride-1]),v[k],nu)+dt*cfg.gravity*9.80665*((temp[k]+temp[k+stride])*.5-ambient)/ambient;
 tNext[k]=clamp(transport(temp,k,.5*(u[k]+u[k-1]),.5*(v[k]+v[k-stride]),alpha),ambient,cfg.source);
 if((i-19)**2+(j-9)**2<=4)tNext[k]=cfg.source;
 }
 for(let j=1;j<=ny;j++)for(let i=1;i<=nx;i++){const k=i+j*stride;rhs[k]=(pu[k]-pu[k-1]+pv[k]-pv[k-stride])*dx;}
 // Pressure correction: homogeneous Neumann at inlet/walls, zero correction at outlet.
 for(let iteration=0;iteration<36;iteration++){
 for(let j=1;j<=ny;j++)for(let i=1;i<=nx;i++){
 const k=i+j*stride;
 let sum=0,den=0;
 if(i>1){sum+=phi[k-1];den++;}
 if(i<nx){sum+=phi[k+1];den++;}else den+=2;
 if(j>1){sum+=phi[k-stride];den++;}
 if(j<ny){sum+=phi[k+stride];den++;}
 phi[k]+=1.68*((sum-rhs[k])/den-phi[k]);
 }}
 divergence=0;
 for(let j=1;j<=ny;j++)for(let i=1;i<=nx;i++){
 const k=i+j*stride;
 u[k]=i<nx?pu[k]-(phi[k+1]-phi[k])/dx:pu[k]+2*phi[k]/dx;
 if(j<ny)v[k]=pv[k]-(phi[k+stride]-phi[k])/dx;
 }
 for(let j=1;j<=ny;j++)for(let i=1;i<=nx;i++){
 const k=i+j*stride;divergence=Math.max(divergence,Math.abs(u[k]-u[k-1]+v[k]-v[k-stride])/dx);}
 [temp,tNext]=[tNext,temp];time+=dt;
 }
 return {step,nx,ny,stride,ambient,get u(){return u},get v(){return v},get temperature(){return temp},get time(){return time},get divergence(){return divergence}};
}
export function startHeat(view,initial){
 const canvas=view.querySelector('canvas'),ctx=canvas.getContext('2d');
 const raster=document.createElement('canvas');let model=buildModel();
 raster.width=model.nx;raster.height=model.ny;
 const rc=raster.getContext('2d'),pixels=rc.createImageData(model.nx,model.ny);
 const input=key=>view.querySelector('#'+key),keys=['flow','gravity','pressure','source'];
 const ramp=[[20,39,56],[65,122,128],[232,165,83],[255,237,188]];
 let frame,running=true,config={};
 function draw(){
 const {nx,ny,stride,temperature,u,v}=model;
 let warm=0,meanX=0,meanY=0;
 for(let j=1;j<=ny;j++)for(let i=1;i<=nx;i++){
 const k=i+j*stride,d=Math.max(0,temperature[k]-model.ambient);
 const pos=Math.min(3,3*d/(config.source-model.ambient)),lo=Math.min(2,Math.floor(pos)),f=pos-lo;
 const index=4*((ny-j)*nx+i-1);
 for(let c=0;c<3;c++)pixels.data[index+c]=ramp[lo][c]*(1-f)+ramp[lo+1][c]*f;
 pixels.data[index+3]=255;
 warm+=d;meanX+=d*(i-.5)*.5;meanY+=d*(j-.5)*.5;
 }
 rc.putImageData(pixels,0,0);ctx.drawImage(raster,0,0,canvas.width,canvas.height);
 ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1;
 const s=canvas.width/nx;
 for(let j=3;j<ny;j+=4)for(let i=3;i<nx;i+=5){
 const k=i+j*stride,a=.5*(u[k]+u[k-1]),b=.5*(v[k]+v[k-stride]),speed=Math.hypot(a,b);
 if(speed<.002)continue;
 const len=Math.min(23,125*speed),x=(i-.5)*s,y=(ny-j+.5)*s,ex=x+len*a/speed,ey=y-len*b/speed;
 ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(ex,ey);ctx.lineTo(ex-3*a/speed+2*b/speed,ey+3*b/speed+2*a/speed);ctx.stroke();
 }
 input('elapsed').textContent=`Model time ${model.time.toFixed(2)} s · heat centroid ${warm?(meanX/warm).toFixed(1)+', '+(meanY/warm).toFixed(1)+' cm':'not yet defined'}`;
 }
 function tick(){if(running){for(let i=0;i<3;i++)model.step(config);draw();}frame=requestAnimationFrame(tick);}
 function reset(){model=buildModel();for(const k of keys){config[k]=Number(input(k).value);view.querySelector('[data-value="'+k+'"]').textContent=input(k).value;}draw();}
 for(const k of keys){if(initial[k]!==undefined)input(k).value=String(initial[k]);input(k).oninput=reset;}
 input('pause').onclick=()=>{running=!running;input('pause').textContent=running?'Pause':'Resume';};
 input('restart').onclick=reset;reset();frame=requestAnimationFrame(tick);
 return ()=>cancelAnimationFrame(frame);
}
