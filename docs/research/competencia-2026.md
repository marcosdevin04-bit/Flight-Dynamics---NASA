---
tipo: investigacion
actualizado: 2026-11-14
---

# Competencia 2026: otros equipos en Flame in Freefall

Todo lo de esta nota es `#autodeclarado`: viene de READMEs públicos consultados el 14/11/2026 y no se auditó.

| Proyecto | Qué hace | Diferencial |
|---|---|---|
| [SPICA FireLab](https://github.com/eres0045/spica-firelab) | Laboratorio 3D en un interior escaneado de la ISS; sliders de O₂, presión y flujo; 2.012 filas de 19 investigaciones de PSI; 139 tests | **"La pregunta del 34 %"**: cobertura en vez de "seguro / no seguro" |
| [FlameAtlas](https://github.com/syedmehedihussain/FlameAtlas) | Gradient boosting sobre el régimen de propagación (unas 620 filas de PSI, 43 papers de NTRS) | No predice fuera del rango; cita los 3 experimentos más cercanos; mapa de la frontera de decisión |
| [OSAMABASAM](https://github.com/OSAMABASAM/NASA_flame_in_freefall) | Preguntar, rankear (suma sobre 100), comparar, grafo y vacíos; 20 investigaciones; Next.js | **Verifica en código** los IDs y números citados por el LLM; cachea las respuestas de la demo |
| [Fotia](https://github.com/AnteurAbderraouf/Fotia) | Ridge y logística sobre FLEX y ACME; ley d²; 7 atmósferas reales; llama WebGL; chat con Gemini mediante funciones | Etiquetas "Medido aquí / Entre ensayos / Nunca ensayado" |
| [Sarawak](https://github.com/ngu-ming-henn/Nasa-Space-Apps-Sarawak) | Streamlit (inglés y chino), BASS-II, FLEX, MaCFP; sandbox de física 2D; RAG y LoRA locales | Validación sin fuga de datos, auditoría científica y corrección pública de errores |
| Otros | [AeroFlame](https://github.com/danishart7823/AeroFlame_Analytics) · [shaharia179](https://github.com/shaharia179/flame-in-freefall) · [YoussefHegazy74](https://github.com/YoussefHegazy74/flame-in-freefall) · [nergisRahimzade](https://github.com/nergisRahimzade/NASA-Space-Apps-Challenges-2026---Flame-in-Freefall) · Firelytics AI · Cosmic Nexus (datos sintéticos) · MicroFire Atlas (78 registros) | |

## Actualización del 14/11 por la tarde: Next Burn NO es único
| Proyecto | Qué hace | Superposición con Next Burn |
|---|---|---|
| [MicroFire Atlas](https://github.com/A-K-M-Asifuzzaman/MicroFire-Atlas) | 78 registros (56 BASS-II, 20 Saffire, 2 LUCI) y 33 hallazgos con página. Mapa O₂ × flujo con la misión marcada ("No direct evidence here"). **Evidence Gain Planner**: sugiere experimentos para llenar los vacíos. **Flame Vision**: OpenCV sobre videos de Saffire. Aventuras para chicos de 8 a 13. Robustez del ranking con 1000 variaciones. Declara que no tiene registros lunares ni al 34 % | **Casi total**: envolvente, vacíos, próximo ensayo e incluso la idea de la cámara |
| AstraFlame (Team Agnishikha, Dhaka) | Recomienda ensayos de seguimiento en la ISS donde el modelo tiene más incertidumbre (ej.: gota de metanol de 3 mm a 32 % O₂ y 144 kPa) | **Próximo ensayo** (repo no encontrado; dato de la búsqueda) |
| [CinderLens / Flame_On](https://github.com/meherabmehu/Flame_On) | Vincula condiciones con los ensayos de NASA que coinciden y marca vacíos | Envolvente + vacíos |
| [samuelakosaonyejekwe](https://github.com/samuelakosaonyejekwe/flame-in-freefall) | PWA offline: briefing de misión, ranking, base de experimentos, modelo de inflamabilidad y preguntas | Ranking por misión |
| Otros nuevos | [Faruk042](https://github.com/Faruk042/NASA_Flame_In_Freefall_2026) (turco) · [Tarek-Ahmed303 / PyroNova](https://github.com/Tarek-Ahmed303/flame-in-freefall) · [PHARAOHS-x-DIGILIANS](https://github.com/ayaemad10/PHARAOHS-x-DIGILIANS) · [baonamv200](https://github.com/baonamv200/nasa) (Vietnam) · AFAQ (Egipto, YoussefHegazy74) | Dashboards generales |

**Corrección:** antes escribimos "nadie responde qué ensayar después". **Era falso.** MicroFire Atlas y AstraFlame lo hacen. → ver D9 en [Registro de decisiones](../decisions.md)

**Lo que nadie hace (al 14/11):** el **eje gravedad**. Todos grafican O₂ × flujo o presión. MicroFire declara que no tiene datos lunares. Ninguno usa el experimento FM2 de NASA → [FM2 - fuego en la Luna](fm2-fuego-en-la-luna.md)

## Ideas ya tomadas (no competir de frente) `#inferencia`
- Chat con RAG y citas
- Modelos de ML sobre FLEX y BASS-II
- Mapa de vacíos o cobertura
- Llama en 3D
- Etiquetas de procedencia

## Hueco detectado `#inferencia`
Nadie responde **"¿qué habría que ensayar después, y por qué?"**. Tampoco encontramos ninguno de estos:
- detección de contradicciones entre estudios;
- extracción con página exacta desde los PDFs completos de NTRS;
- vínculo con las necesidades del Decadal Survey;
- un análogo terrestre (Antártida).

→ Spec MVP - Next Burn

## Qué copiar como buenas prácticas
- Verificación en código de las citas del LLM (OSAMABASAM)
- Respuestas de la demo cacheadas para que funcione sin la IA (OSAMABASAM)
- El LLM solo llama funciones y nunca calcula números (Fotia)
- No predecir fuera del rango ensayado (FlameAtlas)
