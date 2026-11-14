---
tipo: investigacion
actualizado: 2026-11-14
---

# Detección de incendios en naves

Contexto: un amigo de Facundo propuso un modelo de imágenes que detecte chispas o fuego y le diga al ingeniero cómo reaccionar → decisiones D6 y D8 en [Registro de decisiones](../decisions.md).

## Fuente principal: white paper de NASA sobre detección `#verificado` (texto completo leído)
Fortenberry et al., "Research Questions and Challenges for Improved Spacecraft Fire Detection", NASA Glenn / NIST, Decadal Survey 2022–2032.
URL: https://science.nasa.gov/wp-content/uploads/2023/05/154_33f28c6ef0c27b92cf1f526cef0c44b4_Fire_detection_white_paper_final_211031.pdf

- **El detector actual de la ISS falla.** En SAME no dio alarma con humo de Kapton en la mitad de los ensayos, ni con humo de Teflon en dos tercios. Ambos abundan en los cables, donde es más probable que empiece un incendio. (p. 2)
- **Falsas alarmas:** el polvo dispara el detector, y la tripulación **lo apaga cuando aspira** la cabina. (p. 2)
- **Los filtros de aire de la nave limpian el humo más rápido de lo que se acumula** en un fuego chico o temprano, así que la alarma puede no sonar o sonar tarde. (p. 2)
- **En microgravedad el humo no sube.** Los detectores de la ISS están en las rejillas de retorno de aire. (p. 2)
- **Hábitat lunar planificado: 34 % O₂ y 8,2 psi.** Se espera que los límites de inflamabilidad de los materiales no cumplan los requisitos actuales. (p. 2 y 4) → fuente primaria del dato "34 %".
- **Escenario más peligroso:** el incendio de la batería de litio de una laptop. Hay un solo estudio sobre su humo. (p. 3)
- **Detector ideal:** una red de sensores (temperatura, radiación, gases, partículas). Reduce las falsas alarmas y distingue humo de polvo lunar. (p. 5)
- **Gancho clave:** saber qué material se quema, la temperatura y la toxicidad "would aid in determining the best response to the fire". (p. 5)
- **Proponen machine learning** (PMF, LSTM con autoencoders) para identificar la fuente del humo a partir de datos de sensores. (p. 5)
- **Plataformas** (tabla 1, p. 6): vuelo parabólico (~30 s, 0–0,38 g) · torre de caída con centrífuga (5,2 s a gravedad lunar) · New Shepard (~120 s a 0,165 g, 34 % y 8,2 psi) · CIR en la ISS (10–40 % O₂) · CLPS en la Luna. → sirve para la pantalla "próximo ensayo".
- **Cámaras / visión por computadora:** el paper **no las propone** para la detección. Se enfoca en humo, gases y partículas.

## NIST/NASA, experimento SAME (2018) `#verificado`
https://www.nist.gov/news-events/news/2018/05/nistnasa-study-shows-one-detector-doesnt-fit-all-smoke-spacecraft
- Probaron 5 materiales: celulosa, Kapton, silicona, Teflon y Pyrell.
- El detector fotoeléctrico de la ISS capta las partículas grandes, pero se le escapan las chicas de Teflon y Kapton.
- Ningún método detecta todos los tamaños de partícula.

## Visión por computadora en llamas de microgravedad
- **Xu et al. 2026 (preprint):** SAM 2 mide el diámetro de llamas de gotas en 19.537 imágenes. Es **medición**, no detección. → [Ciencia base](ciencia-base.md)
- **Saffire:** NASA publicó videos e imágenes. Saffire-I transmitió más de 17.800 imágenes y Saffire-II más de 100.000. No hay un archivo crudo descargable claro. `#verificado` (prensa: space.com, planetary.org)
- **Las llamas en microgravedad son esféricas, tenues o azules**, y existen llamas frías. Los modelos entrenados con fuego terrestre (datasets de Roboflow, FLAME, YOLO) **no se transfieren**. `#inferencia`

## Space Apps anteriores con detección de fuego `#verificado` (páginas oficiales)
- "Spot That Fire" 2019–2020 y "Automated Detection of Hazards" 2020: **incendios forestales en imágenes satelitales**.
  - Delta V / Inferno AI (2019) y Smokebusters (2020) fueron "Local Peoples' Choice Winner / Global Nominee".
  - No encontramos ganadores globales de detección.
- **Ningún proyecto de detección de fuego dentro de naves.** En Flame in Freefall 2026 tampoco vimos uno con visión por computadora. → [Competencia 2026](competencia-2026.md)

## Conclusión `#inferencia`
Una cámara que detecte y dé órdenes: sin datos, sin validación y lejos de lo que pide NASA.
La vuelta defendible: **qué hacer cuando ya sabés qué se está quemando**. NASA dice que saberlo ayuda a decidir la respuesta, y Next Burn tiene la evidencia por material. → "Modo alerta" en Spec MVP - Next Burn
