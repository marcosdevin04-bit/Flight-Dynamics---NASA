# Questions a combustion reviewer will ask

Twelve questions, with the answer we can actually support. Each answer is at most four sentences. Sources are the PDFs opened on 2026-11-14; anything not opened is named in `interpretation_rules.md` under "Sources I could not open". Corrected 2026-11-15: the PSI tables are loaded (Q4, Q8), the FM2 2024 poster and our registered prediction are cited (Q7), and every lunar or 0 g value from Olson & Ferkul Table I is labeled secondary (Q1, Q5, Q9).

---

### 1. Is the Moon really worse?

Not as a blanket statement. In Olson & Ferkul 2012, Table I (p. 6), the lunar mean oxygen limit of Mylar, Ultem and Nomex is below both the 1 g limit and the 0 g limit (30 cm/s); for Mylar it is 5.75 points below the 1 g mean. Those lunar and 0 g values are secondary: the table reproduces them from Ferkul & Olson 2011, which we did not read, and the 5.18 s drop criterion is not the 1 g Test 1 burn-length criterion. In Urban et al., ICES-2025-392, polycarbonate and Nomex Velcro extinguished at higher oxygen in a lunar-g centrifuge than in the 1 g forced-flow data, while PMMA, P-213 and cotton went the other way (pp. 8–11). The Nomex HT90-40 poster (NTRS 20250010975) prints about 23 % at 1 g, about 29 % in lunar g and about 38 % in 0 g, all at 8.2 psi, which is the opposite direction from the 14.7 psia Olson row. Say the material, the pressure and the criterion, or do not say "worse".

Sources: Olson & Ferkul 2012, NTRS 20130010991, Table I p. 6 and pp. 7–8; Urban et al., NTRS 20250002114, pp. 8–11; Schechter et al., NTRS 20250010975.

### 2. Why should anyone trust a 5-second drop?

They should trust it as a 5-second observation, not as a steady burn. Olson & Ferkul state a 5.18 s drop and write that the Nomex and Ultem Martian flames were dim and shrinking at the end, so those limits may be lower than a longer burn would give (p. 4). Urban et al. used 5.2 s because a 15 cm Test 1 burn does not fit in the tower, and they counted "still burning at release end" as flammable (pp. 5–8). The LPSC 2026 abstract says 5 s towers and about 25 s aircraft parabolas are too short, which is why FM2 goes to the surface, and LUCI's 2025 rocket burn lasted more than 150 s, with SIBAL going out late for a reason the slides do not give.

Sources: Olson & Ferkul 2012, p. 4; Urban et al. 2025, pp. 5–8; Ferkul et al., LPSC 2026, NTRS 20260000646, PDF p. 1; LUCI slides, NTRS 20250010653, slides 12 and 41.

### 3. What does the AI actually do, and how are invented citations stopped?

The model does not rank and does not invent numbers. Code parses the question into material, oxygen, flow and pressure, ranks loaded records by a published distance, and only then asks the model to explain the records it was handed. A second piece of code checks that every cited id was in that set and that every number in a cited sentence appears in that record, and it rejects "safe", "certified" and "NASA never tested". If the check fails twice, the answer is a template with no model in it. Demo answers are cached so a dead API does not change the story.

Sources: `lib/evidence/rank.ts`, `lib/evidence/verify.ts`, `planning/PLAN.md` section 4. This is a description of the software, not a NASA result.

### 4. Why do microgravity data matter for a tool about the Moon?

They are the low-gravity end of the same oxygen-supply problem, and they are the bulk of NASA's flight combustion data. BASS-II states the hypothesis that, with ventilation, materials in microgravity burn as well as or better than in normal gravity, and that the upward 1 g test may not cover spacecraft conditions (NASA/TM-20210011385, p. 3). Those tests are at about 1 atm, not at 8.2 psia, and the report never mentions the Moon. On the PSI index read on 2026-11-14, BASS-II is PSI-25 and there is no partial-gravity combustion investigation, so the Station data, loaded from the PSI experimental tables of BASS, BASS-II and Saffire I–III, are the flight record we use, clearly labeled microgravity, until LUCI and FM2 are in PSI.

Sources: NASA/TM-20210011385, p. 3 and p. 94; PSI-25 landing page, 2026-11-14; PSI combustion search the same day; `data/psi_coverage.json`.

### 5. You say microgravity and 1 g do not bound the Moon. How confident are you?

Confident about one table, not about a law. Olson & Ferkul 2012, Table I p. 6, puts the lunar mean below both endpoints for Mylar (14.85 vs 16.5 and 20.6), Ultem (20.45 vs 23.5 and 23.25) and Nomex (20.45 vs 22.5 and 22.8), while Fig. 7 (p. 8) draws the Mylar minimum at the Moon and calls the shape qualitative. The 0 g column is 30 cm/s forced flow, the lunar column is a 5.18 s centrifuge drop from a 2011 paper we have not read, and the two criteria are not the same. Nomex at 8.2 psi on the 2025 poster does not follow the same pattern.

Sources: Olson & Ferkul 2012, Table I p. 6, pp. 4 and 8; Schechter et al. poster, NTRS 20250010975.

### 6. One NASA abstract says the spread rate peaks at lunar gravity. Your 2003 paper says Martian gravity. Which is it?

They are different claims, and only one of them was opened. The LPSC 2026 abstract says the spread rate peaks at lunar gravity and cites Sacksteder & T'ien 1994, which we did not open (NTRS 20260000646, PDF p. 1). Sacksteder et al. 2003, which we did open, says the downward spread rate for 2 cm Kimwipes in 27.6 kPa air "peaks near the Martian gravity levels of 0.38 g/gEarth" (p. 142); upward spread in that paper rises with g. The 2021 "Fire on the Moon" charts put a model curve next to that 2003 figure and say "partial-g", while the slide headline says lunar gravity is "nearly" the most flammable condition (NTRS 20210020516, slide 8). A spread-rate peak is also not the same quantity as a minimum limiting oxygen.

Sources: LPSC 2026 abstract, PDF p. 1; Sacksteder et al. 2003, NTRS 20040053567, p. 142; Fire on the Moon 2021, slide 8.

### 7. What could FM2 prove you wrong about?

It could show that a long burn in real lunar gravity does not sit below the 0 g and 1 g limits the way the Olson table does, or that the material dependence in the 2025 centrifuge paper does not survive past five seconds. The LPSC abstract says four flat samples in a quiescent habitable atmosphere, launch planned for late 2026, and it gives no oxygen percent, no pressure, no material and no numerical falsifier (NTRS 20260000646). The 2024 FM2 poster lists two SIBAL fabrics in air and two acrylic rods, and a chamber that can reproduce 21 % O2 at 14.7 psia and 34 % O2 at 8.2 psia (NTRS 20240015307); our notes also read the 2025 Nomex poster as naming a material called Synergy Pro, a self-reported reading that is not in our records, so the final sample list is not confirmed. Our own falsifiable expectations were registered before any FM2 result (`PREDICTION.md`, 2026-11-14 22:26 UTC-3): for example, SIBAL spreading downward in air for at least 30 s at a base rate near 0.6–1.4 mm/s, refuted if it goes out within 10 s. Until those data exist, the honest statement is that the partial-gravity claim is a ground-facility result with the caveats above, not a surface measurement.

Sources: Ferkul et al., LPSC 2026, NTRS 20260000646; Zayac et al. FM2 poster, NTRS 20240015307; Schechter et al. poster, NTRS 20250010975; `PREDICTION.md`.

### 8. The challenge says the app should be based on PSI. Is it?

The PSI combustion index, read on 2026-11-14, has BASS, BASS-II (PSI-25, experimental table of 130 rows, about 256 GB) and the Saffire investigations, and it has no lunar or Martian combustion investigation. LUCI and FM2 are not in that index, which matches the challenge note that partial-gravity data are not in PSI yet. We loaded the PSI experimental tables of BASS-II, BASS and Saffire I–III (159 rows, each tied to its PSI file and row), and they are the microgravity flight evidence and its 1 g ground comparisons; they are labeled microgravity or 1 g and are not presented as lunar tests. Because PSI has no partial-gravity combustion data yet, our partial-gravity records come from NTRS papers we opened, each with its page.

Sources: psi.nasa.gov combustion investigation index, 2026-11-14, including PSI-25 and PSI-26; `data/psi/`, `data/psi_bounds_evidence.csv`; challenge text in `planning/consigna.md`.

### 9. Your Nomex story changes with pressure. Are you cherry-picking?

Both results are in the answer, with the pressure attached. At 14.7 psia, Olson & Ferkul Table I gives Nomex HT90-40 a lunar limit below its 1 g limit (21.0 / 19.9 versus a 1 g mean of 22.8); that lunar row is secondary, reproduced from a 2011 paper we did not read. At 8.2 psi the poster prints about 29 % in lunar g against about 23 % in 1 g. The tests also differ in duration, flow and criterion, so this is a disagreement between datasets, not a fitted pressure law. Urban et al. do not report 34 % oxygen at all; they report the pressure 56.5 kPa (p. 6).

Sources: Olson & Ferkul 2012, Table I p. 6; Schechter et al. poster; Urban et al. 2025, p. 6.

### 10. Is 34 % oxygen at 8.2 psi actually the lunar habitat?

It is a planning atmosphere, not a sentence that names the vehicle which will fly it. The challenge itself says the lunar base and rovers will probably be at 30 % O2 or more and 10.2 psi or less (paraphrased in `planning/consigna.md`), and the Fortenberry et al. fire-detection white paper gives 34 % at 8.2 psi (`docs/sources.md`). NASA/TM-20260003925 (cover May 2026, NESC approval 2022-03-17) evaluates 8.2 psia at 34 % oxygen and 10.2 psia at 26.5 % oxygen "for planning purposes", traces the 8.2 psia case to NASA direction including HEO-DM-1006 as the report describes it, and says the maximum oxygen has not been defined for every surface element (report pp. 9, 11 and 29). The 2021 Fire on the Moon charts print "34% O2 at 0.558 atm" (slide 12). The same TM's glossary defines 8.2 psia with 26.5 % oxygen, which contradicts its own body, and its Table 1 as text-extracted lists a lunar-lander column at 10.2 psia and 26.5 %. We cite the planning condition and we do not upgrade it to a design decision.

Sources: challenge text; Fortenberry et al. white paper; NASA/TM-20260003925, report pp. 9, 11, 29 and 84 (not yet listed in `docs/sources.md`); Fire on the Moon 2021, slide 12. HEO-DM-1006 itself was not opened.

### 11. Your partial-gravity data are from spinning hardware. Isn't that Coriolis, not the Moon?

Yes, the platform has to be named, and it is not the lunar surface. Urban et al. (p. 7) call both the gravity gradient and the Coriolis force significant at 20.4 rpm, and they oriented the sample to impede the cross-flow; they do not publish the radius. LUCI states 11 rpm and a 1.22 m radius and shows Coriolis only as a photograph caption, with no magnitude, and no numeric g printed on the slides (NTRS 20250010653, slides 12 and 17). The LPSC abstract uses those Coriolis complications as the reason to fly FM2. Olson & Ferkul 2012 never mentions Coriolis, so we do not invent an analysis for that paper.

Sources: Urban et al. 2025, p. 7; LUCI slides 12 and 17; LPSC 2026 abstract, PDF p. 1; Olson & Ferkul 2012, full-text search, no Coriolis hits.

### 12. Why not just subtract Urban's 2.3 points of oxygen from Test 1 and be done?

Because that 2.3 is not a measured lunar gap. Urban et al., Table 2 (p. 11), take the 95 % slope of the 1 g forced-flow limit and multiply by an assumed 35 cm/s, extrapolating from that speed down to zero flow; 2.3 points is the polycarbonate row. The same paper says the lunar results for the materials that fail Test 1 in air do not follow that extrapolation, and calls the mismatch unexplained (p. 9). Test 1 itself (NASA-STD-6001B, pp. 27–28) is a 15 cm burn length with no forced flow and no gravity term in the criterion. A single offset would hide the material split and the pressure split that are the actual content of the data we reviewed.

Sources: Urban et al. 2025, Table 2 p. 11 and pp. 9–10; NASA-STD-6001B with Change 3, sections 7.1.3 and 7.1.4, pp. 28 and 30.
