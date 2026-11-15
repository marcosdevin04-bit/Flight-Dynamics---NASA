# Before the First Fire on the Moon: registered prediction for FM2

**Registered:** 2026-11-14T22:26-03:00 (Uruguay, UTC-3), by the "Flame in Freefall" team (NASA Space Apps 2026). We wrote this before any FM2 (Flammability of Materials on the Moon) results were public; our 2026-11-14 web search found none. Every statement below is an inference from earlier tests. Machine-readable copy: `prediction.json`.

**What FM2 is expected to burn.** Four solid samples, burned one at a time in quiescent, habitable atmospheres in real lunar gravity (Ferkul, Kralik, Liao & Johnston, LPSC 2026 abstract 1799, p.1). The 2024 FM2 poster lists two SIBAL cotton/fiberglass fabrics, burned in air (21% O2, 14.7 psia), and two acrylic rods, burned in "Normoxic Space Exploration Atmospheres"; the chamber can reproduce 21% O2 at 14.7 psia and 34% O2 at 8.2 psia (56.5 kPa). One of each is burned upward and one downward (Zayac, Johnston, Ruff & Ferkul 2024, FM2 poster, NTRS 20240015307). A 2025 poster names "Synergy Pro" and says its Nomex tests are "designed to help guide the final selection of fuel" for FM2 (Schechter et al. 2025, Nomex/FM2 poster, NTRS 20250010975). The final sample list is not confirmed. We assume the acrylic atmosphere is 34% O2 at 8.2 psia; the poster does not state it for that sample.

## P1. SIBAL fabric, air, burning downward

- **Expectation.** In lunar gravity we expect the SIBAL flame to keep spreading downward in air, where 1 g gives a shorter-lived flame or none.
- **Range.** We expect a steady flame-base spread rate of about 0.6 to 1.4 mm/s.
- **Basis.**
  - On LUCI, a spinning sounding rocket that simulated lunar gravity, SIBAL spread steadily downward at a base rate of 0.92 mm/s and a tip rate of 1.1 mm/s (Ferkul et al. 2025, LUCI presentation (ASGSR 2025), NTRS 20250010653, slides 16, 19).
  - In the 1-g ground comparison the flame went out about 45 s sooner (slides 33, 34).
  - NASA reports that SIBAL "only" burns downward in air in lunar g (Zayac, Johnston, Ruff & Ferkul 2024, FM2 poster, NTRS 20240015307).
- **Confirmed if** the flame keeps spreading for at least 30 s after the igniter turns off.
- **Refuted if** it goes out within 10 s. Spread rates outside 0.6 to 1.4 mm/s refute the range only.

## P2. Habitat atmosphere (34% O2, 56.5 kPa): the effect depends on the material

- **P2a. Acrylic, and other materials that fail Test 1 in air.**
  - **Expectation.** We expect the flame to survive to a *lower* O2 level in lunar gravity than in 1 g. Our central guess is about 2 percentage points lower.
  - **Basis.** At 56.5 kPa, the lunar-g limit for PMMA was below every extrapolation of the 1-g data, with a conservative correction of 1.9 % O2 (Urban et al. 2025, ICES-2025-392, NTRS 20250002114, p.9, Fig. 7, Table 2). For Mylar, the midpoint of the burn and extinction limits was 5.75 points lower in lunar gravity than at 1 g, at 70.3 kPa (Olson & Ferkul 2012, AIAA 2012-3492, NTRS 20130010991, Table I, p.6).
  - **Confirmed if** FM2's extinction O2 is lower than the 1-g reference, beyond sensor uncertainty.
  - **Refuted if** it is equal or higher.
- **P2b. High-pyrolysis-temperature materials that pass Test 1 (Nomex- and polycarbonate-type).** This branch applies only if FM2 flies one.
  - **Expectation.** We expect the extinction O2 to be equal to or *higher* than at 1 g.
  - **Basis.** Urban et al. 2025, ICES-2025-392, NTRS 20250002114, p.11, Figs. 11-12; Nomex HT90-40 at 8.2 psi gives an approximate limiting O2 of ~29% at lunar g versus ~23% at 1 g (Schechter et al. 2025, Nomex/FM2 poster, NTRS 20250010975).
  - **Refuted if** the extinction O2 is lower than 1 g.

## Caveats

1. **No real lunar burn yet.** All partial-gravity evidence comes from centrifuges: 5.2 s drop-tower tests, or LUCI's spinning rocket with Coriolis deflection. None was a long burn in true lunar gravity.
2. **Different pass/fail criteria.** The reduced-g limits use a 5 s extinction criterion; NASA-STD-6001 Test 1 uses a 15.2 cm burn length.
3. **Conditions differ from FM2.** The 0 g points in Olson & Ferkul 2012 used 30 cm/s forced flow. Much of the evidence is at 70 to 101 kPa, not 56.5 kPa. Lunar values for Mylar, Ultem and Nomex are reproduced from a 2011 paper we have not read.
4. **LUCI gravity and conditions.**
   - Our 0.165 g comes from 11 RPM at 1.22 m. The plotted gravity traces sit near 0.18 g (our visual reading of slides 41 and 44).
   - Gravity dropped after about 125 s during the PMMA burn.
   - Pressure was stated only as "normal".
5. **Sources disagree about SIBAL at 1 g.** The LUCI ground burn spread before going out; the 2024 poster says SIBAL extinguishes immediately.
6. **Our thresholds.** The 30 s and 10 s cut-offs and the 0.6 to 1.4 mm/s interval are our own choices, not NASA criteria.
7. **Scope.** A material that burns less readily in one test is not shown to be non-flammable. These are expectations, not engineering limits.
