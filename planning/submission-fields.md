# Campos de la entrega (listos para pegar)

Fuente del formato: guía del participante de Space Uruguay, diapositiva 19. Todo va en inglés, en la pestaña "Project" > "Edit". Lo que está entre corchetes `[PENDIENTE: …]` hay que completarlo antes de enviar. Antes de pegar, comparar con `docs/product/submission-draft.md` (borrador de Facundo); este archivo lo amplía con lo que pide la guía: beneficios, herramientas, referencias completas y uso de IA completo.

---

## 1. Project Name

Before the First Fire on the Moon

---

## 2. High-Level Project Summary

Before the First Fire on the Moon is an evidence dashboard for the engineer who chooses materials and ventilation for a lunar habitat. Enter a material, oxygen level, airflow and pressure: the app ranks NASA fire tests by how close their conditions are to the lunar scenario, explains what transfers to the Moon and what does not, and says plainly when there is no matching test in the data we reviewed. It combines 159 rows from five NASA PSI experimental tables (BASS, BASS-II, Saffire-I, -II and -III) with the few partial-gravity tests published on NTRS. Those data show that the effect of gravity depends on the material and the pressure. In one drop-tower table, Mylar film burned under lunar-equivalent gravity at 15.6% oxygen, below its microgravity (17.0%) and Earth (21.2%) limits, in short drop-tower tests. Every number links to its source, and a dated prediction waits for NASA's FM2 experiment, planned to run the first fire tests on the Moon.

---

## 3. Link to Project Demo

[PENDIENTE: confirmar si el video del equipo https://youtu.be/en18xWde9hE, que YouTube identifica como «prueba», es el definitivo y revisar su duración y subtítulos en inglés.]

---

## 4. Link to Final Project

https://flight-dynamics-mu.vercel.app

https://github.com/marcosdevin04-bit/Flight-Dynamics---NASA

---

## 5. Detailed Project Description

**The problem.** NASA screens materials for crewed spacecraft with a flammability test run in Earth gravity (NASA-STD-6001B, Test 1). Gravity changes how a flame gets its oxygen, and a lunar habitat is planned with more oxygen and lower pressure than the Space Station. NASA's challenge notes that there is no partial-gravity combustion data in PSI yet. Until NASA's FM2 experiment burns materials on the Moon, engineers have to design with the evidence that already exists, spread across experimental tables, reports and posters.

**What it does.** The dashboard answers one question: "For this material, oxygen level, airflow and pressure, what did NASA observe, and what changes on the Moon?"
- **Ask the evidence.** Enter a scenario in plain English or with fields. The app returns one of three outcomes: a test with the same conditions, the closest similar tests ranked by distance, or "No matching test in the data we reviewed", with a note on FM2. Each test shows its gravity (1 g, microgravity, or partial gravity with the platform), its conditions, its outcome, its evidence level and its source.
- **Gravity curve.** Burn and extinction oxygen limits for Mylar, Ultem and Nomex at 0 g, lunar, Martian and Earth gravity (Olson & Ferkul 2012, Table I). For all three materials, the lunar limit falls below both the microgravity and the Earth limits, so in this table microgravity and 1 g do not bracket the Moon.
- **Materials.** At the planned habitat pressure (8.2 psi), PMMA, P-213 tape and a cotton T-shirt were more flammable in lunar gravity than the 1 g extrapolation, while polycarbonate and Nomex Velcro were less flammable (Urban et al. 2025). Nomex HT90-40 changes direction with pressure.
- **NASA flight tests.** Coverage of the PSI experimental tables of BASS, BASS-II and Saffire-I to -III: which materials, oxygen levels and flows were flown, next to their 1 g comparisons.
- **FM2 prediction.** Our expectations for FM2, registered on 2026-11-14 before any FM2 result, with what would confirm or refute each one.
- **3D chamber.** An illustrative simulation of flow and heat around a generic fuel in two gravities, labeled "SIMULATION — illustrative". It is not used for any result.
- **Method.** How the evidence was built, how answers are checked, the limits, and how AI was used.

**How it works.**
1. **Evidence base.** Records from NASA PSI tables and NTRS reports are normalized to one contract (material, thickness, gravity, oxygen, pressure, flow, outcome, source with page or table row, evidence level). A value the source does not state is shown as "not reported", never as 0. Rows reproduced from a source we did not open are labeled secondary.
2. **Ranking (code, no AI).** The scenario's gravity is fixed on the Moon. Each record gets a normalized distance in gravity, oxygen, flow, pressure and material, with weights shown in the interface. It is closeness of test conditions, not a risk score. Evidence from 1 g alone never counts as similar to the Moon.
3. **Explanation (AI, restricted).** A language model reads the question and returns only words copied from it; numbers are extracted by code. A second call explains only the records that were retrieved.
4. **Verification (code).** Every cited record ID must be among the retrieved records, and every number in a cited sentence must appear in that record. Approval words are rejected. If the check fails, the model gets one retry; after that, the app answers with a template written from the records, without AI. Demo answers are cached so the demo works without the API.

**Benefits.**
- An engineer sees, for one material and atmosphere, what was actually tested, in which gravity, and with which caveats, in one place and with the source one click away.
- It makes evidence gaps explicit instead of hiding them, which is where FM2 and future PSI datasets matter most.
- Microgravity, partial-gravity and Earth results are never mixed up: each test carries its gravity label.
- It is reusable: new PSI tables in the same record format can be added without code changes.

**Validation and limits.**
- An independent transcription of Olson & Ferkul Table I matched all 12 material/gravity rows and all 24 oxygen-limit values in our data.
- 199 automated tests cover data traceability (every parsed number appears in its source cell), the ranking cases, the citation verifier and a 14-scenario golden set.
- The reduced-gravity limits come from 5-second drops; the Earth limits use the Test 1 burn-length criterion; the microgravity limits in that table used 30 cm/s forced flow. These criteria differ.
- The lunar and microgravity values of Table I are reproduced from Ferkul & Olson 2011, which we did not read, so they are labeled secondary.
- No partial-gravity test at the planned habitat atmosphere (34% oxygen, 8.2 psi) exists in the data we reviewed.

**Tools used.** TypeScript, React, Recharts, Vite, esbuild, zod, csv-parse, Vitest, Node.js; deployed on Vercel; code on GitHub; Anthropic API (Claude Haiku) for the restricted question reading and explanations.

---

## 6. NASA & Space Agency Partner Data

**NASA Physical Sciences Informatics (PSI)**, experimental tables downloaded on 2026-11-14. We use 159 rows, each tied to its PSI file and row:
- BASS-II, PSI-25 — https://doi.org/10.60555/4qc4-de67 (125 rows)
- BASS, PSI-26 — https://doi.org/10.60555/58h4-dy80 (20 rows)
- Saffire-I, PSI-98 — https://doi.org/10.60555/0t15-1z43 (2 rows)
- Saffire-II, PSI-99 — https://doi.org/10.60555/2chp-m469 (10 rows)
- Saffire-III, PSI-100 — https://doi.org/10.60555/040q-4h36 (2 rows)

They are the microgravity flight evidence and its 1 g ground comparisons in Ask the evidence and in the NASA flight tests view.

**NASA Technical Reports Server (NTRS)**, for the partial-gravity tests that PSI does not hold yet:
- Olson & Ferkul 2012, oxygen limits at 0 g, lunar, Martian and 1 g (Table I, p. 6) — https://ntrs.nasa.gov/citations/20130010991
- Urban et al. 2025, lunar-gravity centrifuge tests at 8.2 psi (ICES-2025-392) — https://ntrs.nasa.gov/citations/20250002114
- Ferkul et al. 2025, LUCI rotating sounding rocket — https://ntrs.nasa.gov/citations/20250010653
- Schechter et al. 2025, Nomex poster for FM2 — https://ntrs.nasa.gov/citations/20250010975
- Zayac et al. 2024, FM2 poster — https://ntrs.nasa.gov/citations/20240015307
- Olson et al. 2021, BASS-II summary report (NASA/TM-20210011385) — https://ntrs.nasa.gov/citations/20210011385
- Saffire-I and Saffire VI results — https://ntrs.nasa.gov/citations/20170008805 · https://ntrs.nasa.gov/citations/20240002981
- Sacksteder et al. 2003 and Feier et al. 2001, parabolic-flight spread in partial gravity — https://ntrs.nasa.gov/citations/20040053567 · https://ntrs.nasa.gov/citations/20010059376

**NASA media:** Saffire-VI video, NASA Image and Video Library (used in the home page).

No partner-agency data was used.

---

## 7. References

**Data and papers**
- PSI experimental tables: BASS-II (doi:10.60555/4qc4-de67), BASS (doi:10.60555/58h4-dy80), Saffire-I (doi:10.60555/0t15-1z43), Saffire-II (doi:10.60555/2chp-m469), Saffire-III (doi:10.60555/040q-4h36). https://psi.nasa.gov
- Olson, S. L. & Ferkul, P. V. (2012). Evaluating Material Flammability in Microgravity and Martian Gravity Compared to the NASA Standard Normal Gravity Test. AIAA 2012-3492. NTRS 20130010991.
- Ferkul, P. V. & Olson, S. L. (2011). J. Thermophysics and Heat Transfer 25(3): 457–461 (values used as reproduced in Olson & Ferkul 2012; not read).
- Urban, D. L. et al. (2025). Solid Fuel Ignition Testing for Lunar Applications. ICES-2025-392. NTRS 20250002114.
- Ferkul, P. V., Johnston, M. C., Kralik, A. & Liao, Y.-T. T. (2025). Lunar Combustion Investigation: Flammability Results from a Rotating Sounding Rocket. ASGSR 2025. NTRS 20250010653.
- Schechter et al. (2025). Characterizing the Flammability of Nomex Fabric for the Preparation of FM2 (poster). NTRS 20250010975.
- Zayac, Johnston, Ruff & Ferkul (2024). Flammability of Materials on the Moon (poster). NTRS 20240015307.
- Ferkul, Kralik, Liao & Johnston (2026). LPSC 2026 abstract 1799 (FM2). https://www.hou.usra.edu/meetings/lpsc2026/pdf/1799.pdf
- Olson, S. L. et al. (2021). BASS-II Summary Report. NASA/TM-20210011385.
- Ferkul, Olson, Urban & Ruff (2017). Results of Large-Scale Spacecraft Flammability Tests (Saffire-I). NTRS 20170008805.
- Urban, D. L. et al. (2024). Preliminary Results from the Saffire VI Experiment. ICES-2024-365. NTRS 20240002981.
- Sacksteder, Ferkul, Feier, Kumar & T'ien (2003). NASA/CP-2003-212376. NTRS 20040053567.
- Feier, Shih, Sacksteder & T'ien (2001). AIAA 2001-0466. NTRS 20010059376.
- Sacksteder & T'ien (1994). Proc. Combust. Inst. 25: 1685–1692 (abstract only, NTRS 19930040901).
- Link, Huang, Fernandez-Pello, Olson & Ferkul (2018). Sci. Rep. 8:120. doi:10.1038/s41598-017-18398-4.
- Konno et al. (2026). Combust. Flame 114800 (metadata only; labeled unverified).
- Fortenberry et al. Research Questions and Challenges for Improved Spacecraft Fire Detection (Decadal Survey white paper). https://science.nasa.gov/wp-content/uploads/2023/05/154_33f28c6ef0c27b92cf1f526cef0c44b4_Fire_detection_white_paper_final_211031.pdf
- NASA-STD-6001B. https://standards.nasa.gov/standard/nasa/nasa-std-6001
- Space Apps 2026 challenge "Flame in Freefall". https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/

**Images and video**
- Saffire-VI inside Northrop Grumman's Cygnus spacecraft, NASA Image and Video Library (2024). https://images.nasa.gov/details/Saf-VI%20S8C3+C4%201-sided%20PMMA_unmapped_jpeg-20x%20no%20text
- Logo: AI-generated image (Google Gemini), marked as AI-generated.

**Other sources shown in the app (Antarctic analog)**
- Uruguay, Ministerio de Defensa Nacional, Antarctic bases. https://www.gub.uy/ministerio-defensa-nacional/politicas-y-gestion/bases-antarticas
- Brazilian Navy, Escola de Guerra Naval, monograph CEMOS 104, cited for the 2012 Comandante Ferraz station fire. https://www.marinha.mil.br/egn/sites/www.marinha.mil.br.egn/files/CEMOS_104_MONO_CC_CA_WELLINGTON.pdf

**Code, libraries and fonts** (open source)
- React, Recharts, Vite, esbuild, zod, csv-parse, TypeScript, Vitest, tsx, Node.js.
- Fonts: Sora, IBM Plex Sans and IBM Plex Mono (Google Fonts, SIL Open Font License).
- Hosting: Vercel. Repository: GitHub.

**AI tools:** see "Use of Super Intelligence".

---

## 8. Use of Super Intelligence

**Inside the app.** Anthropic's Claude Haiku does two narrow jobs. It reads the user's question and returns only words copied from it (the numbers are extracted by code), and it drafts a short explanation from the records the code retrieved. Code ranks the records, checks that every cited ID was retrieved and that every number appears in the cited record, and rejects approval words. If the check fails twice, the app answers with a template without AI. The demo answers were generated with AI and saved, and they pass the same check.

**While building it.**
- Research and data extraction: Claude (Claude Science and research subagents) extracted values from NASA documents with their page or table. Claude Code cross-checked them against the original PDFs and PSI tables. The team reviewed the outputs.
- Software: Claude Code wrote the evidence engine (data normalization, ranking, citation verifier and their tests) and helped build the data pipeline and the interface. OpenAI Codex supported implementation, tests and the two saved example explanations.
- Review: Grok drafted the interpretation rules, the golden test set and the reviewer Q&A, which were then checked against the data with Claude Code. ChatGPT and Grok were used to review the app.
- Image: the logo is an AI-generated image (Google Gemini), marked as AI-generated. [PENDIENTE: marca de agua visible sobre la imagen del logo, como pide la guía.]

No AI was used to create data: every number in the app comes from a NASA source and is checked in code.
