import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadEvidence, rank, type Scenario } from "../lib/evidence/rank";

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

const file = JSON.parse(readFileSync(new URL("../lib/evidence/golden_set.json", import.meta.url), "utf8")) as {
  scenarios: GoldenScenario[];
};
const known = new Set(loadEvidence().map((r) => r.id));

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
