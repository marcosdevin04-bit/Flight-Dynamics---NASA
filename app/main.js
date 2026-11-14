import {luciPanel} from './luci.js';
import {evidenceGuide} from './interpretation.js';
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
const title = (heading,lead) => `<h2>${heading}</h2><p class="lead">${lead}</p>`;
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
 view.innerHTML=title('Gravity curve','Compare the lowest oxygen concentration at which each material burned in the reported tests.')+`<div class="grid"><article class="card"><div class="legend">${materials.map((a,i)=>`<span style="--swatch:${colors(i)}">${escape(name(a))}</span>`).join('')}</div><p class="small-label">Oxygen by volume (%)</p><svg class="chart" viewBox="0 0 630 295" aria-label="Interactive oxygen limits by gravity">${chart}</svg><p class="muted">Each marker is a burn limit (ULOI). Its bar extends to the extinction limit (MOC). Lines connect observations.</p>${Number.isFinite(delta)?`<p><strong>Mylar G:</strong> the midpoint of its two limits was ${Math.abs(delta)} oxygen percentage points ${delta<0?'lower':'higher'} in lunar gravity than on Earth.</p>`:''}${source(data._meta.fuente)}</article><aside class="card detail"><p class="eyebrow">Selected observation</p><label class="field">Material<select id="material">${materials.map(a=>option(a.id,name(a),m.id)).join('')}</select></label><label class="field">Gravity<select id="gravity">${m.puntos.map(b=>option(b.gravedad,tr(b.gravedad),p.gravedad)).join('')}</select></label><div class="metrics"><div><small>ULOI · burned</small><strong>${fmt(p.uloi)}%</strong></div><div><small>MOC · extinguished</small><strong>${fmt(p.moc)}%</strong></div></div><dl class="details"><dt>Platform</dt><dd>${escape(tr(p.plataforma))}</dd><dt>Flow</dt><dd>${escape(tr(p.flujo))}</dd><dt>Pressure / thickness</dt><dd>${fmt(m.presion_kPa)} kPa / ${fmt(m.espesor_mm)} mm</dd></dl><p>${['Luna','0 g'].includes(p.gravedad)?'Secondary · reproduced in Table I':'Verified against Table I'}${p.nota?' · Exact gravity was not reported for this point.':''}</p>${source(data._meta.fuente)}</aside></div><section class="notice"><h3>Reading the limits</h3><ul>${data._meta.advertencias_globales.map(v=>`<li>${escape(tr(v))}</li>`).join('')}</ul></section>`;
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
 view.innerHTML=title('Material cards','Compare Earth screening with the reported direction of the lunar effect at 8.2 psi.')+`<div class="grid"><article class="card"><h3>Materials at habitat pressure</h3><div class="table-wrap"><table><thead><tr><th>Material</th><th>Earth Test 1 in air</th><th>Lunar effect</th></tr></thead><tbody>${h.materiales.map(a=>`<tr><td><button aria-pressed="${a.id===m.id}" data-card="${escape(a.id)}">${escape(name(a))}</button></td><td>${test(a)}</td><td>${effect(a)}</td></tr>`).join('')}</tbody></table></div>${source(h._meta.fuente)}</article><aside class="card detail"><p class="eyebrow">Material record</p><h3>${escape(name(m))}</h3><p>${effect(m)} on the Moon (at 8.2 psi).</p><p>Conservative O₂ correction: <strong>${fmt(m.correccion_conservadora_o2)} percentage points</strong>. This is the study’s correction, not a measured lunar oxygen limit.</p>${source(h._meta.fuente)}</aside></div>`;
 if(n && ref)view.insertAdjacentHTML('beforeend',`<section class="notice"><h3>Nomex HT90-40 changes direction across studies</h3><p>At ${fmt(ref.presion_kPa)} kPa, the lunar burn limit was below the Earth limit. At 8.2 psi the poster reports approximately ${fmt(n.limite_o2_aprox.Luna)}% oxygen for lunar gravity and ${fmt(n.limite_o2_aprox['1 g'])}% on Earth. Protocols differ as well as pressure.</p>${source(data._meta.fuente)} · ${source(n.fuente)}</section>`);
 view.querySelectorAll('[data-card]').forEach(el=>el.onclick=()=>{selectedCard=el.dataset.card;cards();view.querySelector(`[data-card="${CSS.escape(selectedCard)}"]`).focus({preventScroll:true});});
}

const searchState={mat:'sibal',oxygen:'18',flow:'10',gravity:'0',pressure:''};
function makeRecords(){
 const s=data.ejemplo_sibal_microgravedad;
 const records=s.ensayos.map(a=>({id:a.test,mat:'sibal',oxygen:a.o2,flow:/^\d+(\.\d+)?$/.test(a.flujo_cm_s)?Number(a.flujo_cm_s):null,g:0,pressure:null,result:tr(a.resultado),source:s._meta.fuente,level:'Experimental record'}));
 for(const m of data.materiales)for(const p of m.puntos){
 const flow=p.flujo?.match(/(\d+(?:\.\d+)?)\s*cm\/s/);
 for(const key of ['uloi','moc']){
 if(!Number.isFinite(p[key]))continue;
 records.push({id:`${name(m)} · ${tr(p.gravedad)} · ${key.toUpperCase()}`,mat:m.id,oxygen:p[key],flow:flow?Number(flow[1]):null,g:p.g,pressure:m.presion_kPa,result:key==='uloi'?'Burn limit under the study criterion':'Extinction limit under the study criterion',source:data._meta.fuente,level:['Luna','0 g'].includes(p.gravedad)?'Secondary · reproduced in Table I':'Verified · Table I'});
 }}
 return records;
}
const dimensions=[
 {key:'oxygen',label:'O₂',unit:'%',scale:2},
 {key:'flow',label:'Airflow',unit:' cm/s',scale:10},
 {key:'g',label:'Gravity',unit:' g',scale:.16},
 {key:'pressure',label:'Pressure',unit:' kPa',scale:5}];
function compareRecords(query){
 const asked=dimensions.filter(d=>query[d.key]!==null);
 return makeRecords().filter(r=>r.mat===query.mat && r.g===query.g).map(r=>{
 let total=0,missing=0;
 const reasons=asked.map(d=>{
 const value=r[d.key];if(!Number.isFinite(value)){missing++;total+=1;return `${d.label}: not reported`;}
 const delta=Math.abs(value-query[d.key]);total+=delta/d.scale;
 return `${d.label}: ${value}${d.unit}${delta>0?` (requested ${query[d.key]}${d.unit})`:' ✓'}`;
 });
 return {r,total:total/asked.length,missing,reasons};
 }).filter(a=>asked.every(d=>!Number.isFinite(a.r[d.key])||Math.abs(a.r[d.key]-query[d.key])<=d.scale+1e-8)).sort((a,b)=>a.total-b.total||a.missing-b.missing);
}
function tests(){
 const mats=[{id:'sibal',nombre:'SIBAL fabric'},...data.materiales,...data.habitat_lunar_8_2_psi.materiales];
 view.innerHTML=title('Similar tests','Start with the gravity environment, then select a material and test conditions. Leave airflow or pressure blank to compare all reported values.')+`<div class="controls"><label>Gravity<select id="gravity">${[['0','Microgravity'],['0.16','Moon'],['0.38','Mars'],['1','Earth']].map(([v,s])=>option(v,s,searchState.gravity)).join('')}</select></label><label>Material<select id="mat">${mats.map(m=>option(m.id,name(m),searchState.mat)).join('')}</select></label><label>Oxygen (%)<input required id="oxygen" type="number" min="0" max="100" step="any"></label><label>Airflow (cm/s)<input id="flow" type="number" min="0" step="any" placeholder="Any"></label><label>Pressure (kPa)<input id="pressure" type="number" min="0.01" step="any" placeholder="Any"></label></div><div class="actions"><button id="sibal">ISS fabric example</button><button id="habitat">Lunar habitat scenario</button></div><div id="results" aria-live="polite"></div><details class="notice"><summary>How tests are ranked</summary><p>Material and gravity must match. Each requested variable has equal weight. Distance is the mean absolute difference divided by its comparison scale: oxygen 2 percentage points, airflow 10 cm/s, gravity 0.16 g, pressure 5 kPa. A known difference beyond its scale excludes the record; a missing requested value adds one unit of distance and prevents an exact match. These are search settings, not physical limits.</p></details>`;
 const step=document.createElement('section');
 step.className='notice';
 luciPanel(step,searchState.mat);
 view.querySelector('#results').before(step);
 function refresh(){
 const results=view.querySelector('#results');
 const fields=['oxygen','flow','pressure'];
 if(fields.some(k=>!view.querySelector('#'+k).validity.valid)){
 results.innerHTML='<p class="notice">Enter valid conditions. Oxygen must be between 0 and 100%.</p>';return;}
 const query={mat:searchState.mat,g:Number(searchState.gravity)};
 for(const key of fields)query[key]=searchState[key]===''?null:Number(searchState[key]);
 const all=compareRecords(query);
 const exact=all.filter(a=>a.total===0);
 const matches=exact.length?exact:all;
 if(!matches.length){
 results.innerHTML=`<div class="notice"><h3>No matching test in the data we reviewed</h3><p>The loaded records do not document a comparable trial for this query. FM2 is designed to study combustion in lunar gravity.</p><a href="#fm2">View FM2 comparison plan</a> · <a href="#simulation">Explore illustrative heat transport</a></div>`;return;}
 results.innerHTML=`<section class="result"><h3>${exact.length?'Exact match for the conditions entered':'Similar tests, ranked by distance'}</h3><p class="muted">Only the conditions you entered are compared. Each result describes its own experiment.</p></section>`+
 (query.mat==='sibal'?'<p class="notice">The T23 and T24 samples were reused. Their outcomes do not establish an ignition threshold between the two oxygen levels.</p>':'')+
 matches.map(({r,reasons,total})=>`<article class="card result"><span class="tag">${escape(r.level)}</span><h3>${escape(r.id)} · ${escape(r.result)}</h3><p>${escape(reasons.join(' · '))}</p><small>Normalized distance ${total.toFixed(3)}</small><br>${source(r.source)}</article>`).join('');
 const host=document.createElement('section');results.querySelector('.result').after(host);
 evidenceGuide(host,matches,query);
 }
 for(const key of ['mat','oxygen','flow','gravity','pressure']){
 const input=view.querySelector('#'+key);input.value=searchState[key];
 input.oninput=()=>{searchState[key]=input.value;refresh();};
 }
 function preset(values){Object.assign(searchState,values);tests();}
 view.querySelector('#sibal').onclick=()=>preset({mat:'sibal',oxygen:'18',flow:'10',gravity:'0',pressure:''});
 view.querySelector('#habitat').onclick=()=>preset({mat:'sibal',oxygen:'34',flow:'',gravity:'0.16',pressure:'56.5'});
 refresh();
}
function fm2(){
 view.innerHTML=title('Before FM2','Flammability of Materials on the Moon will offer a way to compare ground-based evidence with sustained lunar gravity.')+`<article class="card"><span class="tag">Awaiting research release</span><h3>Pre-experiment prediction</h3><p>The current evidence release contains no dated team prediction. The research team will publish its material, expected direction and comparison rule before evaluating the mission results.</p><p>To compare results, record the sample, thickness, oxygen, pressure, ventilation, test duration and definition of the measured limit. If conditions differ, document the differences before interpreting the outcome.</p><a href="https://ntrs.nasa.gov/citations/20260000646" target="_blank" rel="noopener">FM2 experiment description · Ferkul et al., LPSC 2026 ↗</a></article>`;
}
async function simulation(){
 const scenario=searchState;
 const flow=scenario.flow===''?10:Number(scenario.flow), pressure=scenario.pressure===''?101.3:Number(scenario.pressure);
 const within=flow>=0&&flow<=30&&pressure>=50&&pressure<=105;
 const controls=[
 ['flow','Ventilation','cm/s','range',0,30,.1],
 ['pressure','Ambient pressure','kPa','range',50,105,.1],
 ['source','Heat source','K','range',300,320,1]
 ];
 view.innerHTML=title('Ventilation & heat transport','Change the atmosphere and ventilation to compare how a warm plume moves through a model chamber.')+
 `<div class="grid"><article class="card"><span class="tag">SIMULATION — illustrative</span><canvas class="sim" width="640" height="320" aria-label="Relative temperature and velocity arrows in a two-dimensional chamber"></canvas><div class="scale"></div><div class="mast" style="width:100%;height:auto"><small>Ambient · 295 K</small><small>Heat source</small></div><p id="elapsed" class="muted"></p></article><aside class="card"><h3>Scenario controls</h3><label class="field">Gravity <span data-value="gravity" hidden></span><select id="gravity">${[['0','Microgravity'],['0.16','Moon'],['0.38','Mars'],['1','Earth']].map(([v,s])=>option(v,s,scenario.gravity)).join('')}</select></label>${controls.map(([k,label,unit,type,min,max,step])=>`<label class="field">${label} (<span style="display:contents"><output data-value="${k}"></output> ${unit}</span>)<input id="${k}" type="${type}" min="${min}" max="${max}" step="${step}"></label>`).join('')}<div class="actions"><button id="pause">Pause</button><button id="restart">Restart</button></div></aside></div><section class="notice"><h3>What the engineer can compare</h3><p>Arrows show computed air velocity; color shows temperature relative to the fixed source. The centroid tracks the center of excess heat, measured from the lower-left corner. Changing a control restarts the calculation for a like-for-like comparison at the same model time.</p><p>${!within?'The selected evidence query exceeds the model range; controls start at the nearest supported values. ':''}${scenario.flow===''?'Airflow unspecified in search; initial model setting is 10 cm/s. ':''}${scenario.pressure===''?'Pressure unspecified in search; initial model setting is 101.3 kPa. ':''}Oxygen and material remain evidence-search conditions: this model has no chemistry or ignition outcome. <a href="#tests">Return to measured tests</a>.</p></section><details class="notice"><summary>Equations, boundary conditions and limits</summary><p>2D incompressible momentum and temperature equations with a Boussinesq buoyancy term. A staggered grid and pressure projection enforce continuity approximately. A prescribed left inlet feeds a right pressure outlet. Top and bottom walls are stationary and held at 295 K. The model imposes a fixed-temperature heated patch. The chamber is 32 × 16 cm with 0.5 cm cells.</p><p>Assumed air properties at 101.325 kPa: kinematic viscosity 1.55 × 10⁻⁵ m²/s and thermal diffusivity 2.2 × 10⁻⁵ m²/s. Both scale inversely with ambient pressure. Model coefficients are illustrative engineering assumptions. The pressure control changes these properties; the pressure solver separately balances the velocity field. No radiation, turbulence model, flame chemistry or validation against habitat measurements.</p></details>`;
 const {startHeat}=await import('./heat.js');
 if(location.hash==='#simulation')stop=startHeat(view,{gravity:Number(scenario.gravity),flow:Math.max(0,Math.min(30,flow)),pressure:Math.max(50,Math.min(105,pressure)),source:315});
}

const routes={gravity,materials:cards,tests,fm2,simulation};
function render(){
 stop();stop=()=>{};
 const route=location.hash.slice(1);
 const active=Object.hasOwn(routes,route)?route:'gravity';
 document.querySelectorAll('nav a').forEach(a=>{
 if(a.hash==='#'+active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
 });
 routes[active]();
}
async function start(){
 try{
 const response=await fetch(new URL('../data/curva_gravedad.json',import.meta.url),{cache:'no-cache'});
 if(!response.ok)throw Error('Unavailable evidence');
 data=await response.json();
 render();window.addEventListener('hashchange',()=>{render();view.focus({preventScroll:true});});
 }catch{view.innerHTML='<p role="alert">The evidence could not be loaded. Refresh to try again.</p>';}
}
start();
