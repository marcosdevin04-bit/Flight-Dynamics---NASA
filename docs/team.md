---
tipo: equipo
fuente: "Flame_in_Freefall_Division_del_equipo"
actualizado: 2026-11-15
---

# Equipo

| Rol | Herramienta | Persona | Entregables |
|---|---|---|---|
| Scientific & Data Lead | Claude Pro / Claude Science | **Facundo** (14/11) | Dataset estructurado, base de evidencia, informe científico, criterios de clasificación |
| Engineering Lead | Claude Pro / Claude Code | **Marcos** (14/11) | Webapp, backend, integraciones, tests, deploy, repositorio |
| Product, UX & Validation Lead | ChatGPT Pro / Astra Pro | **Juan** (de hecho, 14/11: rama `juan/ai-core`; falta confirmarlo) | Especificación funcional, UX/UI, plan de evaluación, QA, demo y storytelling |

## Qué hizo cada uno el 14/11
- **Facundo:** investigación (R1, R11/PSI), bitácora, README y tandas de datos para Marcos.
- **Marcos:** la app (`feature/lunar-evidence-dashboard`, hasta c3e9faa) con deploy público.
- **Juan:** `planning/PLAN.md` (plan consolidado de "Before the First Fire on the Moon") y el motor de evidencia `lib/evidence/` en TypeScript (build, rank, verify, golden set, reglas de interpretación y tests). Todavía no está integrado con la app de Marcos.

El PDF asigna herramientas a cada rol, pero **no nombra a las personas**.

La guía técnica (p. 13) sugiere perfiles:
- **Marcos:** decisiones, contexto operacional y aviación.
- **Juan:** cómo representar fuentes, condiciones y consultas.
- **Facundo:** unidades, incertidumbre y evaluación.

## Qué hizo cada uno el 15/11
- **Facundo:** revisión y merge del PR #1, deploy en Vercel (con la key de Anthropic), investigación de FM2 y el foro, y dirección del rediseño (dashboard, tipografías, logo).
- **Marcos:** PR #1, que integra el motor de Juan, la pantalla de PSI y la vista FM2, con borradores de la entrega y de la demo.
- **Juan:** su motor de evidencia (`lib/evidence/`) quedó integrado en la app como "Ask the evidence".

## Acuerdos del equipo
1. **Una sola fuente de verdad:** GitHub, más esta bitácora.
2. **Evidencia antes que narrativa.**
3. **Revisión cruzada**, no aprobación automática.
4. **Contrato JSON común** desde el inicio (ver Spec MVP - Next Burn).
5. **Un responsable por decisión.**

Cadencia: sincronización breve diaria y una prueba end-to-end con evidencia real antes de entregar.
