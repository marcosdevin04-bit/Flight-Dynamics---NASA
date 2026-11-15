---
tipo: riesgos
actualizado: 2026-11-15
---

# Riesgos y pendientes

## Pendientes (por prioridad)
- [x] **Compuerta 2:** D9 confirmada, una sola IA (D18), alcance congelado. El rediseño del domingo es solo visual
- [ ] Revisar D16 (las cotas µg/1 g fallan para la Luna) y decidir si es el mensaje central del pitch
- [x] Contradicción de [Competencia 2026](research/competencia-2026.md) corregida (15/11): MicroFire Atlas sí usa LUCI, FM² y un escenario lunar
- [x] Texto corregido de "Bounding the Moon" → en producción ("Does lunar gravity fall between the endpoints?")
- [x] Leer la consigna oficial y la pestaña **Resources** → [Consigna](challenge/consigna.md) · [Recursos NASA y datos](research/recursos-nasa-y-datos.md) (2026-11-14)
- [x] Confirmar el título exacto → "SI-Powered"
- [x] **Escribir la apuesta antes de FM2** → `PREDICTION.md` + `prediction.json`, 2026-11-14 22:26 (D17). Confirmada por el equipo. Falta que Marcos la muestre (Tanda 4)
- [x] Mergear `feature/lunar-evidence-dashboard` a main → PR #1 (2026-11-15)
- [x] Decidir si la app de Marcos usa el motor de evidencia de Juan → sí, por `/api/ask` (D18)
- [x] Escenarios de fluido y combustible sin datos → retirados (D18)
- [x] **Usar al menos un dataset de PSI** → bajados BASS, BASS-II y Saffire I–III ([PSI - datos oficiales](research/psi-datos-oficiales.md)). Falta: que Marcos los muestre en la app (panel de cobertura + Saffire-II µg/1 g) (el recurso central de Resources) en el producto: hoy la evidencia sale de NTRS, no de PSI. Opción mínima: los puntos de 1 g y 0 g de BASS-II o Saffire desde PSI como "cotas" (la consigna dice que µg y 1 g "could bound" la gravedad intermedia)
- [x] Descargar PSI-25 (BASS-II) y Saffire, y validar las columnas (FLEX no hace falta: son gotas)
- [x] Verificar "ningún sólido por encima de 22,2 % de O₂" → `#verificado` para BASS-II y Saffire I–III ([PSI - datos oficiales](research/psi-datos-oficiales.md))
- [x] Encontrar la fuente NASA de la atmósfera de exploración (34 % O₂ / 8,2 psi) → white paper de Fortenberry et al., p. 2 y 4 (ver [Detección de incendios en naves](research/deteccion-de-incendios.md))
- [x] D8 (Modo alerta) queda fuera: el alcance se congeló sin esa función
- [x] Idea de Marcos fusionada en D9 (D10)
- [x] Verificar el dato de Marcos → `#verificado` (tabla 7.1, p. 96), pero son muestras reutilizadas en microgravedad → [Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md)
- [x] R1, evidencia de gravedad parcial → [Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md) (Compuerta 1 cumplida)
- [ ] Conseguir los PDF pagos (alguien con acceso por facultad): Sacksteder y T'ien 1994, Ferkul y Olson 2011, Urban et al. 2019
- [ ] Bajar a mano el dataset de Rojas-Alva y Jomaas (Mendeley) a `Documentos/`
- [ ] Digitalizar las figs. 7–12 de ICES-2025 para tener los límites lunares numéricos (marcarlos como "derivados")
- [ ] Resolver dónde está el pico (¿Luna o Marte?) leyendo Sacksteder y T'ien 1994
- [x] Escribir `PREDICTION.md` → hecho (D17). Pendiente: link en el README. Opcional: DOI en Zenodo para probar la fecha
- [ ] Revisar en GitHub que el diagrama Mermaid del README se vea bien (no se pudo validar localmente)
- [x] Actualizar FM2 → [FM2 - fuego en la Luna](research/fm2-fuego-en-la-luna.md) (estado al 14/11: sin lanzamiento ni resultados; muestras en conflicto entre 2024 y 2025)
- [x] FDS descartado: la cámara 3D queda como simulación ilustrativa (D18). Aclaración 15/11: la cámara es un CFD reducido propio, no una animación; ahora con vista dividida de dos gravedades (D23)
- [ ] Probar la vista dividida (D23) en la laptop de la demo: corre 2 modelos a la vez (en la de desarrollo anda fluida)
- [x] Publicar D23 → la vista dividida ya está en producción (verificado el 15/11 ~13:45)
- [x] Verificar si FM2 ya se lanzó → no hay evidencia (14/11)
- [x] Encontrar una cita de NASA sobre la Antártida como análogo → Antarctic Space Analog Program (ver [Uruguay y Antártida](research/uruguay-y-antartida.md))
- [ ] Revisar si MAPTIS (ensayos NASA-STD-6001) es de acceso público; si no, usar reportes de NTRS con ensayos en 1 g
- [ ] Leer el texto completo del white paper del Decadal (NTRS 20210022403)
- [x] Asignar personas a los roles → [07 Equipo](team.md) (Juan, de hecho, en el motor de evidencia; falta confirmarlo)
- [x] Repo en GitHub creado · [ ] Equipo completo en Members de la plataforma (ver la entrega)
- [x] Nombre del equipo: Flight Dynamics

- [x] LUCI verificado contra el PDF (R12)

- [x] **Probar la IA en vivo en producción** → funciona en Vercel (D19, 2026-11-15)
- [x] Revisar y mergear el PR #1 → mergeado (877ed2d). Sincronización del vault lista para el push
- [x] Detalle de UI: nombres en español → arreglado en la rama (falta el push de Facundo)
- [ ] Confirmar en la plataforma: desafío, 3 miembros y nombre del equipo · demo en YouTube: https://youtu.be/en18xWde9hE

- [x] **Demo de 30 s** armada (`Documentos/demo/before-the-first-fire-demo.mp4`, 28,9 s) · [ ] subirla a YouTube como no listado y probar el link en una ventana privada
- [x] **Nombres:** equipo **Flight Dynamics**, proyecto **Before the First Fire** (Facundo, 15/11)
- [ ] Preparar la presentación para el jurado local (18 al 20/11) y anotarse en el taller de pitch (17/11)

- [ ] La IA en vivo a veces no pasa la verificación y responde con plantilla (2 de 4 intentos al grabar): ajustar las instrucciones o tener ensayada la explicación para el jurado en vivo

## Riesgos
| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Los datos de PSI no sirven o son difíciles de parsear | media | alto | Plan B: hallazgos curados a mano desde NTRS y la presentación de BASS-II |
| Alcance demasiado grande | alta | alto | Respetar "fuera de alcance" del spec; hitos con corte |
| Parecido con SPICA, OSAMABASAM, Fotia y sobre todo **MicroFire Atlas** (escenario lunar, LUCI, FM²) | alta | alto | Poner adelante lo que es nuestro: D16 (µg y 1 g no acotan la Luna), predicciones registradas antes de FM2 y el techo de 22,2 % |
| Perder Validez por transferir microgravedad a la Antártida | media | alto | Marcar en la UI qué evidencia aplica a cada escenario |
| La API del LLM falla en la demo | media | medio | Respuestas cacheadas |
| Entregar tarde o con la demo de más de 30 s | media | crítico | Primera entrega a las 16:00; cronometrar el video |
| El logo generado con IA no lleva marca de agua sobre la imagen | media | medio | Aviso visible en el pie y declaración en el formulario (D21); si el jurado lo objeta, volver al SVG propio |
| Un cambio en main no llega a la web (Vercel no está conectado a GitHub) | media | medio | Después de cada push: `git pull` + `vercel --prod` en `~/Desktop/flight-dynamics` |
| La key de Anthropic se queda sin crédito durante el jurado | baja | medio | Crédito prepago; sin key, la app responde con plantillas verificadas y ejemplos guardados |
