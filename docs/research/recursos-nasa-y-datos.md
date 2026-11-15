---
tipo: investigacion
actualizado: 2026-11-14
---

# Recursos NASA y datos

## Pestaña Resources oficial del desafío `#verificado` (leída 2026-11-14)
| Recurso | Para qué | ¿Lo usamos? |
|---|---|---|
| PSI Data Repository: Combustion Science · https://psi.nasa.gov/physci/repo/search?q=combustion | **La base de datos del desafío** | **Sí** (2026-11-14): tablas de BASS, BASS-II y Saffire I–III → [PSI - datos oficiales](psi-datos-oficiales.md) |
| NASA Combustion Science (Glenn) · https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/ | Fichas de las investigaciones | No |
| ScienceCasts, "The Power of Studying Combustion on the ISS" (2018) · https://www.youtube.com/watch?v=W1oXykoz9zg | Video introductorio | No |
| A Researcher's Guide to ISS Combustion Science (2015) · https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/ | Repaso de 50+ páginas | No |
| Apollo 1 · https://sma.nasa.gov/sma-disciplines/accllp/apollo-1 | Contexto de incidentes | No |
| Apollo 13 · https://sma.nasa.gov/sma-disciplines/accllp/apollo-13 | Contexto de incidentes | No |
| 25 Years Ago: Fire Aboard Mir · https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/ | Contexto de incidentes | No |
| Spinoffs: Fireman's Air Tanks (spinoff.nasa.gov/node/9582), Fire Detector (node/9407), Fire Attire (node/9918) | Aplicaciones en la Tierra | No |

La propia consigna dice que **PSI no tiene datos de gravedad parcial**. Por eso R1 tuvo que salir de PSI e ir a reportes de NTRS (también de NASA, pero no listados en Resources). `#inferencia`

## Oficiales / NASA
| Recurso | Qué tiene | Estado |
|---|---|---|
| NASA PSI repo: https://psi.nasa.gov/physci/repo/search?q=&data_source=psi&data_type=investigation | Investigaciones, documentación y archivos de datos | `#pendiente` descargar y validar |
| PSI-25 BASS-II | Unos 129 ensayos según otros equipos; **sin columna de velocidad de propagación** | `#autodeclarado` (Sarawak, Fotia) |
| PSI-69 FLEX | 213–274 filas según el equipo: combustible, presión, atmósfera, tamaño de gota, constante K, resultado. Ojo: la unidad "mm" es mm²/s y la columna "CO" es CO₂ | `#autodeclarado` (Sarawak) |
| PSI-159 ACME | Unas 272 filas | `#autodeclarado` (Fotia) |
| PSI-98 Saffire-I | DOI 10.60555/0t15-1z43; metadatos inconsistentes | `#verificado` (guía) |
| NTRS API: https://ntrs.nasa.gov/api/citations/search | Más de 1000 registros de combustión en µg, muchos con PDF | `#verificado` (ficha) |
| Notebook de inicio con NTRS: https://colab.research.google.com/github/swapniltamse/space-data-atlas/blob/main/notebooks/ntrs-combustion-search.ipynb | Búsqueda en Python | sin probar |
| Decadal white paper "Challenges and Research Needs for Micro- and Partial-Gravity Fires" (Liao, Carmignani, Niehaus): https://ntrs.nasa.gov/citations/20210022403 | Necesidades de investigación: gravedad parcial y alto O₂ en hábitats lunares | `#verificado` (solo registro; texto completo pendiente) |
| INDUS / INDUS-SDE (NASA + IBM, en Hugging Face): https://science.data.nasa.gov/blog/indus-sde-language-model | Embeddings científicos para búsqueda semántica | opcional |

## Datos clave para la demo
- **Ningún sólido se ensayó en vuelo por encima de 22,2 % de O₂** en las tablas de PSI de BASS-II y Saffire I–III, frente al 34 % propuesto para la exploración. `#verificado` contra PSI (2026-11-14) → [PSI - datos oficiales](psi-datos-oficiales.md). La tela SIBAL a 31 % en Saffire-VI sigue `#autodeclarado` (SPICA; Saffire-VI no está en PSI).
- **No hay ensayos de PSI en gravedad parcial.** `#autodeclarado` (OSAMABASAM). Coincide con el white paper del Decadal.
- Atmósfera propuesta para exploración: 34 % O₂ a 8,2 psi. `#pendiente` buscar la fuente NASA primaria.

## Complementarios (no NASA)
- Rojas-Alva y Jomaas 2022, "Classification of results from combustion experiments with solid materials in microgravity", Mendeley, DOI 10.17632/2gw4pjhkxz.1, licencia **CC BY-NC 3.0**. Cubre todos los estudios con resultados experimentales.
- MaCFP PMMA: cono calorimétrico en 1 g (lo usó Sarawak).

## Plataformas de ensayo (para "próximo experimento")
ISS (SoFIE, CIR) · torres de caída (segundos de µg) · vuelos parabólicos (unos 20 s, permiten gravedad parcial) · cargueros tipo Saffire (gran escala). `#inferencia`: confirmar las duraciones con fuentes.
