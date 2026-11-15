---
tipo: plan
estado: propuesta
actualizado: 2026-11-15
---

# Plan de trabajo: sábado 14 y domingo 15 de noviembre

> **Estado al 15/11:** el plan se ejecutó con cambios. El producto pasó de Next Burn a "Before the First Fire on the Moon" (D9); el CFD con FDS se reemplazó por la cámara 3D ilustrativa (D18). Las compuertas 1 y 2 se cumplieron. Lo que pasó realmente está en 2026-11-14 y 2026-11-15.

> **Objetivo:** ganar la nominación local (jurado del 18 al 20/11) y competir por un premio global, sobre todo **Mejor uso de la ciencia**.
> **Producto candidato:** "Antes del primer fuego en la Luna" (D9 + D10) → [FM2 - fuego en la Luna](../research/fm2-fuego-en-la-luna.md) · [Registro de decisiones](../decisions.md)
> **Prompts listos para copiar:** [Prompts de investigación](../research/prompts-de-investigacion.md)

---

## 0. Cinco reglas de trabajo

1. **La investigación tiene horario.** Se investiga mucho, pero en bloques con hora de cierre. Lo que no se encuentra a tiempo se anota como `#pendiente` y se sigue. A las 36 horas no hay investigación que valga sin entrega.
2. **Todo hallazgo va a la bitácora**, o no existe. Formato: nota en `03 Investigación/`, nivel de evidencia y fila en [Fuentes](../sources.md). Los hallazgos científicos usan `Plantillas/Hallazgo`.
3. **Evidencia antes que narrativa.** Nada de lo que diga una IA entra como `#verificado` hasta que una persona lo lea en la fuente. Las IAs de investigación inventan citas y páginas.
4. **Una decisión, un responsable**, anotada en [Registro de decisiones](../decisions.md). Las ideas nuevas se evalúan siempre contra los mismos 4 filtros:
   - ¿Alguien ya lo hace? → [Competencia 2026](../research/competencia-2026.md)
   - ¿NASA lo respalda con un documento?
   - ¿Responde al desafío?
   - ¿Llegamos en el tiempo?
5. **Hay compuertas.** En cada una se decide y no se vuelve atrás sin una razón fuerte (sección 3).

---

## 1. Cómo arrancar (los primeros 60 minutos)

| # | Tarea | Quién | Listo cuando… |
|---|---|---|---|
| 1 | Reunión de 20 min con el deck v2 (https://claude.ai/artifact/7MBueEbY7pJTVbL1EKomjz) | los 3 | Se vota D9+D10 y se registra |
| 2 | Asignar roles: Science & Data / Engineering / Product & Pitch → [07 Equipo](../team.md) | los 3 | Un nombre por rol |
| 3 | Nombre del equipo + página del proyecto en spaceappschallenge.org, con los 3 en Members | Product | Captura de Members |
| 4 | Leer la consigna oficial y la pestaña **Resources**, y pegarlas en [Consigna](../challenge/consigna.md) | Product | Lista de recursos oficiales anotada |
| 5 | Repo en GitHub + copiar esta bitácora adentro (o sincronizarla con el plugin Obsidian Git) | Engineering | Los 3 pueden hacer push |
| 6 | Pregunta rápida: ¿alguien usó **FDS** o algún CFD? | los 3 | Respuesta anotada en D10 |
| 7 | Lanzar los prompts R1, R2 y R3 (sección 4) en paralelo | Science | Corriendo |

---

## 2. Roles y herramientas

| Rol | Herramienta (según [07 Equipo](../team.md)) | Dueño de… |
|---|---|---|
| **Science & Data** | Claude Pro / Claude Science | Investigaciones R1–R4, dataset curado, verificación de cada dato, la apuesta FM2 |
| **Engineering** | Claude Pro / Claude Code | App, esquema JSON, CFD/FDS (R5), deploy, cache de la demo |
| **Product & Pitch** | ChatGPT Pro / Astra Pro | Investigaciones R6–R9 (NASA, otras hackatones, originalidad), UX, textos en inglés, video de 30 s, campo "Use of Super Intelligence" |

**Investigación cruzada:** lo que encuentra una IA lo verifica otra persona con otra herramienta. Ejemplo: Product le pide a ChatGPT que critique lo que Science sacó con Claude.

---

## 3. Cronograma con compuertas (hora de Uruguay)

### Sábado 14
| Hora | Bloque | Science & Data | Engineering | Product & Pitch |
|---|---|---|---|---|
| 13:30–14:30 | **Arranque** | sección 1 | sección 1 | sección 1 |
| 14:00 | Llamada 2 de seguimiento (Zoom) | — | — | asiste y pregunta a mentores (ver R9) |
| 14:30–17:30 | **Investigación 1** | R1 gravedad parcial · R2 FM2 · R3 verificaciones | Esqueleto de la app + esquema JSON + R5 (prueba de FDS) | R6 qué valora NASA · R7 otras hackatones |
| **17:30** | 🚦 **Compuerta 1: producto cerrado** | ¿Hay datos de gravedad parcial suficientes? Si no hay ni 5 puntos: plan B (la pregunta se mantiene, pero la curva se reemplaza por "lo que no se sabe" con fuentes) | ¿FDS corre? Si no: 2D ilustrativo | Se congela la frase del producto |
| 17:30–21:00 | **Construcción 1** | Cargar 20–40 hallazgos verificados (plantilla Hallazgo) | Pantallas: lista de materiales + ensayos parecidos | Wireframes, guion de 30 s v1, borradores de textos en inglés |
| 21:00–23:00 | **Investigación 2 (originalidad)** | R8 ideas nuevas: revisar las 3 mejores | Corridas de FDS (6 casos) en segundo plano | R8 + "abogado del diablo" del jurado (prompt P-JURADO) |
| **23:00** | 🚦 **Compuerta 2: alcance congelado** | Ninguna función nueva después de esto, salvo que sea chica y suba la nota | | |

### Domingo 15
| Hora | Bloque | Science & Data | Engineering | Product & Pitch |
|---|---|---|---|---|
| 09:00–10:00 | Revisión + llamada 3 (10:00) | Repaso de datos: todo `#verificado`? | Bugs | Preguntas para mentores |
| 10:00–13:00 | **Construcción 2** | Pantalla "Qué esperamos de FM2" (la apuesta, con fuentes) | Simulación integrada + IA con citas verificadas en código + cache | Grabar pantallas para el video |
| **13:00** | 🚦 **Compuerta 3: congelamiento de funciones** | Fin de la investigación. Lo que falta queda `#pendiente` y se dice en el pitch | | |
| 13:00–15:00 | Pulido + pruebas | Las 4 pruebas de aceptación (Spec MVP - Next Burn) | Deploy público sin login | Textos finales en inglés |
| 15:00 | Llamada 4: cómo subir (Zoom) | | | |
| **16:00** | 🚦 **Compuerta 4: primera entrega subida** | | | Submit for Judging v1 |
| 16:00–21:00 | Mejoras + video final | Referencias completas en [Fuentes](../sources.md) | Ajustes | Video de 30 s (cronometrado), 7 slides opcionales, "Use of Super Intelligence" |
| **21:00** | Entrega final | | | Reenviar. **No esperar a las 23:59.** |

### Después de la entrega
| Fecha | Qué |
|---|---|
| Mar 17/11, 18:30 | Taller de pitch (los 3) |
| 18–20/11 | Jurado local: ensayar 3 veces y preparar respuestas a P-JURADO |
| 21/11 | Nominados a la etapa global |
| Hasta el 3/12 | Si nos nominan: seguir investigando para la defensa, sin tocar la entrega |

---

## 4. Líneas de investigación

Cada línea tiene un objetivo, una nota de salida, un responsable y un horario. Los prompts completos están en [Prompts de investigación](../research/prompts-de-investigacion.md).

### Bloque A: el núcleo científico (Science & Data)
| ID | Pregunta | Salida | Cierra |
|---|---|---|---|
| **R1** | ¿Qué ensayos de inflamabilidad en **gravedad parcial** existen (torres de caída, aviones, centrífugas, cohete sondeo), con qué materiales, oxígeno, flujo y resultados? | `03 Investigación/Gravedad parcial - evidencia.md` + hallazgos | Sáb 17:30 |
| **R2** | ¿En qué estado está **FM2** (lanzado o no, módulo, fecha, materiales)? ¿Qué predicen NASA y la literatura para la Luna? | Actualizar [FM2 - fuego en la Luna](../research/fm2-fuego-en-la-luna.md) | Sáb 17:30 |
| **R3** | Verificar los datos que vamos a mostrar: SIBAL (tabla 7.1 del informe BASS-II, p. 96), "ningún sólido por encima de 22,2 % en vuelo" (PSI), el 13,6 % frente al 16 % del PMMA, el acceso a MAPTIS | Cada dato pasa a `#verificado` o se descarta | Sáb 17:30 |
| **R4** | ¿Qué materiales reales de la base lunar preocupan (telas de ropa, Nomex, SIBAL, Kapton, baterías)? ¿Cuáles aprobaron NASA-STD-6001 "de cerca"? | Lista de 5–10 materiales para la app | Sáb 21:00 |

### Bloque B: la técnica (Engineering)
| ID | Pregunta | Salida | Cierra |
|---|---|---|---|
| **R5** | ¿Se puede correr FDS con gravedad lunar (vector de gravedad), en una caja chica, en menos de 30 min por caso? ¿Cómo se exportan los campos de temperatura a imágenes para la web? | Decisión FDS o 2D en D10 + 6 corridas | Sáb 17:30 (decisión) · 23:00 (corridas) |

### Bloque C: cómo ganar (Product & Pitch)
| ID | Pregunta | Salida | Cierra |
|---|---|---|---|
| **R6** | ¿Qué valora NASA? Ganadores globales 2019–2025 de "Best Use of Science" y similares: qué tenían en común. Quién escribió el desafío (experto de NASA) y qué publica. Cómo se elige a los nominados globales | `03 Investigación/Qué valora NASA.md` | Sáb 17:30 |
| **R7** | ¿Qué gana en otras hackatones espaciales y científicas (ESA, ActInSpace, Copernicus, NASA HeroX / Tournament Lab, Devpost)? ¿Qué patrones se repiten? | `03 Investigación/Otras hackatones.md` | Sáb 17:30 |
| **R8** | Originalidad: generar y filtrar ideas que **nadie** en [Competencia 2026](../research/competencia-2026.md) tenga. Ej.: Marte (0,38 g), baterías de litio, telas de trajes, polvo lunar, ventilación y ubicación de detectores en la Luna | Las 3 mejores, evaluadas con los 4 filtros, en el registro de decisiones | Sáb 23:00 |
| **R9** | Preguntas para mentores y expertos de NASA en Space Apps Connect (GitHub Discussions, categoría Challenges) | Preguntas publicadas y respuestas anotadas | Dom 13:00 |
| **R10** | Vigilar la competencia: repos nuevos de Flame in Freefall dos veces por día | Actualizar [Competencia 2026](../research/competencia-2026.md) | Sáb 21:00 y dom 12:00 |

---

## 5. Cómo se registra cada investigación

1. Se corre el prompt y la IA devuelve hallazgos con fuente y nivel.
2. **Una persona abre cada fuente citada.** Si la cita no existe o no dice eso, se descarta y se anota "cita inventada por IA".
3. Se crea o actualiza la nota en `03 Investigación/`. Cada afirmación lleva `#verificado`, `#autodeclarado`, `#inferencia` o `#pendiente`.
4. Se agrega la fila en [Fuentes](../sources.md) y el uso de IA en la sección "Uso de IA" (lo pide la entrega).
5. Si cambia algo del producto: nueva fila en [Registro de decisiones](../decisions.md).
6. Al cerrar cada bloque: 3 líneas en el diario del día (`05 Bitácora/`).

Si trabajan con Claude Code en esta carpeta, el `CLAUDE.md` le indica que haga los pasos 3 a 6.

---

## 6. Cómo ganar a nivel global (lo que sabemos hoy)

**El camino:** entrega (15/11) → jurado local (18–20/11) → nominación local (21/11) → nominados globales (3/12) → finalistas (17/12) → 10 ganadores (26/1/2027). **Sin ganar lo local, no hay global.** → [Reglas y entrega](../challenge/reglas-y-entrega.md)

**El jurado global** son expertos de NASA y agencias socias, y muchos escribieron los desafíos. Puntúan Impacto, Creatividad, Validez, Relevancia y Presentación del 1 al 5. → [Criterios y premios](../challenge/criterios-y-premios.md)

**Lo que ya sabemos que funciona:**
- **Una pregunta concreta** gana sobre una herramienta genérica (SpaceGenes+, 2025). → [Ganadores previos](../research/ganadores-previos.md)
- **Usar la investigación más nueva de NASA** (FM2, LPSC 2026) y el lenguaje de sus propios investigadores: Ferkul, Liao, Urban, Olson.
- **Honestidad científica visible:** "en los datos consultados", simulación marcada como simulación, cero certificados de seguridad.
- **Una hipótesis escrita antes del resultado** (la apuesta FM2): es el método científico que premia "Mejor uso de la ciencia".
- **Una demo de 30 s que se entienda sin explicación.** Sin ella no hay nominación.

**Lo que hay que averiguar (R6):** cuántos nominados globales salen de Uruguay, qué rasgos comparten los ganadores de "Best Use of Science" de 2019 a 2025, y si los expertos del desafío respondieron preguntas en Space Apps Connect.

---

## 7. Riesgos de este plan
| Riesgo | Mitigación |
|---|---|
| Investigar demasiado y no construir | Compuertas 1 y 3 fijas; la investigación tiene horario |
| Que la IA invente citas | Paso 2 de la sección 5: nadie marca `#verificado` sin abrir la fuente |
| Pocos datos de gravedad parcial | Es el hallazgo en sí: "nadie lo sabe todavía, por eso existe FM2". Plan B en la compuerta 1 |
| FDS lleva demasiado tiempo | Decisión a las 17:30; plan B: 2D ilustrativo |
| Cambiar de idea el domingo | Compuerta 2: el alcance queda congelado el sábado a las 23:00 |
| Cansancio | Dormir al menos 5 horas por turnos; el domingo a la tarde es el bloque crítico |
