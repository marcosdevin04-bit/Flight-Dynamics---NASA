// "Method" view: how the dashboard works, how it was checked, its limits and how AI was used.
// Static text; every number here comes from the repository (catalogue counts, tests, audits).
export function methodPanel(host){
 host.innerHTML=`
<p class="eyebrow">Method</p>
<h2>How this dashboard works</h2>
<p class="lead">One question drives every screen: what do NASA’s combustion experiments say about a material in lunar gravity, and where does the evidence stop?</p>

<div class="method-grid">
<article class="card">
<h3>1 · The evidence</h3>
<p>A catalogue of <b>229 records</b> (206 ranked; the rest are duplicates kept for citation). Every value keeps its unit, conditions, source and page. Missing values say “not reported”, never zero.</p>
<ul>
<li><b>NASA Physical Sciences Informatics (PSI):</b> experimental tables of BASS, BASS-II and Saffire I–III, each cited by DOI. 159 rows match the materials on our gravity curve.</li>
<li><b>NASA Technical Reports Server:</b> partial-gravity flammability limits (Olson &amp; Ferkul 2012, Table I), lunar-gravity tests at habitat pressure (Urban et al., ICES-2025-392), the BASS-II summary report, the LUCI rotating-rocket results (2025) and the FM2 posters (2024, 2025).</li>
</ul>
</article>

<article class="card">
<h3>2 · How an answer is made</h3>
<ol>
<li><b>Read the question.</b> An AI model extracts the material, oxygen, airflow and pressure. Each value must appear word for word in the question, or it is discarded.</li>
<li><b>Rank the tests in code.</b> Records are ordered by how close their conditions are to the question, with published weights. The order means similarity, not fire risk.</li>
<li><b>Explain.</b> The AI writes two or three sentences using only the retrieved records, citing a record ID in every sentence.</li>
<li><b>Check before showing.</b> Code verifies every cited ID and every number against the records. If the check fails twice, the dashboard shows a verified template instead.</li>
</ol>
</article>

<article class="card">
<h3>3 · How we checked it</h3>
<ul>
<li><b>199 automated tests</b> cover parsing, ranking, citation checks and the answer flow.</li>
<li>All <b>24 oxygen limits</b> on the gravity curve match Table I of Olson &amp; Ferkul (2012).</li>
<li>Every LUCI value was checked slide by slide against the NASA presentation.</li>
<li>PSI tables were downloaded from NASA and their file sizes matched what PSI reports.</li>
</ul>
</article>

<article class="card">
<h3>4 · What the evidence cannot tell you</h3>
<ul>
<li>No material has burned in real lunar gravity yet. Partial-gravity data come from 5-second drop-tower centrifuges and one rotating sounding rocket.</li>
<li>Pass/fail criteria differ: a 5.18-second burn in reduced gravity versus a 15.2 cm burn length in NASA’s Earth test.</li>
<li>Microgravity limits used 30 cm/s forced airflow, and the gravity-curve tests ran at 70.3 or 101.3 kPa, not the planned 56.5 kPa cabin.</li>
<li>Our FM2 predictions are inferences, registered so they can be proven wrong. Nothing here certifies a material.</li>
</ul>
</article>
</div>

<article class="card method-ai">
<h3>Use of AI (super intelligence)</h3>
<p><b>The idea is ours:</b> putting gravity at the center, and designing for the engineer who chooses habitat materials and ventilation, came from the team. AI helped us research, check and build it.</p>
<p><b>Inside the dashboard:</b> Anthropic’s Claude Haiku reads questions and drafts explanations; code ranks the records and verifies every citation and number.</p>
<p><b>While building it:</b> Claude Science extracted data from NASA documents; Claude Code cross-checked it against the original PDFs and tables, and helped build the data pipeline and the interface. OpenAI Codex supported implementation, and ChatGPT and Grok were used to review the app. The logo is an AI-generated image (Google Gemini). The team reviewed the outputs, and every number in the app is checked against its NASA source.</p>
</article>

<p class="method-links"><a href="https://github.com/marcosdevin04-bit/Flight-Dynamics---NASA" target="_blank" rel="noopener">Source code and data ↗</a> · <a href="./PREDICTION.md" target="_blank" rel="noopener">Registered FM2 prediction ↗</a> · <a href="./data/curva_gravedad.json" target="_blank" rel="noopener">Gravity-curve data (JSON) ↗</a></p>`;
}
