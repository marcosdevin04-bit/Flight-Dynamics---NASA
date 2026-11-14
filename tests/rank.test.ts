import { describe, expect, it } from "vitest";
import {
  FM2_NOTE,
  NO_MATCH_MESSAGE,
  THRESHOLD,
  TOP_K,
  WEIGHTS,
  gravityDistance,
  loadEvidence,
  rank,
} from "../lib/evidence/rank";
import type { EvidenceRecord } from "../lib/evidence/types";

const records = loadEvidence();
const ids = (xs: { id: string }[]) => xs.map((x) => x.id);

/** Minimal synthetic record for edge cases (not real data; never written to evidence.json). */
function fixture(over: Partial<EvidenceRecord>): EvidenceRecord {
  return {
    id: "fx", material: "Testium", espesor_mm: null, gravedad: "1 g", g: 1, o2: 21, presion_kPa: 101.3, flujo: "", resultado: "",
    fuente: { cita: "fixture", ntrs: null, psi: null, ubicacion: "-" }, nivel: "verificado", advertencia: "",
    gravity_regime: "1g", gravity_label: "tested in 1 g", nivel_label: "verified", material_key: "testium", platform: null,
    g_levels: null, g_range: null, o2_range: null, o2_approx: false, limits: null, delta_o2_vs_1g: null, presion_range: null,
    flow_cm_s: 0, flow_range: null, duration: null, resultado_en: "", warnings_en: [],
    display: { o2: "", pressure: "", flow: "", gravity: "", thickness: "" }, not_reported: [], numbers: [],
    dataset: "fixture", source_path: "fixture", aliases: [], duplicate_of: null, rankable: true,
    ...over,
  };
}

describe("PLAN §8 acceptance 3: SIBAL at 18.0 % O2, 10 cm/s", () => {
  const r = rank({ material: "SIBAL", o2_pct: 18, flow_cm_s: 10 });
  it("is case 2 (similar tests)", () => {
    expect(r.case).toBe(2);
    expect(r.results.length).toBeLessThanOrEqual(TOP_K);
  });
  it("shows the 17.2 % and 18.2 % BASS-II tests, labeled microgravity, with the reused-sample warning", () => {
    for (const id of ["GMT190-T23", "GMT190-T24"]) {
      const x = r.results.find((x) => x.id === id);
      expect(x, id).toBeDefined();
      expect(x!.record.gravity_regime).toBe("microgravity");
      expect(x!.record.warnings_en.join(" ")).toMatch(/REUSED/);
    }
    expect(r.results.find((x) => x.id === "GMT190-T23")!.record.o2).toBe(17.2);
    expect(r.results.find((x) => x.id === "GMT190-T24")!.record.o2).toBe(18.2);
  });
  it("also shows the LUCI rotating-rocket test in lunar gravity", () => {
    const luci = r.results.find((x) => x.id === "csv-1");
    expect(luci).toBeDefined();
    expect(luci!.record.gravity_regime).toBe("partial");
    expect(luci!.record.gravity_label).toMatch(/rotating sounding rocket/);
  });
  it("only shows SIBAL and every result is below the threshold", () => {
    for (const x of r.results) {
      expect(x.same_material).toBe(true);
      expect(x.distance).toBeLessThan(THRESHOLD);
    }
  });
});

describe("PLAN §8 acceptance 4: a combination with no data (Mylar at 34 % O2, 8.2 psi)", () => {
  const r = rank({ material: "Mylar", o2_pct: 34, pressure_kPa: 56.5 });
  it('says "No matching test in the data we reviewed" and mentions FM2', () => {
    expect(r.case).toBe(3);
    expect(r.reason).toBe("no_close_conditions");
    expect(r.message).toBe(NO_MATCH_MESSAGE);
    expect(r.message).toContain("in the data we reviewed");
    expect(r.fm2_note).toBe(FM2_NOTE);
    expect(r.fm2_note).toMatch(/FM2/);
    expect(r.results).toEqual([]);
  });
  it("offers the closest Mylar data as context, outside the threshold", () => {
    expect(r.context[0].id).toBe("mylar-g@luna");
    for (const x of r.context) expect(x.within_threshold).toBe(false);
  });
});

describe("documented behaviour at the habitat atmosphere (34 % O2, 56.5 kPa) for materials WITH nearby data", () => {
  it("SIBAL: case 2 via Saffire VI (0 g, 31 %, 54.1 kPa); the 1 g test at exactly 34 %/56.5 kPa does not count alone", () => {
    const r = rank({ material: "SIBAL", o2_pct: 34, pressure_kPa: 56.5 });
    expect(r.case).toBe(2);
    expect(ids(r.results)).toEqual(["csv-42"]);
    expect(r.results[0].record.gravity_regime).toBe("microgravity");
    expect(ids(r.results)).not.toContain("csv-45");
  });
  it("Nomex HT90-40: case 2 via the lunar-g poster value (~29 % at 56.5 kPa)", () => {
    const r = rank({ material: "Nomex HT90-40", o2_pct: 34, pressure_kPa: 56.5 });
    expect(r.case).toBe(2);
    expect(r.results[0].id).toBe("nomex_ht90_40_poster@luna");
  });
});

describe("case 1: same test", () => {
  it("Mylar at the lunar ULOI and test pressure matches the lunar centrifuge point", () => {
    const r = rank({ material: "Mylar", o2_pct: 15.6, pressure_kPa: 70.3, flow_cm_s: 0 });
    expect(r.case).toBe(1);
    expect(r.results[0].id).toBe("mylar-g@luna");
    expect(r.results[0].distance).toBe(0);
  });
  it("polycarbonate (acceptance 2) resolves to the ICES-2025-392 lunar record", () => {
    const r = rank({ material: "polycarbonate" });
    expect(r.case).toBe(1);
    expect(r.results[0].id).toBe("policarbonato");
    expect(r.results[0].record.fuente.cita).toMatch(/ICES-2025-392/);
  });
  it("never claims case 1 from a microgravity or 1 g test", () => {
    const r = rank({ material: "SIBAL", o2_pct: 18.2, flow_cm_s: 10 });
    expect(r.case).toBe(2); // GMT190-T24 matches O2 and flow exactly, but it is 0 g
  });
  it("never claims case 1 without a material", () => {
    expect(rank({ o2_pct: 15.6, pressure_kPa: 70.3 }).case).not.toBe(1);
  });
});

describe("edge: material not in the data", () => {
  const r = rank({ material: "Kapton", o2_pct: 21 });
  it("is case 3 with reason material_not_in_data", () => {
    expect(r.case).toBe(3);
    expect(r.reason).toBe("material_not_in_data");
    expect(r.scenario.material_known).toBe(false);
    expect(r.message).toBe(NO_MATCH_MESSAGE);
  });
  it("context lists other materials, flagged as different", () => {
    expect(r.context.length).toBeGreaterThan(0);
    for (const x of r.context) expect(x.same_material).toBe(false);
  });
});

describe("edge: null values", () => {
  it("a value the user set but the test does not report is penalized and listed, not treated as a match", () => {
    const r = rank({ material: "polycarbonate", o2_pct: 34 });
    const x = r.results[0];
    expect(x.record.o2).toBeNull();
    expect(x.not_compared).toContain("O2: not reported");
    expect(x.components.o2).toBe(WEIGHTS.o2.weight * WEIGHTS.not_reported.fraction);
    expect(r.case).toBe(2); // not "same test": O2 could not be compared
  });
  it("variables the user did not set are not compared at all", () => {
    const r = rank({ material: "SIBAL", o2_pct: 18 });
    for (const x of r.results) {
      expect(x.components.flow).toBeNull();
      expect(x.components.pressure).toBeNull();
    }
  });
  it("LUCI's unreported pressure stays null in the record and is listed when the user sets pressure", () => {
    const r = rank({ material: "SIBAL", o2_pct: 19, pressure_kPa: 101 });
    const luci = r.results.find((x) => x.id === "csv-1")!;
    expect(luci.record.presion_kPa).toBeNull();
    expect(luci.not_compared).toContain("pressure: not reported");
  });
});

describe("edge: material tested only in 1 g", () => {
  const onlyEarth = [fixture({ id: "fx-1g" })];
  it("a perfect 1 g match on every other variable is still not a lunar match (case 3)", () => {
    const r = rank({ material: "Testium", o2_pct: 21, pressure_kPa: 101.3, flow_cm_s: 0 }, onlyEarth);
    expect(r.case).toBe(3);
    expect(r.reason).toBe("no_close_conditions");
    expect(r.context[0].id).toBe("fx-1g");
    expect(r.context[0].distance).toBe(WEIGHTS.gravity.weight);
  });
  it("adding a lunar record of the same material makes it case 2/1", () => {
    const r = rank({ material: "Testium", o2_pct: 21 }, [...onlyEarth, fixture({ id: "fx-moon", g: 0.16, gravedad: "Luna", gravity_regime: "partial" })]);
    expect(r.case).toBe(1);
    expect(r.results[0].id).toBe("fx-moon");
  });
});

describe("weights and gravity scale", () => {
  it("gravity distance: Moon 0, Mars 0.3, 0 g 0.6, 1 g 1", () => {
    const at = (g: number, gravedad = "x") => gravityDistance(fixture({ g, gravedad }));
    expect(at(0.16)).toBe(0);
    expect(at(0.38)).toBeCloseTo(0.3);
    expect(at(0)).toBeCloseTo(0.6);
    expect(at(1)).toBe(1);
  });
  it("multi-level parabolic-flight records use their closest level (0.16 g)", () => {
    expect(gravityDistance(records.find((r) => r.id === "csv-25")!)).toBe(0);
  });
  it("are exported for the UI with a human-readable scale", () => {
    for (const k of ["gravity", "o2", "flow", "pressure", "material"] as const) {
      expect(WEIGHTS[k].scale.length).toBeGreaterThan(5);
    }
    const r = rank({ material: "SIBAL" });
    expect(r.weights).toBe(WEIGHTS);
    expect(r.threshold).toBe(THRESHOLD);
    expect(r.scenario.gravity).toMatch(/Moon/);
  });
  it("duplicates are never ranked twice", () => {
    const r = rank({ material: "Mylar", o2_pct: 16 });
    for (const x of [...r.results, ...r.context]) expect(x.record.duplicate_of).toBeNull();
  });
});
