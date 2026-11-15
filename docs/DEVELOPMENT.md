---
tipo: producto
estado: tanda 2
actualizado: 2026-11-14
---

# Paquete para Marcos (desarrollo)

> Todo lo que necesitás para construir la app **sin esperar a que termine la investigación**. Facundo (investigación) va sumando **tandas** al final de esta nota. El **formato de los datos no cambia**: lo nuevo son más filas, no columnas distintas.
>
> **Tanda 1:** sábado 14/11, ~15:00 · Próximas: sáb 19:00 · sáb 23:00 · dom 11:00 (la última; después se congela)

---

## 1. Qué es el producto (30 segundos)

**Nombre de trabajo:** *Before the First Fire on the Moon* ("Antes del primer fuego en la Luna").

**La pregunta:** ¿qué materiales que NASA aprueba con pruebas en la Tierra podrían arder en la Luna?

**El usuario:** el ingeniero que diseña la ventilación y elige los materiales de una base lunar.

**El momento:** NASA va a encender el primer fuego en la Luna (experimento FM2). Sospecha que la Luna puede ser el peor lugar para un incendio. Nuestros datos muestran que **depende del material y de la presión**.

**En una frase (para la app):**
> "NASA approves materials by testing them on Earth. Before the first fire on the Moon, we show which ones might behave differently there — and what the evidence actually says."

Contexto completo: [FM2 - fuego en la Luna](research/fm2-fuego-en-la-luna.md) · [Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md) · Deck: https://claude.ai/artifact/7MBueEbY7pJTVbL1EKomjz

---

## 2. Pantallas (en orden de prioridad)

### P1 · La curva de gravedad ⭐ (lo original; hacer primero)
- **Gráfico:** eje X = gravedad (0 g · Luna 0,16 · Marte 0,38 · Tierra 1), eje Y = oxígeno mínimo para arder (%).
  - Una línea por material: Mylar, Ultem y Nomex.
  - Mostrar ULOI como punto y el rango ULOI–MOC como barra.
- **Línea horizontal de referencia** en 34 % O₂ (atmósfera planificada de la base lunar), rotulada.
- **Marcar la Luna** (franja vertical).
- **Al tocar un punto:** plataforma, flujo, presión, fuente con página y advertencias.
- **Texto clave:** "Mylar burns on the Moon with 5.75 points less oxygen than on Earth."
- **Advertencias visibles** (no escondidas): las 5 de `_meta.advertencias_globales`.
- Datos: `curva_gravedad.json` → `materiales`.

### P2 · Ficha por material (para el ingeniero)
- Lista de materiales. Cada fila dice:
  - si pasa o falla NASA-STD-6001 Test 1 en aire;
  - qué pasa en la Luna (más / menos inflamable);
  - la corrección conservadora de O₂.
- **El mensaje "depende":** los que fallan Test 1 (PMMA, cinta P-213, remera de algodón) empeoran en la Luna; los que pasan (policarbonato, Velcro de Nomex) mejoran. Los colores van siempre **con texto**, no solos.
- **Caso destacado:** el Nomex HT90-40 **se invierte con la presión** (14,7 psi: peor en la Luna; 8,2 psi: mejor).
- Datos: `curva_gravedad.json` → `habitat_lunar_8_2_psi`.

### P3 · Ensayos parecidos (la idea de Marcos)
- **Controles:** material, O₂, flujo y gravedad.
- **Tres casos:**
  1. Hay un ensayo igual → resultado, condiciones y fuente.
  2. Hay ensayos parecidos → ordenados por cercanía, explicando qué coincide y qué cambia.
  3. No hay → "No matching test **in the data we reviewed**".
- **Ejemplo de demo (SIBAL):** usuario en 18,0 % de O₂, 10 cm/s, 0 g. La app muestra los ensayos de 17,2 % ("no encendió") y 18,2 % ("llama de un solo lado") y explica que no alcanza para asegurar nada, **con la advertencia de que eran muestras reutilizadas**.
- **Cercanía = distancia normalizada por variable**, con los pesos visibles. **No es un puntaje de riesgo.**
- Datos: `curva_gravedad.json` → `ejemplo_sibal_microgravedad` + CSV completo.

### P4 · La apuesta antes de FM2 (contenido en la tanda 2 o 3)
- Texto con fecha: "On 2026-11-15 we expect…", con 2–3 predicciones basadas en las fuentes y la regla para comparar cuando lleguen los datos.
- **Por ahora: dejar el lugar armado.** El texto llega en una próxima tanda.

### P5 · Simulación (opcional; se decide a las 19:00)
- **FDS** precalculado (0 g, Luna y 1 g × 2 flujos) **o** una simulación 2D simple.
- Siempre rotulada **"SIMULATION — illustrative"**.

---

## 3. Los datos (formato fijo)

| Archivo | Qué es | Nivel |
|---|---|---|
| `data/curva_gravedad.json` | **Usar este para la app.** Datos limpios y verificados de P1, P2 y P3 | `#verificado` |
| `data/partial_gravity_flammability_evidence.csv` | Tabla completa de Claude Science (45 filas, columnas abajo) | mixto; mirar la columna `verification` |
| `data/partial_gravity_gaps_summary.md` | Vacíos y discrepancias | — |
| `data/psi_coverage.json` | **Tanda 2.** Datos de PSI listos para la pantalla P6 | `#verificado` |
| `data/psi_bounds_evidence.csv` | Los 159 ensayos de PSI con nuestros materiales, fila por fila | `#verificado` |
| `data/psi/` | Tablas originales de PSI (no modificar) | original |

**Columnas del CSV:**
`row_id, study, platform, gravity_g, test_duration_s, material_thickness, O2_pct, pressure_kPa, airflow_cm_s_direction, outcome, source_page, value_status, verification, notes`

**Regla para mostrar filas del CSV:**
- Si `verification` contiene "SECONDARY" o "UNVERIFIED", mostrar la etiqueta **"secondary / unverified"**.
- Si `value_status` dice "not reported", mostrar **"not reported"** (nunca 0).

**Contrato de cada registro nuevo** (lo que mandará Facundo en las próximas tandas):
```json
{
  "id": "texto-unico",
  "material": "",
  "espesor_mm": null,
  "gravedad": "0 g | Luna | Marte | 1 g",
  "g": 0.16,
  "o2": null,
  "presion_kPa": null,
  "flujo": "",
  "resultado": "",
  "fuente": {"cita": "", "ntrs": "", "ubicacion": "tabla / página"},
  "nivel": "verificado | secundario | no verificado",
  "advertencia": ""
}
```

---

## 4. Reglas que no se negocian

1. **Nunca "safe", "certified" ni "NASA never tested".** Decir "in the data we reviewed".
2. **Toda cifra muestra su fuente** (cita + página) a un clic.
3. **La simulación se rotula** como simulación.
4. **Si la app usa un LLM** (por ejemplo, para explicar los casos intermedios):
   - responde **solo con los registros cargados**;
   - el código verifica que los IDs y números citados existan;
   - las respuestas de la demo quedan **cacheadas**, por si falla la API.
5. **Todo el texto de la interfaz en inglés.**
6. **Sin logo de NASA.** Las imágenes generadas con IA llevan marca de agua.
7. **Accesible:** contraste suficiente; los colores siempre con texto.

## 5. Fuera de alcance (no hacer)
Login · cargar todo PSI · modelos predictivos de ML · 3D · detector por cámara (D6) · multiusuario.

## 6. Técnica (decide Marcos)
- **Sugerencia:**
  - **Opción rápida:** Vite + React + Recharts, o una página estática con un JSON. Deploy en Vercel, Netlify o GitHub Pages, **público y sin login**.
  - **Alternativa:** Streamlit (más rápido, menos lindo).
- **Repo en GitHub** con README en inglés (lo pide la entrega: "Link to Final Project").
- **Compuerta 4:** algo publicado y funcionando el **domingo a las 16:00**, aunque falten cosas.

## 7. Pruebas de aceptación (para el domingo)
1. Tocar la Luna en el Mylar muestra 15,6 / 14,1 % con la fuente "Olson & Ferkul 2012, Table I, p.6".
2. Elegir policarbonato muestra "less flammable on the Moon (at 8.2 psi)" con la fuente ICES-2025-392.
3. SIBAL a 18,0 %, 10 cm/s y 0 g muestra los ensayos de 17,2 y 18,2 % con la advertencia de muestras reutilizadas.
4. Una combinación sin datos (por ejemplo, Luna a 34 % y 8,2 psi) dice "No matching test in the data we reviewed" y menciona FM2.
5. Ningún texto de la app dice "safe".

## 8. Cómo pedir algo
Si te falta un dato, anotalo abajo en "Pedidos de Marcos" y Facundo lo prioriza en la próxima tanda.

### Pedidos de Marcos
- (vacío)

---

## Tandas

### Tanda 1 · sáb 14/11 ~15:00
- `curva_gravedad.json` con: 3 materiales × 4 gravedades (verificado) + 5 materiales a 8,2 psi (verificado, solo la dirección del efecto) + Nomex a 8,2 psi (aproximado) + 5 ensayos de SIBAL (verificado, con advertencia).
- CSV completo de 45 filas y resumen de vacíos.
- Pendiente para las próximas tandas: estado y material de FM2 (R2), lista de materiales reales de una base lunar (R4), texto de la apuesta para FM2, y valores lunares numéricos de ICES-2025 (si se digitalizan).

### Tanda 2 · sáb 14/11 · PSI (el recurso oficial del desafío)
**Por qué es prioridad:** la consigna dice que PSI es "the source of the data upon which the NASA Space App is to be based", y el criterio de jurado Relevance premia usar datos de NASA "as a core component". Hoy la app solo usa NTRS. Contexto: [PSI - datos oficiales](research/psi-datos-oficiales.md) · D14.

**Datos:** `data/psi_coverage.json` (generado de las tablas originales de PSI). Tiene tres bloques:
- `o2_ceiling`: el techo de oxígeno ensayado (22,2 %) frente a la base lunar (≥30 %).
- `coverage`: por material de la curva, cuántos ensayos hay en PSI, el rango de O₂ y las investigaciones.
- `saffire2_bounds`: 9 muestras de Saffire-II con resultado en **microgravedad y en 1 g**.

**Pantalla nueva P6 · "What NASA's PSI database covers"** (pestaña propia o sección arriba de la curva):
1. **Barra de oxígeno** (horizontal, 0–40 %): sombrear lo ensayado con sólidos en PSI (13,6–22,2 %) y marcar con una línea la base lunar ("30% or greater" y 34 %). Texto: "No solid sample in the PSI tables of BASS-II or Saffire I–III was tested above 22.2% oxygen. The planned lunar habitat is at 30% or more." Fuente a un clic: los DOI de `_meta.sources`.
2. **Tabla de cobertura** por material (de `coverage`): material · ensayos en PSI · rango de O₂ · investigaciones. Los materiales con 0 ensayos muestran "Not found in the PSI tables we reviewed" (nunca "never tested"). Mostrar `note` si existe (por ejemplo, que el Nomex de PSI no es el HT90-40 de la curva).
3. **Tarjeta "Bounding the Moon"** (de `saffire2_bounds`): por muestra, dos columnas, **Microgravity** y **Earth (1 g)**, con el resultado. Texto (**corregido el 14/11 ~22:00**): "The challenge suggests microgravity and Earth results could bound what happens in between. Saffire-II shows where they agree (SIBAL burned in both) and where they disagree (thin silicone). But agreement is not enough: in the only published partial-gravity limits, Mylar, Ultem and Nomex HT90-40 burned at lower oxygen in lunar gravity than in either microgravity or 1 g (Olson & Ferkul 2012, Table I, p. 6). For those materials, the bounds fail — the question FM2 is designed to answer." Mostrar al lado, en chico, los tres valores lunares frente a 0 g y 1 g.
4. **En la ficha de material (P2)**: agregar una línea "PSI tests: N (O₂ X–Y%) · see PSI" con link a la investigación.

**Reglas (además de las de la sección 4):**
- Los datos de PSI son **microgravedad o 1 g**, nunca Luna. No ponerlos como puntos de la curva de gravedad.
- BASS y BASS-II **no traen columna de resultado**. Si se muestran ensayos sueltos, el resultado es "not reported" salvo las notas del operador, que se rotulan como "operator note".
- Usar solo el O₂ **inicial**. Hay dos O₂ finales que son errores de sensor (P22b y T28b).
- Toda cifra de PSI lleva su DOI. PSI pide citar así cada colección.

**Pruebas de aceptación nuevas:**
6. La barra de oxígeno muestra 22,2 % como máximo ensayado y la base lunar a 30 % o más, con link a PSI-25.
7. Elegir Mylar en la ficha dice "Not found in the PSI tables we reviewed".
8. La tarjeta de Saffire-II muestra que SIBAL (2-5) quemó en microgravedad (29 cm, 2,1 mm/s) y en 1 g (completo), citando PSI-99, doi 10.60555/2chp-m469.
9. Ningún texto de la app dice que PSI tiene datos lunares.

**Para el README y la entrega:** el texto del campo "NASA Data" está en [PSI - datos oficiales](research/psi-datos-oficiales.md).


### Tanda 3 · sáb 14/11 ~21:00 · Antes del merge a main
Es la revisión de `feature/lunar-evidence-dashboard` en c3e9faa (ver 2026-11-14). **Lo que está bien no se toca:** LUCI en `data/luci.json` cumple D15; el navegador de evidencia y la IA que solo elige IDs ya citados cumplen la regla 4; el deploy público funciona sin login.

**Ojo:** se corrigió el texto de la tarjeta "Bounding the Moon" de la Tanda 2: si µg y 1 g coinciden, eso **no** implica que la Luna sea igual (ver [PSI - datos oficiales](research/psi-datos-oficiales.md)).

**Hacer antes del merge (en este orden):**
1. **Sacar `.agents/` del repo.** Son ~14 000 líneas de la herramienta de diseño "impeccable" y no forman parte de la app.
   ```bash
   git rm -r --cached .agents && echo ".agents/" >> .gitignore && git commit -m "chore: stop tracking local design tooling"
   ```
2. **Pantalla P6 de PSI** (la de la tanda 2). Es la prioridad: es la que demuestra que usamos el recurso oficial del desafío. Hacer `git pull origin main` primero: `data/psi_coverage.json` ya está en main (a0ba929).
3. **Escenarios de fluido hidráulico y de combustible "unspecified".** No tienen ningún dato de NASA. Elegir una:
   - **(a) Sacarlos** (recomendado);
   - **(b) Dejarlos solo en la cámara 3D**, con la etiqueta "Generic pool source · no NASA data", y que **no aparezcan en Similar tests**, donde parecen una búsqueda de evidencia.
4. **Vista FM2:** que lea un `data/prediction.json` con el material, la dirección esperada, la regla de comparación y la fecha. Facundo pasa el contenido (es la apuesta previa a FM2). Mientras no exista el archivo, dejar el texto actual.
5. **README de la rama:** en main el README ya está reescrito. Al mergear, quedarse con el de main y agregarle solo la sección del link al deploy y de la cámara 3D.

**Correr antes de abrir el PR:**
- Las pruebas de aceptación 1 a 9 (secciones 7 y Tanda 2).
- Buscar "safe" y "never tested" en todo el texto de la interfaz: no tiene que aparecer ninguno.
- `node scripts/check-chamber.mjs`.

**Merge:** abrir un PR de `feature/lunar-evidence-dashboard` a main. Hoy no tiene conflictos (`git merge-tree`). Lo revisa Facundo antes de mergear.

**A decidir en equipo (no bloquea a Marcos):**
- La cámara 3D estaba "fuera de alcance" en la sección 5. Ya está hecha y rotulada como ilustrativa, así que se deja, pero **no va en la demo de 30 s**, salvo que el equipo decida lo contrario.
- La rama `juan/ai-core` (motor de evidencia en TypeScript, con verificación de citas y tests) todavía no está conectada con la app. Decidir si la app usa el `evidence.json` y el verificador de Juan o si sigue con su comparación propia.
