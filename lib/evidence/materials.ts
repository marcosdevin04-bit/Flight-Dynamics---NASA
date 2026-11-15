/**
 * Canonical material keys. Keys use "family/variant" so a generic query
 * ("nomex", "pmma") matches every variant, and a specific one
 * ("nomex velcro") matches only that variant.
 * Order matters: the first pattern that matches wins.
 */
const ALIASES: Array<[RegExp, string]> = [
  [/\bsibal\b|cotton[- ]fiberglass|cotton\/fiberglass/i, "sibal"],
  [/mylar|melinex|\bpet\b(?! ?shirt)/i, "mylar"],
  [/ultem|\bpei\b/i, "ultem"],
  [/nomex.*(velcro|hook)|(velcro|hook).*nomex/i, "nomex/velcro"],
  [/nomex\s*ht\s*90|ht90-40/i, "nomex/ht90-40"],
  [/nomex/i, "nomex"],
  // Before PMMA: "P-213 tape (fiberglass, acrylic adhesive)" mentions acrylic.
  [/p-?213/i, "p-213-tape"],
  [/(pmma|acrylic|acr[ií]lico|plexiglas).*\brod\b|\brod\b.*(pmma|acrylic)/i, "pmma/rod"],
  [/(pmma|acrylic|acr[ií]lico|plexiglas).*\bsheet\b|\bsheet\b.*(pmma|acrylic)/i, "pmma/sheet"],
  [/pmma|acrylic|acr[ií]lico|plexiglas/i, "pmma"],
  [/polycarbonate|policarbonato|lexan/i, "polycarbonate"],
  [/t-?shirt|remera|beefy|cotton|algod[oó]n/i, "cotton"],
  [/kimwipe|cellulose|cellulosic|celulosa/i, "cellulose"],
  [/\bwire\b|cable/i, "wire"],
];

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Canonical key for a material description, or null if no alias matches. */
export function knownMaterialKey(text: string): string | null {
  for (const [re, key] of ALIASES) if (re.test(text)) return key;
  return null;
}

/** Canonical key; unknown materials (e.g. new PSI records) fall back to a slug of the name. */
export function materialKey(text: string): string {
  return knownMaterialKey(text) ?? slugify(text);
}

/**
 * Does a record's material match the query key?
 * Same key, or the record is a variant of the queried family
 * ("nomex" matches "nomex/ht90-40"; "nomex/velcro" does not match "nomex/ht90-40").
 */
export function sameMaterial(queryKey: string, recordKey: string): boolean {
  if (queryKey === recordKey) return true;
  // A specific query ("nomex/ht90-40") does NOT match a generic record ("nomex"):
  // we cannot tell from the source that it is the same product.
  return recordKey.startsWith(queryKey + "/");
}
