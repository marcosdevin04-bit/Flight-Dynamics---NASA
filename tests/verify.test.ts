import { describe, expect, it } from "vitest";
import { FM2_NOTE, NO_MATCH_MESSAGE, WEIGHTS, loadEvidence, rank } from "../lib/evidence/rank";
import {
  extractCitations,
  extractNumbers,
  findForbidden,
  numberMatches,
  splitSentences,
  verifyExplanation,
} from "../lib/evidence/verify";

const all = loadEvidence();
const sibal = rank({ material: "SIBAL", o2_pct: 18, flow_cm_s: 10 });
const retrieved = sibal.results.map((x) => x.record);
const opts = { allRecords: all, scenario: sibal.scenario };
const kinds = (t: string, r = retrieved) => verifyExplanation(t, r, opts).errors.map((e) => e.kind);

describe("a good explanation passes", () => {
  it("SIBAL demo answer with citations, numbers, gravity and rounding", () => {
    const text = [
      "In the data we reviewed, the closest test in lunar gravity is the LUCI rotating sounding rocket flight, where SIBAL kept spreading at about 18–20% O2 with a flame base speed of 0.92 mm/s [csv-1].",
      "On the ISS (microgravity, not lunar gravity), a reused sample did not ignite at 17.2% O2 and showed a one-sided flame at 18.2% O2, both at 10 cm/s [GMT190-T23, GMT190-T24].",
      "Your scenario of 18% O2 at 10 cm/s sits between those two microgravity tests, so they do not settle what happens on the Moon.",
      "Microgravity removes buoyancy entirely, while the Moon keeps about 1/6 of Earth's buoyancy, so the flame gets its oxygen differently.",
    ].join(" ");
    const r = verifyExplanation(text, retrieved, opts);
    expect(r.errors).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.citations).toEqual(["csv-1", "GMT190-T23", "GMT190-T24"]);
    expect(r.numbers_checked).toBeGreaterThan(5);
  });
  it("accepts rounding to the written precision (15.6 → 16, -5.75 → 5.8)", () => {
    const moon = rank({ material: "Mylar", o2_pct: 15.6, pressure_kPa: 70.3, flow_cm_s: 0 });
    const recs = moon.results.map((x) => x.record);
    const t = "Mylar burned in lunar gravity down to about 16% O2, roughly 5.8 points below its 1 g limit [mylar-g@luna].";
    expect(verifyExplanation(t, recs, { allRecords: all, scenario: moon.scenario }).errors).toEqual([]);
  });
  it("a CSV alias of a retrieved record counts as that record", () => {
    const moon = rank({ material: "Mylar", o2_pct: 15.6, pressure_kPa: 70.3, flow_cm_s: 0 });
    const recs = moon.results.map((x) => x.record);
    const r = verifyExplanation("The lunar ULOI was 15.6% O2 [csv-6].", recs, { allRecords: all });
    expect(r.ok).toBe(true);
    expect(r.citations).toEqual(["mylar-g@luna"]);
  });
  it("a citation placed after the period still covers its sentence", () => {
    expect(kinds("The reused sample did not ignite at 17.2% O2. [GMT190-T23]")).toEqual([]);
  });
  it("identifiers with digits are not treated as numbers", () => {
    expect(kinds("FM2 and BASS-II used NASA-STD-6001 Test 1 references; see GMT190-T24 and ICES-2025-392 [GMT190-T24].")).toEqual([]);
  });
});

describe("citations", () => {
  it("rejects an id that does not exist", () => {
    expect(kinds("It burned at 21% O2 [made-up-1].")).toContain("unknown_id");
  });
  it("rejects an id that exists but was not retrieved", () => {
    expect(kinds("Mylar's lunar ULOI was 15.6% O2 [mylar-g@luna].")).toContain("not_retrieved");
  });
  it("rejects an explanation that cites nothing when records were retrieved", () => {
    expect(kinds("SIBAL behaves differently in lunar gravity.")).toEqual(["no_citations"]);
  });
  it("parses lists like [a, b] and [a; b]", () => {
    expect(extractCitations("x [a, b] y [c;d]")).toEqual(["a", "b", "c", "d"]);
  });
});

describe("numbers", () => {
  it("rejects a number that is not in the cited record", () => {
    expect(kinds("The reused sample did not ignite at 16.0% O2 [GMT190-T23].")).toContain("number_not_in_cited_record");
  });
  it("rejects a number taken from a different retrieved record than the one cited", () => {
    // 18.2 belongs to GMT190-T24, not to GMT190-T23
    expect(kinds("The reused sample did not ignite at 18.2% O2 [GMT190-T23].")).toContain("number_not_in_cited_record");
  });
  it("page numbers, years and NTRS ids are not citable values", () => {
    // 33 is only a slide page of the LUCI source; 2025 only its year
    expect(kinds("SIBAL spread at 33 mm/s in lunar gravity [csv-1].")).toContain("number_not_in_cited_record");
    expect(kinds("SIBAL spread at 2025 mm/s in lunar gravity [csv-1].")).toContain("number_not_in_cited_record");
  });
  it("source references in the sentence are not checked as values", () => {
    const moon = rank({ material: "Mylar", o2_pct: 15.6, pressure_kPa: 70.3, flow_cm_s: 0 });
    const recs = moon.results.map((x) => x.record);
    const t = "Olson & Ferkul 2012 (Table I, p. 6; NTRS 20130010991) report a lunar ULOI of 15.6% O2 [mylar-g@luna].";
    expect(verifyExplanation(t, recs, { allRecords: all }).errors).toEqual([]);
  });
  it("a percentage must match an oxygen value, not any number in the record", () => {
    const moon = rank({ material: "Mylar", o2_pct: 15.6, pressure_kPa: 70.3, flow_cm_s: 0 });
    const recs = moon.results.map((x) => x.record);
    // 30 exists in the record (30 cm/s flow warning) but not as an O2 value
    const r = verifyExplanation("Mylar's lunar limit was 30% O2 [mylar-g@luna].", recs, { allRecords: all });
    expect(r.errors.map((e) => e.kind)).toContain("number_not_in_cited_record");
    // the same 30 as a flow is fine
    expect(verifyExplanation("The 0 g point used 30 cm/s of forced flow [mylar-g@luna].", recs, { allRecords: all }).ok).toBe(true);
  });
  it("rejects an uncited number that is not a scenario or reference value", () => {
    expect(kinds("SIBAL burns at 19.4% O2 [csv-1]. It would extinguish at 12% O2.")).toContain("uncited_number");
  });
  it("allows scenario values and reference values without citation", () => {
    expect(kinds("You asked about 18% O2 at 10 cm/s in 0.16 g; the habitat plan is 34% O2 at 8.2 psi [csv-1].")).toEqual([]);
  });
  it("catches units glued to numbers", () => {
    expect(extractNumbers("spread at 0.92mm/s in 1g").map((n) => n.value)).toEqual([0.92, 1]);
  });
  it("rounding is to the written precision only", () => {
    const n = (t: string) => extractNumbers(t)[0];
    expect(numberMatches(n("16"), 15.6)).toBe(true);
    expect(numberMatches(n("15.6"), 15.6)).toBe(true);
    expect(numberMatches(n("15.7"), 15.6)).toBe(false);
    expect(numberMatches(n("15"), 15.6)).toBe(false);
    expect(numberMatches(n("3,217"), 3217)).toBe(true);
  });
});

describe("forbidden words", () => {
  it.each([
    "This material is safe on the Moon [csv-1].",
    "It is unsafe at 18% O2 [csv-1].",
    "A safer choice would be SIBAL [csv-1].",
    "It can be used safely [csv-1].",
    "The material is certified for flight [csv-1].",
    "NASA never tested SIBAL at this pressure [csv-1].",
  ])("rejects: %s", (t) => {
    expect(kinds(t)).toContain("forbidden_word");
  });
  it('allows "safety" (as in fire safety)', () => {
    expect(findForbidden("Fire safety depends on material selection.")).toEqual([]);
  });
});

describe("sentence splitting", () => {
  it("does not split decimals or 'p. 6'", () => {
    expect(splitSentences("ULOI 15.6% (Table I, p. 6) [mylar-g@luna]. Next sentence.")).toHaveLength(2);
  });
});

describe("PLAN §8 acceptance 5: no forbidden words in any English text the response can carry", () => {
  it("record texts (outcome, warnings, display, gravity label)", () => {
    const hits: string[] = [];
    for (const r of all) {
      const texts = [r.resultado_en, r.gravity_label, ...r.warnings_en, ...Object.values(r.display)];
      for (const t of texts) for (const w of findForbidden(t)) hits.push(`${r.id}: "${w}" in "${t.slice(0, 80)}"`);
    }
    expect(hits).toEqual([]);
  });
  it("weights, the no-match message and the FM2 note", () => {
    expect(findForbidden(JSON.stringify(WEIGHTS))).toEqual([]);
    expect(findForbidden(NO_MATCH_MESSAGE)).toEqual([]);
    expect(findForbidden(FM2_NOTE)).toEqual([]);
  });
});
