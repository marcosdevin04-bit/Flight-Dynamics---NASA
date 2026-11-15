import {esc} from './research.js';
const examples=[['Mylar · lunar limit','mylar-g',15.6,0,70.3],['SIBAL · similar tests','sibal',18,10,null],['Habitat · evidence gap','mylar-g',34,0,56.5]];
const numeric=x=>x===''||x==null?null:Number(x);
const link=(s)=>{const url=s.psi||s.ntrs;return url&&/^https:\/\/(doi\.org|psi\.nasa\.gov|ntrs\.nasa\.gov)\//.test(url)?'<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(s.cita)+' ↗</a>':esc(s.cita);};
function resultCard(r,i){return '<details class="card" '+(i===0?'open':'')+'><summary><strong>'+esc(r.material)+'</strong> · '+esc(r.regime)+' · '+esc(r.id)+'</summary><p>'+esc(r.outcome)+'</p><p><b>Reported conditions:</b> '+esc(r.display.gravity)+' · O₂ '+esc(r.display.o2)+' · pressure '+esc(r.display.pressure)+' · flow '+esc(r.display.flow)+'</p><p>'+esc(r.level)+' · '+link(r.source)+' · '+esc(r.source.ubicacion)+'</p>'+(r.not_compared.length?'<p>Requested fields unavailable: '+esc(r.not_compared.join(', '))+'.</p>':'')+'<ul>'+r.warnings.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></details>';}
export function askPanel(host,materials,state,luci){
 host.innerHTML='<p class="eyebrow">Evidence desk / lunar habitat · 0.16 g</p><h2>Ask the evidence</h2><p class="lead">Describe one material and a lunar cabin atmosphere. Compare the closest measurements, see what differs, and follow each answer to its source.</p><div class="grid"><form class="card" id="params"><h3>Set your conditions</h3><label class="field">Material<select name="material"></select></label>'+[['oxygen','Oxygen (%)',100],['flow','Forced airflow (cm/s)',1000],['pressure','Pressure (kPa)',2000]].map(([n,l,max])=>'<label class="field">'+l+'<input name="'+n+'" type="number" min="'+(n==='pressure'?'.01':'0')+'" max="'+max+'" step="any" placeholder="Unspecified"></label>').join('')+'<button type="submit">Find tests</button></form><div class="card"><form id="question"><h3>Ask in your own words</h3><label class="field">Lunar scenario<input required name="q" maxlength="650" placeholder="Mylar at 34% O₂, 8.2 psi, no forced flow"></label><button>Ask</button></form><p class="eyebrow">Try a documented example</p><div class="actions" id="presets"></div></div></div><section id="answer" aria-live="polite"></section>';
 const $=sel=>host.querySelector(sel),form=$('#params'),box=$('#answer'),sel=form.elements.material;
 sel.replaceChildren(...materials.map(m=>new Option(m.label,m.id)));let seq=0,disposed=false;
 const sync=()=>{sel.value=state.mat;for(const k of ['oxygen','flow','pressure'])form.elements[k].value=state[k]??'';};
 const labels={'mylar-g':'Mylar','ultem-1000':'Ultem 1000','nomex-ht90-40':'Nomex HT90-40','pmma':'PMMA','sibal':'SIBAL','p213':'P-213 tape','policarbonato':'polycarbonate','remera-algodon':'cotton T-shirt','nomex-velcro':'Nomex Velcro'};
 async function submit(question){
 const id=++seq;box.textContent='Retrieving cited experiments…';
 const scenario={material:labels[sel.value]||sel.selectedOptions[0].text,o2_pct:numeric(form.elements.oxygen.value),flow_cm_s:numeric(form.elements.flow.value),pressure_kPa:numeric(form.elements.pressure.value)};
 if(!question)Object.assign(state,{mat:sel.value,oxygen:form.elements.oxygen.value,flow:form.elements.flow.value,pressure:form.elements.pressure.value,gravity:'.16'});
 try{
 let a,offline=false;
 try{const r=await fetch('/api/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(question?{question}:{scenario}),signal:AbortSignal.timeout(10000)});if(r.status===400){const d=await r.json();throw Object.assign(new Error(d.error),{input:true});}if(!r.ok)throw Error();a=await r.json();if(!Array.isArray(a.results))throw Error();}
 catch(e){if(e.input)throw e;if(question)throw Error('The live service is unavailable. Choose a saved example or try again.');
 const d=await fetch('./data/demo-cache.json').then(r=>r.json());a=d.find(x=>x.scenario.material===scenario.material&&['o2_pct','flow_cm_s','pressure_kPa'].every(k=>x.scenario[k]===scenario[k]));if(!a)throw Error('No saved answer for these conditions. Try one of the three examples or reconnect.');offline=true;}
 if(disposed||seq!==id)return;
 const q=a.scenario;
 if(question){const m=Object.entries(labels).find(([k,v])=>v.toLowerCase()===String(q.material).toLowerCase()||k===q.material_key);if(m){Object.assign(state,{mat:m[0],gravity:'.16',oxygen:q.o2_pct??'',flow:q.flow_cm_s??'',pressure:q.pressure_kPa??''});sync();}}
 box.innerHTML='<article class="notice"><p class="eyebrow">'+esc(offline?'Offline · saved response':a.mode)+'</p><h3>'+esc(a.case===3?a.explanation:a.case===1?'Matching test conditions':'Similar tests · conditions differ')+'</h3><p>Lunar query: '+esc(q.material)+' · O₂ '+esc(q.o2_pct??'unspecified')+' · flow '+esc(q.flow_cm_s??'unspecified')+' cm/s · pressure '+esc(q.pressure_kPa??'unspecified')+' kPa.</p>'+(a.case===3?'<p>'+esc(a.fm2_note)+'</p><a href="#fm2">See the registered FM2 predictions →</a>':'<p>'+esc(a.explanation)+'</p>')+'</article>'+(a.results.length?'<p class="muted">Ranked source records may describe the same burn. The order reflects similarity of conditions, not likelihood of ignition.</p>':'')+a.results.map(resultCard).join('')+(a.case!==3&&q.material_key==='sibal'?'<div id="luci-detail" class="notice"></div>':'')+'<p><a href="#psi">Explore PSI coverage</a> · <a href="#simulation">Open the illustrative chamber</a></p>';
 if($('#luci-detail'))luci($('#luci-detail'),'sibal');
 }catch(e){if(!disposed&&seq===id)box.textContent=e.message||'Evidence could not be retrieved.';}
 }
 examples.forEach(([label,mat,o,f,p])=>{const b=document.createElement('button');b.textContent=label;b.onclick=()=>{Object.assign(state,{mat,oxygen:o,flow:f,pressure:p??''});sync();submit();};$('#presets').append(b);});
 form.onsubmit=e=>{e.preventDefault();submit();};$('#question').onsubmit=e=>{e.preventDefault();submit(e.target.elements.q.value);};sync();submit();return ()=>{disposed=true;};
}
