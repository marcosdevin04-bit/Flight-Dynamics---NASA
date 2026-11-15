import {nx,ny,nz,layer,dx} from './reactor.js';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function viewport(canvas){
 const ctx=canvas.getContext('2d'), sprites=[];
 for(const color of ['24,91,224','45,180,233','238,76,22','254,158,50','255,225,133']){
  const el=document.createElement('canvas');el.width=el.height=48;const g=el.getContext('2d'),grad=g.createRadialGradient(24,24,0,24,24,24);
  [[0,.95],[.37,.55],[.72,.13],[1,0]].forEach(([s,a])=>grad.addColorStop(s,'rgba('+color+','+a+')'));
  g.fillStyle=grad;g.fillRect(0,0,48,48);sprites.push(el);
 }
 let yaw,pitch,zoom,ox,oy;function reset(){yaw=-.46;pitch=.26;zoom=1;ox=oy=0;}reset();
 const pts=new Map();let gesture='';
 function command(key,amount=1){if(key==='home')reset();if(key==='in'||key==='out')zoom=clamp(zoom*Math.pow(1.18,key==='in'?amount:-amount),.5,4); if(key==='left')yaw-=.14;if(key==='right')yaw+=.14;if(key==='up')pitch=clamp(pitch+.1,-.9,1.4);if(key==='down')pitch=clamp(pitch-.1,-.9,1.4);}
 canvas.oncontextmenu=e=>e.preventDefault();
 canvas.onpointerdown=e=>{canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);gesture=e.shiftKey||e.button===2?'pan':'orbit';};
 canvas.onpointermove=e=>{const old=pts.get(e.pointerId);if(!old)return;const x=e.clientX,y=e.clientY,dx=x-old[0],dy=y-old[1],other=[...pts].find(([k])=>k!==e.pointerId)?.[1];
 if(other){const d=Math.hypot(x-other[0],y-other[1]),d0=Math.hypot(old[0]-other[0],old[1]-other[1]);if(d0>2)zoom=clamp(zoom*d/d0,.5,4);ox+=dx/2;oy+=dy/2;}
 else if(gesture==='pan'){ox+=dx;oy+=dy;}else{yaw+=dx*.009;pitch=clamp(pitch+dy*.008,-.9,1.4);}pts.set(e.pointerId,[x,y]);};
 canvas.onlostpointercapture=canvas.onpointerup=canvas.onpointercancel=e=>pts.delete(e.pointerId);
 canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=clamp(zoom*Math.exp(-e.deltaY*.0014),.5,4);},{passive:false});
 canvas.onkeydown=e=>{const k=({ArrowRight:'right',ArrowLeft:'left',ArrowUp:'up',ArrowDown:'down','+':'in','=':'in','-':'out',Home:'home'})[e.key];if(k){e.preventDefault();command(k);}};
 function draw(m,mode,vectors){
 const W=Math.round(canvas.clientWidth),H=Math.round(canvas.clientHeight);if(!W||!H)return;
 const dpr=Math.min(1.6,devicePixelRatio||1);if(canvas.width!==Math.round(W*dpr)||canvas.height!==Math.round(H*dpr)){canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
 const c=Math.cos(yaw),s=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch),scale=Math.min(W/33,H/29)*zoom;
 const project=(x,y,z)=>{x-=14;y-=11;z-=11;const xx=c*x+s*z,zz=-s*x+c*z,yy=cp*y-sp*zz,depth=sp*y+cp*zz,k=scale*65/Math.max(25,65-depth);return [W*.50+ox+xx*k,H*.52+oy-yy*k,k];};
 function line(a,b,color,width=1){const A=project(...a),B=project(...b);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke();}
 for(let x=0;x<nx;x+=2)line([x,1,0],[x,1,22],x%8===0?'#3c5361':'#253846');for(let z=0;z<nz;z+=2)line([0,1,z],[32,1,z],z%8===0?'#3c5361':'#253846');
 for(const [x,z] of [[0,0],[32,0],[0,22],[32,22]])line([x,1,z],[x,26,z],'#263c49');
 // Low circular source holder, fixed in the same coordinates as the source.
 for(let j=0;j<44;j++){const A=j*Math.PI/22,B=(j+1)*Math.PI/22;
 line([12+2.4*Math.cos(A),2,11+2.4*Math.sin(A)],[12+2.4*Math.cos(B),2,11+2.4*Math.sin(B)],'#9eafb3',2);}
 if(vectors){for(let z=4;z<nz;z+=7)for(let y=3;y<ny;y+=5)for(let x=3;x<nx-1;x+=5){const i=x+y*nx+z*layer,vel=Math.hypot(m.u[i],m.v[i],m.w[i]);if(vel<.15)continue;const k=Math.min(.11,2.8/vel), a=[x,y,z],b=[x+k*m.u[i],y+k*m.v[i],z+k*m.w[i]];line(a,b,'#70b8b3');const Q=project(...b);ctx.fillStyle='#b4dad5';ctx.fillRect(Q[0]-1,Q[1]-1,2,2);}}
 ctx.globalCompositeOperation='lighter';
 for(let z=1;z<nz-1;z++)for(let y=1;y<ny-1;y++)for(let x=1;x<nx-1;x++){const i=x+y*nx+z*layer;
 if(mode==='slice'&&z!==11)continue;const val=mode==='flame'?m.rate[i]:m.t[i];if(val<.012)continue;
 const [px,py,k]=project(x,y,z),radius=k*(mode==='slice'?1.20:1.18);
 const level=mode==='flame'?val:val*1.4, idx=level<.09?0:level<.20?1:level<.55?2:level<1?3:4;
 ctx.globalAlpha=mode==='slice'?clamp(val*1.7,.04,1):clamp(Math.sqrt(val)*.105,.007,.18);
 ctx.drawImage(sprites[idx],px-radius,py-radius,radius*2,radius*2);}
 ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.font='11px Consolas, monospace';
 for(const [label,pos] of [['X',[31,1,21]],['Z',[1,1,20]],['Y',[0,24,0]]]){const [x,y]=project(...pos);ctx.fillStyle='#b4c7cd';ctx.fillText(label,x+3,y-3);}
 canvas.dataset.camera=[yaw,pitch,zoom,ox,oy].map(v=>v.toFixed(3)).join(',');
 }
 return {draw,command};
}
