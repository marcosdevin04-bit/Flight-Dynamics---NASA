import {shapeFor,shapes,atmosphereControl} from './scenarios.js';
import {chamber,nx,ny,nz,dx} from './reactor.js';
import {viewport} from './volume.js';
export function showChamber(view,scenario,materials){
 const defaults={flow:10,oxygen:21,pressure:101.3},bounds={flow:[0,30],oxygen:[0,35],pressure:[50,105]};
 const settings={gravity:Number(scenario.gravity)},notes=[];
 for(const [key,v] of Object.entries(defaults)){const [lo,hi]=bounds[key],raw=scenario[key],n=raw===''||raw==null?v:Number(raw);
 settings[key]=Math.max(lo,Math.min(hi,n));if(raw===''||raw==null)notes.push(key+' defaults to '+v);else if(settings[key]!==n)notes.push(key+' limited to '+settings[key]);}
 view.innerHTML='<div class="ch-head"><div><p class="eyebrow">Flight Dynamics / Simulation laboratory</p><h2>Flame chamber</h2></div><span>3D &nbsp;/&nbsp; REACTING FLOW</span></div>'+
 '<p class="ch-intro">Explore a simulated flame in three dimensions. Change gravity or ventilation, then orbit the chamber to inspect the reaction zone.</p>'+
 '<div class="ch-layout"><article class="ch-instrument"><div class="ch-bar"><strong class="sim-label">SIMULATION — illustrative</strong><select id="layer" aria-label="Displayed field"><option value="flame">Flame · reaction rate</option><option value="temp">Thermal plume</option><option value="slice">Temperature · center slice</option></select></div>'+
 '<div class="ch-scene"><canvas tabindex="0" aria-label="3D reacting flow. Drag to orbit, Shift-drag to pan, scroll to zoom. Arrow keys rotate, plus and minus zoom, Home resets."></canvas><div class="ch-camera"><button data-cam="out" aria-label="Zoom out">−</button><button data-cam="in" aria-label="Zoom in">+</button><button data-cam="home">Reset view</button></div></div>'+
 '<div class="ch-read"><span id="elapsed"></span><span id="legend"></span></div><div class="ch-hint">Drag to orbit · Shift-drag to pan · Scroll or pinch to zoom</div></article>'+
 '<aside class="ch-controls"><p class="eyebrow">Boundary conditions</p><h3>Scenario controls</h3><label>Material / fuel scenario<select id="sample"></select></label><label>Oxidizing atmosphere<select id="atmos"></select></label><label>Gravity<select id="gravity"><option value="0">Microgravity · ~0 g</option><option value="0.16">Moon · 0.16 g</option><option value="0.38">Mars · 0.38 g</option><option value="1">Earth · 1 g</option></select></label>'+
 [['flow','Ventilation','cm/s'],['oxygen','Oxygen','%'],['pressure','Ambient pressure','kPa']].map(([k,label,unit])=>'<label>'+label+' <output for="'+k+'"></output><input type="range" id="'+k+'" min="'+bounds[k][0]+'" max="'+bounds[k][1]+'" step=".1" data-unit="'+unit+'"></label>').join('')+
 '<label class="ch-check"><input id="vectors" type="checkbox"> Show velocity vectors</label><div class="actions"><button id="pause">Pause</button><button id="restart">Restart model</button></div></aside></div>'+
 '<p id="source-profile" class="ch-note"></p><p class="ch-note"><b>Model, not measurement.</b> The flame shows relative reaction rate around a generic, continuously piloted fuel source. It cannot establish whether a particular habitat material will ignite. <a href="#tests">Compare NASA observations ↗</a></p>'+
 '<details class="notice"><summary>Model assumptions and numerical method</summary><p>33 × 29 × 23 Cartesian cells at 0.65 cm spacing; 0.024 s time step. Three-dimensional semi-Lagrangian transport of velocity, fuel, oxygen and excess heat; explicit scalar diffusion, approximate pressure projection, buoyancy and a mixing-limited reaction. The oxygen control changes inlet concentration; ambient pressure changes effective diffusivity. A fixed localized fuel and pilot source supplies the chamber. Open faces replenish oxygen; the inlet prescribes ventilation. Heat losses and momentum damping are empirical. Colors are relative field values, not measured temperatures or flame spectra.</p><p>Coarse, illustrative CFD. No material-specific kinetics, radiation, validated spread rate or ignition threshold. A scenario starts after a short numerical warm-up. For comparison use the same model time. '+(notes.length?'Inputs: '+notes.join('; ')+'.':'')+'</p></details>';
 const $=s=>view.querySelector(s),cam=viewport($('canvas'));let model,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,id=0,prev=0,acc=0,restartPending=false;
 function reset(){model=chamber({...settings,shape:shapeFor(scenario.mat)});for(let n=0;n<45;n++)model.step();prev=0;acc=0;}
 function values(){for(const k of Object.keys(defaults)){const el=$('#'+k);el.value=settings[k];$('output[for="'+k+'"]').textContent=settings[k]+' '+el.dataset.unit;}}
 values();$('#gravity').value=settings.gravity;
 if(scenario.baseline){const note=document.createElement('p');note.className='notice';note.textContent='Starting reference: '+scenario.baseline;$('.ch-layout').before(note);}
 const sample=$('#sample');sample.replaceChildren(...materials.map(m=>new Option(m.label,m.id)));sample.value=scenario.mat;
 let timer=0;
 function compare(){clearTimeout(timer);$('#source-profile').textContent='Source geometry: '+shapes[shapeFor(scenario.mat)]+'. Geometry is illustrative. No material-specific reaction rates, liquid evaporation or propulsion chemistry are modeled.';}
 function remember(){for(const [k,v] of Object.entries(settings))scenario[k]=String(v);}
 function changed(){remember();values();restartPending=true;clearTimeout(timer);timer=setTimeout(compare,200);}
 sample.onchange=()=>{scenario.mat=sample.value;changed();};
 for(const k of Object.keys(settings))$('#'+k).oninput=e=>{settings[k]=Number(e.target.value);changed();};
 atmosphereControl($('#atmos'),$('#oxygen'),()=>$('#oxygen').dispatchEvent(new Event('input')));
 compare();
 $('#pause').textContent=paused?'Resume':'Pause';$('#pause').onclick=e=>{paused=!paused;e.target.textContent=paused?'Resume':'Pause';prev=0;};
 $('#restart').onclick=()=>{restartPending=true;};for(const b of view.querySelectorAll('[data-cam]'))b.onclick=()=>cam.command(b.dataset.cam);
 function frame(now){if(restartPending){reset();restartPending=false;}if(!paused&&prev){acc+=Math.min(.10,(now-prev)/1000);let n=0;while(acc>=.024&&n++<3){model.step();acc-=.024;}acc=Math.max(0,Math.min(acc,.05));}
 prev=now;const mode=$('#layer').value;cam.draw(model,mode,$('#vectors').checked);$('#elapsed').textContent='t '+model.time.toFixed(2)+' s   /   Δx '+dx+' cm';$('#legend').textContent=mode==='flame'?'Reaction rate · relative':'Excess heat · relative';id=requestAnimationFrame(frame);}
 reset();id=requestAnimationFrame(frame);return ()=>{cancelAnimationFrame(id);clearTimeout(timer);};
}
