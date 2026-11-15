import {luciPanel} from './luci.js';
import {askPanel} from './ask.js';
import {psiPanel,predictionPanel,coverageNote} from './research.js';
import {methodPanel} from './method.js';
const view = document.querySelector('#view');
const escape = value => String(value ?? 'Not reported').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const fmt = value => typeof value === 'number' && Number.isFinite(value) ? String(value) : 'Not reported';
const names = {'mylar-g':'Mylar G','ultem-1000':'Ultem 1000','nomex-ht90-40':'Nomex HT90-40','pmma':'PMMA acrylic','p213':'P-213 tape','remera-algodon':'Cotton T-shirt','policarbonato':'Polycarbonate','nomex-velcro':'Nomex Velcro'};
const name = m => names[m.id] || m.nombre || m.id;
const words = {
 '0 g':'Microgravity','Luna':'Moon','Marte':'Mars','1 g':'Earth',
 'NASA WSTF, Test 1 modificado':'NASA WSTF, modified Test 1',
 'Torre de caída de NASA GRC con centrífuga (5,18 s)':'NASA Glenn drop tower, centrifuge (5.18 s)',
 'Torre de caída de NASA GRC con centrífuga':'NASA Glenn drop tower, centrifuge',
 'Torre de caída (microgravedad)':'Drop tower in free fall',
 'sin flujo forzado, hacia arriba':'Upward, no forced flow','flotación (centrífuga), hacia arriba':'Upward, centrifuge-induced buoyancy',
 'forzado, concurrente, 30 cm/s':'Forced concurrent flow, 30 cm/s',
 'No encendió':'Did not ignite','Reutilizada, no encendió':'Reused sample; did not ignite',
 'Reutilizada, llama de un solo lado':'Reused sample; one-sided flame','Ardió (BASS)':'Burned (BASS)',
 'Sin comentario (lectura de O2 posiblemente inexacta)':'No outcome recorded; oxygen reading may be inaccurate',
 'El criterio en gravedad reducida (5,18 s de caída) no es el mismo que en 1 g (15,2 cm de llama, NASA-STD-6001 Test 1).':'Reduced-gravity tests use a 5.18 s drop. Earth Test 1 uses a 15.2 cm burn-length criterion.',
 'Los valores lunares y de 0 g vienen de Ferkul y Olson 2011, reproducidos en Olson y Ferkul 2012 (el original de 2011 no se leyó).':'Lunar and microgravity values were reproduced in the 2012 paper from a 2011 study. The team reviewed the reproduction.',
 'El punto de 0 g es con flujo forzado de 30 cm/s, no con aire quieto.':'Microgravity points used forced airflow at 30 cm/s.',
 'Escalones de 1 % de O2, sin réplicas reportadas.':'Oxygen changed in one percentage-point steps. Replicate counts were not reported.',
 'Presiones de 70,3 o 101,3 kPa, no la del hábitat lunar (56,5 kPa).':'These tests used 70.3 or 101.3 kPa. The planned habitat reference is 56.5 kPa.'
};
const tr = value => words[value] || value || 'Not reported';
const palette = ['#b14727','#176351','#735098','#645b31'];
const colors = i => palette[i % palette.length];
function source(f){
 if (!f || !/^https:\/\/ntrs\.nasa\.gov\//.test(f.ntrs)) return 'Source not reported';
 const location=(f.ubicacion||'Poster').replace(/tabla/gi,'Table').replace('advertencia en','note on').replace('y ', 'and ');
 return `<a class="source" target="_blank" rel="noopener" href="${escape(f.ntrs)}" title="${escape(f.cita)}">${escape(f.cita.split(').')[0]+')')} · ${escape(location)} ↗</a>`;
}
function option(value, label, selected){return `<option value="${escape(value)}"${value===selected?' selected':''}>${escape(label)}</option>`}
const title = (eyebrow,heading,lead) => `<p class="eyebrow">${eyebrow}</p><h2>${heading}</h2><p class="lead">${lead}</p>`;
let data, selectedMaterial, selectedGravity='Luna', selectedCard, stop=()=>{};
function gravity(){
 const materials=data.materiales, m=materials.find(x=>x.id===selectedMaterial)||materials[0];
 const p=m.puntos.find(x=>x.gravedad===selectedGravity)||m.puntos[0];
 const gravities=[...new Map(materials.flatMap(a=>a.puntos.map(b=>[b.g,b.gravedad]))).entries()].sort((a,b)=>a[0]-b[0]);
 const values=materials.flatMap(a=>a.puntos.flatMap(b=>[b.uloi,b.moc])).filter(Number.isFinite);
 const low=Math.floor(Math.min(...values)/5)*5, high=Math.ceil(Math.max(34,...values)/5)*5;
 const X=g=>66+525*g, Y=o=>240-205*(o-low)/(high-low);
 let chart=`<rect x="${X(.16)-19}" y="26" width="38" height="214" fill="#e4eadd"/>`;
 for(let n=low;n<=high;n+=5)chart+=`<path d="M56 ${Y(n)}H603" stroke="#dbe2d6"/><text x="45" y="${Y(n)+5}" text-anchor="end">${n}</text>`;
 chart+=`<path d="M56 ${Y(34)}H603" stroke="#666c52" stroke-dasharray="5 4"/><text x="600" y="${Y(34)-5}" text-anchor="end">Habitat reference · 34% O₂</text>`;
 for(const [g,label] of gravities) chart+=`<text x="${X(g)}" y="262" text-anchor="middle">${escape(tr(label))}</text><text x="${X(g)}" y="281" text-anchor="middle">${g} g</text>`;
 materials.forEach((a,i)=>{
 const points=a.puntos.filter(b=>Number.isFinite(b.uloi)).slice().sort((a,b)=>a.g-b.g);
 chart+=`<polyline points="${points.map(b=>`${X(b.g)},${Y(b.uloi)}`).join(' ')}" stroke="${colors(i)}" stroke-width="2" fill="none"/>`;
 points.forEach(b=>{
 const x=X(b.g),y=Y(b.uloi), bottom=Number.isFinite(b.moc)?Y(b.moc):null;
 const symbol=i%3===0?`<circle r="5"/>`:i%3===1?`<rect x="-4" y="-4" width="8" height="8"/>`:`<path d="M0 -6L6 0 0 6 -6 0Z"/>`;
 chart+=`<g role="button" tabindex="0" aria-label="${escape(name(a)+' '+tr(b.gravedad))}" data-material="${escape(a.id)}" data-gravity="${escape(b.gravedad)}" fill="${colors(i)}">${bottom!==null?`<path d="M${x} ${y}V${bottom}m-4 0h8" stroke="${colors(i)}" fill="none"/>`:''}<g transform="translate(${x} ${y})">${symbol}<circle r="9" fill="transparent" stroke="${a===m&&b===p?colors(i):'none'}"/></g></g>`;
 });
 });
 const mylar=materials.find(a=>a.id==='mylar-g');
 const delta=mylar?.delta_o2_vs_1g?.Luna;
 view.innerHTML=title('Partial-gravity limits · Olson &amp; Ferkul 2012','Gravity curve','Compare the lowest oxygen concentration at which each material burned in the reported tests.')+`<div class="grid"><article class="card"><div class="legend">${materials.map((a,i)=>`<span style="--swatch:${colors(i)}">${escape(name(a))}</span>`).join('')}</div><p class="small-label">Oxygen by volume (%)</p><svg class="chart" viewBox="0 0 630 295" aria-label="Interactive oxygen limits by gravity">${chart}</svg><p class="muted">Each marker is a burn limit (ULOI). Its bar extends to the extinction limit (MOC). Lines connect observations.</p>${Number.isFinite(delta)?`<p><strong>Mylar G:</strong> the midpoint of its two limits was ${Math.abs(delta)} oxygen percentage points ${delta<0?'lower':'higher'} in lunar gravity than on Earth.</p>`:''}${source(data._meta.fuente)}</article><aside class="card detail"><p class="eyebrow">Selected observation</p><label class="field">Material<select id="material">${materials.map(a=>option(a.id,name(a),m.id)).join('')}</select></label><label class="field">Gravity<select id="gravity">${m.puntos.map(b=>option(b.gravedad,tr(b.gravedad),p.gravedad)).join('')}</select></label><div class="metrics"><div><small>Still burned at</small><strong>${fmt(p.uloi)}%</strong></div><div><small>Went out at</small><strong>${fmt(p.moc)}%</strong></div></div><dl class="details"><dt>Platform</dt><dd>${escape(tr(p.plataforma))}</dd><dt>Flow</dt><dd>${escape(tr(p.flujo))}</dd><dt>Pressure / thickness</dt><dd>${fmt(m.presion_kPa)} kPa / ${fmt(m.espesor_mm)} mm</dd></dl><p>${['Luna','0 g'].includes(p.gravedad)?'Secondary · reproduced in Table I':'Verified against Table I'}${p.nota?' · Exact gravity was not reported for this point.':''}</p>${source(data._meta.fuente)}</aside></div><section class="notice"><h3>Reading the limits</h3><ul>${data._meta.advertencias_globales.map(v=>`<li>${escape(tr(v))}</li>`).join('')}</ul></section>`;
 view.querySelector('.detail').insertAdjacentHTML('beforeend','<p class="psi-note">'+coverageNote(psiData,m.id)+'</p>');
 function change(material,gravity,focus){selectedMaterial=material;selectedGravity=gravity;render();view.querySelector(focus)?.focus({preventScroll:true});}
 view.querySelector('#material').onchange=e=>change(e.target.value,p.gravedad,'#material');
 view.querySelector('#gravity').onchange=e=>change(m.id,e.target.value,'#gravity');
 view.querySelectorAll('[data-gravity]').forEach(el=>{
 const pick=()=>change(el.dataset.material,el.dataset.gravity,`[data-material="${CSS.escape(el.dataset.material)}"][data-gravity="${CSS.escape(el.dataset.gravity)}"]`);
 el.onclick=pick;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick();}};
 });
}
function cards(){
 const h=data.habitat_lunar_8_2_psi, m=h.materiales.find(a=>a.id===selectedCard)||h.materiales[0];
 const effects={más:'More flammable',menos:'Less flammable'};
 const effect=a=>effects[a.efecto_luna?.split(' ')[0]]||'Not reported';
 const test=a=>({pasa:'Pass',falla:'Fail'}[a.test1_aire]||'Not reported');
 const n=h.nomex_ht90_40_poster, ref=data.materiales.find(a=>a.id==='nomex-ht90-40');
 view.innerHTML=title('Lunar habitat · 8.2 psi','Material cards','Compare Earth screening with the reported direction of the lunar effect at 8.2 psi.')+`<div class="grid"><article class="card"><h3>Materials at habitat pressure</h3><div class="table-wrap"><table><thead><tr><th>Material</th><th>Earth Test 1 in air</th><th>Lunar effect</th></tr></thead><tbody>${h.materiales.map(a=>`<tr><td><button aria-pressed="${a.id===m.id}" data-card="${escape(a.id)}">${escape(name(a))}</button></td><td>${test(a)}</td><td>${effect(a)}</td></tr>`).join('')}</tbody></table></div>${source(h._meta.fuente)}</article><aside class="card detail"><p class="eyebrow">Material record</p><h3>${escape(name(m))}</h3><p>${effect(m)} on the Moon (at 8.2 psi).</p><p>Conservative O₂ correction: <strong>${fmt(m.correccion_conservadora_o2)} percentage points</strong>. This is the study’s correction, not a measured lunar oxygen limit.</p>${source(h._meta.fuente)}</aside></div>`;
 view.querySelector('.detail').insertAdjacentHTML('beforeend','<p class="psi-note">'+coverageNote(psiData,m.id)+'</p>');
 view.insertAdjacentHTML('beforeend','<div class="notice"><label>PSI coverage by material <select id="psi-material"></select></label><p id="psi-note"></p></div>');const picker=view.querySelector('#psi-material');picker.replaceChildren(...Object.entries(psiData.coverage).map(([k,v])=>new Option(v.label,k)));picker.value='mylar';picker.onchange=()=>{view.querySelector('#psi-note').innerHTML=coverageNote(psiData,picker.value);};picker.onchange();
 if(n && ref)view.insertAdjacentHTML('beforeend',`<section class="notice"><h3>Nomex HT90-40 changes direction across studies</h3><p>At ${fmt(ref.presion_kPa)} kPa, the lunar burn limit was below the Earth limit. At 8.2 psi the poster reports approximately ${fmt(n.limite_o2_aprox.Luna)}% oxygen for lunar gravity and ${fmt(n.limite_o2_aprox['1 g'])}% on Earth. Protocols differ as well as pressure.</p>${source(data._meta.fuente)} · ${source(n.fuente)}</section>`);
 view.querySelectorAll('[data-card]').forEach(el=>el.onclick=()=>{selectedCard=el.dataset.card;cards();view.querySelector(`[data-card="${CSS.escape(selectedCard)}"]`).focus({preventScroll:true});});
}

const searchState={mat:'sibal',oxygen:'18',flow:'10',gravity:'0',pressure:''};
let psiData,predictions;
function materials(){return [...new Map([{id:'sibal',nombre:'SIBAL fabric'},...data.materiales,...data.habitat_lunar_8_2_psi.materiales].map(m=>[m.id,m])).values()];}
function tests(){return askPanel(view,materials().map(m=>({id:m.id,label:name(m)})),searchState,luciPanel);}
async function simulation(){const {showChamber}=await import('./chamber.js'); if(location.hash==='#simulation')stop=showChamber(view,searchState,materials().map(m=>({id:m.id,label:name(m)})));}
const routes={home:()=>{view.innerHTML='';},method:()=>methodPanel(view),gravity,materials:cards,tests,fm2:()=>predictionPanel(view,predictions),psi:()=>psiPanel(view,psiData,data),simulation};
function render(){
 stop();stop=()=>{};
 const route=location.hash.slice(1);
 const active=Object.hasOwn(routes,route)?route:'home';
 document.body.dataset.route=active;
 document.querySelectorAll('nav a').forEach(a=>{
 if(a.hash==='#'+active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
 });
 const cleanup=routes[active]();if(typeof cleanup==='function')stop=cleanup;
}
async function start(){
 try{
 const response=await fetch(new URL('../data/curva_gravedad.json',import.meta.url),{cache:'no-cache'});
 if(!response.ok)throw Error('Unavailable evidence');
 data=await response.json();
 [psiData,predictions]=await Promise.all(['psi_coverage','prediction'].map(async n=>{const r=await fetch('./data/'+n+'.json');if(!r.ok)throw Error(n);return r.json();}));
 overview();
 render();window.addEventListener('hashchange',()=>{render();if(document.body.dataset.route==='home')window.scrollTo(0,0);else{window.scrollTo(0,0);view.focus({preventScroll:true});}});
 }catch{view.innerHTML='<p role="alert">The evidence could not be loaded. Refresh to try again.</p>';}
}
// Dashboard overview on the home page: three live panels built from the loaded data (overview first, details on demand).
function overview(){
 const host=document.querySelector('#overview');if(!host)return;
 const m=data.materiales.find(a=>a.id==='mylar-g');
 const pts=(m?.puntos||[]).filter(p=>Number.isFinite(p.uloi)).slice().sort((a,b)=>a.g-b.g);
 const axis={'0 g':'0 g','Luna':'Moon','Marte':'Mars','1 g':'Earth'};
 const lo=14,hi=22.5,X=g=>26+248*g,Y=v=>122-96*(v-lo)/(hi-lo);
 let svg=`<svg class="mini" viewBox="0 0 300 165" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mylar lowest burning oxygen: ${pts.map(p=>(axis[p.gravedad]||p.gravedad)+' '+p.uloi+'%').join(', ')}"><path d="M8 140H292" stroke="#c6d1c4"/>`;
 svg+=`<polyline points="${pts.map(p=>X(p.g)+','+Y(p.uloi)).join(' ')}" fill="none" stroke="#9aa79f" stroke-width="2.5"/>`;
 for(const p of pts){const moon=p.gravedad==='Luna',x=X(p.g),y=Y(p.uloi);
  svg+=`<circle cx="${x}" cy="${y}" r="${moon?9:6}" fill="${moon?'#e38b12':'#33463f'}"/><text x="${x}" y="${y-16}" text-anchor="middle" class="${moon?'val hot':'val'}">${p.uloi}%</text><text x="${x}" y="160" text-anchor="middle" class="${moon?'lab hot':'lab'}">${escape(axis[p.gravedad]||tr(p.gravedad))}</text>`;}
 svg+='</svg>';
 const max=psiData.o2_ceiling.max_initial_o2_pct_solids;
 const min=Math.min(...Object.values(psiData.coverage).flatMap(r=>r.o2_initial_min_pct==null?[]:[r.o2_initial_min_pct]));
 const pct=v=>(v/40*100).toFixed(1)+'%';
 const bar=`<div class="o2" role="img" aria-label="Tested oxygen ${min} to ${max} percent; lunar cabins planned at 30 to 34 percent"><div class="o2-track"><i style="left:${pct(min)};width:${pct(max-min)}"></i><u style="left:${pct(30)};width:${pct(4)}"></u></div><div class="o2-labels"><span style="left:${pct((min+max)/2)}">Tested<br><b>${min}–${max}%</b></span><span class="hab" style="left:${pct(32)}">Lunar cabin<br><b>30–34%</b></span></div><div class="o2-axis"><span>0%</span><span>10%</span><span>20%</span><span>30%</span><span>40% O₂</span></div></div>`;
 const short={'FM2-P1-SIBAL-air-downward':['SIBAL fabric','in air, burning downward'],'FM2-P2a-acrylic-SEA':['Acrylic (PMMA)','34% O₂ at 8.2 psi'],'FM2-P2b-high-pyrolysis-temperature-SEA':['Nomex or polycarbonate type','34% O₂ at 8.2 psi']};
 const rows=predictions.map(r=>{const more=r.expectation.direction==='more flammable',[a,b]=short[r.id]||[r.material,''];return `<li><span class="arrow ${more?'up':'down'}" aria-hidden="true">${more?'▲':'▼'}</span><span><b>${escape(a)}</b><small>${escape(b)}</small></span><em class="${more?'up':'down'}">${more?'More':'Less'} flammable</em></li>`;}).join('');
 const when=escape(predictions[0].registered_at.slice(0,10));
 const panel=(href,eyebrow,title,viz,note,open)=>`<a class="panel" href="${href}"><p class="eyebrow">${eyebrow}</p><h3>${title}</h3><div class="viz">${viz}</div><p class="note">${note}</p><span class="open">${open} →</span></a>`;
 host.innerHTML=
  panel('#gravity','Gravity curve',`Mylar kept burning at ${pts.find(p=>p.gravedad==='Luna')?.uloi}% oxygen in lunar gravity`,svg,'Lowest oxygen that still burned. Olson &amp; Ferkul 2012, Table I.','Open the gravity curve')+
  panel('#psi','NASA flight tests',`Solid-fuel flight tests stop at ${max}% oxygen`,bar,'BASS-II and Saffire I–III tables in NASA PSI.','Open NASA flight tests')+
  panel('#fm2','FM2 prediction','Three predictions, registered before the first fire on the Moon',`<ul class="preds">${rows}</ul>`,`Compared with Earth gravity. Registered ${when}.`,'Open the predictions');
}
// Landing: hand a question to "Ask the evidence", and respect reduced motion for the hero video.
function landing(){
 const form=document.querySelector('#home-ask');
 const go=q=>{q=String(q||'').trim();if(!q)return;try{sessionStorage.setItem('fd:pending-question',q);}catch{}location.hash='#tests';};
 if(form)form.onsubmit=e=>{e.preventDefault();go(form.elements.q.value);};
 document.querySelectorAll('.chips [data-q]').forEach(b=>b.onclick=()=>go(b.dataset.q));
 const video=document.querySelector('.hero-media video');
 if(video&&matchMedia('(prefers-reduced-motion: reduce)').matches){video.removeAttribute('autoplay');video.pause();}
}
landing();
start();
