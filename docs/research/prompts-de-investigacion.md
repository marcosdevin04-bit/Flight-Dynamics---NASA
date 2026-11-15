---
tipo: prompts
actualizado: 2026-11-14
---

# Prompts de investigación

Se usan junto con el [Plan de trabajo](../product/plan-de-trabajo.md).

**Cómo usarlos:**
1. Pegar el **bloque de contexto** y después el prompt.
2. Los términos de búsqueda van en inglés, porque la literatura está en inglés. Las respuestas, en español.
3. **Siempre** verificar las fuentes que devuelva la IA antes de registrar nada (paso 2 de la sección 5 del plan).

---

## Bloque de contexto (pegar siempre primero)
```
Contexto: somos un equipo de 3 personas en NASA Space Apps Challenge 2026 (sede Uruguay), desafío "Flame in Freefall" (dashboard con IA que resume, ordena e interpreta resultados de combustión en microgravedad de NASA para la seguridad contra incendios en la exploración humana). Entregamos el domingo 15/11/2026 a las 23:59.

Nuestro producto candidato: "Antes del primer fuego en la Luna". Pregunta central: ¿qué materiales que NASA aprueba con ensayos en gravedad terrestre (NASA-STD-6001B Test 1) podrían arder en gravedad lunar? Usuario: el ingeniero que diseña la ventilación de una base lunar (atmósfera planificada de 34 % O2 a 8,2 psi). Incluye: ensayos de NASA parecidos explicados, una simulación de transporte de calor (NIST FDS) con distintas gravedades y ventilación, y una "apuesta" escrita antes de los resultados del experimento FM2 (Flammability of Materials on the Moon; Ferkul et al., LPSC 2026).

Reglas para tu respuesta:
- Cada afirmación con su fuente: título, autores, año, URL o DOI, y página o tabla si existe.
- Clasificá cada afirmación como [VERIFICADO: leíste la fuente], [SECUNDARIO: prensa o resumen], [INFERENCIA: deducción tuya] o [NO ENCONTRADO].
- Si no encontrás algo, decilo. No inventes citas, páginas ni números.
- Respondé en español; los términos técnicos pueden ir en inglés.
```

---

## Bloque A: núcleo científico (Science & Data)

### R1 · Evidencia en gravedad parcial
```
Buscá todos los ensayos experimentales de inflamabilidad o propagación de llama sobre sólidos en gravedad parcial (entre 0 y 1 g: lunar 0,165 g, marciana 0,38 g), hechos en torres de caída con centrífuga, vuelos parabólicos, centrífugas en órbita y cohetes sondeo con rotación.

Empezá por:
- Sacksteder & T'ien 1994 ("Buoyant downward diffusion flame spread and extinction in partial-gravity accelerations")
- Ferkul & Olson 2011 (centrífuga en la torre de caída del Zero-Gravity Research Facility, J. Thermophysics and Heat Transfer 25(3))
- Urban et al. 2019 ("Flame spread: effects of microgravity and scale", Combustion and Flame 199)
- el cohete sondeo con rotación de ~150 s que menciona Ferkul et al. LPSC 2026
- trabajos de Olson, Ferkul, T'ien, Fernandez-Pello, Fujita (Japón: vuelos parabólicos con gravedad parcial)
- el dataset de Rojas-Alva & Jomaas 2022 (Mendeley, DOI 10.17632/2gw4pjhkxz.1), filtrando por plataforma

Términos de búsqueda: "partial gravity flame spread", "lunar gravity flammability", "Martian gravity flame", "reduced gravity centrifuge flame", "flammability limit gravity level", "minimum oxygen concentration gravity".

Para cada ensayo devolvé una fila de tabla: estudio | plataforma | gravedad (g) | duración (s) | material y espesor | O2 (%) | presión (kPa) | flujo (cm/s) y dirección | resultado (propagó / se extinguió / no encendió, velocidad si hay) | fuente con página.

Al final: ¿hay datos suficientes para dibujar una curva "inflamabilidad frente a gravedad" para al menos un material? ¿Para cuál?
```

### R2 · Estado de FM2 y predicciones para la Luna
```
1. ¿Cuál es el estado actual (noviembre de 2026) del experimento FM2 (Flammability of Materials on the Moon)? ¿Se lanzó? ¿En qué misión CLPS, en qué módulo y en qué fecha? ¿Se publicaron los materiales de las 4 muestras? Buscá en nasa.gov, ntrs.nasa.gov, LPSC 2026, el blog de CLPS y la prensa especializada.
2. ¿Qué predice la literatura sobre la inflamabilidad en gravedad lunar? Buscá específicamente:
   a) el pico de la velocidad de propagación cerca de la gravedad lunar;
   b) el mínimo del oxígeno necesario para arder (MOC/LOI) cerca de la gravedad lunar;
   c) el efecto de 34 % O2 y 8,2 psi.
   Citá con página.
3. ¿Hay modelos numéricos (CFD) de propagación en gravedad parcial que den números concretos? ¿Quiénes son sus autores (por ejemplo Ya-Ting Liao, CWRU)?
Formato: respuestas numeradas con fuente y nivel.
```

### R3 · Verificar los datos que vamos a mostrar
```
Necesito verificar estos datos exactos contra su fuente primaria. Para cada uno decí si está confirmado, si está mal o si no lo encontrás, y dame la cita textual corta y la página:
1. Informe resumen de BASS-II (NASA/TM-20210011385), tabla 7.1, p. 96: tela SIBAL a 10 cm/s, sin ignición al 17,2 % de O2 y llama de un solo lado al 18,2 %, con la misma muestra reutilizada.
2. Presentación "Combustion of Solids in Microgravity: Results from BASS-II" (2014), p. 18: PMMA propagó a 13,6 % de O2 en microgravedad frente a un límite de 16 % en 1 g.
3. "En el repositorio PSI de NASA no hay ensayos de vuelo con sólidos por encima de 22,2 % de O2; Saffire-VI quemó SIBAL al 31 %" (afirmación del equipo SPICA). ¿Qué niveles de O2 usaron Saffire IV, V y VI?
4. ¿La base MAPTIS (resultados de NASA-STD-6001) es de acceso público? ¿Qué se puede consultar sin cuenta?
```

### R4 · Materiales reales de una base lunar
```
¿Qué materiales no metálicos se usan o se proponen para hábitats y vehículos lunares de Artemis (Orion, Gateway, HLS, hábitats de superficie) y que preocupan por su inflamabilidad?
Incluí telas de ropa de tripulación (el white paper de detección de NASA dice que se busca una tela resistente al fuego para la ropa lunar), Nomex, SIBAL, Kapton, Teflon, espumas, velcro y baterías de litio.

Para cada material:
- ¿pasó NASA-STD-6001B Test 1?
- ¿con qué margen?
- ¿se ensayó en microgravedad o en gravedad parcial, y dónde?
- ¿se ensayó con oxígeno elevado (30–34 %)?

Quiero una lista de 5 a 10 materiales para una demo, con la mejor fuente para cada uno.
```

### R11 · Usar PSI, el recurso oficial del desafío (prioridad máxima)
Por qué: la guía de entrega exige "at least one NASA data or resource" para premios globales, y el criterio de Relevancia premia usar datos de NASA "as a core component [...] rather than a superficial addition". La pestaña Resources del desafío pone a PSI como "source of the data upon which the NASA Space App is to be based". Hoy nuestra evidencia sale de NTRS, no de PSI → [Recursos NASA y datos](recursos-nasa-y-datos.md).
```
Tarea: incorporar datos del repositorio NASA Physical Sciences Informatics (PSI) a nuestro producto, que es el recurso central que da el desafío. Punto de partida oficial: https://psi.nasa.gov/physci/repo/search?q=combustion

La consigna oficial dice textualmente: "there is currently no partial-gravity combustion data available in PSI" y "Microgravity and normal-gravity results could bound what occurs at intermediate gravity levels". Queremos usar PSI justamente así: los datos de microgravedad (µg) y de 1 g como las dos cotas entre las que cae la gravedad lunar.

1. Inventario. Para cada investigación de PSI relevante a sólidos y seguridad contra incendios (prioridad: BASS, BASS-II, Saffire-I/II/III y siguientes; después ACME-BRE, FLEX/FLEX-2, SAME/SAME-R y E-FIELD Flames, que según la consigna imita la gravedad parcial): número PSI, nombre, URL exacta de la página de la investigación, qué archivos de datos tiene (nombre, formato, tamaño), si piden registro o login para descargar, y qué columnas trae cada archivo. Si no podés abrir un archivo, decilo y dame la URL directa para que lo bajemos a mano.

2. Cruce con nuestros materiales. Nuestra curva de gravedad (Olson y Ferkul 2012, NTRS 20130010991, tabla I; Urban et al., ICES-2025-392, NTRS 20250002114, tabla 2) cubre: Mylar G, Ultem 1000, Nomex HT90-40, PMMA, policarbonato, Nomex Velcro, cinta P-213, algodón y SIBAL. Para cada uno: ¿hay ensayos en PSI con ese material (o uno equivalente)? Devolvé una fila por ensayo: investigación PSI | ID del ensayo | material, espesor y geometría | O2 (%) | presión (kPa) | flujo (cm/s) | gravedad (µg o 1 g) | resultado (propagó / se extinguió / no encendió; velocidad o límite si hay) | archivo y fila/columna de PSI de donde sale.

3. Cotas para la Luna. Con eso, para cada material donde se pueda: límite o comportamiento en µg (desde PSI) y en 1 g (desde PSI o desde la norma), y si nuestro valor lunar de NTRS cae entre esas dos cotas o no. Si no cae, marcalo: es un hallazgo.

4. Alta concentración de O2. Confirmá o refutá contra PSI: "ningún sólido se ensayó en vuelo por encima de 22,2 % de O2" (dato de otro equipo, sin verificar). ¿Cuál es el máximo de O2 con sólidos en PSI y en qué ensayo? Comparalo con la atmósfera lunar de la consigna (O2 "30% or greater", "10.2 psi or less").

5. Uso mínimo garantizado. Si casi nada de lo anterior se puede bajar, proponé el uso de PSI más chico pero honesto que podamos mostrar en la demo (por ejemplo, una tabla de ensayos de BASS-II en µg para los materiales de nuestra curva, con link a PSI).

Entregables:
- Tabla del punto 2 en CSV (columnas en inglés, sin celdas inventadas: "not reported" si falta) → nombre sugerido: psi_bounds_evidence.csv
- Resumen de 1 página: qué investigaciones de PSI usamos, para qué, y cómo citarlas (DOI o URL de PSI) en el campo "NASA Data" de la entrega.
- Lista de archivos que tenemos que bajar a mano, con URL exacta.
```

### R12 · La apuesta antes de FM2 (pre-registro)
Por qué: la vista FM2 de la app está vacía y es la mitad del diferencial (D9). Hay que dejar escrita, con fecha, qué esperamos que muestre FM2, antes de que NASA publique. Base: [Gravedad parcial - evidencia](gravedad-parcial-evidencia.md), [PSI - datos oficiales](psi-datos-oficiales.md) y D16 (las cotas µg/1 g fallan para la Luna).
```
Contexto: somos un equipo de NASA Space Apps 2026 (desafío "Flame in Freefall"). Nuestro producto, "Before the First Fire on the Moon", quiere dejar registrada, con fecha, una predicción para FM2 (Flammability of Materials on the Moon, NASA Glenn), antes de que haya resultados. Archivos en esta carpeta: Documentos/datos/curva_gravedad.json, Documentos/datos/partial_gravity_flammability_evidence.csv, Documentos/datos/psi_coverage.json, y el abstract de FM2 (Ferkul et al., LPSC 2026) en Documentos/.

Reglas: no inventes datos. Cada número con fuente + página/tabla. Marcá cada afirmación como verificado (lo leíste en la fuente primaria), autodeclarado (lo dice otro), inferencia (deducción tuya) o pendiente. "No informado" no es 0.

1. Estado actual de FM2 (buscá en la web, fuentes de NASA primero: nasa.gov, ntrs.nasa.gov, NASA CLPS, LPSC, ICES, ASGSR 2025-2026):
   - ¿Ya se lanzó? ¿En qué misión CLPS (se mencionó CP-21) y con qué fecha prevista o real?
   - ¿Qué materiales va a quemar? Hay un póster de 2025 (Schechter et al., NTRS 20250010975) que dice que medirá el límite de O2 de "Synergy Pro" y que FM2 es "in the next few years". Confirmá o corregí.
   - Atmósfera, presión, O2 y geometría de las muestras de FM2, si están publicadas.
   - ¿Hay resultados publicados? Si los hay, decilo primero: cambia todo.

2. Borrador de la predicción. Con los datos de los archivos (no con conocimiento general), proponé 1 o 2 predicciones falsables. Ideas, en orden de preferencia:
   a) Para un material de FM2 (si se conoce), dirección esperada del efecto de la gravedad lunar frente a 1 g y frente a µg, usando la tabla I de Olson y Ferkul 2012 (Mylar, Ultem, Nomex HT90-40: el límite lunar queda por debajo de 0 g y de 1 g) y la tabla 2 de Urban et al. ICES-2025 (a 8,2 psi algunos materiales empeoran y otros mejoran).
   b) Si el material no se conoce: una predicción condicional por tipo de material (por ejemplo, "los que fallan Test 1 en aire van a ser más inflamables en la Luna; los que pasan, menos", según ICES-2025).
   Para cada predicción: material, condiciones (gravedad, O2, presión, flujo), qué se espera (dirección y, si se puede, un rango), en qué evidencia se basa (fuente + página), regla de comparación (qué resultado de FM2 la confirma y cuál la refuta) y advertencias (criterios distintos, centrífuga, flujo de 30 cm/s en 0 g, presión distinta a la del hábitat).

3. LUCI (NTRS 20250010653, presentación ASGSR 2025, Ferkul et al.): bajá el PDF y verificá a mano: plataforma, velocidad de giro y radio (slide 12), gravedad efectiva, y qué dicen exactamente las slides 22 y 44 sobre la gravedad durante la quema del PMMA. Compará con Documentos/datos/luci.json (lo cargó Marcos: SIBAL y PMMA, vuelo y tierra, gravedad de 0,165 g derivada del giro) y marcá cada campo como correcto, incorrecto o no verificable.

Entregables (los textos para el público en inglés):
- PREDICTION.md (inglés): 1 página, con fecha y hora de hoy (UTC-3), las predicciones, la evidencia citada, la regla de comparación y las advertencias. Tono: "we expect", nunca "will". Sin "safe".
- prediction.json con este formato, uno por predicción:
  {"id": "", "registered_at": "AAAA-MM-DDTHH:MM-03:00", "material": "", "conditions": {"gravity": "Moon (0.16 g)", "o2_pct": null, "pressure_kPa": null, "flow": ""}, "expectation": {"direction": "more flammable | less flammable | same", "versus": "1 g | 0 g | both", "range": null}, "basis": [{"claim": "", "source": "", "location": ""}], "confirmed_if": "", "refuted_if": "", "caveats": [""], "level": "inferencia"}
- fm2_status.md (español): lo que encontraste en el punto 1, con fuentes y niveles.
- luci_check.md (español): el punto 3, slide por slide.
```

### P-EXTRAER · De un paper a una ficha de hallazgo
```
Te paso un paper o un informe técnico (adjunto o pegado). Extraé cada resultado experimental en este formato, uno por bloque. No mezcles resultados de ensayos distintos:

- Afirmación (en palabras propias, 1 oración):
- Investigación / ensayo:
- Fuente: documento, página, tabla o figura:
- Capa: observación | dato procesado | conclusión del autor
- Gravedad (g) y plataforma:
- O2 (%), presión (kPa), flujo (cm/s) y dirección:
- Material, geometría y espesor:
- Resultado medido, valor y unidad:
- Estado de cada valor: medido / derivado / estimado / no informado
- Réplicas e incertidumbre:
- Limitación que dice el propio autor:

No completes ningún campo que el texto no diga: poné "no informado".
```

---

## Bloque B: técnica (Engineering)

### R5 · FDS con gravedad lunar
```
Quiero usar NIST Fire Dynamics Simulator (FDS) para una demo de hackatón (menos de 24 horas). Necesito:
1. Cómo se define la gravedad en FDS (el parámetro GVEC en &MISC, o el que corresponda en la versión actual) y si se puede poner 0, 1,62 y 9,81 m/s2.
2. Un archivo .fds mínimo: una caja de ~0,5 × 0,5 × 0,5 m, una fuente de calor chica (sin modelar la combustión de un sólido), un flujo de ventilación de 0, 5 y 20 cm/s, y una corrida de 60 s que tarde menos de 30 minutos en una laptop.
3. Cómo exportar un corte de temperatura (SLCF) a imágenes PNG o CSV para mostrarlo en una web (fds2ascii, Smokeview por línea de comandos, o scripts en Python como fdsreader).
4. Qué limitaciones tiene FDS en microgravedad y qué validaciones existen (citas).
5. Un plan B si FDS no corre: una simulación 2D de advección-difusión de calor en JavaScript o Python, y cómo presentarla honestamente como ilustrativa.
Dame comandos y archivos completos, no descripciones.
```

---

## Bloque C: cómo ganar (Product & Pitch)

### R6 · Qué valora NASA
```
Investigá los ganadores globales de NASA Space Apps Challenge de 2019 a 2025, con foco en "Best Use of Science", "Best Use of Data" y "Galactic Impact".
Para cada ganador: nombre del proyecto, desafío, país, qué hizo en 1–2 oraciones, si usó IA, qué datos de NASA usó y qué lo distinguió (según la página oficial del proyecto, no la prensa).

Después:
1. ¿Qué patrones se repiten entre los ganadores de "Best Use of Science"?
2. ¿Cómo funciona la nominación global: cuántos proyectos nomina cada sede, quién juzga y con qué criterios?
3. ¿Quién es el experto de NASA (SME) que escribió el desafío "Flame in Freefall" 2026? ¿Respondió preguntas en Space Apps Connect (github.com/nasa/spaceapps/discussions)? ¿Qué publica?
4. ¿Qué errores comunes llevan a que un proyecto no pase a la etapa global?
Fuentes preferidas: spaceappschallenge.org, nasa.gov y las discusiones del GO Team.
```

### R7 · Qué gana en otras hackatones
```
Analizá qué tipo de proyectos ganan en hackatones de ciencia y espacio distintas de Space Apps: ESA (por ejemplo ActInSpace, Copernicus Hackathons, ESA Φ-lab challenges), NASA Tournament Lab / HeroX / NASA Challenges (sobre todo los de seguridad contra incendios o habitabilidad), Devpost en categorías de ciencia, y hackatones de IA aplicada a la ciencia.
Para 10 ejemplos ganadores: qué hicieron, qué los hizo ganar y si hubo una demo en vivo.
Después extraé 8 patrones accionables para un equipo con 30 horas restantes. Ejemplos de lo que busco: "una pregunta en el título", "un dato sorprendente en los primeros 5 segundos", "validación honesta".
Marcá qué patrones aplican a nuestro producto y cuáles no.
```

### R8 · Generador de originalidad
```
Lista de lo que YA hacen otros equipos de este desafío: chat con papers que cita experimentos; predictores de extinción con ML sobre FLEX y BASS-II; mapas de vacíos oxígeno × flujo; propuesta del próximo experimento (MicroFire Atlas, AstraFlame); llamas en 3D; análisis de video de Saffire con OpenCV; versión educativa para chicos; verificación en código de las citas de la IA.

Generá 15 ideas que NO estén en esa lista y que:
(a) usen un recurso real de NASA o de la literatura (nombralo);
(b) respondan a una necesidad escrita por NASA (white papers del Decadal Survey 2022–2032, FM2, NASA-STD-6001);
(c) se puedan prototipar en menos de 12 horas.
Explorá ejes como: Marte (0,38 g); baterías de litio de laptops (el escenario que NASA considera más peligroso); dónde ubicar detectores de humo en un hábitat lunar; polvo lunar y falsas alarmas; humo y toxicidad; telas de trajes y ropa; atmósferas normóxicas; el humo de Kapton y Teflon que el detector de la ISS no detecta.
Para cada idea: título, 1 oración, recurso de NASA, necesidad de NASA que responde (con cita), por qué es original y riesgo principal.
Al final, elegí las 3 mejores para sumar a "Antes del primer fuego en la Luna" sin cambiar el núcleo.
```

### R9 · Preguntas para mentores y expertos
```
Redactá en inglés 5 preguntas cortas y concretas para publicar en Space Apps Connect (categoría Challenges, título empezando por "Flame in Freefall:") que nos ayuden a validar el producto. Ejemplos de temas:
- si usar datos de ensayos en gravedad parcial no-ISS (torres de caída, aviones) cuenta como "NASA data";
- si es válido usar FDS como simulación complementaria;
- si existe un dataset público de los resultados de NASA-STD-6001;
- si FM2 publicó sus materiales.
Tono respetuoso, una pregunta por publicación.
```

### R10 · Vigilar la competencia
```
Buscá en GitHub, Devpost y la web repositorios o proyectos nuevos del desafío "Flame in Freefall" de NASA Space Apps 2026 que no estén en esta lista: SPICA FireLab, FlameAtlas, OSAMABASAM, Fotia, Sarawak, MicroFire Atlas, AstraFlame, CinderLens/Flame_On, samuelakosaonyejekwe, AeroFlame, shaharia179, YoussefHegazy74/AFAQ, Faruk042, Tarek-Ahmed303/PyroNova, PHARAOHS-x-DIGILIANS, baonamv200, nergisRahimzade.
Para cada nuevo: qué hace en 1 oración y si usa gravedad parcial, FM2, CFD o ventilación. Esos son nuestros diferenciales, y me interesa saber si alguien los toca.
```

---

## Prompts de control (cualquier rol)

### P-JURADO · Abogado del diablo
```
Actuá como un juez experto de NASA Glenn en combustión en microgravedad que evalúa proyectos de Space Apps con 5 criterios (Impacto, Creatividad, Validez, Relevancia, Presentación; 1 a 5). Este es nuestro proyecto: [pegar la frase del producto + descripción de 5 líneas].
1. Poné una nota a cada criterio y justificala.
2. Hacé las 5 preguntas más difíciles que harías en la defensa.
3. Señalá cualquier afirmación que te parezca exagerada o científicamente débil.
4. ¿Qué cambio chico subiría más la nota de "Validez" y la de "Creatividad"?
Sé duro: queremos encontrar los problemas antes que el jurado.
```

### P-VERIFICAR · Revisión cruzada (con otra IA distinta de la que investigó)
```
Otra IA produjo este resumen de investigación: [pegar]. Revisá cada afirmación:
¿la fuente citada existe?, ¿dice eso?, ¿la página o tabla es correcta?, ¿hay una generalización excesiva?
Devolvé una tabla: afirmación | veredicto (correcta / incorrecta / no verificable / exagerada) | comentario.
```

### P-INGLES · Textos de entrega
```
Con esta descripción de nuestro proyecto [pegar], escribí en inglés claro, sin jerga:
(1) High-Level Project Summary (≤150 palabras);
(2) Detailed Project Description (qué hace, cómo funciona, beneficios, herramientas);
(3) NASA Data: qué datos usamos y cómo;
(4) Use of Super Intelligence: qué hizo la IA y qué verificó un humano.
Nunca digas "safe", "certify" ni "NASA never tested". Decí "in the data we reviewed".
```

### P-VIDEO · Guion de 30 segundos
```
Escribí un guion de video de exactamente 30 segundos, en inglés, para "Antes del primer fuego en la Luna", con esta estructura:
0–3 s equipo y desafío; 3–8 s el gancho (NASA va a encender el primer fuego en la Luna, y la Luna podría ser el peor lugar para un incendio); 8–20 s la demo (material → ensayos parecidos → simulación); 20–26 s la apuesta antes de FM2; 26–30 s el cierre.
Máximo 75 palabras habladas. Indicá qué se ve en pantalla en cada tramo.
```
