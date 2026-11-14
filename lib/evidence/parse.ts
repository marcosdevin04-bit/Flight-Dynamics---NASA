/**
 * Conservative parsers for the free-text cells of the CSV and the JSON.
 * Rule: if a value is not unambiguous in the source text, return null
 * ("not reported"). Never guess, never default to 0.
 * Every number returned here must appear literally in the input text
 * (tests/parse.test.ts checks this against the real data).
 */
import type { Range } from "./types";

const NUM = String.raw`\d+(?:\.\d+)?`;
const NOT_REPORTED = /not reported|not stated|not accessed|n\/a\b/i;

export interface Parsed {
  value: number | null;
  range: Range | null;
  approx: boolean;
}
const NONE: Parsed = { value: null, range: null, approx: false };

function sorted(a: number, b: number): Range {
  return a <= b ? [a, b] : [b, a];
}

/** Oxygen in % by volume. */
export function parseO2(text: string | null | undefined): Parsed {
  const t = (text ?? "").trim();
  if (!t || NOT_REPORTED.test(t)) return NONE;
  // Inequalities or "varied" cells carry no single value.
  if (/<=|>=|≤|≥|and below|and above|varied/i.test(t)) return NONE;
  const range = t.match(
    new RegExp(String.raw`^(?:limit bracket\s+|initial\s+)?(~)?(${NUM})\s*(?:-|–|->|falling to|to)\s*(?:final\s+)?(~)?(${NUM})`, "i"),
  );
  if (range) {
    return { value: null, range: sorted(Number(range[2]), Number(range[4])), approx: Boolean(range[1] || range[3]) };
  }
  const single = t.match(new RegExp(String.raw`^(?:LOC\s+)?(~)?(${NUM})(?![\d.])`, "i"));
  if (single) return { value: Number(single[2]), range: null, approx: Boolean(single[1]) };
  return NONE;
}

/** Pressure in kPa. */
export function parsePressure(text: string | null | undefined): Parsed {
  const t = (text ?? "").trim();
  if (!t || NOT_REPORTED.test(t)) return NONE;
  const range = t.match(new RegExp(String.raw`^(~)?(${NUM})\s*(?:-|–)\s*(${NUM})`));
  if (range) return { value: null, range: sorted(Number(range[2]), Number(range[3])), approx: Boolean(range[1]) };
  const single = t.match(new RegExp(String.raw`^(~)?(${NUM})(?![\d.])`));
  if (single) return { value: Number(single[2]), range: null, approx: Boolean(single[1]) };
  return NONE;
}

/**
 * Forced flow in cm/s. "no forced flow" is a declared 0 (not "not reported").
 * Buoyant-only descriptions without the words "no forced flow" stay null.
 */
export function parseFlow(text: string | number | null | undefined): Parsed {
  if (typeof text === "number") return { value: text, range: null, approx: false };
  const t = (text ?? "").trim();
  // Checked first: "no forced flow; orientation not stated" still declares no forced flow.
  if (/no forced flow|sin flujo forzado/i.test(t)) return { value: 0, range: null, approx: false };
  if (!t || NOT_REPORTED.test(t)) return NONE;
  if (new RegExp(String.raw`^${NUM}$`).test(t)) return { value: Number(t), range: null, approx: false };
  if (!/forced|forzado/i.test(t)) return NONE;
  const range = t.match(new RegExp(String.raw`(~)?(${NUM})\s*(?:->|-|–|or)\s*(${NUM})`));
  if (range) return { value: null, range: sorted(Number(range[2]), Number(range[3])), approx: Boolean(range[1]) };
  const single = t.match(new RegExp(String.raw`(~)?(${NUM})(?![\d.])`));
  if (single) return { value: Number(single[2]), range: null, approx: Boolean(single[1]) };
  return NONE;
}

/** Sample thickness in mm. Diameters and radii are not thicknesses. */
export function parseThickness(text: string | null | undefined): number | null {
  const t = (text ?? "").trim();
  if (!t || NOT_REPORTED.test(t)) return null;
  if (/\bdia\b|diameter|radius|\brod\b/i.test(t)) return null;
  const m = t.match(new RegExp(String.raw`(${NUM})\s*mm\b`));
  return m ? Number(m[1]) : null;
}

export interface ParsedGravity {
  g: number | null;
  approx: boolean;
  levels: number[] | null;
  range: Range | null;
  lunar: boolean;
  label: string; // contract "gravedad": "0 g" | "Luna" | "Marte" | "1 g" | "parcial"
}

/** Gravity in multiples of Earth g. */
export function parseGravity(text: string | null | undefined): ParsedGravity {
  const t = (text ?? "").trim();
  const lunar = /lunar|\bmoon\b|\bluna\b/i.test(t);
  const out = (g: number | null, extra: Partial<ParsedGravity> = {}): ParsedGravity => {
    const base: ParsedGravity = { g, approx: false, levels: null, range: null, lunar, label: gravedadLabel(g, lunar), ...extra };
    return base;
  };
  // Lists of levels: "0.1; 0.16; 0.38; 1.0"
  const list = t.match(new RegExp(String.raw`^(${NUM})(?:\s*;\s*${NUM})+`));
  if (list) {
    const levels = list[0].split(";").map((s) => Number(s.trim()));
    return out(null, { levels, label: "parcial" });
  }
  const range = t.match(new RegExp(String.raw`^(${NUM})\s*-\s*(${NUM})`));
  if (range) return out(null, { range: sorted(Number(range[1]), Number(range[2])), label: "parcial" });
  if (lunar) {
    // Prefer an explicit fraction of g (< 1) when the cell gives one, e.g. "lunar (~1.62 m/s2 = 0.165 derived)".
    const nums = [...t.matchAll(new RegExp(String.raw`(~)?(${NUM})`, "g"))].filter((m) => Number(m[2]) > 0 && Number(m[2]) < 1);
    if (nums.length >= 1) return out(Number(nums[nums.length - 1][2]), { approx: /~|derived/.test(t), label: "Luna" });
    return out(null, { label: "Luna" });
  }
  const single = t.match(new RegExp(String.raw`^(~)?(${NUM})(?![\d.])`));
  if (single) return out(Number(single[2]), { approx: Boolean(single[1]) });
  if (/microgravity/i.test(t)) return out(0);
  return out(null, { label: "parcial" });
}

export function gravedadLabel(g: number | null, lunar = false): string {
  if (lunar) return "Luna";
  if (g === null) return "parcial";
  if (g === 0) return "0 g";
  if (g === 1) return "1 g";
  if (Math.abs(g - 0.38) < 0.01) return "Marte";
  if (g >= 0.15 && g <= 0.17) return "Luna";
  return "parcial";
}

/** NTRS citation URL from free text ("NTRS 20130010991"), or null. */
export function parseNtrs(text: string): string | null {
  const m = text.match(/NTRS\s+(\d{8,})/);
  return m ? `https://ntrs.nasa.gov/citations/${m[1]}` : null;
}

/**
 * Source references are not values: page/slide/table/figure numbers, years,
 * NTRS ids, DOIs, equation numbers. Removed before collecting or checking numbers.
 */
const SOURCE_REFS: RegExp[] = [
  /\b(?:PDF\s+)?pp?\.\s*\d+(?:\s*[-–,]\s*\d+)*/gi,
  /\b(?:Tables?|Tabla|Figs?|Figures?|Figuras?|slides?|Eq)\.?\s*(?:[IVX]+\b|\d+(?:\.\d+)?)(?:\s*(?:[-–,]|and)\s*\d+(?:\.\d+)?)*/gi,
  /\bNTRS\s*\d+/gi,
  /\bdoi:\s*\S+|\b10\.\d{4,}\/\S+/gi,
];
const YEAR = /\b(?:19|20)\d{2}\b/g;
/** keepYears: verify.ts keeps years in LLM text and checks them against the cited sources. */
export function stripSourceRefs(text: string, keepYears = false): string {
  let s = text;
  for (const re of SOURCE_REFS) s = s.replace(re, " ");
  return keepYears ? s : s.replace(YEAR, " ");
}
export function yearsIn(text: string): number[] {
  return [...text.matchAll(YEAR)].map((m) => Number(m[0]));
}

/** All numbers in a string, ignoring source references (for the citable-number set of a record). */
export function numbersIn(text: string | null | undefined): number[] {
  if (!text) return [];
  return [...stripSourceRefs(String(text)).matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
}

/** Numbers written as percentages ("21%", "14.1–15.6 %"), ignoring source references. */
export function percentNumbersIn(text: string | null | undefined): number[] {
  if (!text) return [];
  const s = stripSourceRefs(String(text));
  const out: number[] = [];
  for (const m of s.matchAll(/(\d+(?:\.\d+)?)(?:\s*(?:[-–]|to)\s*(\d+(?:\.\d+)?))?\s*%/g)) {
    out.push(Number(m[1]));
    if (m[2]) out.push(Number(m[2]));
  }
  return out;
}
