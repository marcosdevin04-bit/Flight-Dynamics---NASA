# Flame in Freefall

Guía de investigación técnica. 11 de noviembre de 2026.


## Guía técnica para entender el desafío

Combustión en microgravedad, evidencia científica e inteligencia artificial.

Preparada para Marcos Devincenzi, Juan Benitez y Facundo Díaz. NASA Space Apps Challenge 2026. Investigación cerrada el 11 de noviembre de 2026, hora de Uruguay.

### La idea central

La gravedad cambia cómo se transportan el oxígeno, el calor y los productos de combustión. Por eso, una prueba realizada en la Tierra no basta para describir cualquier incendio dentro de una nave. NASA investiga esos fenómenos; el desafío propone facilitar la lectura e interpretación de sus hallazgos mediante un panel con IA. [1, 4]

### Cómo usar esta guía

Primera lectura, 25-35 minutos: páginas 2 a 7 para adquirir vocabulario y entender los experimentos. Segunda lectura: páginas 8 a 12 para discutir datos, IA, literatura y otros equipos. La página 13 propone una reunión de estudio. Las referencias finales permiten seguir investigando.

> Tres preguntas para llevarse: ¿qué se observó?, ¿bajo qué condiciones?, ¿hasta dónde se puede generalizar?

### Qué se verificó y qué sigue abierto

Se consultaron páginas de NASA y NIST, fichas de PSI, reportes técnicos, abstracts científicos y publicaciones de participantes. No se descargaron ni analizaron los datasets crudos. Varias editoriales bloquearon el texto completo; esos papers se describen únicamente a partir de sus abstracts. La consigna completa y su lista definitiva de recursos siguen pendientes de contrastar en la plataforma global.

Las explicaciones y ejercicios son una síntesis educativa. Las observaciones de otros equipos se identifican como autodeclaraciones, y las sugerencias de trabajo como criterio propio. No es un documento oficial de NASA ni un manual operativo de emergencia.


## Qué pide NASA y qué problema aborda

### El desafío informático

La descripción pública pide un dashboard interactivo impulsado por IA que resuma, ordene e interprete hallazgos de combustión en microgravedad para extraer información útil sobre seguridad en exploración humana. Hay décadas de resultados: el problema incluye poder encontrarlos, compararlos y comprenderlos. [1]

Interpretación práctica: resumir exige conservar las condiciones y limitaciones; ordenar exige explicar con qué criterio un resultado es relevante; interpretar exige conectar una observación con su posible implicación sin convertirla en una certeza universal. Esta descomposición es una lectura del encargo, no una rúbrica oficial.

### El problema científico y operacional

La protección contra incendios integra prevención, detección, respuesta y supresión. En una nave, el fuego amenaza también la atmósfera respirable y los equipos. La ventilación puede alimentar la combustión y transportar contaminantes; el comportamiento depende del ambiente. Un estudio informático puede ayudar a entender evidencia para esas decisiones, sin reemplazar los ensayos ni la validación de ingeniería. [5]

### Lo que aún no conviene asumir

No se verificó que deban entrenar una red neuronal desde cero, ejecutar CFD, predecir incendios en tiempo real o usar un stack particular. Tampoco hay aquí una confirmación de que FLEX, BASS o Saffire estén todos incluidos entre los recursos oficiales del reto. Son antecedentes científicos pertinentes.

> La captura del usuario y la ficha indexada muestran “SI-Powered”, mientras varias sedes reproducen “AI-Powered”. La descripción funcional menciona IA. Mantener “Flame in Freefall” como nombre corto y confirmar el título íntegro en la plataforma antes de entregar. [1, 2]

### Preparación y entrega

El GO Team permite investigar y revisar recursos antes del evento; indica comenzar el proyecto el 14 de noviembre a las 9:00 de la sede local. Para premios globales exige al menos una fuente NASA incluida en los recursos del challenge y citar lo utilizado. Esta guía es preparación temática. La disponibilidad de recursos se anunció para el 12 de noviembre: verificar la pestaña Resources cuando abra. [26, 27]


## Por qué una llama cambia en órbita

### Microgravedad no significa vacío

En órbita, nave y contenido están en caída libre conjunta: la gravedad terrestre sigue actuando, pero el interior experimenta un peso aparente muy pequeño. Microgravedad describe ese entorno, con perturbaciones residuales. Dentro de una cabina presurizada hay gases y oxígeno; fuera puede haber vacío. Son variables diferentes. En la Luna y Marte existe gravedad parcial: no se debe etiquetar una prueba orbital como una prueba lunar. [3]

### Química y transporte trabajan juntos

Una reacción combustible-oxidante libera energía. Para sostener una llama deben llegar reactivos y mantenerse suficiente temperatura. En Tierra, el gas caliente menos denso asciende por flotabilidad y arrastra aire fresco. En microgravedad disminuye esa convección natural; cobran relevancia la difusión molecular y los flujos impuestos. Una llama puede aproximarse a una esfera en condiciones simétricas y con poco flujo, pero esa forma no describe todos los incendios de una nave. [4]

### Tres mecanismos que conviene distinguir

Difusión: mezcla molecular por gradientes de concentración. Convección: transporte por movimiento del gas, natural o forzado. Transferencia térmica: conducción, convección y radiación llevan energía entre llama, combustible y entorno. Reducir la flotabilidad no elimina los demás mecanismos. [4]

> Ejemplo conceptual: dos llamas con el mismo combustible y oxígeno pueden verse distintas si una recibe aire de un ventilador. Compararlas como si solo cambiara la gravedad produce una conclusión engañosa.

### El puente con aviación

Para Marcos, sirve pensar en una envolvente de condiciones: una conclusión vale dentro del régimen donde fue comprobada. La intuición sobre ventilación, carga de trabajo y consecuencias de una falla ayuda a formular preguntas. Las reglas físicas de un incendio en cabina terrestre no se trasladan automáticamente a una cabina orbital. Esta analogía es didáctica.


## Qué hay que registrar para comparar ensayos


| Variable | Qué significa / por qué importa |
| --- | --- |
| Oxígeno y presión | Registrar fracción de O2 y presión total por separado; no son intercambiables. |
| Flujo de aire | Velocidad, dirección y cambios temporales; transporta oxidante y calor. |
| Combustible | Composición, espesor, tamaño, orientación y estado inicial. |
| Entorno | Gravedad efectiva, geometría del conducto y paredes cercanas. |
| Respuesta medida | Ignición, propagación, extinción, temperatura, humo o calor liberado. |

La elección de variables se apoya en BASS-II y estudios de confinamiento: comparar solo el nombre del material omite diferencias que pueden dominar el resultado. [6, 18, 19]

### Ejercicio 1: porcentaje no es presión parcial

Para una mezcla ideal: p(O2) = x(O2) × P. Ejemplo inventado: 21% a 100 kPa da 21 kPa de presión parcial; 30% a 70 kPa también da 21 kPa. Son atmósferas distintas pese al mismo producto. Los trabajos sobre ambientes normóxicos analizan justamente efectos combinados de presión y concentración. No usar este cálculo como índice de seguridad. [20]

### Ejercicio 2: una velocidad no es un diagnóstico

Si el frente avanza de 12 a 20 mm entre t = 2 s y t = 6 s, su velocidad media es (20 - 12)/(6 - 2) = 2 mm/s. Valores ficticios para practicar unidades. Una medición real necesita escala espacial, tiempos, criterio de frente y error. Mayor brillo en un video no equivale por sí solo a mayor temperatura o calor liberado.

### Límites y respuestas distintas

Ignición significa inicio de combustión; propagación describe el avance; extinción describe su cese bajo un criterio experimental. Un material que no encendió en un ensayo no queda demostrado como incombustible. El índice límite de oxígeno debe acompañarse de material, geometría, presión, flujo y procedimiento. [6, 8]

> Disciplina de lectura: siempre anotar valor + unidad + condición + fuente. “No informado” es diferente de cero y de “no ocurrió”.


## BASS-II: aprender a leer un experimento

BASS significa Burning and Suppression of Solids. BASS-II examinó combustibles sólidos en la ISS, variando oxígeno, velocidad de ventilación, tipo de material, espesor y geometría. El reporte resume 126 ensayos; una muestra podía quemarse más de una vez. Una pregunta era si el ensayo terrestre de combustión ascendente representa siempre una condición conservadora para uso espacial. [6]

### Propagación concurrente y opuesta

Concurrente: flujo y avance del frente siguen el mismo sentido. Opuesta: el aire llega en sentido contrario al avance. Esta distinción debe acompañar los datos. Las investigaciones de BASS-II consideran ambas configuraciones y estudian apariencia, crecimiento, propagación y extinción. [7]

### Un resultado concreto, con alcance limitado

La presentación BASS-II, página PDF 13, compara extinción a flujo opuesto bajo (enfriamiento radiativo, por debajo de 2 cm/s) y alto (blowoff, al superar 40 cm/s), para una muestra de 0,1 mm. Son condiciones de esa prueba, no umbrales generales. En la página 18 reporta propagación de una varilla de PMMA a 13,6% de oxígeno en microgravedad frente a un límite terrestre de 16% para la configuración indicada. [7]

### Qué pasa con el sólido

El calentamiento puede descomponer el material y liberar gases combustibles: pirólisis. Parte de esos gases arde en fase gaseosa. El residuo puede además presentar combustión lenta o incandescente. En un trabajo de Saffire sobre tela algodón-fibra de vidrio, Olson estudió puntos incandescentes que se propagaban por el residuo después del frente de llama. Son fenómenos relacionados, pero distintos. [22]

> Lectura crítica propuesta: si un paper dice “la llama se extinguió”, buscar qué señal usó, durante cuánto tiempo observó y si evaluó combustión residual. No inferir desaparición de todo riesgo solo porque dejó de verse una llama.

### Preguntas para conversar

¿El número de ensayos equivale al número de muestras independientes? ¿Se mantuvo constante el oxígeno? ¿El flujo cambió durante la prueba? ¿La tasa corresponde a crecimiento de llama o avance sobre combustible? ¿Hay réplicas y errores reportados? Estas preguntas son un método de lectura, no nuevos resultados de BASS-II.


## FLEX y las llamadas llamas frías

FLEX estudió llamas de difusión de gotas de combustible, su extinción y la eficacia de gases supresores. Su objetivo incluye estimar límites de oxígeno para combustión sostenida y validar modelos de transporte y química. Una gota permite estudiar un sistema controlado; su geometría no representa directamente una pared o un cable. [8]

### Una fuente real para investigar

La ficha PSI-69, versión 5, identifica FLEX y el DOI 10.60555/mbq8-0451. Describe mediciones de combustión de gotas y variación de condiciones ambientales y supresores. El catálogo muestra CC0-1.0. En esta investigación se verificaron los metadatos indexados, no los archivos ni su formato efectivo. Hay que revisar la documentación antes de prometer variables o cantidad de muestras. [9]

### Por qué sorprendieron las llamas frías

NASA reporta llamas frías no premezcladas con combustible líquido en FLEX en 2012, y observaciones con combustible gaseoso en 2021. “Fría” significa mucho menor temperatura que la combustión caliente habitual; no significa temperatura ambiente ni ausencia de reacción. El interés incluye comprender química de baja temperatura y mejorar modelos de motores. [10]

La revisión divulgativa de NASA explica que el comportamiento y la supresión dependen también de la ventilación y geometría. La apariencia visible es una señal incompleta del proceso. Por eso no conviene enseñar una regla del tipo “llama azul = segura” o asumir extinción completa a partir de una imagen aislada. [29]

### Visión por computadora: qué podría medir

El preprint de Xu y colaboradores propone segmentar imágenes de llamas de gotas con SAM 2 y ajustar círculos con RANSAC. Su abstract reporta 19.537 imágenes, error porcentual absoluto medio de 3,1% frente a referencia manual e incertidumbre estándar combinada de 8,54%. Son medidas diferentes; ninguna convierte el sistema en detector universal de incendios. Es un preprint, y sus cifras no fueron reproducidas aquí. [21]

> Para Facundo: extraer una dimensión geométrica desde un video es una tarea medible. Inferir seguridad de toda una nave a partir de esa dimensión requiere muchas más hipótesis y validación.


## Saffire, SoFIE, ACME y el humo

### Saffire: aumentar la escala

La serie Saffire llevó seis investigaciones a cargueros Cygnus; se realizaron pruebas después de separarse de la ISS. La última misión concluyó en enero de 2024. NASA describe 19 ensayos en Saffire-VI con distintos materiales y condiciones de aire, cámaras y sensores. Su utilidad incluye estudiar crecimiento, productos de combustión y consecuencias para el vehículo. [11]

PSI-98 identifica Saffire-I, DOI 10.60555/0t15-1z43. La ficha indexada contiene campos de fechas y proyecto que parecen mezclar otra investigación; no los uso como cronología de Saffire. Este caso muestra por qué incluso un catálogo oficial necesita contraste entre título, documentación, DOI y publicación. [12]

### SoFIE y ACME estudian preguntas diferentes

SoFIE, Solid Fuel Ignition and Extinction, es una instalación en la ISS para investigar ignición, propagación y extinción de sólidos, con interés en futuras misiones. Su ubicación orbital no convierte cada observación en una medición directa de gravedad lunar o marciana. [13]

ACME estudia llamas gaseosas laminares no premezcladas. Sus objetivos incluyen eficiencia y reducción de emisiones en aplicaciones terrestres, además de prevención de incendios. El portal operacional distingue enlaces restringidos: que exista un experimento no implica que todos sus registros operacionales sean públicos. [14]

### El humo tiene su propia física

NASA y NIST estudiaron humo producido por cinco materiales y compararon detección. La respuesta depende de las partículas y del combustible. En microgravedad el transporte está ligado a la ventilación: ubicar detectores con la lógica terrestre de “el humo sube al techo” puede fallar. [15]

> La evidencia útil puede referirse a prevención, detección, supresión o efectos posteriores. Un buen resumen debe indicar a cuál de estas preguntas responde. Esta clasificación es una herramienta de estudio.


## Qué leer y qué aporta cada trabajo

La selección siguiente combina una revisión amplia con estudios concretos. Se consultaron abstracts y metadatos editoriales; no se afirma una lectura completa de los artículos bloqueados. Los resultados citados se limitan al alcance de esos resúmenes.

### Ma y colaboradores, 2025: el mapa general [17]

La revisión integra propagación sobre sólidos en microgravedad, gravedad parcial y métodos terrestres de simulación. Destaca pérdidas radiativas, transporte y límites de semejanza entre plataformas. Úsenla para reconocer familias de problemas y encontrar bibliografía. Una simulación terrestre por menor presión o canal estrecho reproduce ciertos efectos; no garantiza equivalencia física completa.

### Cui y Liao, 2024: el tamaño del conducto importa [18]

Estudio numérico motivado por experimentos Saffire. El abstract describe incrementos superiores al 95% en propagación y longitud de pirólisis cuando la altura del conducto disminuyó 40% en los casos considerados. La cifra muestra sensibilidad al confinamiento; no es una regla aplicable a cualquier nave. Leer luego geometría, condiciones de borde y validación.

### Sharma y colaboradores, 2024: flujo opuesto [19]

Analiza confinamiento y propagación opuesta en celulosa y sólidos poliméricos, incluyendo SIBAL y PMMA. Es complementario al trabajo anterior: el sentido del flujo y el material cambian el problema. Pregunta de lectura: ¿las paredes aportan calor a la muestra o lo extraen en cada régimen?

### Han y colaboradores, 2026: atmósferas normóxicas [20]

Usa CFD bidimensional transitorio para estudiar propagación concurrente sobre un sólido delgado con menor presión y mayor oxígeno. El abstract propone correlaciones según el régimen de transferencia de calor. Es pertinente para comprender por qué mantener una presión parcial de oxígeno parecida no mantiene necesariamente el mismo comportamiento de incendio.

### Olson, 2024, y Xu y colaboradores, 2026 [22, 21]

El primero agrega combustión incandescente del residuo a la lectura de Saffire. El segundo ofrece una tarea concreta de IA aplicada a medición. Juntos recuerdan que una imagen contiene información útil y también fenómenos que el algoritmo podría no detectar.


## Dónde buscar y qué significa “dato real”

NASA Physical Sciences Informatics (PSI) reúne estudios de varias plataformas y disciplinas, incluida combustión. Puede contener datos crudos y procesados, imágenes, modelos, documentación y publicaciones. La disponibilidad varía por investigación; una ficha no es garantía de un CSV listo para entrenar. [16]


| Fuente | Qué se verificó | Qué falta comprobar |
| --- | --- | --- |
| PSI-69 / FLEX | Ficha y DOI del estudio | Archivos, columnas, calibración y permisos por archivo. |
| PSI-98 / Saffire-I | Ficha y DOI; metadatos problemáticos | Documentación correcta, cronología y contenido descargable. |
| NTRS / BASS-II | Resumen de reporte y variables | Matrices, anomalías, páginas y réplicas del texto completo. |
| Papers y videos | Resultados o ejemplos publicados | Datos subyacentes, escala, fps y condiciones del clip. |
| Resources del reto | Ruta global localizada | Listado definitivo y recurso NASA obligatorio. |

### Cuatro capas de evidencia

1. Observación: una señal o imagen obtenida durante un ensayo. 2. Dato procesado: una medida calculada a partir de esa señal. 3. Conclusión del autor: interpretación publicada de varios datos. 4. Inferencia propia: lo que ustedes deducen o lo que genera un modelo. Mantener esas capas separadas permite discutir desacuerdos sin ocultarlos. Es una recomendación metodológica.

### Ficha de lectura sugerida

Para cada hallazgo anotar: investigación y ensayo; documento, versión, DOI y página; combustible y dimensiones; gravedad, presión, oxígeno y flujo; magnitud observada y unidad; instrumento o método; número de réplicas; incertidumbre; conclusión exacta en palabras propias y limitación. Agregar si un valor fue medido, derivado, estimado o no informado.

> Hallazgo de esta consulta: los registros públicos existen, pero no se verificó todavía un dataset descargado y utilizable. No prometer miles de ejemplos independientes basándose en miles de fotogramas.


## Cómo pasar de un paper a una conclusión útil

### Caso didáctico: dos resultados parecen contradecirse

Supongan que un estudio encuentra propagación más rápida y otro más lenta en microgravedad. Antes de atribuir el desacuerdo a un error, comparen combustible, espesor, presión, oxígeno, ventilación, confinamiento y definición de velocidad. Pueden estar describiendo regímenes distintos. Esta situación es hipotética; ilustra cómo leer estudios heterogéneos.

### Un procedimiento de cinco preguntas

1. ¿Qué variable cambiaron y cuáles controlaron? 2. ¿Qué midieron realmente y con qué instrumento? 3. ¿Qué población de ensayos sostiene la conclusión? 4. ¿Qué incertidumbres y anomalías reconocen? 5. ¿Cuál es la distancia entre ese experimento y el escenario que nos interesa?

### Errores frecuentes en análisis de datos

Correlación: dos variables asociadas pueden depender de una tercera. Pseudorreplicación: muchos cuadros del mismo video no son muchos experimentos. Fuga de información: repartir cuadros contiguos entre entrenamiento y evaluación exagera desempeño. Extrapolación: un modelo aplicado fuera del rango observado puede producir números convincentes pero injustificados.

Como criterio de evaluación futura, separar ensayos completos y, cuando sea viable, campañas o materiales. Comparar contra una referencia simple. Reportar error con unidades y el rango donde se probó. Para clasificación, revisar por separado falsos positivos y falsos negativos; para resúmenes, verificar fidelidad a la fuente y conservación de condiciones. Estas son recomendaciones metodológicas, no requisitos publicados del challenge.

### Ejemplo de conclusión bien delimitada

> “En esta serie y bajo las condiciones documentadas, el cambio de flujo coincidió con una modificación de la llama. Falta evidencia equivalente para otra geometría o gravedad.” Evitar transformar eso en “este material es seguro en Marte”.

Una revisión profunda puede terminar con una pregunta abierta. Identificar que faltan ensayos equivalentes es un resultado útil de investigación; no obliga a inventar una predicción.


## Qué puede aportar y cómo juzgar su calidad

Esta sección explica posibilidades técnicas generales para comprender la consigna. No fija la solución del equipo ni implementa el proyecto antes del evento.


| Enfoque | Aporte posible | Cómo comprobarlo |
| --- | --- | --- |
| Búsqueda y recuperación | Localizar pasajes relevantes para una pregunta | ¿Recupera fuentes correctas en consultas conocidas? |
| Resumen con fuentes | Explicar un resultado y sus condiciones | ¿Cada afirmación está respaldada por el pasaje citado? |
| Extracción estructurada | Convertir tablas o texto en campos comparables | Revisión humana de valores, unidades y contexto. |
| Visión por computadora | Medir posiciones o dimensiones en imágenes | Referencia manual, escala y error por ensayo. |
| Modelo predictivo | Estimar una magnitud dentro de un dominio | Validación fuera de muestra y límites explícitos. |

### Qué es RAG, en términos sencillos

Retrieval-Augmented Generation: primero se buscan fragmentos pertinentes en un conjunto documental; después un modelo redacta una respuesta apoyada en ellos. Reduce la dependencia de la memoria del modelo, pero no garantiza verdad. La búsqueda puede fallar y la redacción puede añadir una conclusión que la fuente no sostiene.

### Ordenar evidencia no equivale a puntuar peligro

Un ranking de relevancia responde “qué estudio se parece más a mi pregunta”. Un índice de riesgo responde otra cosa y necesita definición, calibración y validación. Que una interfaz muestre 87/100 no significa que exista una probabilidad científica del 87%. También hay que distinguir relevancia, calidad de evidencia y severidad.

### Cuatro pruebas para una demostración futura

Pregunta con respuesta explícita: debe citarla. Pregunta sin evidencia: debe reconocer el vacío. Dos estudios con condiciones distintas: debe conservar la diferencia. Pregunta que solicita extrapolar: debe explicar qué cambia y qué falta. Son ejercicios propios para evaluar comprensión, no métricas oficiales de NASA.

> La oportunidad técnica está en hacer verificable una explicación: mostrar de qué ensayo sale, qué supuestos usa y dónde termina su alcance.


## Qué publican otros equipos y qué aprender

Se revisaron publicaciones públicas del mismo reto. Son una muestra exploratoria, no un censo ni una evaluación de ganadores. No se verificó inscripción definitiva, originalidad, cumplimiento temporal ni la calidad de todas sus funciones.

### Firelytics AI [23]

Un anuncio en las Discussions de nasa/spaceapps busca integrantes con perfiles de análisis, frontend y ciencia de combustión. Presenta la idea general de un dashboard que resume, ordena e interpreta datos. Es evidencia de interés y formación de equipo, no de un producto terminado ni de resultados científicos.

### Cosmic Nexus / FLARENEXUS [24]

Su README describe una plataforma con exploración, comparación y asistente. Declara explícitamente que los experimentos, métricas, puntuaciones y respuestas son datos sintéticos de demostración, sin resultados científicos validados. Puede ayudar a pensar en formas de presentar información. No corresponde reutilizar esas cifras como observaciones NASA.

### MicroFire Atlas [25]

El sitio declara 78 registros, tres familias experimentales y trazabilidad a documentos; muestra comparaciones y límites de predicción. Son afirmaciones del propio proyecto, no una auditoría nuestra. Es interesante su énfasis en procedencia y evidencia faltante. Para utilizar cualquier cifra, seguir el enlace al documento primario y comprobarla.

### Qué conclusión extraer como equipo

Mi lectura: “poner un chat sobre papers” es un punto de partida bastante compartido. La calidad puede depender de que las comparaciones sean científicamente válidas y fáciles de comprobar. Esto es una inferencia del panorama observado, no una predicción de qué premiará el jurado.

### Cómo usar foros

Las respuestas del GO Team son valiosas para reglas. Las discusiones de participantes sirven para descubrir preguntas, recursos y dificultades. Los abstracts de congresos muestran investigación emergente, pero pueden ser preliminares. Una opinión de foro no pesa igual que un ensayo documentado o un artículo revisado. Seguir siempre la cadena hasta el origen de la afirmación.


## Una reunión para que los tres hablen el mismo idioma

### Propuesta de lectura y conversación: 90 minutos

Primeros 20 minutos: todos leen las páginas 2 a 4. Cada uno explica con sus palabras por qué una llama puede cambiar en órbita. Siguientes 25 minutos: repartir BASS-II, FLEX y Saffire; cada persona presenta qué pregunta investiga, qué controla y qué mide. Otros 25 minutos: revisar un abstract de la página 8 y llenar una ficha de evidencia. Últimos 20 minutos: listar dudas para los mentores y comprobar los recursos oficiales.

### Cómo aprovechar sus perfiles

Marcos: relacionar preguntas con decisiones, contexto operacional y límites de aplicación. Juan: entender cómo representar fuentes, condiciones y consultas de forma consistente. Facundo: revisar unidades, incertidumbre, independencia de muestras y evaluación. Todos deben poder explicar la física básica; estas funciones son una propuesta, no una división rígida.

### Autoevaluación: responder sin mirar

1. ¿Por qué hay microgravedad en órbita aunque exista gravedad? 2. ¿Por qué puede arder algo dentro de una nave? 3. ¿Cómo entra oxígeno a una llama con poca flotabilidad? 4. ¿Qué diferencia a FLEX de BASS-II? 5. ¿Por qué importa la dirección del flujo? 6. ¿Por qué igual presión parcial no demuestra igual inflamabilidad? 7. ¿Mil fotogramas equivalen a mil ensayos? 8. ¿Qué puede afirmar un resumen con fuentes y qué no?

Respuestas mínimas: caída libre conjunta; cabina con oxidante; difusión y flujo impuesto; gotas frente a sólidos; cambia transporte y precalentamiento; cambian presión y composición; no, comparten ensayo; puede sintetizar evidencia localizada, no certificar escenarios no ensayados.

### Pendientes concretos antes de elegir enfoque

Leer la consigna completa y Resources; confirmar el título; abrir los archivos candidatos y sus diccionarios; verificar qué significa “rank” en el detalle; preguntar a mentores por público objetivo y criterios; registrar cualquier requisito local de entrega. No se ha realizado implementación del reto en esta guía.

> Corrección útil sobre las fotos anteriores: el GO Team indica que el contenido generado con IA no debe contener ni modificar elementos de marca NASA y que imágenes generadas deben identificarse visiblemente. Las fotos que generamos con el logo no son una opción adecuada para la entrega bajo esa indicación; usar una alternativa conforme. [27]


[1] [Consigna pública reproducida por sedes de Space Apps](https://nasaspaceapps.ae/challenges) — Resumen del desafío; fuente organizadora local, no sustituye la ficha completa global.


[2] [NASA Space Apps: Flame in Freefall](https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=details) — Ficha global localizada. El detalle y los recursos no pudieron recuperarse en esta consulta.


[3] [NASA Glenn: What is Microgravity?](https://www.nasa.gov/centers-and-facilities/glenn/what-is-microgravity/) — Introducción a caída libre, órbita y plataformas experimentales.


[4] [NASA: A Researcher’s Guide to Combustion Science](https://www.nasa.gov/wp-content/uploads/2016/05/np-2015-10-034-jsc_combustion_in_reduced_gravity-iss-mini-book-011116-508.pdf) — Guía de base histórica, 2015/2016. Consultadas introducción y secciones pertinentes; no usar como inventario actual de misiones.


[5] [NASA OCHMO-TB-008: Fire Protection, Rev A](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf) — Marco de protección contra incendios. Documento consultado, no verificación de la última revisión de todas las normas citadas.


[6] [NASA/TM-20210011385: BASS-II Summary Report](https://ntrs.nasa.gov/api/citations/20210011385/downloads/TM-20210011385.pdf) — Consultado resumen indexado, sección 1. El PDF completo excedió el límite del buscador; matrices no auditadas.


[7] [Combustion of Solids in Microgravity: Results from BASS-II](https://ntrs.nasa.gov/api/citations/20160000593/downloads/20160000593.pdf) — Presentación de 2014; texto completo recuperado. Véanse páginas PDF 13 y 18 para ejemplos de extinción y límite de oxígeno.


[8] [NASA Glenn: Flame Extinguishment Experiment](https://gipoc.grc.nasa.gov/wp/fcf-cir/flex/) — Objetivos de FLEX: supresión, límite de oxígeno, transporte y cinética.


[9] [NASA PSI-69: FLEX, versión 5](https://psi.nasa.gov/physci/repo/data/investigations/PSI-69) — Metadatos indexados; DOI 10.60555/mbq8-0451. No se descargaron archivos experimentales.


[10] [NASA: Cool Flames Created During a First for ISS Research](https://www.nasa.gov/missions/station/cool-flames-created-during-a-first-for-international-space-station-research/) — Artículo del 16/07/2021 sobre FLEX y llamas frías gaseosas.


[11] [NASA: Flame Burns Out on Long-Running Spacecraft Fire Experiment](https://www.nasa.gov/centers-and-facilities/glenn/flame-burns-out-on-nasas-long-running-spacecraft-fire-experiment/) — Cierre de Saffire, 14/02/2024; seis investigaciones y 19 ensayos en Saffire-VI.


[12] [NASA PSI-98: SAFFIRE-I, versión 4](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) — DOI 10.60555/0t15-1z43. Ficha indexada con inconsistencias de metadatos; contrastar con documentación científica.


[13] [NASA Science: SoFIE](https://science.nasa.gov/mission/sofie/) — Instalación para estudiar ignición y extinción de combustibles sólidos.


[14] [NASA Glenn: ACME](https://gipoc.grc.nasa.gov/wp/fcf-cir/acme/) — Programa de llamas gaseosas no premezcladas. Algunos enlaces operacionales exigen autorización.


[15] [NIST/NASA: One Detector Doesn’t Fit All](https://www.nist.gov/news-events/news/2018/05/nistnasa-study-shows-one-detector-doesnt-fit-all-smoke-spacecraft) — Estudio de detección y propiedades del humo, 2018.


[16] [NASA: Spotlight on Data - PSI](https://science.data.nasa.gov/blog/psi-spotlight) — Catálogo de datos crudos, procesados y documentación; actualización 07/08/2026.


[17] [Ma y colaboradores: Flame spread over solid materials under reduced buoyancy/gravity](https://doi.org/10.1016/j.pecs.2025.101251) — Review, 2025. Consultado abstract editorial indexado; texto completo no accesible.


[18] [Cui y Liao: Numerical study of the effects of confinement on large-scale fires in microgravity](https://doi.org/10.1016/j.combustflame.2024.113299) — Combustion and Flame 261, 113299, 2024. Abstract editorial indexado.


[19] [Sharma y colaboradores: Effects of Confinement on Opposed-Flow Flame Spread](https://doi.org/10.1007/s12217-024-10106-y) — Microgravity Science and Technology 36, 20, 2024. Resumen y metadatos editoriales indexados.


[20] [Han y colaboradores: Concurrent flow flame spread in normoxic conditions](https://doi.org/10.1016/j.proci.2026.106327) — Proceedings of the Combustion Institute 42, 106327, 2026. Abstract editorial indexado.


[21] [Xu y colaboradores: Digital measurement of droplet flame diameter using SAM 2](https://arxiv.org/abs/2607.16587) — Preprint v1, 18/07/2026. Abstract leído; revisión por pares no verificada.


[22] [Olson: Discrete glowing smolder spots behind a concurrent microgravity flame](https://doi.org/10.1016/j.proci.2024.105495) — Proceedings of the Combustion Institute 40, 105495, 2024. Abstract editorial indexado.


[23] [Firelytics AI: anuncio de equipo](https://github.com/nasa/spaceapps/discussions/1897) — Autodescripción pública de participantes. No valida una implementación ni resultados.


[24] [Cosmic Nexus: FLARENEXUS](https://github.com/KhalidHasan03/Flame-in-Freefall) — README público: declara explícitamente datos sintéticos de demostración.


[25] [MicroFire Atlas](https://microfire-atlas.vercel.app/) — Sitio autodeclarado de Space Apps. Sus métricas y registros no fueron auditados individualmente.


[26] [Space Apps GO Team: preparación y recursos](https://github.com/nasa/spaceapps/discussions/1827) — Respuesta de Paula-GO-Team, 05/11/2026: investigación previa permitida; desarrollo desde el evento.


[27] [Space Apps GO Team: recursos y uso de IA](https://github.com/nasa/spaceapps/discussions/1849) — Respuesta de Nick-GO-Team, 06/11/2026: disponibilidad anunciada para 12/11, fuentes e identificación de IA.


[28] [Space Apps: términos de participación 2026](https://www.spaceappschallenge.org/legal/) — Licencias, acceso abierto y atribución.


[29] [NASA: You’re Hot Then You’re Cold](https://www.nasa.gov/missions/station/iss-research/youre-hot-then-youre-cold/) — Divulgación sobre llamas frías, confinamiento y supresión, 2022.
