# Partial-gravity flammability evidence: gaps summary

Companion to `partial_gravity_flammability_evidence.csv` (45 rows, one per test or per reported limit). Compiled 2026-11-14. Every value in the CSV was read from a full text, except where the `verification` column says SECONDARY or UNVERIFIED.

## Answer: can we plot flammability vs gravity for one material?

**Yes, for three thin materials, as an oxygen limit vs g with four points each.** The source is Olson & Ferkul 2012 (ICES, NTRS 20130010991), Table I, p.6. It gives upward-spread oxygen limits at 1 g, Martian 0.38 g, lunar g and 0 g (with 30 cm/s forced flow):

| Material (pressure) | 1 g ULOI/MOC | Martian ULOI*/MOC* | Lunar ULOI*/MOC* | 0 g* ULOI*/MOC* |
|---|---|---|---|---|
| Mylar G 0.127 mm (70.3 kPa) | 21.2 / 20.0 | 18.0 / 17.0 | 15.6 / 14.1 | 17.0 / 16.0 |
| Ultem 1000 0.254 mm (70.3 kPa) | 23.5 / 23.0 | 22.0 / 21.1 | 21.0 / 19.9 | 24.0 / 23.0 |
| Nomex HT90-40 0.305 mm (101.3 kPa) | 23.5 / 22.1 | 19.9 / 19.0 | 21.0 / 19.9 | 23.0 / 22.0 |

The shift relative to 1 g (dO2, recomputed with the paper's Eq. 1; it matches Table I) is:

- Mylar: −3.1 at Martian g, −5.75 at lunar g, −4.1 at 0 g.
- Ultem: −1.7 at Martian g, −2.8 at lunar g, +0.25 at 0 g.
- Nomex: −3.35 at Martian g, −2.35 at lunar g, −0.3 at 0 g.

For Mylar and Ultem the minimum oxygen limit falls at lunar g, which matches the hypothesis behind FM2. For Nomex HT90-40 at 14.7 psia the minimum falls at Martian g instead.

Caveats that must go with any plot of these points:

1. The reduced-g limits use a 5.18 s drop criterion, while the 1 g limits use the 15.2 cm burn-length criterion. The authors say the two are not equivalent.
2. The lunar and 0 g values come from Ferkul & Olson 2011 (JTHT 25(3)), which we did **not** read. We only have them as reproduced in the 2012 table. The exact lunar g value is not stated in the text we accessed.
3. The 0 g point is at 30 cm/s forced flow, not quiescent air.
4. Limits are bracketed at 1 % O2 steps with no replicates reported.
5. Pressure is 70.3 kPa or 101.3 kPa, **not** the habitat condition of 56.5 kPa.

A second candidate is thin cellulose (Kimwipes) spread rate vs g at 0.1, 0.16, 0.38 and 1 g, from KC-135 flights (Sacksteder et al. 2003; Feier et al. 2001). Those values exist only in figures and would need digitizing.

## Lunar habitat atmosphere (34 % O2, 56.5 kPa / 8.2 psia): what exists

- **Partial g at 56.5 kPa, with numbers.** The only source is the Nomex HT90-40 poster (NTRS 20250010975). It gives an approximate limiting oxygen concentration of ~23 % at 1 g, ~29 % at lunar g and ~38 % at 0 g. So at this pressure, lunar g was *less* flammable than 1 g, which is the opposite of the 14.7 psia result above.
- **Partial g at 56.5 kPa, without numbers.** ICES-2025-392 (NTRS 20250002114) ran lunar-g centrifuge drops on five materials. The results split by material:
  - PMMA, P-213 tape and cotton T-shirt (all three fail Test 1 in air) burned to *lower* oxygen at lunar g.
  - Polycarbonate and Nomex Velcro (both pass Test 1) extinguished at *higher* oxygen at lunar g.
  - The lunar-g limit values are only plotted (Figs. 7–12). The paper's conservative correction from 1 g to lunar g is ≤ 2.3 % O2 (Table 2, p.11).
- **0 g near the habitat atmosphere.** Saffire VI burned SIBAL at 31.0 % O2 and 54.1 kPa with 20 cm/s flow (burn 112 s, peak 3.2 kW). In the same flight, Nomex fabric did not ignite.
- **1 g at the habitat atmosphere.** There is only a qualitative image caption: SIBAL burns downward at 34 % / 8.2 psi (FM2 2024 poster).
- **Not found:** any partial-g test at 34 % O2 and 56.5 kPa with a measured spread rate or limit.

## Discrepancies flagged (not resolved)

1. **Where the spread-rate peak lies.**
   - The FM2 abstract (1799.pdf p.1) says flame spread rate vs gravity "peaks there" (at lunar g), citing Sacksteder & T'ien 1994.
   - The 2003 NASA CP paper from the same group (NTRS 20040053567, p.142) reports the downward spread peak "near the Martian gravity levels of 0.38", for 2 cm Kimwipes at 27.6 kPa.
   - The conditions differ, and the 1994 paper was not read, so this stays open.
   - The "oxygen minimum near lunar g" statement is attributed to a *model* (Fire on the Moon 2021, NTRS 20210020516, slide 8).
2. **SIBAL at 1 g.**
   - The FM2 2024 poster says SIBAL in air at 1 g "extinguishes immediately after ignition".
   - The LUCI 1 g ground burn reports spread at base 1.5 mm/s and tip 2.8 mm/s before extinction.
   - The LUCI 1 g slides state neither orientation nor pressure.
3. **LUCI gravity history.** Slide 22 attributes the PMMA O2 rise to a gravity drop at 125 s, but slide 44 says gravity was "~constant for the duration of the burn".
4. **Olson & Ferkul 2012, Fig. 6 caption.** It gives the average 0 g margin as −2.6 % and the Martian margin as "2.7 %". From Table I the averages are 0 g −1.38, Martian −2.72 and lunar −3.63. The 0 g figure in the caption does not match the table, and the sign is missing on the Martian value.
5. **Nomex direction reverses with pressure.**
   - At 14.7 psia (2012), lunar g is more flammable than 1 g.
   - At 8.2 psia (2025 poster; ICES-2025 for Nomex Velcro), lunar g is less flammable than 1 g.
   - Different products and protocols were used, so this shows pressure dependence but does not prove it.

## Requested sources not obtained

| Source | Status | What's needed |
|---|---|---|
| Sacksteder & T'ien 1994, PCI 25:1685 | Paywalled; only the 1993 companion abstract was read (NTRS 19930040901) | Institutional PDF |
| Ferkul & Olson 2011, JTHT 25(3):457 (also AIAA 2010-6260) | Paywalled; values used only as reproduced in the 2012 Table I | Institutional PDF |
| Urban et al. 2019, Combust. Flame 199:168 | Paywalled; replaced by the NTRS 20170008805 Saffire-I presentation | Institutional PDF |
| Rojas-Alva & Jomaas 2022, Mendeley 10.17632/2gw4pjhkxz.1 | data.mendeley.com refused automated access (Cloudflare 1010) | Download the files manually into the vault |
| Japanese / CNES partial-g parabolic flights | Konno et al. 2026 (C&F 114800, centrifuge in parabolic flight, wire, lunar g) is closed access and unread. Onishi et al. 2010 (J-STAGE) was read but covers 0 g and 1 g only. CNES DIAMONDS (0–0.379 g capability, per the Fortenberry white paper, Table 1) has no partial-g solid-fuel results located | PDF of Konno 2026; a targeted CNES search |
| NASA-STD-6001 Test 1 database (MAPTIS) | Not accessible | MAPTIS account |
| Lunar-g limit values in ICES-2025 Figs. 7–12; Kimwipes rates in Figs. 1–2 and 8–10; BASS-II SIBAL rates in Fig. 7.4 | Present only as plots | Figure digitizing, marked "derived" |

## How the "~150 s rotating sounding rocket" was identified

The FM2 abstract does not cite this test. We matched it to LUCI (NTRS 20250010653): Blue Origin New Shepard, 11 RPM at 1.22 m. Our derived g is 0.165; the presentation does not state a g value. The flight burned SIBAL fabric and a 4 mm PMMA rod in air, burns lasted more than 2.5 minutes, and it flew on 2025-02-04. The authors and the "two different materials" detail match. This identification is our inference.
