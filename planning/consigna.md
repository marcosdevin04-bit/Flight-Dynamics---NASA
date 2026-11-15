---
tipo: desafio
actualizado: 2026-11-14 17:50 (UTC-3)
fuente: https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/ (pestañas Details y Resources, leídas en el navegador)
nivel: "#verificado"
---

# Consigna oficial: Flame in Freefall

**Título exacto:** *Flame in Freefall: SI-Powered Fire Safety Insights from Microgravity Combustion Data* (es "SI", no "AI").
**Dificultad:** Advanced, Intermediate · **Tema:** Space Exploration

## Qué pide
Construir un dashboard web, impulsado por superinteligencia (SI), que **resuma, ordene e interprete** investigaciones de ciencia de la combustión para dar información de base sobre seguridad contra incendios.

Los resultados de los experimentos de combustión en baja gravedad (por ejemplo, en la ISS) se publican en la base **PSI (Physical Science Informatics)** de NASA, pero son tantos que cuesta encontrarlos, compararlos e interpretarlos.

Puede permitir a los usuarios:
1. Identificar las investigaciones más relevantes para la seguridad contra incendios de entornos habitados: naves, estaciones, **bases en la Luna y Marte**, rovers presurizados.
2. Extraer datos que apoyen el **modelado predictivo** de inflamabilidad y escenarios de incendio.
3. Destacar investigaciones útiles para la próxima generación de controles y equipos de seguridad contra incendios.

Opcional: aplicaciones de los datos de PSI a la seguridad contra incendios **en la Tierra**.
Fuera de alcance: cohetes y propulsantes.

## Contexto que da NASA
- En microgravedad no hay flotación: la llama de una vela se vuelve una esfera azul que depende de la difusión para recibir oxígeno.
- La seguridad contra incendios se basa en prevención, detección y supresión. La prevención depende de la selección de materiales, que depende de entender los **límites de inflamabilidad**.
- La base lunar y los rovers presurizados tendrán más oxígeno y menos presión que la Tierra. **La inflamabilidad depende mucho de la concentración de oxígeno, y en microgravedad también importa el flujo de aire.**
- Los estudios de inflamabilidad se centran en sólidos (telas, plásticos): **BASS, BASS-II, Saffire-I, -II y -III**.
- Detección: **SAME, SAME-R**. Supresión: **FLEX** (dilución con CO₂ y helio).

## Consideraciones (opcionales)
- **Público:** profesores, estudiantes de grado y posgrado, investigadores e ingenieros aeroespaciales.
- **Atributos a mostrar:** objetivos experimentales; combustibles (forma y tamaño de las muestras o quemadores); condiciones (oxígeno, velocidad del flujo); variables (en qué se diferenciaban y en qué coincidían los ensayos de una misma investigación); sensores y tipos de medición; similitudes y diferencias entre investigaciones.
- **Otras investigaciones en PSI:** DAFT y DAFT-2 (polvo); ACME-BRE (inflamabilidad en atmósfera quieta en función de las propiedades del material); el resto de combustión en PSI es relevante pero menos directo.
- **Hardware:** ACME (6 experimentos, llamas de gas, CIR); FLEX, FLEX-2 y CFI (gotas, MDCA en el CIR); BASS, BASS-II, SPICE y SLICE (sólidos y gases, en el MSG con el ducto de flujo de SPICE).
- **Trajes y oxígeno:** los trajes usan 100 % O₂ a 4,3 psi. La base lunar y los rovers estarán entre el traje y la Tierra: **probablemente 30 % de O₂ o más, a 10,2 psi o menos**, "más de un 40 % de aumento de la concentración de oxígeno, lo que vuelve a los materiales mucho más inflamables". Los ensayos en microgravedad con más oxígeno son los de **CFI-G** (hasta 85 % O₂).
- **Gravedad parcial (clave para nosotros):**
  - **"Actualmente no hay datos de combustión en gravedad parcial en PSI."** Se espera sumarlos en el futuro, por ejemplo de **LUCI** y **FM2**.
  - ACME E-FIELD Flames imitó la gravedad parcial con un campo eléctrico sobre los iones de la llama.
  - **"Los resultados en microgravedad y en gravedad normal podrían acotar lo que ocurre en gravedades intermedias."**

## Recursos oficiales (pestaña Resources)
- **PSI Data Repository: Combustion Science** — https://psi.nasa.gov/physci/repo/search?q=combustion — "la fuente de los datos en los que se debe basar la app".
- NASA Combustion Science (Glenn) — información básica de casi todas las investigaciones de PSI.
- NASA ScienceCasts: The Power of Studying Combustion on the ISS (video, 2018).
- A Researcher's Guide to ISS Combustion Science (2015, más de 50 páginas).
- Apollo 1, Apollo 13 y el incendio de la Mir (1997): lecciones aprendidas.
- Spinoffs: tanques de aire de bomberos, detector de humo del transbordador, ropa de bomberos.
