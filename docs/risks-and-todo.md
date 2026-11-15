---
tipo: riesgos
actualizado: 2026-11-14
---

# Riesgos y pendientes

## Pendientes (por prioridad)
- [ ] **Compuerta 2 (sáb 23:00):** confirmar D9 los tres y congelar el alcance (Next Burn y D1 ya están reemplazados)
- [ ] Revisar D16 (las cotas µg/1 g fallan para la Luna) y decidir si es el mensaje central del pitch
- [ ] Corregir la contradicción de [Competencia 2026](research/competencia-2026.md): dice que MicroFire no tiene datos lunares, pero le cuenta 2 registros de LUCI
- [ ] Asegurar que Marcos use el texto corregido de la tarjeta "Bounding the Moon" (la Tanda 2 que está en main todavía tiene el texto viejo)
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
- [ ] Decidir D8 (Modo alerta) con el equipo
- [ ] Evaluar la idea de Marcos frente a D9 ("Antes del primer fuego en la Luna") y elegir producto
- [x] Verificar el dato de Marcos → `#verificado` (tabla 7.1, p. 96), pero son muestras reutilizadas en microgravedad → [Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md)
- [x] R1, evidencia de gravedad parcial → [Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md) (Compuerta 1 cumplida)
- [ ] Conseguir los PDF pagos (alguien con acceso por facultad): Sacksteder y T'ien 1994, Ferkul y Olson 2011, Urban et al. 2019
- [ ] Bajar a mano el dataset de Rojas-Alva y Jomaas (Mendeley) a `Documentos/`
- [ ] Digitalizar las figs. 7–12 de ICES-2025 para tener los límites lunares numéricos (marcarlos como "derivados")
- [ ] Resolver dónde está el pico (¿Luna o Marte?) leyendo Sacksteder y T'ien 1994
- [x] Escribir `PREDICTION.md` → hecho (D17). Pendiente: link en el README. Opcional: DOI en Zenodo para probar la fecha
- [ ] Revisar en GitHub que el diagrama Mermaid del README se vea bien (no se pudo validar localmente)
- [x] Actualizar FM2 → [FM2 - fuego en la Luna](research/fm2-fuego-en-la-luna.md) (estado al 14/11: sin lanzamiento ni resultados; muestras en conflicto entre 2024 y 2025)
- [ ] Averiguar si alguien del equipo puede correr NIST FDS. Si no, el CFD queda como un modelo 2D simple marcado como ilustrativo
- [x] Verificar si FM2 ya se lanzó → no hay evidencia (14/11)
- [x] Encontrar una cita de NASA sobre la Antártida como análogo → Antarctic Space Analog Program (ver [Uruguay y Antártida](research/uruguay-y-antartida.md))
- [ ] Revisar si MAPTIS (ensayos NASA-STD-6001) es de acceso público; si no, usar reportes de NTRS con ensayos en 1 g
- [ ] Leer el texto completo del white paper del Decadal (NTRS 20210022403)
- [x] Asignar personas a los roles → [07 Equipo](team.md) (Juan, de hecho, en el motor de evidencia; falta confirmarlo)
- [ ] Crear el repo en GitHub y el equipo completo en Members de la plataforma
- [ ] Elegir el nombre del equipo para la demo

- [ ] Revisar a mano LUCI: ~~pendiente~~ hecho por Claude Science (R12); queda solo confirmar si querés mirarlo vos

- [ ] **Probar la IA en vivo en producción** (`ANTHROPIC_API_KEY` y `ANTHROPIC_MODEL` en el servidor): hoy solo se probó con un proveedor simulado; sin key, la app usa plantillas verificadas
- [x] Revisar y mergear el PR #1 → mergeado (877ed2d). Sincronización del vault lista para el push
- [x] Detalle de UI: nombres en español → arreglado en la rama (falta el push de Facundo)
- [ ] Confirmar en la plataforma: desafío, 3 miembros y URL pública final; demo final (hay un borrador de 28 s en `docs/product/`)

## Riesgos
| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Los datos de PSI no sirven o son difíciles de parsear | media | alto | Plan B: hallazgos curados a mano desde NTRS y la presentación de BASS-II |
| Alcance demasiado grande | alta | alto | Respetar "fuera de alcance" del spec; hitos con corte |
| Parecido con SPICA, OSAMABASAM o Fotia | media | medio | El diferencial es el próximo ensayo + contradicciones + Antártida |
| Perder Validez por transferir microgravedad a la Antártida | media | alto | Marcar en la UI qué evidencia aplica a cada escenario |
| La API del LLM falla en la demo | media | medio | Respuestas cacheadas |
| Entregar tarde o con la demo de más de 30 s | baja | crítico | Primera entrega el domingo a las 16:00 |
