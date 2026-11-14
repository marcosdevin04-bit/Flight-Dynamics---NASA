import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DATA_DIR, JSON_TO_CSV, OUT_FILE, buildEvidence, fromContract, readCsv } from "../lib/evidence/build";
import { parseFlow, parseO2, parsePressure, parseThickness } from "../lib/evidence/parse";
import type { EvidenceFile, EvidenceRecord } from "../lib/evidence/types";

const ev = buildEvidence();
const byId = new Map(ev.records.map((r) => [r.id, r]));
const get = (id: string): EvidenceRecord => {
  const r = byId.get(id);
  if (!r) throw new Error(`missing ${id}`);
  return r;
};
const csv = readCsv(join(DATA_DIR, "partial_gravity_flammability_evidence.csv"));
const curve = JSON.parse(readFileSync(join(DATA_DIR, "curva_gravedad.json"), "utf8"));

/** "17.0" in the source equals 17 parsed. */
const literallyIn = (n: number, text: string) =>
  [...text.matchAll(/\d+(?:\.\d+)?/g)].some((m) => Number(m[0]) === n);

describe("traceability: every parsed number appears literally in its source cell", () => {
  for (const row of csv) {
    it(`csv-${row.row_id}`, () => {
      const o2 = parseO2(row.O2_pct);
      for (const n of [o2.value, ...(o2.range ?? [])]) if (n !== null) expect(literallyIn(n, row.O2_pct)).toBe(true);
      const p = parsePressure(row.pressure_kPa);
      for (const n of [p.value, ...(p.range ?? [])]) if (n !== null) expect(literallyIn(n, row.pressure_kPa)).toBe(true);
      const f = parseFlow(row.airflow_cm_s_direction);
      for (const n of [f.value, ...(f.range ?? [])]) {
        if (n === null) continue;
        if (n === 0) expect(row.airflow_cm_s_direction).toMatch(/no forced flow/i);
        else expect(literallyIn(n, row.airflow_cm_s_direction)).toBe(true);
      }
      const t = parseThickness(row.material_thickness);
      if (t !== null) expect(literallyIn(t, row.material_thickness)).toBe(true);
      const r = get(`csv-${row.row_id}`);
      if (r.g !== null) expect(literallyIn(r.g, row.gravity_g)).toBe(true);
    });
  }
});

describe("not reported is null, never 0", () => {
  it("cells saying 'not reported' parse to null", () => {
    for (const row of csv) {
      if (/^not reported/i.test(row.O2_pct)) expect(get(`csv-${row.row_id}`).o2).toBeNull();
      if (/not reported/i.test(row.pressure_kPa)) {
        expect(get(`csv-${row.row_id}`).presion_kPa).toBeNull();
        expect(get(`csv-${row.row_id}`).presion_range).toBeNull();
      }
    }
  });
  it("LUCI 'normal pressure (~101 assumed)' stays null", () => {
    expect(get("csv-1").presion_kPa).toBeNull();
    expect(get("csv-1").display.pressure).toBe("not reported");
    expect(get("csv-1").not_reported).toContain("pressure");
  });
  it("a declared 'no forced flow' is 0 and shown as such; a missing flow is null", () => {
    expect(get("csv-45").flow_cm_s).toBe(0);
    expect(get("csv-45").display.flow).toBe("no forced flow");
    expect(get("csv-38").flow_cm_s).toBeNull();
    expect(get("csv-38").display.flow).toBe("not reported");
  });
  it("no display string shows a bare 0 for a missing value", () => {
    for (const r of ev.records) {
      for (const k of ["o2", "pressure", "thickness"] as const) expect(r.display[k]).not.toMatch(/^0(\s|%|$)/);
    }
  });
});

describe("IDs", () => {
  it("keeps every CSV row as csv-<row_id>", () => {
    for (const row of csv) expect(byId.has(`csv-${row.row_id}`)).toBe(true);
  });
  it("keeps the JSON ids (material id @ gravity, habitat ids, BASS-II test ids)", () => {
    for (const m of curve.materiales) for (const p of m.puntos) expect(byId.has(`${m.id}@${{ "1 g": "1g", Marte: "marte", Luna: "luna", "0 g": "0g" }[p.gravedad as string]}`)).toBe(true);
    for (const m of curve.habitat_lunar_8_2_psi.materiales) expect(byId.has(m.id)).toBe(true);
    for (const e of curve.ejemplo_sibal_microgravedad.ensayos) expect(byId.has(e.test)).toBe(true);
  });
  it("ids are unique", () => {
    expect(new Set(ev.records.map((r) => r.id)).size).toBe(ev.records.length);
  });
});

describe("JSON (primary) and CSV (complement) agree on duplicated data", () => {
  for (const [jid, row] of Object.entries(JSON_TO_CSV)) {
    it(`${jid} = csv-${row}`, () => {
      const j = get(jid);
      const c = get(`csv-${row}`);
      expect(c.duplicate_of).toBe(jid);
      expect(c.rankable).toBe(false);
      expect(j.aliases).toContain(c.id);
      expect(j.material_key).toBe(c.material_key);
      expect(j.gravity_regime).toBe(c.gravity_regime);
      const src = csv.find((r) => r.row_id === String(row))!;
      if (j.limits) {
        expect(literallyIn(j.limits.uloi, src.O2_pct)).toBe(true);
        expect(literallyIn(j.limits.moc, src.O2_pct)).toBe(true);
      }
      if (j.o2 !== null) expect(literallyIn(j.o2, src.O2_pct)).toBe(true);
    });
  }
});

describe("evidence level (conservative when sources disagree)", () => {
  it("lunar and 0 g curve values are secondary (Ferkul & Olson 2011 not read)", () => {
    for (const id of ["mylar-g@luna", "mylar-g@0g", "ultem-1000@luna", "nomex-ht90-40@0g"]) expect(get(id).nivel).toBe("secundario");
    expect(get("mylar-g@1g").nivel).toBe("verificado");
  });
  it("CSV SECONDARY/UNVERIFIED rows carry the label", () => {
    for (const row of csv) {
      const r = get(`csv-${row.row_id}`);
      if (/UNVERIFIED/.test(row.verification)) expect(r.nivel_label).toBe("unverified");
      else if (/SECONDARY/.test(row.verification)) expect(r.nivel_label).toBe("secondary");
    }
  });
});

describe("gravity regime", () => {
  it("labels each record 1g | microgravity | partial", () => {
    expect(get("mylar-g@1g").gravity_regime).toBe("1g");
    expect(get("mylar-g@0g").gravity_regime).toBe("microgravity");
    expect(get("mylar-g@luna").gravity_regime).toBe("partial");
    expect(get("GMT190-T24").gravity_regime).toBe("microgravity");
    expect(get("csv-1").gravity_regime).toBe("partial");
    expect(get("csv-1").gravity_label).toMatch(/rotating sounding rocket/);
    expect(get("csv-45").gravity_regime).toBe("1g");
  });
});

describe("sources", () => {
  it("every record has a citation and a location", () => {
    for (const r of ev.records) {
      expect(r.fuente.cita.length).toBeGreaterThan(5);
      expect(r.fuente.ubicacion.length).toBeGreaterThan(0);
      expect(r.source_path).toMatch(/^data\//);
    }
  });
  it("Mylar on the Moon cites Olson & Ferkul 2012, Table I, p. 6", () => {
    const r = get("mylar-g@luna");
    expect(r.fuente.cita).toMatch(/Olson, S\. L\. & Ferkul/);
    expect(r.fuente.ubicacion).toBe("Tabla I, p. 6");
    expect(r.limits).toEqual({ uloi: 15.6, moc: 14.1 });
  });
});

describe("future batches in the DEVELOPMENT.md §3 contract (PSI)", () => {
  const psi = [
    {
      id: "psi-bass2-test-001",
      material: "SIBAL fabric",
      espesor_mm: 0.32,
      gravedad: "0 g",
      g: 0,
      o2: 19.5,
      presion_kPa: 101.3,
      flujo: "forced concurrent 15 cm/s",
      resultado: "spread",
      fuente: { cita: "PSI BASS-II dataset", psi: "BASS-II/run-001.csv", ubicacion: "row 12" },
      nivel: "verificado",
      advertencia: "",
    },
  ];
  it("ingests a valid record without code changes", () => {
    const [p] = fromContract(psi, "psi_bass2.json");
    expect(p.id).toBe("psi-bass2-test-001");
    expect(p.fuente.psi).toBe("BASS-II/run-001.csv");
    expect(p.flow.value).toBe(15);
  });
  it("also accepts {registros: [...]}", () => {
    expect(fromContract({ registros: psi }, "x.json")).toHaveLength(1);
  });
  it("rejects a record that breaks the contract", () => {
    expect(() => fromContract([{ id: "x", material: "y" }], "bad.json")).toThrow(/contract/);
  });
  it("ignores JSON files that are not record lists", () => {
    expect(fromContract({ something: 1 }, "other.json")).toEqual([]);
  });
});

describe("committed evidence.json is up to date", () => {
  it("matches a fresh build (run npm run build:evidence if this fails)", () => {
    const disk = JSON.parse(readFileSync(OUT_FILE, "utf8")) as EvidenceFile;
    expect({ ...disk, generated_at: "" }).toEqual({ ...JSON.parse(JSON.stringify(ev)), generated_at: "" });
  });
});
