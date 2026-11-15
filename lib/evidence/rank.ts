/**
 * Closeness ranking of evidence records to a lunar-habitat scenario. No LLM.
 *
 * The scenario's gravity is fixed: the Moon. The evidence's gravity varies and
 * is part of the distance, so microgravity and 1 g tests are never presented
 * as if they were lunar tests.
 *
 * Distance = sum of weighted, normalized differences (lower = closer).
 * This is CLOSENESS OF TEST CONDITIONS, not a risk score.
 */
import evidenceFile from "./evidence.json" with { type: "json" };
import { materialKey, sameMaterial } from "./materials.js";
import { nivelOrder, type EvidenceFile, type EvidenceRecord, type Range } from "./types.js";

export const MOON_G = 0.16;

/** Gravity anchors (g → distance from the Moon), linear in between. From PLAN.md §4. */
export const GRAVITY_ANCHORS: Array<[number, number]> = [
  [0, 0.6],
  [MOON_G, 0],
  [0.38, 0.3],
  [1, 1],
];

/** Weights shown in the UI. Change them here only. */
export const WEIGHTS = {
  gravity: {
    weight: 2,
    scale: "Moon 0 · Mars 0.3 · microgravity 0.6 · 1 g 1 (linear in between)",
    why: "The scenario is on the Moon; gravity changes how the flame gets oxygen.",
  },
  o2: { weight: 1, per: 5, unit: "O2 points", scale: "difference in O2 points / 5", why: "Flammability depends strongly on oxygen concentration." },
  flow: { weight: 1, per: 10, unit: "cm/s", scale: "difference in forced flow (cm/s) / 10", why: "In low gravity, ventilation replaces buoyancy as the oxygen supply." },
  pressure: {
    weight: 1,
    per: 30,
    unit: "kPa",
    scale: "difference in kPa / 30",
    why: "Nomex HT90-40 reverses its lunar trend between 101 and 56.5 kPa in the data we reviewed.",
  },
  material: { weight: 1.5, scale: "same material 0 · different material 1", why: "Different materials can respond to gravity in opposite directions." },
  not_reported: {
    fraction: 0.5,
    scale: "half the variable's weight when the test does not report a value you set",
    why: "Missing data must not look like a perfect match.",
  },
} as const;

/** Case 2 ("similar") requires distance strictly below this. 1 g evidence alone (2.0) never qualifies. */
export const THRESHOLD = 2;
/** Display size, not a weight: 8 keeps both reused BASS-II samples and the LUCI flight visible in the SIBAL demo. */
export const TOP_K = 8;
export const CONTEXT_K = 3;
/** Case 1 ("same test"): same material, lunar gravity and every given variable within these tolerances. */
export const EXACT = { gravity: 0.02, o2_points: 0.5, flow_cm_s: 2, pressure_kPa: 5 } as const;

export const NO_MATCH_MESSAGE = "No matching test in the data we reviewed.";
export const FM2_NOTE =
  "NASA's planned FM2 experiment (Flammability of Materials on the Moon) is designed to test material flammability in lunar gravity; until its data are published, the closest evidence comes from microgravity, 1 g and short partial-gravity tests.";

export interface Scenario {
  material?: string | null;
  o2_pct?: number | null;
  flow_cm_s?: number | null;
  pressure_kPa?: number | null;
}

export type Variable = "gravity" | "o2" | "flow" | "pressure" | "material";

export interface RankedResult {
  id: string;
  distance: number;
  /** Weighted contribution of each variable; null when you did not set that variable. */
  components: Record<Variable, number | null>;
  not_compared: string[];
  same_material: boolean;
  within_threshold: boolean;
  record: EvidenceRecord;
}

export type CaseNumber = 1 | 2 | 3;
export type CaseReason = "exact_match" | "similar_tests" | "material_not_in_data" | "no_close_conditions";

export interface RankResponse {
  case: CaseNumber;
  case_label: "same test" | "similar tests" | "no match";
  reason: CaseReason;
  message: string | null;
  fm2_note: string | null;
  scenario: {
    material: string | null;
    material_key: string | null;
    material_known: boolean;
    o2_pct: number | null;
    flow_cm_s: number | null;
    pressure_kPa: number | null;
    gravity: string;
  };
  /** Same material only. Case 1: the matching test first, then similar ones. Case 2: top-k below the threshold. Case 3: empty. */
  results: RankedResult[];
  /** Case 3 only: closest records available, clearly outside the threshold (shown as context, not as a match). */
  context: RankedResult[];
  weights: typeof WEIGHTS;
  threshold: number;
}

// ---------------------------------------------------------------------------

export function loadEvidence(): EvidenceRecord[] {
  return (evidenceFile as unknown as EvidenceFile).records;
}

function interp(g: number): number {
  const a = GRAVITY_ANCHORS;
  if (g <= a[0][0]) return a[0][1];
  for (let i = 1; i < a.length; i++) {
    if (g <= a[i][0]) {
      const [g0, d0] = a[i - 1];
      const [g1, d1] = a[i];
      return d0 + ((g - g0) / (g1 - g0)) * (d1 - d0);
    }
  }
  return a[a.length - 1][1];
}

/** Unweighted gravity distance from the Moon (0..1). Multi-level tests use their closest level. */
export function gravityDistance(r: EvidenceRecord): number {
  const cands: number[] = [];
  if (r.g !== null) cands.push(interp(r.g));
  if (r.g_levels) cands.push(...r.g_levels.map(interp));
  if (r.g_range) cands.push(r.g_range[0] <= MOON_G && MOON_G <= r.g_range[1] ? 0 : Math.min(interp(r.g_range[0]), interp(r.g_range[1])));
  if (r.gravedad === "Luna") cands.push(0);
  if (cands.length) return Math.min(...cands);
  // No numeric g and no label: fall back on the regime.
  return r.gravity_regime === "1g" ? 1 : r.gravity_regime === "microgravity" ? 0.6 : 0.3;
}

/** Absolute distance from x to a point or range; null if the record has neither. */
function gap(x: number, value: number | null, range: Range | null): number | null {
  if (value !== null) return Math.abs(x - value);
  if (range) return x < range[0] ? range[0] - x : x > range[1] ? x - range[1] : 0;
  return null;
}

const round = (n: number) => Math.round(n * 1000) / 1000;

function score(r: EvidenceRecord, s: NormalizedScenario): RankedResult {
  const comp: Record<Variable, number | null> = { gravity: null, o2: null, flow: null, pressure: null, material: null };
  const notCompared: string[] = [];
  const nr = WEIGHTS.not_reported.fraction;

  comp.gravity = WEIGHTS.gravity.weight * gravityDistance(r);

  const sameMat = s.material_key === null ? true : sameMaterial(s.material_key, r.material_key);
  if (s.material_key !== null) comp.material = sameMat ? 0 : WEIGHTS.material.weight;

  const vars: Array<[Exclude<Variable, "gravity" | "material">, number | null, number | null, Range | null, string]> = [
    ["o2", s.o2_pct, r.o2, r.o2_range, "O2"],
    ["flow", s.flow_cm_s, r.flow_cm_s, r.flow_range, "flow"],
    ["pressure", s.pressure_kPa, r.presion_kPa, r.presion_range, "pressure"],
  ];
  for (const [key, want, value, range, label] of vars) {
    if (want === null) continue;
    const w = WEIGHTS[key];
    const d = gap(want, value, range);
    if (d === null) {
      comp[key] = nr * w.weight;
      notCompared.push(`${label}: not reported`);
    } else {
      comp[key] = (w.weight * d) / w.per;
    }
  }
  const distance = round(Object.values(comp).reduce<number>((a, v) => a + (v ?? 0), 0));
  for (const k of Object.keys(comp) as Variable[]) if (comp[k] !== null) comp[k] = round(comp[k]!);
  return { id: r.id, distance, components: comp, not_compared: notCompared, same_material: sameMat, within_threshold: distance < THRESHOLD, record: r };
}

function isExact(x: RankedResult, s: NormalizedScenario): boolean {
  const r = x.record;
  if (s.material_key === null || !x.same_material) return false;
  if (gravityDistance(r) > EXACT.gravity) return false;
  if (x.not_compared.length) return false;
  if (s.o2_pct !== null && gap(s.o2_pct, r.o2, r.o2_range)! > EXACT.o2_points) return false;
  if (s.flow_cm_s !== null && gap(s.flow_cm_s, r.flow_cm_s, r.flow_range)! > EXACT.flow_cm_s) return false;
  if (s.pressure_kPa !== null && gap(s.pressure_kPa, r.presion_kPa, r.presion_range)! > EXACT.pressure_kPa) return false;
  return true;
}

interface NormalizedScenario {
  material: string | null;
  material_key: string | null;
  o2_pct: number | null;
  flow_cm_s: number | null;
  pressure_kPa: number | null;
}

function normalize(s: Scenario): NormalizedScenario {
  const material = s.material?.trim() ? s.material.trim() : null;
  const num = (v: number | null | undefined) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  return {
    material,
    material_key: material ? materialKey(material) : null,
    o2_pct: num(s.o2_pct),
    flow_cm_s: num(s.flow_cm_s),
    pressure_kPa: num(s.pressure_kPa),
  };
}

function order(a: RankedResult, b: RankedResult): number {
  return (
    a.distance - b.distance ||
    Number(b.same_material) - Number(a.same_material) ||
    nivelOrder(a.record.nivel) - nivelOrder(b.record.nivel) ||
    a.id.localeCompare(b.id)
  );
}

export function rank(scenario: Scenario, records: EvidenceRecord[] = loadEvidence()): RankResponse {
  const s = normalize(scenario);
  const pool = records.filter((r) => r.rankable);
  const scored = pool.map((r) => score(r, s)).sort(order);
  const materialKnown = s.material_key === null ? true : pool.some((r) => sameMaterial(s.material_key!, r.material_key));

  const base = {
    scenario: {
      ...s,
      material_known: s.material_key === null ? true : materialKnown,
      material_key: s.material_key,
      gravity: `Moon (${MOON_G} g, fixed)`,
    },
    weights: WEIGHTS,
    threshold: THRESHOLD,
  };
  const sameAndClose = scored.filter((x) => x.same_material && x.within_threshold);

  if (sameAndClose.length && isExact(sameAndClose[0], s)) {
    const exact = sameAndClose[0];
    const rest = sameAndClose.slice(1, TOP_K);
    return { ...base, case: 1, case_label: "same test", reason: "exact_match", message: null, fm2_note: null, results: [exact, ...rest], context: [] };
  }
  if (sameAndClose.length) {
    // Only the queried material: other materials can respond to gravity in opposite directions.
    const results = sameAndClose.slice(0, TOP_K);
    return { ...base, case: 2, case_label: "similar tests", reason: "similar_tests", message: null, fm2_note: null, results, context: [] };
  }
  return {
    ...base,
    case: 3,
    case_label: "no match",
    reason: materialKnown ? "no_close_conditions" : "material_not_in_data",
    message: NO_MATCH_MESSAGE,
    fm2_note: FM2_NOTE,
    results: [],
    // Same material first (its own bounds), then other materials.
    context: [...scored.filter((x) => x.same_material), ...scored.filter((x) => !x.same_material)].slice(0, CONTEXT_K),
  };
}
