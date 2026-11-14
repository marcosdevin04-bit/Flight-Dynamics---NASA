---
tipo: investigacion
actualizado: 2026-11-14
---

# Recursos NASA y datos

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
- **Ningún sólido se ensayó en vuelo por encima de 22,2 % de O₂** en PSI, frente al 34 % propuesto para la exploración. La tela SIBAL se probó a 31 % en Saffire-VI. `#autodeclarado` (SPICA). **Verificar contra PSI antes de usar.**
- **No hay ensayos de PSI en gravedad parcial.** `#autodeclarado` (OSAMABASAM). Coincide con el white paper del Decadal.
- Atmósfera propuesta para exploración: 34 % O₂ a 8,2 psi. `#pendiente` buscar la fuente NASA primaria.

## Complementarios (no NASA)
- Rojas-Alva y Jomaas 2022, "Classification of results from combustion experiments with solid materials in microgravity", Mendeley, DOI 10.17632/2gw4pjhkxz.1, licencia **CC BY-NC 3.0**. Cubre todos los estudios con resultados experimentales.
- MaCFP PMMA: cono calorimétrico en 1 g (lo usó Sarawak).

## Plataformas de ensayo (para "próximo experimento")
ISS (SoFIE, CIR) · torres de caída (segundos de µg) · vuelos parabólicos (unos 20 s, permiten gravedad parcial) · cargueros tipo Saffire (gran escala). `#inferencia`: confirmar las duraciones con fuentes.
