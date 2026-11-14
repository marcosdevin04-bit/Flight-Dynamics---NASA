/**
 * Citation and number verifier for LLM explanations. No LLM.
 *
 * An explanation passes only if:
 *   1. every [id] it cites exists and is among the retrieved records
 *      (a CSV alias of a retrieved record counts as that record);
 *   2. every number in a sentence with citations appears in one of the records
 *      cited in that sentence (rounding allowed: 15.6 may be written 16);
 *   3. numbers in sentences without citations are only the user's scenario
 *      values or the fixed reference values in ALLOWED_REFERENCE_NUMBERS;
 *   4. it never uses the forbidden words ("safe", "certified", "never tested"...).
 *   5. if records were retrieved, it cites at least one of them.
 */
import type { EvidenceRecord } from "./types";

export type VerifyErrorKind =
  | "forbidden_word"
  | "unknown_id"
  | "not_retrieved"
  | "number_not_in_cited_record"
  | "uncited_number"
  | "no_citations";

export interface VerifyError {
  kind: VerifyErrorKind;
  detail: string;
  sentence?: string;
}

export interface VerifyResult {
  ok: boolean;
  errors: VerifyError[];
  /** Cited IDs resolved to the retrieved record IDs, in order of first appearance. */
  citations: string[];
  numbers_checked: number;
}

export interface VerifyOptions {
  /** Every record (to tell "unknown id" from "exists but was not retrieved"). */
  allRecords?: EvidenceRecord[];
  /** The user's scenario values; may appear without a citation. */
  scenario?: { o2_pct?: number | null; flow_cm_s?: number | null; pressure_kPa?: number | null };
}

/**
 * Fixed reference values that may appear without a citation:
 * gravity levels (0 g, lunar 0.16/0.165/0.17 g, Martian 0.38 g, 1 g) and the
 * planned lunar habitat atmosphere stated in the challenge (34 % O2, 8.2 psi = 56.5 kPa).
 */
export const ALLOWED_REFERENCE_NUMBERS = [0, 1, 0.16, 0.165, 0.17, 0.38, 34, 8.2, 56.5];

export const FORBIDDEN: Array<{ re: RegExp; word: string }> = [
  { re: /\b(?:un)?saf(?:e|er|est|ely)\b/i, word: "safe" }, // "safety" (as in "fire safety") is allowed
  { re: /\bcertif\w*/i, word: "certified" },
  { re: /\bnever\s+(?:been\s+)?tested\b/i, word: "never tested" },
];

const ID_CHARS = String.raw`[A-Za-z0-9@._\-]+`;
const CITATION_RE = new RegExp(String.raw`\[(${ID_CHARS}(?:\s*[,;]\s*${ID_CHARS})*)\]`, "g");

/** Words that carry digits but are names, not values: FM2, GMT190-T24, NASA-STD-6001, ICES-2025-392, Test 1, 1/6 g... */
const IDENTIFIER_PATTERNS: RegExp[] = [
  /\b[A-Za-z][A-Za-z]*[-_]?\d[\w\-./]*/g, // FM2, O2, CO2, T24, GMT190-T24, NASA-STD-6001B, ICES-2025-392
  /\bTest\s+\d+\b/gi, // NASA-STD-6001 Test 1
  /\b1\/6\b/g, // lunar gravity as a fraction of Earth's ("1/6 g", "1/6 of Earth's")
  /\bm\/s2\b/g,
];

export function findForbidden(text: string): string[] {
  return FORBIDDEN.filter((f) => f.re.test(text)).map((f) => f.word);
}

/** Split into sentences; a sentence made only of citations is attached to the previous one. */
export function splitSentences(text: string): string[] {
  const raw = text
    .split(/(?<=[.!?])\s+(?=[A-Z[“"(])|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const out: string[] = [];
  for (const s of raw) {
    const onlyCitations = s.replace(CITATION_RE, "").replace(/[\s.,;]/g, "") === "";
    if (onlyCitations && out.length) out[out.length - 1] += " " + s;
    else out.push(s);
  }
  return out;
}

export function extractCitations(sentence: string): string[] {
  const ids: string[] = [];
  for (const m of sentence.matchAll(CITATION_RE)) ids.push(...m[1].split(/\s*[,;]\s*/).filter(Boolean));
  return ids;
}

export interface CitedNumber {
  value: number;
  decimals: number;
  text: string;
}

/** Numbers stated in a sentence, ignoring citations and identifiers. */
export function extractNumbers(sentence: string): CitedNumber[] {
  let s = sentence.replace(CITATION_RE, " ");
  for (const re of IDENTIFIER_PATTERNS) s = s.replace(re, " ");
  const out: CitedNumber[] = [];
  // Units glued to a number ("0.92mm", "1g") still count as a stated number.
  for (const m of s.matchAll(/(?<![\w.])(\d{1,3}(?:,\d{3})+(?!\d)|\d+)(?:\.(\d+))?/g)) {
    const intPart = m[1].replace(/,/g, "");
    const dec = m[2] ?? "";
    out.push({ value: Number(dec ? `${intPart}.${dec}` : intPart), decimals: dec.length, text: m[0] });
  }
  return out;
}

/** Does the written number match a source value, allowing rounding to the written precision? */
export function numberMatches(n: CitedNumber, source: number): boolean {
  const v = Math.abs(source);
  if (Math.abs(n.value - v) < 1e-9) return true;
  const f = 10 ** n.decimals;
  return Math.abs(Math.round(v * f) / f - n.value) < 1e-9;
}

export function verifyExplanation(text: string, retrieved: EvidenceRecord[], opts: VerifyOptions = {}): VerifyResult {
  const errors: VerifyError[] = [];
  for (const word of findForbidden(text)) errors.push({ kind: "forbidden_word", detail: `forbidden word: "${word}"` });

  // Resolve IDs and aliases of the retrieved records.
  const resolve = new Map<string, EvidenceRecord>();
  for (const r of retrieved) {
    resolve.set(r.id, r);
    for (const a of r.aliases) resolve.set(a, r);
  }
  const known = new Set<string>();
  for (const r of opts.allRecords ?? retrieved) {
    known.add(r.id);
    for (const a of r.aliases) known.add(a);
  }

  const sc = opts.scenario ?? {};
  const free = [...ALLOWED_REFERENCE_NUMBERS];
  for (const v of [sc.o2_pct, sc.flow_cm_s, sc.pressure_kPa]) if (typeof v === "number") free.push(v);
  if (typeof sc.pressure_kPa === "number") free.push(sc.pressure_kPa / 6.894757); // same pressure in psi

  const citations: string[] = [];
  let checked = 0;
  for (const sentence of splitSentences(text)) {
    const cited: EvidenceRecord[] = [];
    for (const id of extractCitations(sentence)) {
      const rec = resolve.get(id);
      if (rec) {
        cited.push(rec);
        if (!citations.includes(rec.id)) citations.push(rec.id);
      } else if (known.has(id)) {
        errors.push({ kind: "not_retrieved", detail: `[${id}] exists but was not among the retrieved records`, sentence });
      } else {
        errors.push({ kind: "unknown_id", detail: `[${id}] is not a record id`, sentence });
      }
    }
    for (const n of extractNumbers(sentence)) {
      checked++;
      if (free.some((v) => numberMatches(n, v))) continue;
      if (cited.some((r) => r.numbers.some((v) => numberMatches(n, v)))) continue;
      errors.push(
        cited.length
          ? { kind: "number_not_in_cited_record", detail: `${n.text} is not in ${cited.map((r) => `[${r.id}]`).join(", ")}`, sentence }
          : { kind: "uncited_number", detail: `${n.text} has no citation`, sentence },
      );
    }
  }
  if (retrieved.length && citations.length === 0 && !errors.some((e) => e.kind === "not_retrieved" || e.kind === "unknown_id")) {
    errors.push({ kind: "no_citations", detail: "the explanation cites none of the retrieved records" });
  }
  return { ok: errors.length === 0, errors, citations, numbers_checked: checked };
}
