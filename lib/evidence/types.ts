import { z } from "zod";

/** Evidence level, as written in data/ (contract in docs/DEVELOPMENT.md §3). */
export type Nivel = "verificado" | "secundario" | "no verificado";
export const NIVEL_LABEL_EN: Record<Nivel, "verified" | "secondary" | "unverified"> = {
  verificado: "verified",
  secundario: "secondary",
  "no verificado": "unverified",
};
const NIVEL_RANK: Record<Nivel, number> = { verificado: 0, secundario: 1, "no verificado": 2 };
/** The more conservative (lower) of two levels. */
export function minNivel(a: Nivel, b: Nivel): Nivel {
  return NIVEL_RANK[a] >= NIVEL_RANK[b] ? a : b;
}
export function nivelOrder(n: Nivel): number {
  return NIVEL_RANK[n];
}

export type GravityRegime = "1g" | "microgravity" | "partial";
export type Range = [number, number];

export interface Fuente {
  cita: string;
  ntrs: string | null;
  psi: string | null;
  ubicacion: string;
}

/**
 * One normalized evidence record. The first block is the data contract of
 * docs/DEVELOPMENT.md §3; everything after it is added by build.ts.
 * Missing values are null and shown as "not reported", never as 0.
 */
export interface EvidenceRecord {
  // ---- contract (DEVELOPMENT.md §3) ----
  id: string;
  material: string;
  espesor_mm: number | null;
  gravedad: string;
  g: number | null;
  o2: number | null;
  presion_kPa: number | null;
  flujo: string;
  resultado: string;
  fuente: Fuente;
  nivel: Nivel;
  advertencia: string;

  // ---- added by build.ts ----
  gravity_regime: GravityRegime;
  /** English label for the UI and the LLM, e.g. "partial gravity (drop-tower centrifuge)". */
  gravity_label: string;
  nivel_label: "verified" | "secondary" | "unverified";
  /** Canonical material key ("mylar", "nomex/ht90-40", "pmma/rod"...). */
  material_key: string;
  platform: string | null;
  /** Other gravity levels tested in the same record (parabolic flights). */
  g_levels: number[] | null;
  g_range: Range | null;
  o2_range: Range | null;
  o2_approx: boolean;
  /** Flammability limits (curve records): ULOI = lowest O2 that burned, MOC = highest O2 that self-extinguished. */
  limits: { uloi: number; moc: number } | null;
  delta_o2_vs_1g: number | null;
  presion_range: Range | null;
  /** Forced flow in cm/s. 0 means the source states "no forced flow"; null means not reported. */
  flow_cm_s: number | null;
  flow_range: Range | null;
  duration: string | null;
  resultado_en: string;
  warnings_en: string[];
  display: { o2: string; pressure: string; flow: string; gravity: string; thickness: string };
  not_reported: string[];
  /** Every number that can be cited from this record (used by verify.ts). */
  numbers: number[];
  dataset: string;
  source_path: string;
  /** Other citable IDs that hold the same datum (e.g. a CSV row duplicated in the JSON). */
  aliases: string[];
  /** If set, this record repeats another one and is not ranked. */
  duplicate_of: string | null;
  rankable: boolean;
}

export interface EvidenceFile {
  generated_at: string;
  inputs: string[];
  counts: { total: number; rankable: number; duplicates: number; by_regime: Record<GravityRegime, number>; by_nivel: Record<Nivel, number> };
  records: EvidenceRecord[];
}

/**
 * Zod schema of the record contract (DEVELOPMENT.md §3). Future batches
 * (e.g. PSI tables) dropped in data/*.json as an array of these, or as
 * {"registros": [...]}, are ingested by build.ts without code changes.
 */
export const ContractRecordSchema = z.object({
  id: z.string().min(1),
  material: z.string().min(1),
  espesor_mm: z.number().nullable().optional(),
  gravedad: z.string().min(1),
  g: z.number().min(0).max(1.5).nullable().optional(),
  o2: z.number().min(0).max(100).nullable().optional(),
  presion_kPa: z.number().positive().nullable().optional(),
  flujo: z.union([z.string(), z.number()]).nullable().optional(),
  resultado: z.string().default(""),
  fuente: z.object({
    cita: z.string().min(1),
    ntrs: z.string().nullable().optional(),
    psi: z.string().nullable().optional(),
    ubicacion: z.string().nullable().optional(),
  }),
  nivel: z.string().min(1),
  advertencia: z.string().nullable().optional(),
});
export type ContractRecord = z.infer<typeof ContractRecordSchema>;
