---
tipo: plan-consolidado
estado: propuesta para validar con el equipo
actualizado: 2026-11-14 15:50 (UTC-3)
reemplaza: el guion de pitch-y-demo.md (Next Burn) y la guía del miércoles
---

# Plan consolidado · Before the First Fire on the Moon

Única referencia para construir, revisar y auditar el proyecto hasta la entrega.
Si algo de `docs/` contradice este archivo, vale este archivo hasta que el equipo decida otra cosa en `docs/decisions.md`.

---

## Estado de la implementación · 15 de noviembre

La versión de revisión está en el [PR privado del equipo](https://github.com/marcosdevin04-bit/Flight-Dynamics---NASA/pull/1). Para probarla desde esa rama: `npm ci`, `npm run build`, `npm run preview`.

| Parte del plan | Resultado comprobado |
|---|---|
| Ask the evidence y pruebas 1–7 | La búsqueda distingue los tres casos. Las fuentes quedan enlazadas. Las pruebas de navegador cubren los ejemplos, la caída de la API y el caso sin caché. |
| PSI, gravedad y materiales | 159 filas PSI en el catálogo. P6 muestra cobertura, O₂ inicial y el contraste de Saffire-II. La curva se cotejó con los 24 valores de la Tabla I de Olson y Ferkul (12 filas). |
| IA del servidor | La lectura de campos, clasificación por código, verificación de citas, reintento y respuesta de respaldo tienen pruebas. Queda por probar una consulta con Anthropic en el servidor de producción. |
| FM2 y simulación | Tres predicciones en el tag privado `fm2-predictions-v1`. Cámara 3D ilustrativa según D18. Depósito de Zenodo preparado en borrador. |
| Presentación | [Texto en inglés](../docs/product/submission-draft.md), [video de revisión de 28 s](../docs/product/demo-draft.mp4) y [subtítulos](../docs/product/demo.en.srt). |
| Siguientes decisiones del equipo | Facundo revisa el PR antes de integrar a main. El equipo elige cuándo publicar las predicciones y enviar el proyecto a Space Apps. |

## 1. La idea

**En una frase (para la app y la entrega):**
> An AI evidence assistant for the engineer designing a lunar habitat. Pick a material, oxygen level and airflow: it finds the closest NASA fire tests — from microgravity, partial gravity and Earth — explains what transfers to the Moon and what doesn't, and says plainly when no test exists. Every claim is checked against NASA sources in code, and a dated prediction waits to be tested when NASA's FM2 burns materials on the Moon.

**El problema.** NASA aprueba los materiales de las naves con una prueba en gravedad terrestre (NASA-STD-6001B, Test 1). La gravedad cambia cómo la llama recibe oxígeno: algunos materiales que no arden en 1 g arden en microgravedad o en gravedad parcial, y la gravedad lunar podría ser una de las condiciones más inflamables (Ferkul et al., LPSC 2026). El hábitat lunar planea 34 % de O₂ a 8,2 psi. FM2 va a encender los primeros fuegos en la Luna; hasta entonces, los ingenieros diseñan con la evidencia que existe.

**El usuario.** El ingeniero que elige los materiales y diseña la ventilación de una base lunar.

**Su pregunta.** "Para este material, con este oxígeno y este flujo de aire, ¿qué observó NASA, y qué cambia en la Luna?"

**El mensaje central.** Depende del material y de la presión. Ejemplo: el Mylar arde en la Luna con ~5,75 puntos menos de oxígeno que en la Tierra, pero el policarbonato y el velcro de Nomex fueron menos inflamables en gravedad lunar a 8,2 psi.

**Lo que la herramienta NUNCA dice.** Que un material es seguro. Dice qué se probó, qué se observó, en qué condiciones, y dónde la prueba terrestre podría no alcanzar.

---

## 1b. Lo que dice la consigna oficial y cambia el plan (leída el 14/11, ver `docs/challenge/consigna.md`)
1. **PSI es obligatorio en la práctica.** La pestaña Resources lo presenta como "la fuente de los datos en los que se debe basar la app". Hoy nuestros datos salen de NTRS. **La base tiene que ser PSI; NTRS queda como evidencia complementaria de gravedad parcial.**
2. **El autor del desafío plantea nuestra pregunta.** Dice que en PSI no hay datos de gravedad parcial, que espera sumar LUCI y FM2, y que **"los resultados en microgravedad y en gravedad normal podrían acotar lo que ocurre en gravedades intermedias"**.
3. **Nuestro hallazgo más fuerte responde a esa frase.** En los datos publicados de gravedad parcial (Olson y Ferkul 2012), el límite lunar del Mylar (15,6 %) y del Ultem (21,0 %) queda **por debajo de los dos extremos** (0 g: 17,0 / 24,0; 1 g: 21,2 / 23,5). Para esos materiales, la microgravedad y la gravedad normal **no acotan** la Luna. Con advertencias: criterios distintos (5,18 s frente a Test 1) y el punto de 0 g con flujo de 30 cm/s. Es el mensaje científico central del pitch.
4. **Producto, reformulado:** las investigaciones de PSI (microgravedad) + la referencia en 1 g dan la "cota" que sugiere NASA; los pocos ensayos de gravedad parcial de NTRS (centrífuga, LUCI) muestran dónde esa cota falla; y la predicción de FM2 deja la pregunta lista para cuando NASA publique los datos lunares en PSI.
5. **Atmósfera según NASA:** "probablemente 30 % de O₂ o más, a 10,2 psi o menos". Nuestro 34 % / 8,2 psi está dentro. Usar la formulación de NASA en el pitch.
6. **Investigaciones que nombra la consigna:** BASS, BASS-II, Saffire-I/II/III (sólidos, prioridad), SAME/SAME-R (detección), FLEX (supresión), ACME-BRE (inflamabilidad en aire quieto), CFI-G (el O₂ más alto en microgravedad).
7. **Público que nombra:** investigadores, ingenieros aeroespaciales y estudiantes. El ingeniero del hábitat encaja.
8. **Atributos que sugiere mostrar:** objetivos, combustible (forma y tamaño), O₂, flujo, variables entre ensayos, sensores, similitudes y diferencias entre investigaciones. Ask the evidence debe mostrar estos campos.
9. **Aplicación en la Tierra (opcional):** el ángulo antártico entra legítimamente acá, en una línea.
10. **Título exacto:** "SI-Powered", no "AI-Powered".

---

## 2. Qué pide el desafío y cómo lo cubrimos

Desafío: *Flame in Freefall: AI-Powered Fire Safety Insights from Microgravity Combustion Data*. Pide un dashboard con IA que resuma, ordene e interprete décadas de resultados de combustión en microgravedad de NASA para la seguridad contra incendios en la Luna y Marte.

| Pide | Cómo lo hacemos | Dónde se ve |
|---|---|---|
| **Resumir** | La tabla de evidencia la extrajo IA (Claude Science) de los PDFs y tablas de NASA, con página por dato, y una persona la verificó. Publicamos la precisión medida | Pantalla de fuentes y campo "Use of AI" |
| **Ordenar (rank)** | El código ordena los ensayos por cercanía al escenario, con los pesos visibles. Cercanía, no riesgo | Ask the evidence |
| **Interpretar** | El LLM explica qué coincide, qué cambia y qué no se puede concluir, citando solo los registros cargados. El código verifica cada cita | Ask the evidence |
| **Microgravedad** | Los ensayos de la Estación (BASS-II, Saffire) son la mayor parte de la evidencia y el extremo 0 g de la curva | Curva y Ask the evidence |
| **Datos de NASA** | NTRS (papers y reportes) + PSI (tablas experimentales) | Cada cita |

---

## 3. Pantallas (por prioridad)

| # | Pantalla | Qué hace | Dueño |
|---|---|---|---|
| 1 | **Ask the evidence** ⭐ | El núcleo de IA (sección 4). Tres casos: ensayo igual, ensayos parecidos, sin coincidencia | Juan (backend IA) + Marcos (UI) |
| 2 | **Gravity curve** | O₂ mínimo para arder frente a la gravedad (0 g · Luna · Marte · 1 g) para Mylar, Ultem y Nomex. Línea de referencia en 34 % O₂, franja de la Luna, fuente y advertencias al tocar un punto | Marcos |
| 3 | **Material cards** | Por material: qué pasa en la Luna (más o menos inflamable), a qué presión, con fuente. Nomex HT90-40 como caso que se invierte con la presión | Marcos |
| 4 | **Our bet before FM2** | Predicciones con fecha, pre-registradas en un tag de GitHub y un DOI de Zenodo antes de la entrega | Facu (texto) + Marcos (pantalla) |
| 5 | **Simulation** (opcional) | Transporte de calor en 0 g, Luna y 1 g × 2 flujos: en la Luna la flotación es 6 veces más débil y la ventilación domina. Rotulada **"SIMULATION — illustrative"**. Solo después de que 1–4 estén publicadas | Marcos |

**Escenario fijo en la Luna.** No hay control de gravedad en la interfaz (Marte, solo si sobra tiempo). La gravedad de la **evidencia** sí varía y siempre se muestra.

---

## 4. El núcleo de IA: Ask the evidence

### Flujo

```
Escenario del usuario (texto libre o controles)
  │
  ▼
[LLM 1: parser] → parámetros JSON validados con esquema
  { material, o2_pct, flow_cm_s, pressure_kPa }        (gravedad = Luna, fija)
  │
  ▼
[Código: retrieval + ranking] sobre evidence.json
  distancia normalizada por variable, pesos visibles, gravedad incluida
  → caso 1 (igual) · caso 2 (parecidos, top-k) · caso 3 (sin coincidencia)
  │
  ▼
[LLM 2: explicación] recibe SOLO los registros recuperados
  qué coincide · qué cambia · qué implica la diferencia de gravedad · qué no se puede concluir
  │
  ▼
[Código: verificador de citas]
  cada ID citado existe entre los recuperados · cada número citado aparece en ese registro
  falla → 1 reintento → si vuelve a fallar, explicación por plantilla (sin LLM)
  │
  ▼
Respuesta con citas clicables + etiqueta de gravedad por ensayo
```

### Reglas de la IA
- El LLM **no calcula ni ordena**: interpreta lenguaje y redacta. Números y ranking los hace el código.
- Responde solo con los registros que recibe. Sin registros → caso 3: *"No matching test in the data we reviewed."* y menciona FM2.
- Cada ensayo muestra su gravedad: `tested in 1 g` · `microgravity` · `partial gravity (centrifuge / rotating rocket)`.
- La explicación siempre dice qué implica la diferencia de gravedad para la Luna.
- Prohibido en cualquier salida: "safe", "certified", "NASA never tested". El verificador también filtra estas palabras.
- Respuestas de la demo **cacheadas** (archivo estático) por si la API falla.

### Cercanía (versión inicial, ajustable)
| Variable | Escala | Peso |
|---|---|---|
| Material | igual = 0 · distinto = fuera del caso 1 (en caso 2 solo con aviso) | filtro |
| Gravedad | Luna = 0 · Marte = 0,3 · 0 g = 0,6 · 1 g = 1 | 2 |
| O₂ | diferencia en puntos / 5 | 1 |
| Flujo | diferencia en cm/s / 10 | 1 |
| Presión | diferencia en kPa / 30 | 0,5 |

Umbral del caso 3: distancia > 2 (a calibrar con los datos reales). Los pesos se muestran en la interfaz.

### Seguridad (Juan)
- API key solo del lado del servidor (función serverless). Nunca en el frontend.
- Límite de longitud del input y de pedidos por IP.
- El texto del usuario solo se convierte en parámetros; el LLM no tiene herramientas ni acceso a nada más.

---

## 5. Datos

| Archivo | Qué es | Uso |
|---|---|---|
| `data/curva_gravedad.json` | Verificado. Curva de 3 materiales, 5 materiales a 8,2 psi, ensayos SIBAL | Fuente principal: pantallas 2, 3 y base de 1 |
| `data/partial_gravity_flammability_evidence.csv` | 45 filas, nivel mixto, texto libre | Tabla de evidencia con etiqueta de nivel. **No apto para ranking** hasta tener campos numéricos |
| `data/evidence.json` (nuevo, Juan) | Registros normalizados con el contrato de `DEVELOPMENT.md` §3 + `gravity_regime` + `nivel` | Lo que consume Ask the evidence |

**Pedido a Facu (prioridad máxima, la consigna lo exige):**
1. Las tablas experimentales de PSI de **BASS-II** y **Saffire-I/II/III** (y, si hay tiempo, ACME-BRE y CFI-G) en el formato del contrato, con `g: 0`, citando el ID de PSI y el archivo. Sin esto, la app no se basa en la fuente que pide NASA.
2. Los registros nuevos con campos numéricos (`o2`, `presion_kPa`, `flujo` en cm/s), no texto libre.
3. Medir la precisión de la extracción: de N filas, cuántas coinciden con el PDF. Ese número va a la entrega.
4. El texto de la apuesta FM2 antes del domingo 11:00.

**Reglas de datos:** toda cifra con fuente a un clic · "not reported" nunca como 0 · filas SECONDARY o UNVERIFIED con su etiqueta · `docs/` y `data/` no se editan a mano (se regeneran desde la bitácora de Facu).

---

## 6. Stack

- **Frontend:** Vite + React + Recharts (Marcos).
- **IA:** función serverless en Vercel (`/api/ask`), TypeScript, LLM vía API de Anthropic, esquema validado con zod (Juan).
- **Deploy:** Vercel, público y sin login. README en inglés.

---

## 7. Tareas y horarios (UTC-3)

### Juan · núcleo de IA y entrega
| Hasta | Tarea | Listo cuando |
|---|---|---|
| Sáb 17:00 | `evidence.json`: normalizar `curva_gravedad.json` al contrato + `gravity_regime` | Script reproducible que lo genera |
| Sáb 19:00 | Ranking + 3 casos, sin LLM | Pasan las pruebas de aceptación 3 y 4 |
| Sáb 21:30 | LLM parser + LLM explicación + verificador de citas | Una consulta real devuelve citas verificadas |
| Sáb 23:00 | `/api/ask` desplegado + caché de demo + integrado con la UI de Marcos | **Compuerta 2: alcance congelado** |
| Dom 13:00 | Sumar datos de PSI de Facu, endurecer, filtro de palabras prohibidas | **Compuerta 3: funciones congeladas** |
| Dom 16:00 | Pruebas de aceptación completas | **Compuerta 4: v1 publicada y entregada** |
| Dom 21:00 | Página de entrega en inglés, campo "Use of AI", video de 30 s | Entrega final (no esperar a 23:59) |

### Marcos · interfaz y deploy
Pantallas 2 y 3 primero, después la UI de Ask the evidence sobre `/api/ask`, después la pantalla 4. La simulación solo con 1–4 publicadas.

### Facu · datos y ciencia
Tandas sáb 19:00, sáb 23:00, dom 11:00 en el formato fijo. Prioridades de la sección 5.

### Cualquiera, ya mismo (10 min cada una)
- Abrir a mano la página oficial del desafío y la pestaña **Resources** y pegarla en `docs/challenge/consigna.md`. Confirmar el título (AI o SI).
- Confirmar que los 3 están en **Members** y en la misma locación (Montevideo).
- Subir hoy una **primera versión** de la página del proyecto (aunque sea el resumen), como pide Space Uruguay.
- Publicar en **Space Apps Connect** (categoría Challenges, título "Flame in Freefall: …") una pregunta al experto de NASA: por ejemplo, si FM2 usará la atmósfera de exploración (34 % O₂, 8,2 psi) y qué materiales.
- Entrar los 3 al **Discord** de Space Uruguay.

---

## 8. Pruebas de aceptación (domingo)
1. Tocar la Luna en el Mylar muestra 15,6 / 14,1 % con la fuente "Olson & Ferkul 2012, Table I, p. 6".
2. Elegir policarbonato muestra "less flammable on the Moon (at 8.2 psi)" con la fuente ICES-2025-392.
3. SIBAL a 18,0 %, 10 cm/s: muestra los ensayos de 17,2 y 18,2 % con la etiqueta `microgravity` y la advertencia de muestras reutilizadas, y luego el ensayo de gravedad lunar del cohete LUCI.
4. Una combinación sin datos (por ejemplo, 34 % O₂ a 8,2 psi) dice "No matching test in the data we reviewed" y menciona FM2.
5. Ningún texto ni respuesta del LLM dice "safe", "certified" ni "NASA never tested".
6. Toda cita del LLM existe en los registros recuperados (verificador en verde).
7. Con la API apagada, la demo funciona con las respuestas cacheadas.

---

## 9. Reglas de entrega (si no se cumplen, no hay juzgamiento global)
- Los 3 en Members del equipo, en el mismo evento local.
- Desafío oficial (Flame in Freefall).
- Todo en inglés. Demo: video ≤ 30 s con subtítulos en inglés, o ≤ 7 slides.
- Links públicos sin login (probar en ventana privada).
- Datos de NASA declarados en su campo. Todos los recursos externos en Referencias.
- Uso de IA declarado (herramientas y cómo). Imágenes o videos generados con IA con marca de agua. Sin logo de NASA.
- "Submit for Judging" antes del domingo 23:59. Objetivo: 21:00.

---

## 9b. Lo que confirma Space Uruguay (guía del participante + mails del 12 al 14/11)
- **El proyecto arranca el sábado 10:15.** "Nadie puede empezar el proyecto antes de esta jornada." Lo previo (guía técnica del 11/11) es material de estudio, no proyecto.
- **Hay pitch en vivo:** la semana siguiente cada equipo presenta online ante el jurado local (mié 18 a vie 20). Taller de pitch: mar 17, 18:30 (Zoom). Nominados: sáb 21.
- **Mismos 5 criterios, del 1 al 5,** en el jurado local y en el global. La cantidad de nominados de Uruguay depende de cuántos proyectos se entreguen.
- **"Se vende una idea, no hace falta una superapp."** Refuerza el alcance angosto.
- **Llamadas:** dom 10:00 (seguimiento) y dom 15:00 (cómo subir el proyecto). Guardia en Discord desde dom 18:00.
- **Discord obligatorio** si participan online (después de las 17:00 del sábado, todos lo están).
- **Space Apps Connect** (GitHub Discussions, nasa/spaceapps, categoría Challenges): los expertos de NASA que escribieron los desafíos responden ahí **y son jueces globales**. Publicar una pregunta buena sobre Flame in Freefall es visibilidad directa ante quien evalúa.
- **Global Offers** (perfil > Offers): dominio gratis (GoDaddy), Azure y GitHub Copilot (Microsoft), Google Cloud. Opcionales; un dominio propio suma a la presentación.
- **IA:** permitida si se explica. Imágenes y videos con IA llevan la marca "AI-generated".
- **Formulario de entrega habilitado desde el sábado:** subir una primera versión hoy; cuenta la última enviada.

---

## 10. Contra los criterios
| Criterio | Cómo lo cubrimos |
|---|---|
| Impacto | Usuario real (ingeniero del hábitat) y una brecha que NASA declara: inflamabilidad en gravedad parcial con la atmósfera de exploración |
| Creatividad | Nadie más mira la gravedad. Predicción falsable antes de FM2 |
| Validez | Fuente y página por dato, verificación en código, límites explícitos, nunca "safe" |
| Relevancia | IA que resume, ordena e interpreta datos de microgravedad de NASA (NTRS + PSI) |
| Presentación | El hallazgo del Mylar en los primeros segundos del video |

---

## 11. Riesgos
| Riesgo | Mitigación |
|---|---|
| No hay app publicada el domingo 16:00 | Compuertas fijas; la simulación va última |
| El LLM inventa citas | Verificador en código + plantilla de respuesta si falla |
| La API falla en la demo o el jurado | Respuestas cacheadas |
| Pocos datos estructurados para el ranking | Base: `curva_gravedad.json`; PSI de Facu como segunda tanda |
| La microgravedad se lee como si fuera la Luna | Etiqueta de gravedad por ensayo y explicación obligatoria |
| El pitch dice "seguro" | Regla 5 de aceptación; revisar textos antes de entregar |

---

## 12. Decisiones a confirmar con el equipo
- [ ] Ask the evidence es la pantalla 1 y el núcleo de IA.
- [ ] Escenario fijo en la Luna; la gravedad de la evidencia se muestra y entra en el ranking.
- [ ] La simulación queda después de las pantallas 1–4.
- [ ] Facu prioriza PSI (BASS-II, Saffire) en formato numérico.
- [ ] El ángulo antártico sale del pitch salvo una línea.
- [ ] Este archivo pasa a ser la referencia y se registra en `docs/decisions.md`.

---

## Glosario mínimo
- **1 g / 0 g / gravedad parcial:** gravedad terrestre / microgravedad (Estación Espacial, torres de caída) / entre ambas (Luna 0,165 g, Marte 0,38 g).
- **ULOI:** oxígeno mínimo con el que el material ardió. **MOC:** oxígeno máximo con el que se autoextinguió.
- **NASA-STD-6001B Test 1:** la prueba terrestre con la que NASA aprueba materiales.
- **FM2:** Flammability of Materials on the Moon, el experimento que encenderá los primeros fuegos en la Luna.
- **PSI:** repositorio de datos experimentales de NASA (Physical Sciences Informatics). **NTRS:** servidor de reportes técnicos de NASA.
