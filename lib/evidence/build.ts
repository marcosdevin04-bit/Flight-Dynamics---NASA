/**
 * Builds lib/evidence/evidence.json from data/ (read-only).
 *
 *   npm run build:evidence
 *
 * Sources, in order of authority:
 *   1. data/curva_gravedad.json  — primary, verified against the NASA PDFs.
 *   2. data/partial_gravity_flammability_evidence.csv — complementary; rows that
 *      repeat a JSON datum are kept as citable aliases (duplicate_of) and not ranked.
 *   3. Any other data/*.json holding records in the DEVELOPMENT.md §3 contract
 *      (future batches, e.g. PSI tables): an array, or {"registros": [...]}.
 *
 * Rules: never invent a value (null = "not reported"); keep original IDs;
 * when two sources disagree on the evidence level, keep the more conservative one.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseCsv } from "csv-parse/sync";
import { materialKey } from "./materials";
import {
  gravedadLabel,
  numbersIn,
  parseFlow,
  percentNumbersIn,
  parseGravity,
  parseNtrs,
  parseO2,
  parsePressure,
  parseThickness,
  type Parsed,
  type ParsedGravity,
} from "./parse";
import {
  ContractRecordSchema,
  NIVEL_LABEL_EN,
  minNivel,
  type EvidenceFile,
  type EvidenceRecord,
  type GravityRegime,
  type Nivel,
  type Range,
} from "./types";

const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = join(HERE, "..", "..");
export const DATA_DIR = join(REPO_ROOT, "data");
export const OUT_FILE = join(HERE, "evidence.json");
const CURVE_FILE = "curva_gravedad.json";
const CSV_FILE = "partial_gravity_flammability_evidence.csv";

// ---------------------------------------------------------------------------
// Explicit cross-references: JSON datum -> CSV row holding the same datum.
// tests/build.test.ts checks that the numbers agree on both sides.
// ---------------------------------------------------------------------------
export const JSON_TO_CSV: Record<string, number> = {
  "mylar-g@1g": 8, "mylar-g@marte": 5, "mylar-g@luna": 6, "mylar-g@0g": 7,
  "ultem-1000@1g": 12, "ultem-1000@marte": 9, "ultem-1000@luna": 10, "ultem-1000@0g": 11,
  "nomex-ht90-40@1g": 16, "nomex-ht90-40@marte": 13, "nomex-ht90-40@luna": 14, "nomex-ht90-40@0g": 15,
  pmma: 17, p213: 18, "remera-algodon": 19, policarbonato: 20, "nomex-velcro": 21,
  "nomex_ht90_40_poster@luna": 22, "nomex_ht90_40_poster@1g": 23, "nomex_ht90_40_poster@0g": 24,
  "GMT96-T7": 30, "GMT45-T1": 31, "GMT175-T9": 32,
};

/**
 * Cells the generic parser cannot read unambiguously. Each override cites the
 * literal text it comes from; numbers are only taken if present in that text.
 */
const CSV_GRAVITY_OVERRIDES: Record<number, Partial<ParsedGravity> & { why: string }> = {
  29: { g: null, levels: [1], lunar: true, label: "Luna", why: "cell reads 'simulated lunar and 1.0'" },
};

/** English renderings of the Spanish-only texts in curva_gravedad.json (UI must be English). */
const SIBAL_RESULT_EN: Record<string, string> = {
  "GMT175-T9": "No ignition",
  "GMT190-T23": "Reused sample, no ignition",
  "GMT190-T24": "Reused sample, flame on one side only",
  "GMT45-T1": "No comment (O2 reading possibly inaccurate)",
  "GMT96-T7": "Burned (BASS)",
};
const CURVE_WARNINGS_EN = [
  "The reduced-gravity criterion (5.18 s drop) is not the same as the 1 g criterion (15.2 cm burn length, NASA-STD-6001 Test 1).",
  "Lunar and 0 g values come from Ferkul & Olson 2011, as reproduced in Olson & Ferkul 2012 (the 2011 original was not read).",
  "The 0 g point used 30 cm/s forced flow, not quiescent air.",
  "1 % O2 steps, no replicates reported.",
  "Pressures of 70.3 or 101.3 kPa, not the lunar habitat pressure (56.5 kPa).",
];
const SIBAL_WARNING_EN =
  "Microgravity (ISS), not lunar gravity. GMT190-T23 and GMT190-T24 used REUSED samples; the report says they 'provided less quantitative data'.";
const HABITAT_WARNING_EN =
  "Direction of the lunar-gravity effect only: the numeric lunar limit is plotted in a figure and was not digitized (not reported as a number).";
const POSTER_WARNING_EN = "Approximate values printed on a poster; test-by-test data not reported.";
const SLUG: Record<string, string> = { "1 g": "1g", Marte: "marte", Luna: "luna", "0 g": "0g" };

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
function regimeOf(g: number | null, gv: { levels?: number[] | null; range?: Range | null; label?: string }): GravityRegime {
  if (gv.levels || gv.range) return "partial";
  if (g === 0) return "microgravity";
  if (g === 1) return "1g";
  if (g === null && (gv.label === "0 g")) return "microgravity";
  if (g === null && (gv.label === "1 g")) return "1g";
  return "partial";
}

function gravityLabelEn(regime: GravityRegime, platform: string | null, gravedad: string): string {
  if (regime === "1g") return "tested in 1 g";
  if (regime === "microgravity") {
    const p = platform ?? "";
    if (/ISS|Cygnus|Saffire|MSG|BASS/i.test(p)) return "microgravity (space flight)";
    if (/drop|tower|torre/i.test(p)) return "microgravity (drop tower)";
    return "microgravity";
  }
  const p = platform ?? "";
  const where = gravedad === "Luna" ? "lunar" : gravedad === "Marte" ? "Martian" : "partial";
  let how = "";
  if (/rocket|New Shepard/i.test(p)) how = "rotating sounding rocket";
  else if (/centrifug|centr[ií]fuga/i.test(p)) how = "drop-tower centrifuge";
  else if (/KC-135|parabolic/i.test(p)) how = "parabolic flight";
  const name = where === "partial" ? "partial gravity" : `partial gravity, ${where} g`;
  return how ? `${name} (${how})` : name;
}

function fmt(n: number): string {
  return String(n);
}
function displayValue(p: { value: number | null; range: Range | null; approx: boolean }, unit: string): string {
  const a = p.approx ? "~" : "";
  if (p.value !== null) return `${a}${fmt(p.value)}${unit}`;
  if (p.range) return `${a}${fmt(p.range[0])}–${fmt(p.range[1])}${unit}`;
  return "not reported";
}
function displayFlow(value: number | null, range: Range | null): string {
  if (value === 0) return "no forced flow";
  if (value !== null) return `${fmt(value)} cm/s forced`;
  if (range) return `${fmt(range[0])}–${fmt(range[1])} cm/s forced`;
  return "not reported";
}
function displayGravity(g: number | null, levels: number[] | null, range: Range | null, gravedad: string): string {
  if (levels) return `${levels.join(", ")} g${gravedad === "Luna" ? " and simulated lunar" : ""}`;
  if (range) return `${range[0]}–${range[1]} g`;
  if (g !== null) return `${g} g`;
  if (gravedad === "Luna") return "lunar (exact g not reported)";
  return "not reported";
}

function nivelFromCsv(verification: string): Nivel {
  if (/UNVERIFIED/i.test(verification)) return "no verificado";
  if (/SECONDARY|primary data not identified/i.test(verification)) return "secundario";
  return "verificado";
}
function nivelFromText(n: string): Nivel {
  const t = n.toLowerCase();
  if (t.startsWith("no verificado") || t.includes("unverified")) return "no verificado";
  if (t.startsWith("secundario") || t.includes("secondary")) return "secundario";
  if (t.startsWith("verificado") || t.includes("verified")) return "verificado";
  throw new Error(`Unknown nivel: "${n}"`);
}

function uniqNumbers(...groups: Array<Array<number | null | undefined>>): number[] {
  const s = new Set<number>();
  for (const g of groups) for (const n of g) if (typeof n === "number" && Number.isFinite(n)) s.add(n);
  return [...s].sort((a, b) => a - b);
}

function notReported(r: Pick<EvidenceRecord, "espesor_mm" | "g" | "g_levels" | "g_range" | "o2" | "o2_range" | "presion_kPa" | "presion_range" | "flow_cm_s" | "flow_range" | "gravedad">): string[] {
  const out: string[] = [];
  if (r.espesor_mm === null) out.push("thickness");
  if (r.g === null && !r.g_levels && !r.g_range) out.push("exact g");
  if (r.o2 === null && !r.o2_range) out.push("O2");
  if (r.presion_kPa === null && !r.presion_range) out.push("pressure");
  if (r.flow_cm_s === null && !r.flow_range) out.push("flow");
  return out;
}

interface Partial0 {
  id: string;
  material: string;
  espesor_mm: number | null;
  gravity: ParsedGravity;
  o2: Parsed;
  limits: { uloi: number; moc: number } | null;
  delta: number | null;
  pressure: Parsed;
  flujo: string;
  flow: Parsed;
  resultado: string;
  resultado_en: string;
  fuente: EvidenceRecord["fuente"];
  nivel: Nivel;
  advertencia: string;
  warnings_en: string[];
  platform: string | null;
  duration: string | null;
  dataset: string;
  source_path: string;
  extraText: string[];
  /** Raw O2 cell (CSV), for the O2-citable numbers. */
  o2Text?: string;
}

function finalize(p: Partial0): EvidenceRecord {
  const g = p.gravity;
  const regime = regimeOf(g.g, g);
  const gravedad = g.label;
  const rec: EvidenceRecord = {
    id: p.id,
    material: p.material,
    espesor_mm: p.espesor_mm,
    gravedad,
    g: g.g,
    o2: p.o2.value,
    presion_kPa: p.pressure.value,
    flujo: p.flujo,
    resultado: p.resultado,
    fuente: p.fuente,
    nivel: p.nivel,
    advertencia: p.advertencia,
    gravity_regime: regime,
    gravity_label: gravityLabelEn(regime, p.platform, gravedad),
    nivel_label: NIVEL_LABEL_EN[p.nivel],
    material_key: materialKey(p.material),
    platform: p.platform,
    g_levels: g.levels,
    g_range: g.range,
    o2_range: p.o2.range,
    o2_approx: p.o2.approx,
    limits: p.limits,
    delta_o2_vs_1g: p.delta,
    presion_range: p.pressure.range,
    flow_cm_s: p.flow.value,
    flow_range: p.flow.range,
    duration: p.duration,
    resultado_en: p.resultado_en,
    warnings_en: p.warnings_en,
    display: {
      o2: p.limits ? `ULOI ${p.limits.uloi}% / MOC ${p.limits.moc}%` : displayValue(p.o2, "%"),
      pressure: displayValue(p.pressure, " kPa"),
      flow: displayFlow(p.flow.value, p.flow.range),
      gravity: displayGravity(g.g, g.levels, g.range, gravedad),
      thickness: p.espesor_mm === null ? "not reported" : `${p.espesor_mm} mm`,
    },
    not_reported: [],
    numbers: [],
    o2_numbers: [],
    dataset: p.dataset,
    source_path: p.source_path,
    aliases: [],
    duplicate_of: null,
    rankable: true,
  };
  rec.not_reported = notReported(rec);
  rec.numbers = uniqNumbers(
    [rec.espesor_mm, rec.g, rec.o2, rec.presion_kPa, rec.flow_cm_s, rec.delta_o2_vs_1g, p.limits?.uloi, p.limits?.moc],
    rec.g_levels ?? [], rec.g_range ?? [], rec.o2_range ?? [], rec.presion_range ?? [], rec.flow_range ?? [],
    // fuente.cita and fuente.ubicacion are references (years, pages, NTRS ids), not values.
    ...[p.material, p.flujo, p.resultado, p.resultado_en, p.advertencia, p.platform, p.duration, ...p.warnings_en, ...p.extraText].map(numbersIn),
  );
  rec.o2_numbers = uniqNumbers(
    [rec.o2, p.limits?.uloi, p.limits?.moc, rec.delta_o2_vs_1g],
    rec.o2_range ?? [],
    numbersIn(p.o2Text),
    ...[p.resultado, p.resultado_en, p.advertencia, ...p.warnings_en, ...p.extraText].map(percentNumbersIn),
  );
  return rec;
}

// ---------------------------------------------------------------------------
// 1. curva_gravedad.json
// ---------------------------------------------------------------------------
interface CurveJson {
  _meta: { advertencias_globales: string[]; fuente: { cita: string; ntrs: string; ubicacion: string }; nivel: string };
  materiales: Array<{
    id: string; nombre: string; espesor_mm: number; presion_kPa: number;
    puntos: Array<{ gravedad: string; g: number; uloi: number; moc: number; plataforma: string; flujo: string; nota?: string }>;
    delta_o2_vs_1g: Record<string, number>;
  }>;
  habitat_lunar_8_2_psi: {
    _meta: { descripcion: string; fuente: { cita: string; ntrs: string; ubicacion: string }; nivel: string };
    materiales: Array<{ id: string; nombre: string; test1_aire: string; efecto_luna: string; correccion_conservadora_o2: number }>;
    nomex_ht90_40_poster: { fuente: { cita: string; ntrs: string }; nivel: string; limite_o2_aprox: Record<string, number>; nota: string };
  };
  ejemplo_sibal_microgravedad: {
    _meta: { descripcion: string; fuente: { cita: string; ntrs: string; ubicacion: string }; nivel: string; advertencia: string };
    ensayos: Array<{ test: string; ancho_cm: number; flujo_cm_s: string; o2: number; resultado: string }>;
  };
}

const PLAIN = (v: number | null): Parsed => ({ value: v, range: null, approx: false });

function fromCurve(json: CurveJson): Partial0[] {
  const out: Partial0[] = [];
  const meta = json._meta;
  // --- gravity curve (Olson & Ferkul 2012, Table I) ---
  json.materiales.forEach((m, mi) => {
    m.puntos.forEach((pt, pi) => {
      const id = `${m.id}@${SLUG[pt.gravedad]}`;
      // Values at Moon and 0 g are reproduced from Ferkul & Olson 2011 (not read): secondary.
      const fromOriginal = pt.gravedad === "1 g" || pt.gravedad === "Marte";
      const nivel = minNivel(nivelFromText(meta.nivel), fromOriginal ? "verificado" : "secundario");
      const delta = pt.gravedad === "1 g" ? null : m.delta_o2_vs_1g[pt.gravedad] ?? null;
      out.push({
        id,
        material: m.nombre,
        espesor_mm: m.espesor_mm,
        gravity: { g: pt.g, approx: Boolean(pt.nota), levels: null, range: null, lunar: pt.gravedad === "Luna", label: pt.gravedad },
        o2: { value: null, range: [pt.moc, pt.uloi], approx: false },
        limits: { uloi: pt.uloi, moc: pt.moc },
        delta,
        pressure: PLAIN(m.presion_kPa),
        flujo: pt.flujo,
        flow: parseFlow(pt.flujo),
        resultado: `ULOI ${pt.uloi} / MOC ${pt.moc}`,
        resultado_en: `Flammability limit: ULOI ${pt.uloi}% (lowest O2 that burned), MOC ${pt.moc}% (highest O2 that self-extinguished).` +
          (delta !== null ? ` Shift vs 1 g: ${delta} points of O2.` : ""),
        fuente: { cita: meta.fuente.cita, ntrs: meta.fuente.ntrs, psi: null, ubicacion: meta.fuente.ubicacion },
        nivel,
        advertencia: meta.advertencias_globales.join(" ") + (pt.nota ? ` ${pt.nota}` : ""),
        warnings_en: [...CURVE_WARNINGS_EN, ...(pt.nota ? ["Exact g value not stated in the source we read."] : [])],
        platform: pt.plataforma,
        duration: null,
        dataset: CURVE_FILE,
        source_path: `data/${CURVE_FILE} → materiales[${mi}] (${m.id}).puntos[${pi}] (${pt.gravedad})`,
        extraText: [],
      });
    });
  });

  // --- lunar habitat 8.2 psi (Urban et al. 2025, ICES-2025-392) ---
  const hab = json.habitat_lunar_8_2_psi;
  const habPressure = hab._meta.descripcion.match(/\((\d+(?:\.\d+)?) kPa\)/);
  hab.materiales.forEach((m, mi) => {
    out.push({
      id: m.id,
      material: m.nombre,
      espesor_mm: parseThickness(m.nombre.replace(",", ".")),
      gravity: { g: null, approx: false, levels: null, range: null, lunar: true, label: "Luna" },
      o2: PLAIN(null),
      limits: null,
      delta: null,
      pressure: PLAIN(habPressure ? Number(habPressure[1]) : null),
      flujo: "",
      flow: PLAIN(null),
      resultado: `${m.efecto_luna}. NASA-STD-6001 Test 1 en aire: ${m.test1_aire}. Corrección conservadora de O2: ${m.correccion_conservadora_o2}`,
      resultado_en: "",
      fuente: { cita: hab._meta.fuente.cita, ntrs: hab._meta.fuente.ntrs, psi: null, ubicacion: hab._meta.fuente.ubicacion },
      nivel: nivelFromText(hab._meta.nivel),
      advertencia: hab._meta.descripcion,
      warnings_en: [HABITAT_WARNING_EN],
      platform: null,
      duration: null,
      dataset: CURVE_FILE,
      source_path: `data/${CURVE_FILE} → habitat_lunar_8_2_psi.materiales[${mi}] (${m.id})`,
      extraText: [String(m.correccion_conservadora_o2)],
    });
  });

  // --- Nomex HT90-40 poster at 8.2 psi (Schechter et al. 2025) ---
  const poster = hab.nomex_ht90_40_poster;
  for (const [grav, loc] of Object.entries(poster.limite_o2_aprox)) {
    out.push({
      id: `nomex_ht90_40_poster@${SLUG[grav]}`,
      material: "Nomex HT90-40 (tela)",
      espesor_mm: null,
      gravity: { g: grav === "1 g" ? 1 : grav === "0 g" ? 0 : null, approx: false, levels: null, range: null, lunar: grav === "Luna", label: grav },
      o2: { value: loc, range: null, approx: true },
      limits: null,
      delta: null,
      pressure: PLAIN(habPressure ? Number(habPressure[1]) : null),
      flujo: "",
      flow: PLAIN(null),
      resultado: `Límite de O2 aprox. ${loc} %`,
      resultado_en: `Limiting oxygen concentration ~${loc}% (approximate, as printed on the poster).`,
      fuente: { cita: poster.fuente.cita, ntrs: poster.fuente.ntrs, psi: null, ubicacion: "poster, 'Results' panel" },
      nivel: nivelFromText(poster.nivel),
      advertencia: poster.nota,
      warnings_en: [POSTER_WARNING_EN, "At 8.2 psi the Moon was LESS flammable than 1 g for this fabric: the opposite of the 14.7 psi result (Olson & Ferkul 2012)."],
      platform: null,
      duration: null,
      dataset: CURVE_FILE,
      source_path: `data/${CURVE_FILE} → habitat_lunar_8_2_psi.nomex_ht90_40_poster.limite_o2_aprox["${grav}"]`,
      extraText: [],
    });
  }

  // --- SIBAL, BASS-II (Olson et al. 2021, Table 7.1) ---
  const sib = json.ejemplo_sibal_microgravedad;
  sib.ensayos.forEach((e, ei) => {
    const reused = /reutilizada/i.test(e.resultado);
    out.push({
      id: e.test,
      material: `SIBAL (algodón/fibra de vidrio), ${e.ancho_cm} cm de ancho`,
      espesor_mm: null,
      gravity: { g: 0, approx: false, levels: null, range: null, lunar: false, label: "0 g" },
      o2: PLAIN(e.o2),
      limits: null,
      delta: null,
      pressure: PLAIN(null),
      flujo: `forzado, concurrente, ${e.flujo_cm_s} cm/s`,
      flow: parseFlow(e.flujo_cm_s),
      resultado: e.resultado,
      resultado_en: SIBAL_RESULT_EN[e.test] ?? "",
      fuente: { cita: sib._meta.fuente.cita, ntrs: sib._meta.fuente.ntrs, psi: null, ubicacion: sib._meta.fuente.ubicacion },
      nivel: nivelFromText(sib._meta.nivel),
      advertencia: sib._meta.advertencia,
      warnings_en: [SIBAL_WARNING_EN, ...(reused ? ["This test used a REUSED sample."] : [])],
      platform: "ISS, Microgravity Science Glovebox (BASS-II)",
      duration: null,
      dataset: CURVE_FILE,
      source_path: `data/${CURVE_FILE} → ejemplo_sibal_microgravedad.ensayos[${ei}] (${e.test})`,
      extraText: [String(e.ancho_cm)],
    });
  });
  return out;
}

// ---------------------------------------------------------------------------
// 2. CSV
// ---------------------------------------------------------------------------
export interface CsvRow {
  row_id: string; study: string; platform: string; gravity_g: string; test_duration_s: string;
  material_thickness: string; O2_pct: string; pressure_kPa: string; airflow_cm_s_direction: string;
  outcome: string; source_page: string; value_status: string; verification: string; notes: string;
}

export function readCsv(path: string): CsvRow[] {
  return parseCsv(readFileSync(path, "utf8"), { columns: true, skip_empty_lines: true, trim: true }) as CsvRow[];
}

function fromCsvRow(r: CsvRow): Partial0 {
  const rowId = Number(r.row_id);
  const override = CSV_GRAVITY_OVERRIDES[rowId];
  let gravity = parseGravity(r.gravity_g);
  if (override) {
    const { why: _why, ...o } = override;
    gravity = { ...gravity, ...o };
  }
  const nivel = nivelFromCsv(r.verification);
  const warnings: string[] = [];
  if (nivel !== "verificado") warnings.push(`Evidence level: ${NIVEL_LABEL_EN[nivel]} (${r.verification}).`);
  if (/not reported|figure only|approximate|summary claim|qualitative/i.test(r.value_status)) warnings.push(`Values: ${r.value_status}.`);
  if (r.notes) warnings.push(r.notes);
  return {
    id: `csv-${r.row_id}`,
    material: r.material_thickness,
    espesor_mm: parseThickness(r.material_thickness),
    gravity,
    o2: parseO2(r.O2_pct),
    limits: null,
    delta: null,
    pressure: parsePressure(r.pressure_kPa),
    flujo: r.airflow_cm_s_direction,
    flow: parseFlow(r.airflow_cm_s_direction),
    resultado: r.outcome,
    resultado_en: r.outcome,
    fuente: { cita: r.study, ntrs: parseNtrs(r.study), psi: null, ubicacion: r.source_page },
    nivel,
    advertencia: [r.value_status, r.notes].filter(Boolean).join(" · "),
    warnings_en: warnings,
    platform: r.platform || null,
    duration: r.test_duration_s || null,
    dataset: CSV_FILE,
    source_path: `data/${CSV_FILE} → row_id ${r.row_id}`,
    extraText: [r.O2_pct, r.pressure_kPa, r.gravity_g, r.value_status, r.notes],
    o2Text: r.O2_pct,
  };
}

// ---------------------------------------------------------------------------
// 3. Future batches in the contract format (e.g. PSI)
// ---------------------------------------------------------------------------
export function fromContract(raw: unknown, file: string): Partial0[] {
  const list = Array.isArray(raw) ? raw : (raw as { registros?: unknown[] })?.registros;
  if (!Array.isArray(list)) return [];
  return list.map((item, i) => {
    const parsed = ContractRecordSchema.safeParse(item);
    if (!parsed.success) {
      throw new Error(`${file}[${i}] does not match the DEVELOPMENT.md §3 contract: ${parsed.error.message}`);
    }
    const c = parsed.data;
    const label = c.gravedad.trim();
    const g = c.g ?? (label === "0 g" ? 0 : label === "1 g" ? 1 : null);
    const flujoText = c.flujo === null || c.flujo === undefined ? "" : String(c.flujo);
    const flow = parseFlow(c.flujo ?? null);
    const nivel = nivelFromText(c.nivel);
    return {
      id: c.id,
      material: c.material,
      espesor_mm: c.espesor_mm ?? null,
      gravity: { g, approx: false, levels: null, range: null, lunar: /luna|lunar|moon/i.test(label), label: ["0 g", "1 g", "Luna", "Marte"].includes(label) ? label : gravedadLabel(g) },
      o2: PLAIN(c.o2 ?? null),
      limits: null,
      delta: null,
      pressure: PLAIN(c.presion_kPa ?? null),
      flujo: flujoText,
      flow,
      resultado: c.resultado,
      resultado_en: c.resultado,
      fuente: { cita: c.fuente.cita, ntrs: c.fuente.ntrs ?? null, psi: c.fuente.psi ?? null, ubicacion: c.fuente.ubicacion ?? "" },
      nivel,
      advertencia: c.advertencia ?? "",
      warnings_en: [...(c.advertencia ? [c.advertencia] : []), ...(nivel !== "verificado" ? [`Evidence level: ${NIVEL_LABEL_EN[nivel]}.`] : [])],
      platform: null,
      duration: null,
      dataset: file,
      source_path: `data/${file} → [${i}] (${c.id})`,
      extraText: [],
    } satisfies Partial0;
  });
}

// ---------------------------------------------------------------------------
// Merge JSON (primary) with its CSV twin (complement + conservative level)
// ---------------------------------------------------------------------------
function enrich(primary: EvidenceRecord, twin: EvidenceRecord): EvidenceRecord {
  const r = { ...primary };
  r.nivel = minNivel(primary.nivel, twin.nivel);
  r.nivel_label = NIVEL_LABEL_EN[r.nivel];
  // Fill only what the primary source does not state.
  if (r.g === null && !r.g_levels && !r.g_range) { r.g = twin.g; r.g_levels = twin.g_levels; r.g_range = twin.g_range; }
  if (r.espesor_mm === null) r.espesor_mm = twin.espesor_mm;
  if (r.presion_kPa === null && !r.presion_range) { r.presion_kPa = twin.presion_kPa; r.presion_range = twin.presion_range; }
  if (r.flow_cm_s === null && !r.flow_range) { r.flow_cm_s = twin.flow_cm_s; r.flow_range = twin.flow_range; }
  if (!r.flujo) r.flujo = twin.flujo;
  // The twin may name the variant ("0.8 mm PMMA sheet" vs "PMMA (acrílico) 0,8 mm").
  if (twin.material_key.startsWith(r.material_key + "/")) r.material_key = twin.material_key;
  if (!r.platform) r.platform = twin.platform;
  if (!r.duration) r.duration = twin.duration;
  if (!r.resultado_en) r.resultado_en = twin.resultado;
  r.gravity_label = gravityLabelEn(r.gravity_regime, r.platform, r.gravedad);
  r.warnings_en = [...new Set([...r.warnings_en, ...twin.warnings_en])];
  r.display = {
    ...r.display,
    pressure: r.presion_kPa !== null ? `${r.presion_kPa} kPa` : r.presion_range ? `${r.presion_range[0]}–${r.presion_range[1]} kPa` : "not reported",
    flow: displayFlow(r.flow_cm_s, r.flow_range),
    gravity: displayGravity(r.g, r.g_levels, r.g_range, r.gravedad),
    thickness: r.espesor_mm === null ? "not reported" : `${r.espesor_mm} mm`,
  };
  r.not_reported = notReported(r);
  r.numbers = uniqNumbers(primary.numbers, twin.numbers);
  r.o2_numbers = uniqNumbers(primary.o2_numbers, twin.o2_numbers);
  r.aliases = [...r.aliases, twin.id];
  return r;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
export function buildEvidence(dataDir = DATA_DIR): EvidenceFile {
  const inputs: string[] = [];
  const curve = JSON.parse(readFileSync(join(dataDir, CURVE_FILE), "utf8")) as CurveJson;
  inputs.push(CURVE_FILE);
  const primary = fromCurve(curve).map(finalize);

  const csvRows = readCsv(join(dataDir, CSV_FILE));
  inputs.push(CSV_FILE);
  const csvRecords = csvRows.map(fromCsvRow).map(finalize);
  const csvById = new Map(csvRecords.map((r) => [r.id, r]));

  const extra: EvidenceRecord[] = [];
  for (const f of readdirSync(dataDir).filter((f) => f.endsWith(".json") && f !== CURVE_FILE).sort()) {
    const parts = fromContract(JSON.parse(readFileSync(join(dataDir, f), "utf8")), f);
    if (parts.length) {
      inputs.push(f);
      extra.push(...parts.map(finalize));
    }
  }

  const merged = primary.map((p) => {
    const row = JSON_TO_CSV[p.id];
    if (row === undefined) return p;
    const twin = csvById.get(`csv-${row}`);
    if (!twin) throw new Error(`JSON_TO_CSV: ${p.id} -> csv-${row} not found in ${CSV_FILE}`);
    return enrich(p, twin);
  });
  const twinOf = new Map(Object.entries(JSON_TO_CSV).map(([jid, row]) => [`csv-${row}`, jid]));
  const csvOut = csvRecords.map((r) => {
    const jid = twinOf.get(r.id);
    if (!jid) return r;
    // Same datum as a JSON record: still citable, not ranked twice.
    return { ...r, duplicate_of: jid, rankable: false, aliases: [jid] };
  });

  const records = [...merged, ...csvOut, ...extra];
  const ids = new Set<string>();
  for (const r of records) {
    if (ids.has(r.id)) throw new Error(`Duplicate id: ${r.id}`);
    ids.add(r.id);
  }

  const by_regime = { "1g": 0, microgravity: 0, partial: 0 } as Record<GravityRegime, number>;
  const by_nivel = { verificado: 0, secundario: 0, "no verificado": 0 } as Record<Nivel, number>;
  for (const r of records.filter((r) => r.rankable)) {
    by_regime[r.gravity_regime]++;
    by_nivel[r.nivel]++;
  }
  return {
    generated_at: new Date().toISOString(),
    inputs: inputs.map((f) => `data/${f}`),
    counts: {
      total: records.length,
      rankable: records.filter((r) => r.rankable).length,
      duplicates: records.filter((r) => r.duplicate_of).length,
      by_regime,
      by_nivel,
    },
    records,
  };
}

// CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const ev = buildEvidence();
  writeFileSync(OUT_FILE, JSON.stringify(ev, null, 2) + "\n", "utf8");
  console.log(`wrote ${relative(REPO_ROOT, OUT_FILE)}`);
  console.log(JSON.stringify(ev.counts));
}
