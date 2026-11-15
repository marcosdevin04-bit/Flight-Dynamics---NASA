# Interpretation rules for Ask the evidence

Rules the explanation model must follow. Ranking and numbers come from code (`lib/evidence/rank.ts` over `evidence.json`). The model interprets only the records it was given.

Provenance: synthesized on 2026-11-14 from five page-cited verification notes. Those notes were written by agents that opened the PDFs the same day. This file did not re-open the PDFs. A claim the notes marked UNVERIFIED stays UNVERIFIED. The fifth pass (ECLSS atmospheres, the PSI index, NASA-STD-6001B Test 1) is included here; it finished after the coordinator that launched the passes had stopped.

Corrected 2026-11-15 against the repository: the PSI experimental tables are now loaded (rule 2, gaps); FM2 facts from the 2024 FM2 poster and our registered prediction were added (rule 14); the ECLSS report and HEO-DM-1006 are marked as not yet traced in `docs/sources.md` (rules 10–11). This file is reference for people. The production endpoint (`lib/ask.ts`) does not load it into the model prompt.

Labels: **DATA** is a measured value or a sentence printed in a source that was opened. **INFERENCE** is reasoning from those pages. **HYPOTHESIS** is untested. Do not promote an inference or a hypothesis into a measurement.

Short names:

- OLSON — Olson & Ferkul 2012, NTRS 20130010991
- URBAN — Urban et al., ICES-2025-392, NTRS 20250002114 (file `ICES_2025-392-correctedcaptions.pdf`)
- POSTER — Schechter et al., ASGSR 2025 Nomex poster, NTRS 20250010975
- LPSC — Ferkul et al., LPSC 2026 abstract 1799, NTRS 20260000646
- FOTM — Fire on the Moon overview charts, 2021, NTRS 20210020516
- SACK — Sacksteder, Ferkul, Feier, Kumar & T'ien 2003, NTRS 20040053567
- LUCI — Ferkul et al., ASGSR 2025 LUCI slides, NTRS 20250010653
- BASS — Olson et al., BASS-II summary, NASA/TM-20210011385
- ECLSS — NASA/TM-20260003925 (approved by the NESC Review Board on 2022-03-17, cover date May 2026)
- STD — NASA-STD-6001B with Change 3, revalidated 2025-06-09
- PSI — Physical Sciences Informatics combustion index, read 2026-11-14

---

### Rule 1 — A 1 g result is not a lunar result

**Rule.** A test run in Earth gravity does not answer how the same material behaves in lunar gravity.

**Mechanism.** In 1 g the flame's own heat drives an upward flow that brings oxygen. In lunar gravity that buoyant flow is much weaker, so the oxygen supply, the heat loss and the limiting oxygen concentration can all move. URBAN describes the limit-versus-flow curve as U-shaped: a low-speed quenching branch and a high-speed blow-off branch, with the lowest oxygen limit where they meet (URBAN pp. 8–11). Moving from a fast 1 g flow toward a slow lunar buoyant flow can lower or raise the oxygen limit, depending on which branch the material is on.

**Applies when.** The retrieved record is labeled tested in 1 g, including NASA-STD-6001 Test 1 and the WSTF high-flow oxygen-index tests. Say "tested in 1 g" and say what would have to be true for the result to transfer.

**Does not apply when.** The record itself is a partial-gravity test (drop-tower centrifuge, rotating rocket, parabolic flight). Those are still not the lunar surface: see rules 4 and 5.

**Evidence.**

- DATA. STD Test 1 (section 7.1, pp. 27–28) is an upward-flame test in the worst-case atmosphere, with no forced airflow (7.1.4.i, p. 30). In the 158 pages read, "gravity" appears once, as "microgravity", in the supplemental Test 2 discussion. Test 1's pass/fail line has no gravity qualifier (STD pp. 27–28; word search of the full text).
- DATA. OLSON p. 7: the authors write that the 1 g limits "are generally not conservative for these materials", with a negative oxygen margin "by up to -5.75% oxygen". That -5.75 is the lunar Mylar margin in Table I (p. 6), not the Martian one (see rule 3).
- DATA. The PSI BASS investigation record (PSI-26, Research Impacts, read 2026-11-14) says Test 1 "segregates material based on 1-g behavior without consideration of low gravity effects".
- INFERENCE. A Test 1 pass is evidence about self-extinguishment in the atmosphere and gravity of that ground test. Carrying it to 1/6 g is an extrapolation.

**Counter-evidence.** OLSON p. 4 says the Martian near-limit flames of Nomex and Ultem were dim and shrinking at the end of the 5.18 s drop, so those reduced-gravity limits are "conservative" in the authors' sense: the reported limit may be lower than a long burn would give. A negative margin is not automatically a steady-state lunar result. URBAN also finds two materials (polycarbonate, Nomex Velcro) that extinguished at higher oxygen in lunar g than in the 1 g forced-flow data (p. 11). The direction is not the same for every material (rule 7).

---

### Rule 2 — A microgravity result is not a lunar result

**Rule.** A 0 g test, including one with forced ventilation, is the other end of the gravity range. It is not a stand-in for the Moon.

**Mechanism.** With no buoyancy, oxygen reaches the flame only by forced flow or by diffusion. Spacecraft ventilation can make a microgravity flame as flammable as, or more flammable than, a 1 g flame. Lunar gravity still has some buoyancy, weaker than Earth and stronger than the Station. A forced-flow 0 g limit and a buoyant lunar limit are different oxygen-supply mechanisms.

**Applies when.** The record is microgravity: ISS (BASS, BASS-II, Saffire), drop towers at 0 g, or any record whose gravity label is microgravity. Name the flow. If the flow is "not reported", say so. Do not treat it as zero flow.

**Does not apply when.** You are only comparing two partial-gravity records to each other.

**Evidence.**

- DATA. OLSON Table I (p. 6) and p. 4: the 0 g row is "0g (with a concurrent flow of 30 cm/s, which is a reasonable maximum local spacecraft ventilation velocity"). No quiescent 0 g limit is in that paper. The 0 g point is not plotted on Fig. 7 (p. 8).
- DATA. BASS p. 3 (PDF p. 11): the campaign tests the hypothesis that materials in microgravity, with ventilation, burn as well as or better than in normal gravity at the same pressure and oxygen. The same page says the upward 1 g test "may not be conservative for flammability in space". A text search of the report found no discussion of the Moon or Mars.
- DATA. BASS p. 94 (PDF p. 102): the SIBAL concurrent-flow tests were at 1 atm, oxygen about 16–21 %, flow from 1 to 55 cm/s. Pressure was not a test variable.
- DATA. BASS-II is PSI-25. The PSI landing page (2026-11-14) lists an experimental table of 130 rows and about 256 GB of files. The tables were downloaded on 2026-11-14 (`data/psi/`, `data/psi_coverage.json`). `data/psi_bounds_evidence.csv` loads 159 rows as records `psi-<investigation>-r<row>-flight|earth`: 125 from BASS-II (PSI-25), 20 from BASS (PSI-26), 2 from Saffire-I (PSI-98), 10 from Saffire-II (PSI-99) and 2 from Saffire-III (PSI-100). All are 0 g flight rows or 1 g ground comparisons; none is partial gravity. The difference between 130 listed and 125 loaded BASS-II rows has not been reconciled here. Cite PSI rows only by the ids in `evidence.json`.
- INFERENCE. For Mylar in Table I, the 0 g mean limit (16.5 %) sits between the 1 g mean (20.6 %) and the lunar mean (14.85 %). Interpolating from 0 g to 1 g would miss the lunar point. That comparison mixes a 30 cm/s forced-flow test with buoyant-flow tests (rule 3).

**Counter-evidence.** ULTEM at 0 g in the same table has a small positive margin (+0.25 oxygen points): for that one cell, the 0 g limit is not below the 1 g limit. Do not generalize "microgravity is always worse".

---

### Rule 3 — 0 g and 1 g do not bound the Moon in the Olson & Ferkul table

**Rule.** In OLSON Table I, the lunar mean oxygen limit of Mylar, Ultem and Nomex lies below both the 0 g limit and the 1 g limit. The challenge statement that microgravity and normal gravity "could bound" intermediate gravity is not supported for these three materials, in this table.

**Mechanism.** The authors plot U-shaped limit curves against gravity for Mylar (Fig. 7, p. 8): a range of g in which a flame can survive, with a low-g side and a high-g side that do not burn. The drawn minimum sits at the Moon marker. They write that Martian data "suggest that there is a gravity level below Earth's at which materials burn more readily than on Earth" (abstract, p. 1). They also write that, given the scarcity of points, "the exact shapes of the curves are not known, nor are the absolute minimums" (p. 8).

**Applies when.** The user asks whether Station data plus a 1 g Test 1 result can bracket a lunar habitat, or when the retrieved records include these Table I rows.

**Does not apply when.** The material is not one of these three, or the question is about spread rate rather than a limiting oxygen concentration. Spread rate is rule 12. Urban's five materials were not given a 0 g point in that paper.

**Evidence.**

- DATA. Table I, p. 6, oxygen molar percent. Means below are (ULOi + MOC) / 2, which matches the printed ΔO2 and Eq. 1.

  | | Mylar G, 10.2 psia | Ultem 1000, 10.2 psia | Nomex HT90-40, 14.7 psia |
  |---|---|---|---|
  | 1 g mean | 20.6 | 23.25 | 22.8 |
  | 0 g mean, 30 cm/s | 16.5 | 23.5 | 22.5 |
  | Lunar mean | 14.85 (15.6 / 14.1) | 20.45 (21.0 / 19.9) | 20.45 (21.0 / 19.9) |
  | ΔO2, lunar minus 1 g | −5.75 | −2.8 | −2.35 |

- DATA. The lunar and 0 g numbers are reproduced from Ferkul & Olson 2011 (ref. 8). The 2011 paper was not opened. The repository therefore marks those points secondary.
- DATA. The paper states thicknesses as 5 mil (Mylar), 10 mil (Ultem) and 12 mil (Nomex), pp. 2–3. Millimetre values are a conversion, not a quotation.
- INFERENCE. For these three rows, a bound drawn from the 0 g point to the 1 g point lies above the lunar point, so it would overestimate the lunar limiting oxygen (report the material as harder to burn than the table shows).

**Counter-evidence.** State all of these whenever this table is used.

- The 0 g row is forced flow at 30 cm/s, not still air (p. 4). The lunar row is buoyant flow in a centrifuge. They are not the same kind of test.
- The reduced-gravity criterion is "alive at 5.18 s". The 1 g criterion is a burn length of six inches on NASA-STD-6001 Test 1, with a statistical definition (p. 4). ΔO2 compares two different definitions.
- The "conservative" remark on p. 4 (weak flames that might have gone out with more time) is written about the Martian Nomex and Ultem drops, not restated for the lunar rows from ref. 8. The CSV note carried by the lunar records ("authors call low-g limits conservative") generalizes it; when you repeat it, attribute it to OLSON p. 4 and say it was written about the Martian drops.
- Nomex's lowest mean in the table is Martian (19.45), not lunar (20.45). The sentence on p. 8 that attributes "up to 5.75% O2 lower" to Martian gravity does not match Table I: −5.75 is lunar Mylar, and the largest Martian margin printed is −3.35 (Nomex). Quote the table, not that sentence, for Martian magnitudes.
- Fig. 6's caption does not match Table I (the notes record a caption average near −2.6 % against a 0 g table average of −1.38). Use Table I.
- Ultem and Nomex print the same lunar pair, 21.0 / 19.9. The opened PDF shows it in text and image. Whether that is a coincidence or a copy from ref. 8 cannot be decided without the 2011 paper.
- Pressures are 10.2 psia (Mylar, Ultem) and 14.7 psia (Nomex), not the 8.2 psia planning atmosphere (rule 6).
- The numeric lunar g used in the test is not written in the paper. Fig. 7's Moon marker sits near 0.16 on a log axis (plot reading).

---

### Rule 4 — A few seconds is not a long burn

**Rule.** Say the duration of the test. A flame that is still burning when a drop tower ends is not the same observation as a flame that spreads for minutes.

**Mechanism.** Drop towers used here last about 5 s. Aircraft parabolas last on the order of 20–25 s. A spinning sounding rocket gave more than 150 s ("over two and a half minutes", LUCI, record csv-1). The lunar surface would allow a burn limited by the sample and the oxygen, not by the facility. A short test can count a dying flame as "still burning", or it can miss a flame that would have gone out, or grown, later.

**Applies when.** The record is a drop-tower centrifuge (OLSON, URBAN), an aircraft parabola (SACK), or any duration the record prints. Quote the duration from the record. If it says "not reported", say that.

**Does not apply when.** The record is a long facility burn (ISS, Saffire) or the LUCI rocket, except to contrast those durations with the drop tower.

**Evidence.**

- DATA. OLSON Fig. 4 caption and footnote a, p. 4: "5.18 sec-duration drop tower tests" at the Zero Gravity Facility, NASA Glenn.
- DATA. URBAN pp. 7–8: the ZGRF drop is 5.2 s. Still burning at the end of the drop was counted flammable; extinguished before the end was counted non-flammable. The authors say a 15 cm (6 inch) Test 1 burn takes much longer than 5 s, which is why they used a 5 s criterion (pp. 5–6).
- DATA. LPSC abstract, PDF p. 1: drop towers (5 s) and aircraft (about 25 s) are too short for the question FM2 is meant to answer. The same paragraph says ISS centrifuges and a spinning sounding rocket (about 150 s, two materials) add Coriolis effects.
- DATA. LUCI slide 12: "first-ever, extended-duration (greater than 25 seconds) combustion tests" in simulated lunar gravity, on a New Shepard flight, 4 February 2025. SIBAL's flame shrank and went out in the last about 40 s while the authors say gravity was still constant (slide 41). They give no positive cause: "must be caused by other factors".
- HYPOTHESIS. LPSC: a long burn on the Moon could confirm or change the partial-gravity picture. The abstract states no pass/fail number that would count as confirmation (rule 14).

**Counter-evidence.** OLSON p. 4 argues the short Martian drops are conservative for Nomex and Ultem because the flames were already dying. URBAN p. 7 judges the gravity-gradient impact small because near-limit flames did not spread much during the drop. Short data can be biased either toward "flammable" or toward "the flame was dying". Say which caveat belongs to the record in hand.

---

### Rule 5 — Rotation is not the lunar surface

**Rule.** A centrifuge or a spinning rocket produces a gravity-like acceleration plus Coriolis and a gravity gradient. Name the platform. Do not call it "on the Moon".

**Mechanism.** Centripetal acceleration can be set near lunar g, but the flame also feels a sideways Coriolis acceleration, and g changes along a short radius. Both can bend the flame and change the flow that brings oxygen. The lunar surface has neither the spin nor that gradient.

**Applies when.** The record is the Glenn drop-tower centrifuge (OLSON, URBAN) or LUCI (rotating New Shepard).

**Does not apply when.** The record is a non-rotating drop, an aircraft parabola, the ISS, or a future surface experiment (FM2).

**Evidence.**

- DATA. URBAN p. 7: chamber spun at 20.4 rpm inside the 5.2 s drop; described as lunar gravity and as 1/6 g. Radius is not reported. The authors call the gravity gradient and the tangential Coriolis force significant, and say they oriented the sample so the surface impedes the Coriolis flow. Ignition happened at the top of the tower, in 1 g vertical plus 1/6 g radial, before release.
- DATA. LUCI slides 12 and 17: 11 rpm, effective radius 1.22 m, "air at normal pressure". Coriolis is a qualitative caption (the flame is pulled away from the fuel axis). No Coriolis number is printed. No numeric g is printed in the slide text. The acceleration plots read near 0.18 g (plot reading, not a printed measurement). 0.165 g is a calculation from 11 rpm and 1.22 m, not a sentence on the slides.
- DATA. LPSC PDF p. 1: the authors' reason for going to the Moon is that drop towers and aircraft are short, and that centrifuges and the spinning rocket add Coriolis "that complicate interpretation".
- DATA. OLSON does not mention Coriolis anywhere in the opened PDF. Do not attribute a Coriolis analysis to that paper.
- INFERENCE. LUCI slide 44 says gravity was about constant for the PMMA burn, while the plot on that slide shows g falling after about 123–125 s. The end of the PMMA burn overlaps the ramp-down. Do not state that the whole PMMA burn was at constant lunar g.

**Counter-evidence.** URBAN's authors argue the orientation mitigates Coriolis and that near-limit flames did not spread far enough for the gradient to matter much. That is their judgment about their own near-limit flames, not a general proof that rotation is negligible.

---

### Rule 6 — Pressure can reverse the gravity trend

**Rule.** Always say the pressure of the test next to the gravity. A lunar-g result at 14.7 psia is not a result at 8.2 psia.

**Mechanism.** Limiting oxygen depends on pressure as well as on g and flow. The same Nomex fabric has published lunar-g limits at two pressures, and they do not tell the same story. At the higher pressure the lunar limit sits below the 1 g limit. At 8.2 psi the poster's limiting oxygen is higher in lunar g than in 1 g.

**Applies when.** Any Nomex HT90-40 question, and any time the user sets a habitat pressure near 56.5 kPa while the closest record is at 70.3 or 101.3 kPa.

**Does not apply when.** You are comparing two records that print the same pressure.

**Evidence.**

- DATA. OLSON Table I: Nomex HT90-40 was tested at 14.7 psia (101.3 kPa). Lunar ULOI 21.0 / MOC 19.9, which is below its 1 g pair. Mylar and Ultem were tested at 10.2 psia (70.3 kPa). The paper says the pressures were chosen to match earlier WSTF tests. It does not give a measured pressure coefficient.
- DATA. POSTER, single page, results panel: at constant 8.2 psi, limiting oxygen about 23 % in 1 g, about 29 % in lunar g, about 38 % in 0 g. The poster does not plot the lunar points and does not say how the "about" values were derived. The only lunar drop-tower oxygen level the notes found listed is 28 %. Treat 29 and 38 as the poster's printed approximations, not as a tabulated limit.
- DATA. URBAN states the planned lunar habitat pressure as 56.5 kPa (8.2 psia), p. 6. The figure 34 % oxygen does not appear in URBAN or on the poster.
- INFERENCE. Putting the Olson 14.7 psia lunar point and the poster 8.2 psi lunar point in one sentence without the pressures would hide a reversal. Show both, labeled with pressure, criterion and duration.

**Counter-evidence.** The two Nomex campaigns also differ in flow, sample history, criterion and facility, not only in pressure. The reversal is what the two datasets show; it is not yet a measured pressure derivative. URBAN itself has no pressure sweep (one test pressure, plus a pressure term in an equation).

---

### Rule 7 — The gravity effect depends on the material

**Rule.** Do not say "the Moon is worse" as a property of gravity alone. Say it for the material in the records you were given, and say when the opposite was observed.

**Mechanism.** On the blow-off branch, slower lunar buoyant flow lowers the oxygen limit. URBAN proposes that some higher-pyrolysis-temperature materials move onto the quenching branch, where the lunar test extinguishes at higher oxygen instead. The same gravity change can make one material burn at lower oxygen and another at higher oxygen.

**Applies when.** More than one material is in play, or the user asks for a general lunar rule.

**Does not apply when.** You have records for only one material. Then speak only for that material and say you are not generalizing.

**Evidence.**

- DATA. URBAN p. 8: PMMA, P-213 tape and a cotton T-shirt ("Beefy-T") fail Test 1 in air; polycarbonate and Nomex Velcro pass Test 1 in air. pp. 9 and 11: the first group extinguished at lower oxygen in lunar g than the 1 g forced-flow extrapolation; polycarbonate and Nomex Velcro extinguished at substantially higher oxygen.
- DATA. URBAN Table 1, p. 9, pyrolysis temperatures used in the model: PMMA 618 K, polycarbonate 700 K, Nomex 750 K.
- DATA. URBAN p. 11: the authors say Mars could be worse than the Moon for the higher-temperature materials. That is their suggestion, not a Martian measurement in that paper.
- DATA. POSTER conclusion panel: Nomex HT90-40 "behaves differently than other materials". The three "about" limits (23 / 29 / 38 at 8.2 psi) increase from 1 g to lunar g to 0 g.
- UNVERIFIED. Numeric lunar limits read off URBAN Figs. 7–10. The notes found the plots above the Fig. 9 and Fig. 10 captions identical, and the slopes match Table 2 rows other than the captions for PMMA, P-213 and cotton. Do not quote a figure-read oxygen number for those three. Polycarbonate and Nomex Velcro plots are consistent with their captions, and still are not printed as a table. Say "higher" or "lower" as the text says, and "numeric limit not printed".

**Counter-evidence.** OLSON's three materials all have negative lunar margins, so a user who has only read that paper will think the Moon is uniformly worse. Rule 3's table and this rule are both in the data we reviewed. Present both.

---

### Rule 8 — Do not compare unlike pass/fail criteria as if they were one number

**Rule.** When you quote a limiting oxygen, name the criterion that defined "burned" and "went out".

**Mechanism.** A time limit (still burning at 5 s) and a length limit (burned more than 15 cm) count different events. A statistical 1 g index (many replicates) and a single drop are different kinds of evidence. Subtracting them produces a delta that is useful as a flag and misleading as a precision.

**Applies when.** Any sentence that puts a drop-tower ULOI next to a Test 1 result, or an Urban 5 s centrifuge result next to a WSTF 5 s forced-flow result, or a poster "about 29 %" next to Table I.

**Does not apply when.** Both numbers come from the same table and the same definition. You may compare them, and you still say what that definition was.

**Evidence.**

- DATA. STD p. 28, 7.1.3.a: a material is self-extinguishing if none of five specimens burns more than 15 cm (6 in) and none spreads fire by burning debris. The standard prints ">15 cm (6 in)". Do not replace 15 cm with 15.2 cm unless you are quoting a paper that did. OLSON did: the Olson & Ferkul records (and `curva_gravedad.json`, PREDICTION.md) say 15.2 cm, so keep 15.2 cm with those records and 15 cm (6 in) when quoting the standard. Sample stock in Table 3, p. 26, is 30 by 6.4 cm; section 7.1.2.b says 6.5 cm. Both say 2.5 in.
- DATA. OLSON p. 4: 1 g ULOI/MOC are statistical Test 1 limits; reduced-gravity ULOI*/MOC* are single observations inside a 5.18 s drop. The authors say three times that the criteria are not the same.
- DATA. URBAN pp. 5–8: both the centrifuge and the WSTF high-flow test used a 5 s extinction criterion, because 15 cm takes longer than a drop. The WSTF test is forced flow at 60–144 cm/s, not Test 1. Test 1 forbids forced airflow (STD p. 30).
- INFERENCE. A 5 s "fail" does not mean the sample would have burned 15 cm. A 5 s "pass" does not mean it would have stayed out for a habitat-length exposure.

**Counter-evidence.** URBAN used the same 5 s clock in both facilities so that the lunar-versus-1 g comparison inside that paper is at least on one clock. That does not make it a Test 1 comparison. The 1 g branch of URBAN is a high-flow oxygen index at about 57 kPa, not an upward quiescent Test 1.

---

### Rule 9 — A reused sample is a weaker observation

**Rule.** If the record says the sample was reused, say so in the same sentence as the result, and do not treat it as a fresh-sample limit.

**Mechanism.** A reused sample is already partly burned, often shorter, and sometimes ignited from the previous burnout rather than from a fresh edge. Spread rate, ignition and limiting oxygen on that sample are not the same measurement as on a new sample.

**Applies when.** BASS-II SIBAL rows marked reused, including GMT190-T23 (17.2 %, "Reused, did not ignite") and GMT190-T24 (18.2 %, "Reused, one-sided flame").

**Does not apply when.** The record is silent. Do not invent a reuse warning. For URBAN and OLSON, reuse in reduced gravity was not reported in the opened PDFs (UNVERIFIED, not "known to be fresh").

**Evidence.**

- DATA. BASS Table 7.1, p. 96 (PDF p. 104), and p. 95 (PDF p. 103): reused samples "in general had a short unburned length and provided less quantitative data, thus will not be discussed in this report."
- DATA. Same table, footnote b: the oxygen reading in GMT45-T1 and GMT45-T2 "might be inaccurate" (18.5 %). Say that when those rows are shown.
- DATA. LUCI does not say the SIBAL flight sample was reused. Do not attach the BASS reuse warning to LUCI.

**Counter-evidence.** The rows are still real tests: a reused sample that did not ignite at 17.2 %, and a one-sided flame at 18.2 %, at 10 cm/s in microgravity. They belong in the answer as reused tests, not as the limiting oxygen of fresh SIBAL.

---

### Rule 10 — The habitat atmosphere at lunar g is not in the records we have

**Rule.** If no retrieved record is partial gravity at about 34 % oxygen and about 56.5 kPa for the material asked, say "No matching test in the data we reviewed." Mention FM2. Do not fill the gap with a 1 g test at those conditions, and do not fill it with a 0 g test.

**Mechanism.** Oxygen concentration and total pressure both move the limit (rules 6 and 7). A test at the right pressure in the wrong gravity, or the right gravity at another pressure, is context. It is not a match. The ranker already returns case 3 when nothing of the same material falls inside the distance threshold. Do not talk the user out of that result.

**Applies when.** Case 3, and any case 2 where the closest record differs in gravity or by many points of oxygen from 34 %.

**Does not apply when.** A partial-gravity record at that pressure exists for that material (the Urban materials and the Nomex poster are at 8.2 psi, but their oxygen is the variable under test, not a completed 34 % burn). Then describe that record and say whether 34 % was actually run. "Not reported" stays "not reported". It is not zero and it is not 34.

**Evidence.**

- DATA. Challenge statement (`planning/consigna.md`): the lunar base and rovers will probably use 30 % O2 or more at 10.2 psi or less (the repository copy is a Spanish paraphrase; quote the English challenge page, not this line).
- NOT YET TRACED. The ECLSS report (NASA/TM-20260003925) is not listed in `docs/sources.md`, so the app cannot show it "one click away". The ECLSS figures below (26.5 %, 40 %, 36–40 %, 70 % and 21 % of subsystems, HEO-DM-1006, ≥33.7 %) are notes from that PDF; do not show them in the app until the source is added. The 34 % / 8.2 psia pair is also traced to the Fortenberry et al. detection white paper (`docs/sources.md`).
- DATA. ECLSS report p. 9 (PDF p. 13): the two planning atmospheres are 10.2 psia at 26.5 % O2 and 8.2 psia at 34 % O2, with flammability looked at up to 40 % O2 at 8.2 psia. Report p. 29 (PDF p. 33): the maximum oxygen "has not been defined" for every surface element; with control bands it "could be between 36 and 40 %".
- DATA. FOTM slide 12 prints "34% O2 at 0.558 atm". The string "8.2 psia" is not on that slide. 8.2 psi is the conversion of 0.558 atm, plus the ECLSS sentence that does print 8.2 psia.
- DATA. PSI index on 2026-11-14: no combustion investigation in lunar or Martian gravity; LUCI and FM2 are not in the index. The filter "Reduced Gravity Investigation" returned zero investigations.
- HYPOTHESIS. FM2 is the experiment intended to burn solids in real lunar gravity. It has not published results (rule 14).

**Counter-evidence.** Saffire VI (repository id csv-42) burned SIBAL in microgravity near 31 % oxygen and 54.1 kPa. That is close in oxygen and pressure and far in gravity. Show it only as a microgravity neighbor, with the gravity label. A 1 g test at 34 % and 56.5 kPa, if one is in the set, is still a 1 g test (rule 1). The ranker is built so 1 g evidence alone does not count as similar to the Moon.

---

### Rule 11 — Say what "34 % at 8.2 psi" is, and what it is not

**Rule.** Call 8.2 psia / 34 % oxygen a planning atmosphere evaluated by NASA, not the decided cabin of a named lander, unless the record you were given says that.

**Mechanism.** Several NASA documents use those numbers for exploration atmospheres tied to frequent EVA and a low-pressure suit. They do not all assign them to the same vehicle, and one glossary line inside the ECLSS report contradicts the body.

**Applies when.** The user states a habitat atmosphere, or you cite 34 % or 8.2 psi.

**Does not apply when.** You are quoting a test pressure that is 10.2 psia or 14.7 psia. Then quote that pressure and do not rename it as the habitat.

**Evidence.**

- DATA. ECLSS report p. 9 and p. 11: "for planning purposes, and for the purpose of this assessment"; 8.2 psia with 34 % O2 is traced to NASA direction and to earlier EVA studies. Report p. 29 cites decision memorandum HEO-DM-1006 for a nominal 8.2 psia and oxygen at or above 33.7 % on exploration missions with high-frequency EVA. That memorandum was not opened. Its contents are known here only through the TM.
- DATA. The same report's definition section (report p. 84) defines an exploration atmosphere as 8.2 psia / 26.5 % O2 or 10.2 psia / 26.5 % O2. That line disagrees with the 34 % used in the rest of the report. Prefer the executive summary and section 5, and mention the glossary conflict rather than hiding it.
- DATA. ECLSS report p. 9: at 8.2 psia / 34 % O2 the assessment found material changes would be required in 70 % of the subsystems assessed, against 21 % at 10.2 psia / 26.5 % O2. Those percentages are subsystems, not a fraction of materials that failed a burn test. The TM says flammability data above 30 % oxygen are limited, that existing data are essentially from 1 g, and that partial-gravity data are minimal.
- DATA. FOTM slide 12: "34% O2 at 0.558 atm", as above. URBAN p. 6: pressure 56.5 kPa only.
- INFERENCE. The honest label is "planning atmosphere (8.2 psia, nominal 34 % oxygen, flammability considered up to 40 %), traced to NASA direction including HEO-DM-1006 as described by NASA/TM-20260003925".

**Counter-evidence.** ECLSS Table 1, as reconstructed from text extraction (not visually confirmed), lists MPCV "Lunar Lander Operations" at 10.2 psia and 26.5 % oxygen. Do not tell the user every lunar vehicle is 34 % at 8.2 psi.

---

### Rule 12 — Do not collapse the lunar-peak and Martian-peak claims

**Rule.** Do not say "flame spread peaks at lunar gravity" as a settled fact. If you cite that claim, cite the 1994 paper as an unopened source, and cite the 2003 measurement that peaks near Martian gravity for one condition.

**Mechanism.** A spread-rate peak and a minimum in limiting oxygen are different quantities. They can sit at different gravity levels. Upward spread and downward spread do not even share a shape in the 2003 figures.

**Applies when.** The user asks whether the Moon is the most flammable gravity, or quotes FM2 or the 2021 charts on a peak.

**Does not apply when.** You are quoting OLSON Table I limits (rule 3). Call those limits, not spread rates.

**Evidence.**

- DATA. LPSC PDF p. 1, right column: "Early numerical and experimental evidence suggested that Lunar gravity could be more hazardous" because "flame spread rate as a function of gravity peaks there", citing Sacksteder & T'ien 1994 (ref. [2], printed on PDF p. 2). That 1994 paper was not opened. UNVERIFIED whether its maximum is at 0.16 g.
- DATA. SACK p. 142: "The downward spread rate is non-monotonic and peaks near the Martian gravity levels of 0.38 g/gEarth", for 2 cm Kimwipes in 27.6 kPa air (21 % oxygen). Tested levels include 0.1, 0.16 and 0.38 g on the KC-135 (p. 142). Upward spread in the same paper rises with g. The paper does not say lunar gravity is the most flammable.
- DATA. FOTM slide 8 headline: "Numerical and experimental evidence suggests that Lunar gravity is nearly the most flammable condition." The right-hand plot on that slide is the 2003 figure, and the slide's own caption says the downward rate "peaks in partial-g", not "peaks at lunar g". The left-hand plot is labeled "(left; model)" (rule 13).
- INFERENCE. In the only opened spread-rate dataset, the downward peak for that one tissue, width and pressure is at the 0.38 g test point, and upward spread has no peak. The lunar-peak sentence rests on a paper this project has not read.

**Counter-evidence.** SACK Fig. 2, as plot-read by the notes and not as a printed table, shows a U-shaped downward flammability boundary in pressure, with the fitted minimum not exactly at 0.16 g. Do not quote those plot-read pressures as author numbers. The qualitative point that is printed: upward and downward boundaries do not share a shape (p. 142 and Fig. 2).

---

### Rule 13 — A sketched model curve is not a measurement

**Rule.** Do not present "the oxygen limit is lowest near lunar gravity" as a measured result unless the record is a measured limit. The well-known U-shaped sketch is a model.

**Mechanism.** A model can be a good summary of a mechanism and still have no scale, no material and no data points. FM2's abstract repeats the idea. Repeating it does not add a measurement.

**Applies when.** The user asks for the oxygen minimum versus gravity in general, or cites the 2021 charts or the FM2 abstract for that shape.

**Does not apply when.** You are reading OLSON Fig. 7, which is a plot of Mylar centrifuge points with a curve drawn through them (rule 3). That one is data plus the authors' curve, and they already warn that the shape is qualitative.

**Evidence.**

- DATA. FOTM slide 8: the left plot is captioned as a model. It is an unscaled U-shape of oxygen versus gravity, with no numbers on the oxygen axis, no points, no material and no pressure. Slide 7 points that picture at T'ien, Combustion and Flame, 1986. That 1986 paper was not opened.
- DATA. LPSC PDF p. 1: the abstract says related work finds the oxygen concentration for flammability reaching a minimum near lunar g, and it attaches no reference to that sentence.
- HYPOTHESIS. The minimum near lunar g is the idea FM2 is being flown to examine. It is not a result of FM2.

**Counter-evidence.** OLSON Fig. 7 does put Mylar's lowest drawn limit at the Moon marker, with the scarcity caveat on p. 8. You may say that about Mylar in that figure. You may not export the figure to every material.

---

### Rule 14 — FM2 is a plan, not a dataset

**Rule.** Describe FM2 only with facts printed in the sources you were given. Do not invent its atmosphere, its materials, its lander, or the number that would prove the project wrong.

**Mechanism.** The value of FM2 for this tool is that it will be a long burn in real lunar gravity, without a centrifuge. Until those data exist, every lunar statement in the tool is from ground facilities. Saying more than the abstract says is how a citation goes bad.

**Applies when.** Case 3, any "what happens on the Moon in the habitat atmosphere" question, and any question about what would falsify the partial-gravity claim.

**Does not apply when.** You are describing LUCI or a drop-tower test. Those already happened. Do not call them FM2.

**Evidence.**

- DATA. LPSC abstract (both PDF copies opened): four flat solid samples, burned one at a time, in a small chamber filled from gas bottles, in real lunar gravity, with cameras, thermocouples, radiometers and an oxygen sensor. Planned launch "late 2026". Quiescent habitable atmosphere. No oxygen percent, no pressure, no material name, no lander, no mission name, and no sentence of the form "we are wrong if".
- DATA. The abstract's science claim is a hypothesis drawn from earlier theory, drop towers, aircraft and a sounding rocket. It does not present new burn data.
- DATA. FM2 2024 poster (Zayac, Johnston, Ruff & Ferkul 2024, NTRS 20240015307; records csv-28 and csv-45): four samples, two SIBAL fabrics burned in air and two acrylic rods in "Normoxic Space Exploration Atmospheres", one of each upward and one downward; the chamber can reproduce 21 % O2 at 14.7 psia and 34 % O2 at 8.2 psia; SIBAL "only" burns downward in air in lunar gravity. That last claim does not cite its underlying tests, so csv-28 is secondary. The poster also names the lander mission CP-21.
- SELF-REPORTED. Our notes read, from the 2025 POSTER panel, that FM2 will determine a limiting oxygen concentration for a flight-relevant material named "Synergy Pro", "in the next few years". That reading is tagged `#autodeclarado` in `docs/research/fm2-fuego-en-la-luna.md`. What Synergy Pro is made of is not stated. That name is not a record in this repository.
- DATA. The sample lists conflict: 2024 poster = SIBAL and acrylic rods; 2025 poster = Synergy Pro; LPSC 2026 = "four flat samples". The final list is not confirmed.
- DATA. Our registered prediction for FM2 (`PREDICTION.md`, `data/prediction.json`, tag `fm2-predictions-v1`, 2026-11-14 22:26 UTC-3) states what would confirm or refute us. It is our inference, not a NASA statement; cite it as ours.
- DATA. LUCI is the 2025 sounding-rocket test, not FM2. The LPSC abstract refers to a spinning rocket of about 150 s and two materials as prior art with Coriolis, which matches the role LUCI plays, without naming LUCI in the sentences the notes quoted.

**Counter-evidence.** None of the opened FM2 pages contradict the description above. They are thin. Thin is not permission to fill gaps. Absence from a two-page abstract is "not stated in the abstract", not proof that NASA has no internal plan.

---

### Rule 15 — The 2.3-point factor is not a measured lunar gap

**Rule.** Do not call URBAN Table 2's largest delta a measured difference between 1 g and the Moon, and do not call it a margin that covers the lunar tests.

**Mechanism.** The last column is the one-sided 95 % slope of the 1 g forced-flow limit, multiplied by an assumed 35 cm/s buoyant speed, extrapolating that line from 35 cm/s down to zero flow. It is a proposed correction for other test methods. It is not the vertical distance between a lunar data point and a 1 g data point.

**Applies when.** Someone asks for a single oxygen-point correction to turn Test 1 into a lunar test.

**Does not apply when.** You are quoting a measured pair from OLSON Table I or the poster. Those are measurements (with the caveats in rules 3, 6 and 8), not this extrapolation.

**Evidence.**

- DATA. URBAN Table 2, p. 11, "Flammability Compensation Factors". Largest printed delta is 2.3 oxygen points, on the polycarbonate row. Nomex Velcro's printed delta is 0.32. The slope is a 1 g slope.
- DATA. URBAN p. 10: 35 cm/s is Takahashi's estimate of a 1 g buoyant speed, used as a conservatively high value. The lunar buoyant speed is described as unknown.
- DATA. URBAN p. 9: the authors say the lunar points for the materials that fail Test 1 in air do not follow the 1 g extrapolation, and they call the mismatch unexplained. The notes' figure reading (UNVERIFIED as numbers, because of the caption problem in rule 7) put those lunar points about 1–3 oxygen points below even the zero-flow end of the 1 g line.
- INFERENCE. A 2.3-point shift applied to Test 1 would be an unadopted proposal, and it would not have covered the lunar results the same paper plots for PMMA, P-213 and cotton. Polycarbonate, the source of the 2.3, was one of the materials that was less flammable in lunar g, so the worst-case slope did not come from the worst-case lunar observation.

**Counter-evidence.** The authors did intend the factor as a conservative allowance "before" treating the high-flow index as a standard, and they say more work is required first (p. 9). Quote that intention as theirs, and quote the unexplained mismatch in the next sentence.

---

### Rule 16 — Words the explanation must not produce

**Rule.** Do not write that a material is safe, unsafe, safer or safely used; do not write that it is certified; do not write that NASA never tested it.

**Mechanism.** A limiting oxygen is a test outcome under named conditions. It is not a flight-approval. "Never" is a claim about everything NASA has done, and this tool only sees the records loaded for the question. The verifier rejects those strings and will discard the answer.

**Applies when.** Every explanation, including case 3 and including quotations. Paraphrase papers that use those words.

**Does not apply when.** The user typed the word in the question. Do not repeat it in the answer. "Fire safety" as a topic name is allowed. "Not reported" is the right phrase for a missing field.

**Evidence.**

- DATA. STD p. 28 uses "self-extinguishing" for the Test 1 criterion. Use that, or "the limit", or "burned" / "went out", with the criterion attached.
- DATA. OLSON p. 8 does use a flight-approval adjective this rule forbids. Paraphrase: the authors warn that a material which passes the 1 g screening may still burn under partial gravity.
- INFERENCE. "In the data we reviewed" is the strongest absence claim this tool can support (rule 10). PSI on 2026-11-14 had no partial-gravity combustion investigation, which supports "not in the PSI index we read", not "NASA never tested partial gravity". OLSON, URBAN, LUCI and SACK are partial-gravity tests.

**Counter-evidence.** None. This rule is about wording, not about hiding a negative result. A lower lunar limit is reported in full under rules 3 and 7.

---

## Gaps I could not resolve

- Sacksteder & T'ien 1994 was not opened. The lunar spread-rate peak in the LPSC abstract stands or falls with that paper.
- T'ien, Combustion and Flame, 1986, was not opened. The unscaled model curve on FOTM slide 8 is still a model curve either way.
- Ferkul & Olson 2011 was not opened. OLSON's lunar and 0 g table rows are secondary until that paper is read. The identical Ultem and Nomex lunar pairs cannot be checked against it.
- HEO-DM-1006 and the February 2013 Associate Administrator memo were not opened. The 8.2 psia / ≥33.7 % oxygen statement is the ECLSS report describing them.
- No opened source states a measured partial-gravity limit for these materials at about 34 % oxygen and 56.5 kPa. That gap is the point of case 3, not a hole in the writing.
- URBAN never prints a numeric lunar oxygen limit. Figure-read numbers for PMMA, P-213 and cotton are UNVERIFIED because the figures and captions in the opened PDF do not agree. Polycarbonate and Nomex Velcro are "substantially higher" in the text; the exact percents are not printed.
- How the poster turned its tests into "about 29 %" and "about 38 %" is not explained on the poster.
- LUCI prints no numeric g. "About 0.18 g" is a plot reading. "0.165 g" is computed from 11 rpm and 1.22 m.
- The LUCI oxygen traces disagree with each other (slide 15 versus slides 22 and 42). The notes left that unresolved.
- BASS Table 7.1 and Table A.6 disagree on a sample width for one reused test, and one date in Table A.6 looks like a typo. The 17.2 % and 18.2 % rows used here are internally consistent in Table 7.1.
- ECLSS Table 1 was reconstructed from extracted text, not from a rendered page.
- Cabin air speed in cm/s for a lunar habitat is not in the ECLSS report (only volumetric flow of hardware, and the qualitative point that lower pressure means higher velocity for the same cooling).
- ISO 14624-1 was not opened, so the igniter energy behind Test 1 is UNVERIFIED.
- PSI tables are loaded (159 rows; see rule 2). BASS-II lists 130 rows and 125 are loaded; the difference is not reconciled. PSI has no partial-gravity combustion investigation (rule 10).
- The ECLSS report and HEO-DM-1006 are not yet listed in `docs/sources.md` (rules 10–11).

## Sources I could not open

- Sacksteder, K. R. & T'ien, J. S. (1994). Proc. Combust. Inst. 25, 1685–1692.
- T'ien, J. S. (1986). Combustion and Flame. Cited on FOTM slide 7; volume and pages were not copied into the notes.
- Ferkul, P. V. & Olson, S. L. (2011). Journal of Thermophysics and Heat Transfer 25(3): 457–461. The citation string is the one carried in this repository; the PDF was not opened.
- HEO-DM-1006 (2021-02-18) and the 2013 Associate Administrator memo "Exploration Atmospheres".
- ISO 14624-1:2003.
- Hirsch et al. 2003 and Hirano et al. 1974, cited by BASS for a 15.4 % normal-gravity limit and a 20 cm/s buoyant speed.
- Older revisions of NASA-STD-6001 before B with Change 3.
- PSI videos and raw spreadsheets for BASS, BASS-II and Saffire. The experimental tables were downloaded (`data/psi/`); the video and image files were not.
