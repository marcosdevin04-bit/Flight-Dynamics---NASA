---
tipo: investigacion
actualizado: 2026-11-15
---

# FM2: el primer fuego en la Luna

## Fuente primaria `#verificado` (texto completo leído)
Ferkul, Kralik, Liao y Johnston, "Material Flammability at Lunar and Martian Gravity", LPSC 2026 (NASA Glenn, CWRU, NASA JSC).
- https://www.hou.usra.edu/meetings/lpsc2026/pdf/1799.pdf
- Copia en NTRS: https://ntrs.nasa.gov/api/citations/20260000646/downloads/Ferkul-Lunar%20and%20Planetary%20Science%20Conference%202026.pdf

## Qué es
- **FM2 (Flammability of Materials on the Moon):** los **primeros experimentos de combustión en otro mundo**. El lanzamiento estaba planificado para **fines de 2026** (LPSC 2026, p. 1). Al 14/11/2026 **no hay evidencia de lanzamiento ni resultados publicados** (ver "Estado al 14/11" abajo).
- Va a quemar **4 muestras sólidas planas**, en ensayos separados, en atmósfera habitable sin flujo, **con gravedad lunar real y de larga duración**.
- Mide con cámaras (velocidad de propagación), radiómetros, termocuplas y un sensor de O₂.
- Prensa: va en un módulo CLPS (CP-21) `#autodeclarado` (prensa). Los materiales de las muestras **no están publicados** en el abstract.

## Estado al 14/11/2026 (R12, Claude Science; revisado por Claude Code)
Informe completo: `Documentos/claude-science/fm2_status.md`.
- **Resultados:** no se encontraron (NTRS, LPSC, prensa). `#pendiente`: que no aparezcan no prueba que no existan.
- **Vehículo:** el póster de 2024 dice "CLPS lander mission CP-21" `#verificado` (NTRS 20240015307, abstract, revisado por Claude Code). El mismo póster y LUCI (slide 37) mencionan un vuelo de prueba del **SpaceX Human Lander System** `#autodeclarado` (lo leyó Claude Science). Prensa de jul. 2026: "will have to wait for Artemis IV" (~2028) `#autodeclarado`. **Fecha real: no confirmada.**
- **Muestras (2024):** 4 muestras: **2 telas SIBAL** (algodón/fibra de vidrio) **en aire** y **2 varillas de acrílico en "Normoxic Space Exploration Atmospheres"**; una de cada una hacia arriba y otra hacia abajo. La cámara puede hacer **21 % O₂ a 14,7 psia y 34 % O₂ a 8,2 psia**. "SIBAL fabric has been found to only burn downward in air in lunar gravity [...] where on Earth's gravity it extinguishes immediately after ignition." `#verificado` (NTRS 20240015307, abstract).
- **Muestras (2025):** el póster de Nomex dice que sus ensayos "are designed to help guide the final selection of fuel, oxygen concentration, and ignition parameters for FM2" `#verificado` (NTRS 20250010975, abstract). Que FM2 medirá el LOC de **"Synergy Pro"** sale del panel del póster `#autodeclarado` (Claude Science). **Conflicto abierto:** 2024 = SIBAL + acrílico; 2025 = Synergy Pro; LPSC 2026 = "four flat samples" (2024 hablaba de varillas). El diseño pudo cambiar `#inferencia`.
- **No informado:** dimensiones de las muestras, volumen de la cámara y criterio de extinción.

## Nuestra predicción registrada (D17)
`Documentos/PREDICTION.md` + `data/prediction.json`, registrada el **2026-11-14 22:26 (UTC-3)**, todo `#inferencia`:
- **P1 · SIBAL en aire, hacia abajo:** más inflamable que en 1 g; base de la llama a ~0,6–1,4 mm/s (LUCI: 0,92 mm/s).
- **P2a · Acrílico en atmósfera de exploración (supuesta 34 % / 8,2 psi):** se apaga con menos O₂ que en 1 g (~2 puntos, por el factor 1,9 de ICES-2025).
- **P2b · Materiales tipo Nomex o policarbonato** (si FM2 vuela uno): se apaga con igual o más O₂ que en 1 g.

## La hipótesis de NASA (clave para nosotros)
- NASA aprueba los materiales con el **NASA-STD-6001B Test 1, en gravedad terrestre**, suponiendo que si pasa en 1 g es seguro en vuelo. **Esa suposición tiene incertidumbres.**
- **Hay materiales que no arden en 1 g y sí arden en 0 g (con flujo lento) o en gravedad parcial.**
- La evidencia previa sugiere que **la gravedad lunar podría ser la más peligrosa**:
  - la velocidad de propagación en función de la gravedad tiene un pico ahí (Sacksteder y T'ien 1994);
  - el oxígeno mínimo para que algo arda tiene un mínimo "in the vicinity of g = g Lunar".
- Con atmósferas de baja presión y mucho O₂, un incendio en gravedad parcial en un hábitat "is expected to be substantially worse than in 0-g and potentially worse than even 1-g".
- **Hoy no se puede ensayar bien la gravedad parcial:**
  - torre de caída: unos 5 s;
  - avión: unos 25 s;
  - centrífugas en la ISS: efecto Coriolis;
  - cohete sondeo: unos 150 s, con dos materiales, también con Coriolis.
- **Resultado esperado:** verificar que algunos materiales son más inflamables en gravedad parcial y **probablemente modificar la norma de ensayo**.

## Evidencia previa a buscar (para la curva de gravedad) `#pendiente`
- Sacksteder y T'ien 1994, "Buoyant downward diffusion flame spread and extinction in partial-gravity accelerations"
- Ferkul y Olson 2011, centrífuga en la torre de caída para gravedad lunar (J. Thermophysics and Heat Transfer 25(3))
- Urban et al. 2019, "Flame spread: effects of microgravity and scale" (Combustion and Flame 199)
- El cohete sondeo con rotación (unos 150 s, dos materiales): identificar cuál fue
- Rojas-Alva y Jomaas (Mendeley): filtrar por plataforma (parabolic, drop tower) → [Recursos NASA y datos](recursos-nasa-y-datos.md)

## Por qué nos diferencia `#inferencia`
- Ningún equipo usa FM2 ni grafica la gravedad como eje → [Competencia 2026](competencia-2026.md)
- Es una **pregunta concreta** (la lección de SpaceGenes+ → [Ganadores previos](ganadores-previos.md)): "¿Qué materiales que hoy aprueba NASA podrían arder en la Luna?"
- Es oportuno: el experimento está por volar o recién voló.
- Permite **ciencia de verdad**: registrar expectativas antes del resultado y compararlas cuando lleguen los datos de FM2.
