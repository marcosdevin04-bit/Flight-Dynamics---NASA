import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadEvidence, rank, type Scenario } from "../lib/evidence/rank";
import { ALLOWED_REFERENCE_NUMBERS, extractNumbers, findForbidden, numberMatches } from "../lib/evidence/verify";

interface GoldenScenario {
  id: string;
  query_natural_language: string;
  params: Scenario;
  expected_case: 1 | 2 | 3;
  expected_reason: string;
  expected_record_ids: string[];
  must_mention: string[];
  must_not_say: string[];
  why: string;
}

const read = (p: string) => readFileSync(new URL(p, import.meta.url), "utf8");
const file = JSON.parse(read("../lib/evidence/golden_set.json")) as { scenarios: GoldenScenario[] };
const records = loadEvidence();
const known = new Set(records.map((r) => r.id));

describe("golden set matches the ranker", () => {
  it("has 12 to 15 scenarios and the required situations", () => {
    expect(file.scenarios.length).toBeGreaterThanOrEqual(12);
    expect(file.scenarios.length).toBeLessThanOrEqual(15);
    const ids = file.scenarios.map((s) => s.id);
    for (const needle of ["mylar-lunar", "polycarbonate-8.2", "nomex-ht-14.7", "nomex-ht-8.2", "sibal-18", "habitat-34", "material-absent", "do-not-say-safe"]) {
      expect(ids.some((id) => id.includes(needle)), needle).toBe(true);
    }
  });

  it.each(file.scenarios.map((s) => [s.id, s] as const))("%s", (_id, s) => {
    const r = rank(s.params);
    expect(r.case).toBe(s.expected_case);
    expect(r.reason).toBe(s.expected_reason);
    expect(r.results.map((x) => x.id)).toEqual(s.expected_record_ids);
    for (const id of s.expected_record_ids) expect(known.has(id), id).toBe(true);
    expect(s.must_not_say).toEqual(expect.arrayContaining(["safe", "certified", "NASA never tested"]));
    if (s.expected_case === 3) {
      expect(s.must_mention.join(" ")).toMatch(/FM2/);
      expect(s.must_mention.join(" ")).toMatch(/No matching test in the data we reviewed/);
      expect(r.fm2_note).toMatch(/FM2/);
    }
  });
});

describe("golden must_mention is something a verified answer can actually say", () => {
  it.each(file.scenarios.map((s) => [s.id, s] as const))("%s", (_id, s) => {
    const r = rank(s.params);
    // What the explanation may cite: the results, or the context shown in case 3.
    const citable = (s.expected_case === 3 ? r.context : r.results).map((x) => x.record);
    const scenarioValues = [s.params.o2_pct, s.params.flow_cm_s, s.params.pressure_kPa].filter((v): v is number => typeof v === "number");
    if (typeof s.params.pressure_kPa === "number") scenarioValues.push(s.params.pressure_kPa / 6.894757);

    for (const phrase of s.must_mention) {
      // The verifier would reject the whole answer if a required phrase were a forbidden word.
      expect(findForbidden(phrase), `"${phrase}" uses a forbidden word`).toEqual([]);
      for (const n of extractNumbers(phrase)) {
        const ok =
          [...ALLOWED_REFERENCE_NUMBERS, ...scenarioValues].some((v) => numberMatches(n, v)) ||
          citable.some((rec) => rec.numbers.some((v) => numberMatches(n, v)));
        expect(ok, `"${phrase}": ${n.text} is not in any record the answer can cite`).toBe(true);
      }
    }
  });

  it.each(file.scenarios.map((s) => [s.id, s] as const))("%s carries the level label of non-verified records", (_id, s) => {
    const r = rank(s.params);
    const weak = r.results.filter((x) => x.record.nivel !== "verificado");
    if (weak.length) expect(s.must_mention.join(" ")).toMatch(/secondary|unverified/);
  });
});

describe("research notes match what is loaded", () => {
  const psiLoaded = records.some((r) => r.id.startsWith("psi-"));
  it.each(["../lib/evidence/interpretation_rules.md", "../lib/evidence/judge_questions.md", "../lib/evidence/golden_set.json"])(
    "%s does not say the PSI tables are missing",
    (p) => {
      expect(psiLoaded).toBe(true);
      expect(read(p)).not.toMatch(/pending PSI ingestion|not in this repository yet|not ingested|data files were not downloaded|PSI data files were not/i);
    },
  );
});
