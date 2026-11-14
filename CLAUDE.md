# Flame in Freefall · guía para desarrollar (Claude Code)

Proyecto del equipo para NASA Space Apps Challenge 2026 (Uruguay). Entrega: **domingo 2026-11-15, 23:59 (UTC-3)**. Primera versión publicada: **domingo 16:00**.

## Antes de programar
1. Leer `docs/DEVELOPMENT.md`. Es el brief del producto: pantallas, prioridades, reglas y pruebas de aceptación.
2. Los datos están en `data/`. **Usar `data/curva_gravedad.json` como fuente principal**: está verificado contra los PDFs de NASA.
3. El contexto científico está en `docs/research/` (sobre todo `gravedad-parcial-evidencia.md` y `fm2-fuego-en-la-luna.md`). Las decisiones, en `docs/decisions.md`.

## Reglas del producto (no negociables)
- **Nunca** escribir en la interfaz "safe", "certified" ni "NASA never tested". Usar "in the data we reviewed".
- Toda cifra muestra su fuente (cita + página o tabla) a un clic.
- Un valor "not reported" se muestra así, **nunca como 0**.
- Las filas del CSV marcadas SECONDARY o UNVERIFIED muestran esa etiqueta.
- La simulación se rotula **"SIMULATION — illustrative"**.
- Si se usa un LLM:
  - responde solo con los registros cargados;
  - el código verifica que los IDs y números citados existan;
  - las respuestas de la demo se cachean.
- Todo el texto de la interfaz en **inglés**. Sin logo de NASA.
- Colores accesibles, y siempre acompañados de texto.

## Cómo llegan los datos nuevos
La investigación (Facundo) manda **tandas**: sáb 19:00, sáb 23:00 y dom 11:00. Actualizan `data/` y `docs/` **sin cambiar el formato** (el contrato está en `docs/DEVELOPMENT.md`, sección 3). No editar a mano `docs/` ni `data/`: se regeneran desde la bitácora del equipo. Los pedidos de datos van en la sección "Pedidos de Marcos" de `docs/DEVELOPMENT.md`, o como issue.

## Fuera de alcance
Login · cargar todo PSI · modelos predictivos de ML · 3D · detector por cámara · multiusuario.
