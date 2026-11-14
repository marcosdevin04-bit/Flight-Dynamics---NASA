---
tipo: riesgos
actualizado: 2026-11-14
---

# Riesgos y pendientes

## Pendientes (por prioridad)
- [ ] Validar el spec con el equipo y registrar D1 y D2 en [Registro de decisiones](decisions.md)
- [ ] Leer la consigna oficial y la pestaña **Resources** en la plataforma (no pude acceder por SSL) → [Consigna](challenge/consigna.md)
- [ ] Confirmar el título exacto (¿"SI-Powered" o "AI-Powered"?)
- [ ] Descargar PSI-25 (BASS-II), PSI-69 (FLEX) y Saffire, y validar las columnas
- [ ] **Verificar el dato "ningún sólido por encima de 22,2 % de O₂ en vuelo"** contra PSI (hoy es `#autodeclarado`, de SPICA)
- [x] Encontrar la fuente NASA de la atmósfera de exploración (34 % O₂ / 8,2 psi) → white paper de Fortenberry et al., p. 2 y 4 (ver [Detección de incendios en naves](research/deteccion-de-incendios.md))
- [ ] Decidir D8 (Modo alerta) con el equipo
- [ ] Evaluar la idea de Marcos frente a D9 ("Antes del primer fuego en la Luna") y elegir producto
- [x] Verificar el dato de Marcos → `#verificado` (tabla 7.1, p. 96), pero son muestras reutilizadas en microgravedad → [Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md)
- [x] R1, evidencia de gravedad parcial → [Gravedad parcial - evidencia](research/gravedad-parcial-evidencia.md) (Compuerta 1 cumplida)
- [ ] Conseguir los PDF pagos (alguien con acceso por facultad): Sacksteder y T'ien 1994, Ferkul y Olson 2011, Urban et al. 2019
- [ ] Bajar a mano el dataset de Rojas-Alva y Jomaas (Mendeley) a `Documentos/`
- [ ] Digitalizar las figs. 7–12 de ICES-2025 para tener los límites lunares numéricos (marcarlos como "derivados")
- [ ] Resolver dónde está el pico (¿Luna o Marte?) leyendo Sacksteder y T'ien 1994
- [ ] Actualizar FM2: el póster de 2025 dice "next few years" y material Synergy Pro, contra "fines de 2026" del abstract
- [ ] Averiguar si alguien del equipo puede correr NIST FDS. Si no, el CFD queda como un modelo 2D simple marcado como ilustrativo
- [ ] Verificar si FM2 ya se lanzó (estaba planificado para fines de 2026)
- [x] Encontrar una cita de NASA sobre la Antártida como análogo → Antarctic Space Analog Program (ver [Uruguay y Antártida](research/uruguay-y-antartida.md))
- [ ] Revisar si MAPTIS (ensayos NASA-STD-6001) es de acceso público; si no, usar reportes de NTRS con ensayos en 1 g
- [ ] Leer el texto completo del white paper del Decadal (NTRS 20210022403)
- [ ] Asignar personas a los roles → [07 Equipo](team.md)
- [ ] Crear el repo en GitHub y el equipo completo en Members de la plataforma
- [ ] Elegir el nombre del equipo para la demo

## Riesgos
| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Los datos de PSI no sirven o son difíciles de parsear | media | alto | Plan B: hallazgos curados a mano desde NTRS y la presentación de BASS-II |
| Alcance demasiado grande | alta | alto | Respetar "fuera de alcance" del spec; hitos con corte |
| Parecido con SPICA, OSAMABASAM o Fotia | media | medio | El diferencial es el próximo ensayo + contradicciones + Antártida |
| Perder Validez por transferir microgravedad a la Antártida | media | alto | Marcar en la UI qué evidencia aplica a cada escenario |
| La API del LLM falla en la demo | media | medio | Respuestas cacheadas |
| Entregar tarde o con la demo de más de 30 s | baja | crítico | Primera entrega el domingo a las 16:00 |
