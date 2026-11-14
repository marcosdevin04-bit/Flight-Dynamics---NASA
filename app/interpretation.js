const expectedDemo = [
 ['GMT190-T24',18.2,'Reused sample; one-sided flame'],
 ['GMT190-T23',17.2,'Reused sample; did not ignite']
];
function citedDemo(records,query){
 if(query.mat!=='sibal'||query.g!==0||query.oxygen!==18||query.flow!==10||query.pressure!==null)return false;
 return expectedDemo.every(([id,o2,outcome])=>records.some(r=>
 r.id===id && r.oxygen===o2 && r.flow===10 && r.g===0 && r.result===outcome &&
 r.source?.ntrs==='https://ntrs.nasa.gov/citations/20210011385' && r.source.ubicacion?.includes('7.1')));
}
export function evidenceGuide(host,matches,query){
 const records=matches.map(x=>x.r);
 const head=document.createElement('h3'), label=document.createElement('p'), body=document.createElement('div'),button=document.createElement('button');
 head.textContent='Evidence interpretation';label.className='eyebrow';
 host.className='notice';host.append(label,head,body,button);
 function show(items,mode){
 label.textContent=mode;body.replaceChildren();
 for(const {r,claim} of items){
 const p=document.createElement('p');p.append(claim+' ');
 const a=document.createElement('a');a.textContent=r.id+' · '+r.source.ubicacion.replace('Tabla','Table').replace('advertencia en','note on');
 a.href=r.source.ntrs;a.target='_blank';a.rel='noopener';p.append(a);body.append(p);
 }
 }
 const fact=r=>`${r.result} at ${r.oxygen}% oxygen.`;
 if(citedDemo(records,query)){
 const [higher,lower]=expectedDemo.map(([id])=>records.find(r=>r.id===id));
 show([{r:lower,claim:'At the same airflow as your query, the reused fabric did not ignite at 17.2% oxygen.'},
 {r:higher,claim:'At 18.2%, the reused fabric showed a flame on one side. The two trials bracket your 18% query, but neither measured its outcome. They do not establish an ignition threshold.'}],'AI interpretation · cached demo (Codex)');
 }else{
 show(records.slice(0,2).map(r=>({r,claim:fact(r)})),'Measured observations · automatic comparison');
 }
 button.textContent='Interpret with on-device AI';button.style.marginTop='.7rem';
 const status=document.createElement('p');status.setAttribute('role','status');host.append(status);
 button.onclick=async()=>{
 let session;button.disabled=true;
 try{
 const api=globalThis.LanguageModel;
 if(!api || await api.availability()!=='available'){status.textContent='A ready on-device language model is unavailable in this browser. The cited comparison above remains available.';return;}
 status.textContent='Comparing the loaded observations…';
 session=await api.create();
 // The model may prioritize measured claims, but cannot introduce free-form scientific claims.
 const candidates=matches.slice(0,6).map(({r,reasons})=>({id:r.id,result:r.result,conditions:reasons}));
 const prompt='For this engineering query, choose up to two complementary observation IDs to explain. Favor outcomes with evidence on both sides of the query where possible. Return only a JSON array of IDs. Query and available observations: '+JSON.stringify({query,candidates});
 const selected=JSON.parse(await session.prompt(prompt));
 if(!Array.isArray(selected)||selected.length<1||selected.length>2||new Set(selected).size!==selected.length||selected.some(id=>!candidates.some(c=>c.id===id)))throw Error('Unknown citation');
 if(!host.isConnected)return;
 const summaries=selected.map(id=>{
 const {r,reasons}=matches.find(x=>x.r.id===id);
 return {r,claim:`${fact(r)} Compared with your query: ${reasons.join('; ')}.`};
 });
 show(summaries,'On-device AI · evidence selected by the model');
 status.textContent='Citations and displayed values checked against the loaded records.';
 }catch{status.textContent='The model response could not be verified. The original evidence comparison is still shown.';}
 finally{session?.destroy();button.disabled=false;}
 };
}
