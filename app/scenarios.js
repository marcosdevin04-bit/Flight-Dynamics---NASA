// The catalogue identifies samples. Source shapes are illustrative, not kinetic constants.
export function shapeFor(id){
 if(id==='pmma')return 'rod';
 return 'sheet';
}
export const shapes={sheet:'Sheet / coupon',rod:'Rod / narrow source',pool:'Pool / surface patch'};
export const atmospheres=[['custom','Custom O₂ level'],['0','Inert atmosphere · 0% O₂'],['21','Air-like · 21% O₂'],['34','Oxygen-enriched · 34% O₂']];
export function atmosphereControl(select,input,update){
 const sync=()=>{select.value=atmospheres.some(([v])=>v!=='custom'&&+v===+input.value)?String(+input.value):'custom';};
 select.replaceChildren(...atmospheres.map(([v,label])=>new Option(label,v)));sync();
 select.onchange=()=>{if(select.value==='custom'){input.focus();return;}input.value=select.value;update();sync();};
 input.addEventListener('input',sync);
}

