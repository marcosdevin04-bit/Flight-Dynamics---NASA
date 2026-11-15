import {describe,expect,it} from "vitest";
import {materialEn} from "../lib/ask";
import ev from "../lib/evidence/evidence.json";

describe("material names shown in English", () => {
  it("translates every Spanish material label in the catalogue", () => {
    const spanish=/[áéíóúñ]|\b(de|tela|Cinta|Remera|Policarbonato)\b/;
    const left=[...new Set((ev as {records:{material:string}[]}).records.map(r=>materialEn(r.material)))].filter(m=>spanish.test(m));
    expect(left).toEqual([]);
  });
  it("keeps English labels unchanged", () => {
    expect(materialEn("PMMA")).toBe("PMMA");
    expect(materialEn("SIBAL (algodón/fibra de vidrio), 2.2 cm de ancho")).toBe("SIBAL (cotton/fiberglass), 2.2 cm wide");
  });
});
