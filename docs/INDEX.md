---
tipo: indice
actualizado: 2026-11-14
---

# Flame in Freefall · Bitácora del proyecto

NASA Space Apps Challenge 2026 · Sede Uruguay · 14–15 de noviembre de 2026
Equipo: Marcos Devincenzi, Juan Benitez, Facundo Díaz → [07 Equipo](team.md)

## Estado actual (sáb 14/11 ~22:00)
- **Producto:** **"Before the First Fire on the Moon"** (D9, aceptada de hecho; falta confirmarla los tres en la Compuerta 2). Next Burn quedó reemplazado → [FM2 - fuego en la Luna](research/fm2-fuego-en-la-luna.md) · [Registro de decisiones](decisions.md)
- **Investigación:** núcleo hecho y verificado. Curva de gravedad de 3 materiales ([Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md)), PSI bajado y cruzado ([PSI - datos oficiales](research/psi-datos-oficiales.md)). Mensaje central: **µg y 1 g no acotan la Luna** para Mylar, Ultem y Nomex (D16, propuesta)
- **App (Marcos):** deploy público y funcionando, rama `feature/lunar-evidence-dashboard` (c3e9faa), todavía sin mergear. Falta la pantalla PSI y la vista FM2 → Tanda 3 en [Paquete para Marcos](DEVELOPMENT.md)
- **Motor de evidencia (Juan):** rama `juan/ai-core`, con tests; sin integrar a la app → [07 Equipo](team.md)
- **Próximo:** Compuerta 2 a las 23:00 (alcance congelado) · escribir la apuesta previa a FM2 · domingo 16:00 primera entrega → [Plan de trabajo](product/plan-de-trabajo.md)
- **Entrega:** domingo 15/11 23:59 (Uruguay), "Submit for Judging" → [Reglas y entrega](challenge/reglas-y-entrega.md)
- **Deck (v2, 10 slides):** https://claude.ai/artifact/7MBueEbY7pJTVbL1EKomjz

## Mapa
| Área | Notas |
|---|---|
| 01 Desafío | [Consigna](challenge/consigna.md) · [Reglas y entrega](challenge/reglas-y-entrega.md) · [Criterios y premios](challenge/criterios-y-premios.md) |
| 02 Producto | **[Paquete para Marcos](DEVELOPMENT.md)** · **[Plan de trabajo](product/plan-de-trabajo.md)** · Spec MVP - Next Burn (anterior) · [Pitch y demo](product/pitch-y-demo.md) |
| 03 Investigación | [Ciencia base](research/ciencia-base.md) · [Recursos NASA y datos](research/recursos-nasa-y-datos.md) · [Competencia 2026](research/competencia-2026.md) · [Ganadores previos](research/ganadores-previos.md) · [Uruguay y Antártida](research/uruguay-y-antartida.md) · [Detección de incendios en naves](research/deteccion-de-incendios.md) · [FM2 - fuego en la Luna](research/fm2-fuego-en-la-luna.md) · **[Prompts de investigación](research/prompts-de-investigacion.md)** · **[Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md)** · **[PSI - datos oficiales](research/psi-datos-oficiales.md)** |
| 04 Decisiones | [Registro de decisiones](decisions.md) |
| 05 Bitácora | 2026-11-14 |
| Transversal | [06 Riesgos y pendientes](risks-and-todo.md) · [Fuentes](sources.md) |

## Documentos originales
- Flame_in_Freefall_guia_tecnica: guía técnica de estudio (11/11/2026)
- Flame_in_Freefall_Division_del_equipo: roles del equipo
- SpaceApps2026_GuiaDelParticipante.pptx: guía oficial de Space Uruguay

## Convención de evidencia
Cada afirmación lleva una etiqueta (ver [Fuentes](sources.md)):
- `#verificado`: leído en una fuente primaria u oficial
- `#autodeclarado`: lo dice un tercero sobre sí mismo (README, sitio de otro equipo)
- `#inferencia`: deducción o criterio nuestro
- `#pendiente`: falta comprobar
