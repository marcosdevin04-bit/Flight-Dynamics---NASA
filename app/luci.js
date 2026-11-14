export function luciPanel(host,material){
 const heading=document.createElement('h3'),description=document.createElement('p');
 heading.textContent='LUCI · flight and ground observations';
 description.textContent='Compare the same material in the LUCI flight and Earth experiments. BASS-II used a different setup. These runs measure flame spread and do not establish a minimum oxygen limit.';
 host.replaceChildren(heading,description);
 const button=document.createElement('button');button.textContent='Compare LUCI flight and Earth';
 host.append(button);
 const body=document.createElement('div');host.append(body);
 button.onclick=async()=>{
 if(!body.hidden&&body.childElementCount){body.hidden=true;button.ariaExpanded='false';return;}
 body.hidden=false;button.ariaExpanded='true';
 try{
 const response=await fetch(new URL('../data/luci.json',import.meta.url),{cache:'no-cache'});
 if(!response.ok)throw Error('Unavailable');
 const d=await response.json();
 const controls=document.createElement('div');controls.className='actions';
 const grid=document.createElement('div');grid.className='grid';grid.style.marginTop='1rem';
 function item(el,tag,value){const n=document.createElement(tag);n.textContent=value;el.append(n);return n;}
 function select(mat){
 for(const b of controls.children)b.setAttribute('aria-pressed',String(b.textContent===mat));
 grid.replaceChildren();
 for(const r of d.records.filter(r=>r.material===mat)){
 const card=document.createElement('article');card.className='card';
 item(card,'small',r.kind).className='tag';item(card,'h3',r.platform);
 const values=document.createElement('dl');values.className='details';card.append(values);
 const add=(label,value)=>{item(values,'dt',label);item(values,'dd',value);};
 add('Gravity',`${r.gravity_g} g · ${r.gravity_basis}`);
 add('Duration',r.duration);
 const o=r.oxygen;
 const readings=[o.initial_pct===null?'Initial: not reported':`Initial: ≈${o.initial_pct}%`];
 if(o.start_of_decline_pct!=null)readings.push(`start of decline: ${o.start_of_decline_pct}%`);
 if(o.minimum_pct!=null)readings.push(`minimum: ${o.minimum_pct}%`);
 readings.push(`last reported: ≈${o.final_pct}%`);
 add('Oxygen by volume',readings.join(' · ')+'. '+o.note);
 add('Pressure',`${r.pressure_kPa}. ${r.pressure_note}`);
 add('Observed outcome',r.result);
 const rates=r.rates_mm_s;
 add('Flame motion',`Tip: ${rates.tip} mm/s. ${rates.base===null?'':'Base: '+rates.base+' mm/s. '}${rates.note}`);
 item(card,'small',r.source.citation);
 const links=document.createElement('p');
 for(const page of r.source.slides){const a=item(links,'a',`Slide ${page}`);a.href=r.source.pdf+'#page='+page;a.target='_blank';a.rel='noopener';links.append(' ');}
 card.append(links);grid.append(card);
 }}
 for(const mat of new Set(d.records.map(r=>r.material))){const b=item(controls,'button',mat);b.onclick=()=>select(mat);}
 const notes=document.createElement('section');notes.className='notice';item(notes,'h3','Limits of this comparison');
 const list=document.createElement('ul');for(const warning of d.warnings)item(list,'li',warning);notes.append(list);
 body.replaceChildren(notes,controls,grid);select(material==='pmma'?'PMMA rod':'SIBAL fabric');
 }catch{body.textContent='The LUCI records could not be loaded. Try again.';button.ariaExpanded='false';}
 };
 button.ariaExpanded='false';
}
