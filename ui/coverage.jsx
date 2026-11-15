import React from 'react';
import {createRoot} from 'react-dom/client';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip} from 'recharts';

function Coverage({dataset}) {
  const sources=new Map(dataset._meta.sources.map(s=>[s.psi,s]));
  const rows=Object.values(dataset.coverage);
  const plotted=rows.filter(r=>r.microgravity_tests_in_psi>0).map(r=>({
    material:r.label.split(' (')[0],tests:r.microgravity_tests_in_psi
  }));
  return <article className="card">
    <h3>PSI coverage by material</h3>
    <p>Counts refer to microgravity entries in the reviewed PSI tables. Mixed specimens can occur in more than one material group.</p>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart layout="vertical" data={plotted} margin={{right:25}}>
        <XAxis type="number" allowDecimals={false}/><YAxis type="category" dataKey="material" width={110}/>
        <Tooltip cursor={false}/><Bar dataKey="tests" name="Flight tests" fill="#257560" isAnimationActive={false}/>
      </BarChart>
    </ResponsiveContainer>
    <div className="table-wrap"><table><thead><tr><th>Material</th><th>Flight tests</th><th>Numeric initial O₂</th><th>Investigations</th></tr></thead>
    <tbody>{rows.map(r=><tr key={r.label}><th>{r.label}</th><td>{r.microgravity_tests_in_psi}</td>
      <td>{r.o2_initial_min_pct==null?'Not reported':r.o2_initial_min_pct+'–'+r.o2_initial_max_pct+'%'}</td>
      <td>{r.investigations.length?r.investigations.map(id=><a key={id} href={'https://doi.org/'+sources.get(id).doi}>{id} </a>):'Not found in the PSI tables we reviewed'}</td></tr>)}</tbody></table></div>
    <p>Numeric ranges use reported initial oxygen. The Saffire tables also describe some oxygen conditions in text.</p>
    <details><summary>Sample identification and notes</summary><ul>{rows.filter(r=>r.note).map(r=><li key={r.label}>{r.label} — {r.note}</li>)}</ul></details>
  </article>;
}
export function mountCoverage(host,dataset) {
  const root=createRoot(host);root.render(<Coverage dataset={dataset}/>);return ()=>root.unmount();
}
