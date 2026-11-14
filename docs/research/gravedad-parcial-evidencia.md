---
tipo: investigacion
actualizado: 2026-11-14
fuente: "Claude Science (R1) + verificación de Claude Code"
---

# Gravedad parcial: evidencia

Resultado de la investigación **R1** del [Plan de trabajo](../product/plan-de-trabajo.md). La hizo Claude Science el 14/11 y Claude Code hizo una verificación cruzada contra los PDFs de NTRS.

- Datos crudos: `data/partial_gravity_flammability_evidence.csv` (45 filas)
- Resumen de vacíos: `data/partial_gravity_gaps_summary.md`

## Verificación cruzada (Claude Code abrió los PDFs originales)
| Dato | Fuente | Resultado |
|---|---|---|
| Tabla I completa (Mylar, Ultem y Nomex a 1 g, Marte, Luna y 0 g) | Olson y Ferkul 2012, NTRS 20130010991, p. 6 | `#verificado`: todos los números coinciden |
| Corrección de 1 g a gravedad lunar: PMMA 1,9 · policarbonato 2,3 · Nomex Velcro 0,32 · P-213 1,4 · remera de algodón 0,82 (llama) / 1,8 (brasa) % O₂ | Urban et al., ICES-2025-392, NTRS 20250002114, tabla 2, p. 11 | `#verificado` |
| Policarbonato y Nomex Velcro se extinguen con "substantially higher oxygen" en gravedad lunar; PMMA, P-213 y la remera tienen un límite lunar menor que el extrapolado | ICES-2025-392, p. 9 y 11 | `#verificado` |
| Nomex HT90-40 a 8,2 psi: límite de O₂ de ~23 % (1 g), ~29 % (Luna) y ~38 % (0 g) | Póster de Schechter et al., NTRS 20250010975 | `#verificado` (valores aproximados en el póster) |
| **El dato de Marcos (SIBAL):** GMT190-T23, 2,2 cm, 10 cm/s, 17,2 % → "Reused, did not ignite"; GMT190-T24, 2,2 cm, 10 cm/s, 18,2 % → "Reused, one-sided flame" | Informe resumen de BASS-II, tabla 7.1, p. 96 | `#verificado`. **Advertencia:** son **muestras reutilizadas**, y el informe aclara que "provided less quantitative data, thus will not be discussed" (p. 95). Además, es **microgravedad**, no gravedad lunar |
| LUCI (cohete New Shepard con rotación, gravedad lunar, más de 150 s, SIBAL y PMMA) | NTRS 20250010653 | `#autodeclarado`: lo leyó Claude Science, no se revisó a mano |

## El hallazgo principal: la curva de gravedad existe para 3 materiales `#verificado`
Límite de oxígeno (ULOI/MOC, % O₂). Fuente: Olson y Ferkul 2012, tabla I.

| Material (presión) | 1 g | Marte 0,38 g | **Luna** | 0 g (flujo de 30 cm/s) |
|---|---|---|---|---|
| Mylar G 0,127 mm (70,3 kPa) | 21,2 / 20,0 | 18,0 / 17,0 | **15,6 / 14,1** | 17,0 / 16,0 |
| Ultem 1000 0,254 mm (70,3 kPa) | 23,5 / 23,0 | 22,0 / 21,1 | **21,0 / 19,9** | 24,0 / 23,0 |
| Nomex HT90-40 0,305 mm (101,3 kPa) | 23,5 / 22,1 | 19,9 / 19,0 | 21,0 / 19,9 | 23,0 / 22,0 |

- **En Mylar y Ultem, la Luna es donde arden con menos oxígeno.** Coincide con la hipótesis de FM2: el Mylar arde en la Luna con **5,75 puntos menos de O₂** que en la Tierra.
- **En Nomex (14,7 psi), el peor caso es Marte**, no la Luna.

**Advertencias que van siempre con el gráfico:**
1. El criterio en gravedad reducida (5,18 s de caída) no es el mismo que en 1 g (15,2 cm de llama). Los autores lo dicen.
2. Los valores lunares y de 0 g vienen de Ferkul y Olson 2011 (pago, no leído); los tenemos tal como los reproduce la tabla de 2012.
3. El punto de 0 g es con flujo de 30 cm/s, no con aire quieto.
4. Escalones de 1 % de O₂, sin réplicas reportadas.
5. La presión no es la del hábitat (56,5 kPa).

## El giro: "depende" `#verificado` · interpretación `#inferencia`
Con la presión de la base lunar (8,2 psi):
- **Más peligrosos en la Luna:** PMMA, cinta P-213 y remera de algodón. Los tres **fallan** NASA-STD-6001 Test 1 en aire.
- **Menos peligrosos en la Luna:** policarbonato y Nomex Velcro. Los dos **pasan** Test 1 en aire.
- **Nomex HT90-40** se invierte con la presión: más inflamable en la Luna a 14,7 psi y menos a 8,2 psi (productos y protocolos distintos).

**Para el producto:** la respuesta honesta a "¿qué materiales aprobados en la Tierra podrían arder en la Luna?" es **"depende del material y de la presión, y estos son los datos"**. Eso es más fuerte y más defendible que "la Luna es peor".

## Discrepancias abiertas
1. **¿Dónde está el pico?** El abstract de FM2 dice que la velocidad de propagación en función de la gravedad tiene un pico en la Luna (citando Sacksteder y T'ien 1994, no leído). En cambio, el CP de 2003 del mismo grupo lo ubica **cerca de 0,38 g (Marte)** para Kimwipes a 27,6 kPa. El "mínimo de O₂ cerca de la Luna" sale de un **modelo** (Fire on the Moon 2021). `#pendiente`
2. **SIBAL en 1 g:** el póster de FM2 de 2024 dice que se apaga enseguida, pero el ensayo en tierra de LUCI muestra propagación antes de extinguirse.
3. **Gravedad en LUCI:** las slides 22 y 44 se contradicen.
4. La leyenda de la fig. 6 de Olson y Ferkul 2012 no coincide con su tabla I.
5. **Fecha y material de FM2:** el póster de Nomex (2025) dice que FM2 está programado "in the next few years" y que medirá el límite de O₂ de **Synergy Pro**. El abstract de LPSC 2026 decía fines de 2026 → actualizar [FM2 - fuego en la Luna](fm2-fuego-en-la-luna.md). `#pendiente`

## Vacíos
- **No hay ningún ensayo en gravedad parcial a 34 % O₂ y 56,5 kPa con velocidad o límite medido.** Es exactamente lo que FM2 viene a cubrir.
- Fuentes pagas sin leer: Sacksteder y T'ien 1994, Ferkul y Olson 2011, Urban et al. 2019. Además, Rojas-Alva y Jomaas (Mendeley) bloqueó el acceso automático.
- Los valores lunares de ICES-2025 (figs. 7–12) y las velocidades de Kimwipes y de BASS-II (fig. 7.4) solo están en gráficos; habría que digitalizarlos y marcarlos como "derivados".
- MAPTIS: sin acceso.

## Compuerta 1 (sábado 17:30) → **SE CUMPLE** `#inferencia`
El criterio era "al menos 5 puntos de gravedad parcial".
- Tenemos 6 límites numéricos verificados (3 materiales × Luna y Marte).
- Más 5 materiales a 8,2 psi con dirección verificada (valor solo en figura).
- Más el Nomex a 8,2 psi en 0 g, Luna y 1 g (aproximado).
- Más LUCI (autodeclarado).
