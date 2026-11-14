---
tipo: investigacion
fuente: "Flame_in_Freefall_guia_tecnica"
actualizado: 2026-11-14
---

# Ciencia base: resumen de la guía técnica

Las páginas citadas son del PDF de la guía. La guía es una síntesis educativa; sus fuentes primarias están numeradas [1]–[29].

## Conceptos clave
- **Microgravidad ≠ vacío:** caída libre conjunta. Hay gravedad residual y la cabina tiene oxígeno. Luna y Marte tienen gravedad parcial: **un ensayo orbital no es un ensayo lunar**. (p. 3)
- **Menos flotabilidad** significa menos convección natural, así que la difusión y los flujos impuestos pasan a dominar. (p. 3)
- **Variables mínimas para comparar ensayos:** fracción de O₂ y presión total (por separado), flujo (velocidad y dirección), combustible (composición, espesor, geometría), entorno (gravedad, confinamiento) y respuesta medida. (p. 4)
- **La presión parcial no alcanza:** 21 % a 100 kPa y 30 % a 70 kPa dan la misma p(O₂) pero son atmósferas distintas. (p. 4)
- **"No informado" ≠ 0 ≠ "no ocurrió".** (p. 4)

## Experimentos
| Exp. | Qué estudia | Datos útiles |
|---|---|---|
| **BASS-II** | Sólidos en la ISS: O₂, ventilación, material, espesor; 126 ensayos | Extinción por flujo opuesto bajo (< 2 cm/s) y alto (> 40 cm/s) en una muestra de 0,1 mm (pres. p. 13). PMMA se propaga a **13,6 % de O₂ en µg frente a 16 % en Tierra** (pres. p. 18) `#verificado` (presentación de 2014) |
| **FLEX** | Gotas: extinción, supresores, llamas frías | PSI-69, DOI 10.60555/mbq8-0451, licencia CC0 |
| **Saffire I–VI** | Incendios a gran escala en cargueros Cygnus; 19 ensayos en Saffire-VI; terminó en enero de 2024 | PSI-98 (Saffire-I) tiene **metadatos inconsistentes** |
| **SoFIE** | Ignición y extinción de sólidos en la ISS | |
| **ACME** | Llamas gaseosas laminares | Algunos enlaces operacionales son restringidos |
| **Humo (NASA/NIST)** | 5 materiales; la detección depende de las partículas | "El humo sube al techo" no vale en µg |

## Literatura (solo abstracts) `#verificado` (abstracts)
- Ma et al. 2025: revisión general de propagación en gravedad reducida.
- Cui y Liao 2024: si la altura del conducto baja 40 %, la propagación aumenta más de 95 %; el confinamiento importa.
- Sharma et al. 2024: confinamiento con flujo opuesto (SIBAL, PMMA).
- Han et al. 2026: CFD en atmósferas normóxicas, es decir, menor presión con más O₂.
- Olson 2024: combustión incandescente del residuo en Saffire.
- Xu et al. 2026 (preprint): SAM 2 para medir el diámetro de llamas de gotas.

## Reglas de razonamiento (guía p. 10–11) `#inferencia`
- **Cinco preguntas:** ¿qué variable cambiaron?, ¿qué midieron?, ¿cuántos ensayos?, ¿qué incertidumbre hay?, ¿qué distancia hay al escenario que nos interesa?
- **Errores típicos:** pseudorreplicación (fotogramas ≠ ensayos), fuga de datos, extrapolación.
- **Relevancia ≠ calidad ≠ riesgo.** Un 87/100 no es una probabilidad.
- **Cuatro pruebas para la demo:** pregunta con respuesta → la cita; sin evidencia → reconoce el vacío; condiciones distintas → las mantiene separadas; pide extrapolar → explica qué cambia.

## Cuatro capas de evidencia (p. 9)
1. Observación
2. Dato procesado
3. Conclusión del autor
4. Inferencia propia

Mantenerlas separadas en la UI y en el dataset.
