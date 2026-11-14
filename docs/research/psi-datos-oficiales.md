---
tipo: investigacion
actualizado: 2026-11-14
fuente: "PSI (psi.nasa.gov), tablas experimentales descargadas el 2026-11-14"
---

# PSI: datos oficiales del desafío (R11)

Resultado de R11 del [Prompts de investigación](prompts-de-investigacion.md) → cumple D14 del [Registro de decisiones](../decisions.md). Lo hizo Claude Code el 2026-11-14, porque Claude Science quedó esperando un permiso de red y no se pudo aprobar a distancia (ver 2026-11-14).

## Qué se bajó `#verificado` (archivos originales de PSI)
Todo es público: no pide login ni acuerdo de datos. Las tablas se bajaron con el mismo mecanismo de descarga que usa la web de PSI (URL prefirmada del bucket `psi-repo-prod`). El tamaño de cada archivo coincide con el que informa PSI.

| Investigación | DOI | Archivo (en `data/psi/`) | Filas | Qué trae |
|---|---|---|---|---|
| PSI-25 BASS-II | 10.60555/4qc4-de67 | `PSI-25_Experimental_table_BASS-II.csv` | 129 | PI, ensayo, material, ventilador/flujo, O₂ inicial y final, CO₂, CO. **Sin columna de resultado ni de presión** |
| PSI-26 BASS | 10.60555/58h4-dy80 | `PSI-26_Experimental_table_BASS.csv` | 116 | Fecha, ensayo, muestra, material. **Sin O₂, flujo ni resultado** |
| PSI-98 Saffire-I | 10.60555/0t15-1z43 | `PSI-98_Experimental_table_SAFFIRE-1.csv` | 2 | SIBAL, 20 cm/s, ~21,5 % O₂, tiempo de quema |
| PSI-99 Saffire-II | 10.60555/2chp-m469 | `PSI-99_Experimental_table_SAFFIRE-2.csv` | 9 | **µg y 1 g para la misma muestra**: largo quemado y velocidad |
| PSI-100 Saffire-III | 10.60555/040q-4h36 | `PSI-100_Experimental_table_SAFFIRE-3.csv` | 2 | SIBAL, 30 cm/s; sin O₂ ni resultado |
| PSI-20 ACME-BRE | 10.60555/vb93-3y72 | `PSI-20_Experimental table_ACME BRE.csv` | — | Quemador de gas (no es sólido) |
| PSI-22 ACME E-FIELD | 10.60555/se5a-8c73 | `PSI-22_Experimental table_ACME E-FIELD Flames.csv` | — | Llamas de gas con campo eléctrico (la consigna dice que "imita" gravedad parcial) |

Tabla de cruce: `data/psi_bounds_evidence.csv` (159 filas, columnas en inglés, "not reported" donde PSI no informa).

## Hallazgos

### 1. El techo de oxígeno: 22,2 % `#verificado` (en estas tablas)
- **BASS-II:** el O₂ inicial calibrado va de **13,6 % (O12) a 22,2 %** (O1, O2, B1–B5, B7, B12, F1, M1, M2, M5, M14). Ningún ensayo arranca por encima.
- **Saffire-I:** 21,5–21,7 %. **Saffire-II:** ~21,5–22,1 %.
- Esto confirma el dato que era `#autodeclarado` (SPICA): **ningún sólido de BASS-II ni de Saffire I–III se ensayó por encima de 22,2 % de O₂**, frente al "30% or greater" que la consigna prevé para la base lunar. Alcance: solo estas tablas; FLEX y ACME son gotas y gases (CFI-G llega a 85 %, pero con gas).
- Ojo: dos O₂ **finales** de BASS-II son absurdos (P22b: 39,1 %; T28b: 40,4 %). Son lecturas erróneas; no usarlos.

### 2. Cotas µg y 1 g con la misma muestra: Saffire-II `#verificado`
A 20 cm/s y ~22 % O₂ (tabla de PSI-99):
| Material | Microgravedad | 1 g (comparación en tierra) |
|---|---|---|
| SIBAL (2-5, 2-6) | Quemó los 29 cm, 2,1–2,6 mm/s | Quemó completo, aceleratorio |
| Nomex (2-7, con PMMA) | No encendió | ~0 |
| Silicona 0,27 mm (2-1) | ~0 | Completo, aceleratorio |
| PMMA (2-8, 2-9) | ~10 cm dañados; llama anclada en la base | Completo, aceleratorio |

Es exactamente lo que sugiere la consigna ("microgravity and normal-gravity results could bound..."): para SIBAL, ambas cotas dicen "arde", así que la Luna también debería. Para la silicona, las cotas no coinciden (µg no, 1 g sí) y la Luna queda en duda. `#inferencia` lo de la Luna.

### 3. Cobertura de nuestros materiales en PSI `#verificado`
| Material de la curva | ¿En PSI? |
|---|---|
| PMMA | Sí: 95 ensayos de BASS-II rotulados como PMMA, film o rod (13,6–22,2 % O₂); 3 filas sin material explícito (B5, T3, T7) quedan afuera. También en BASS y Saffire-II |
| SIBAL | Sí: 27 ensayos de BASS-II (16,4–20,8 %), Saffire I–III |
| Nomex | Solo **Nomex III** (3 ensayos de BASS-II, 21–22,2 %), no HT90-40 |
| Ultem | 2 ensayos de BASS ("ultem sheet"), sin O₂ ni resultado |
| Mylar, policarbonato, cinta P-213, algodón | **No aparecen** en estas tablas |

### 4. Lo que PSI no da `#verificado`
- **Ni BASS ni BASS-II traen columna de resultado** (propagó / se apagó). En 25 ensayos hay notas del operador ("ext", "blowoff", "no ign"); las marcamos como tales, no como un resultado formal.
- **Ningún límite de O₂ numérico** para comparar con la curva. Los números de la curva siguen saliendo de NTRS ([Gravedad parcial - evidencia](gravedad-parcial-evidencia.md)).
- Por eso el punto 3 de R11 (¿el valor lunar cae entre las cotas?) **solo se puede responder cualitativamente con Saffire-II**.

## Uso propuesto en el producto `#inferencia`
1. **Panel "PSI coverage"** por material: cuántos ensayos de PSI hay, con qué O₂, y su DOI. Muestra que el hábitat lunar (≥30 % O₂) queda **fuera de todo lo ensayado**.
2. **Saffire-II como cotas µg / 1 g** junto a la curva de NTRS.
3. La curva de gravedad sigue con NTRS, explicando que PSI "currently" no tiene gravedad parcial (frase de la consigna).

## Texto para el campo "NASA Data" de la entrega (en inglés)
> We used NASA Physical Sciences Informatics (PSI) experimental tables from Burning and Suppression of Solids II (PSI-25, doi:10.60555/4qc4-de67), Burning and Suppression of Solids (PSI-26, doi:10.60555/58h4-dy80), and Spacecraft Fire Safety Experiments Saffire-I, -II and -III (PSI-98 doi:10.60555/0t15-1z43, PSI-99 doi:10.60555/2chp-m469, PSI-100 doi:10.60555/040q-4h36) to map which materials and oxygen levels have been tested in microgravity, and to bound lunar behavior between microgravity and 1-g results, as suggested by the challenge. Partial-gravity flammability limits come from NASA Technical Reports Server documents (Olson & Ferkul 2012, NTRS 20130010991; Urban et al. 2025, NTRS 20250002114).

PSI pide citar cada colección por su DOI ("Cite this Investigation" en cada página).

## Archivos para bajar a mano (opcionales)
No hace falta ninguno para lo anterior. Si se quiere más detalle:
- PSI-26: `Science Documents/As Run_Test Matrix.xlsx` y `Planned_Test Matrix.xlsx` (podrían traer O₂ y flujo de BASS). Página: https://psi.nasa.gov/physci/repo/data/investigations/PSI-26
- PSI-98 y PSI-100: telemetría de Saffire (xlsx). Páginas: https://psi.nasa.gov/physci/repo/data/investigations/PSI-98 · https://psi.nasa.gov/physci/repo/data/investigations/PSI-100
