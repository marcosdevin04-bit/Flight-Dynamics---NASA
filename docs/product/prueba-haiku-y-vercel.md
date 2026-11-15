# Prueba de Haiku en Ask the evidence

**15 de noviembre de 2026.** Probamos dos consultas en la app pública. Una evaluó la explicación científica y la otra, si el ingeniero podía obtener el mismo resultado escribiendo una pregunta que usando los controles. El endpoint indicó cuándo generó una explicación en vivo. No informó el identificador exacto del modelo, los reintentos ni el costo. Dos consultas tampoco alcanzan para estimar una tasa de acierto.

## Qué respondió la app

| Consulta | Resultado observado | Evaluación |
| --- | --- | --- |
| Policarbonato a 56,5 kPa, ingresado con los controles | La explicación en vivo citó el registro de policarbonato. Describió la extinción con mayor concentración de oxígeno en gravedad lunar simulada y distinguió el factor de corrección de 2,3 puntos porcentuales del límite lunar que aparece en la figura. | La interpretación coincide con el trabajo de Urban et al. La frase “the same test” exageró la coincidencia. El usuario solo especificó material y presión. La ausencia de flujo forzado era una condición del ensayo recuperado. |
| Mylar, 34 % de O₂, 8,2 psi, sin flujo forzado, escrito como pregunta | La app pidió ingresar un material y un escenario lunar. Con los controles, esos mismos valores devolvieron “No matching test in the data we reviewed.” | Fue un rechazo incorrecto de una consulta válida, antes de mostrar la evidencia. La respuesta pública no permitió determinar si Haiku extrajo mal un campo o si el validador rechazó su salida. |

[Urban et al., figura 11 y tabla 2, NASA NTRS](https://ntrs.nasa.gov/api/citations/20250002114/downloads/ICES_2025-392-correctedcaptions.pdf)

## Qué corregimos y qué queda abierto

Para preguntas completas que el código reconoce, la app extrae material, oxígeno, presión y flujo directamente. Convierte 8,2 psi a 56,5 kPa y reconoce el flujo forzado nulo en inglés y español. Usa esos datos en el mismo buscador que los controles. Si queda texto por interpretar, conserva el recorrido con el modelo.

Agregamos pruebas para la pregunta original en ambos idiomas. El resultado fue el caso 3, con cero llamadas al proveedor en esas pruebas. Pasaron 201 pruebas y el chequeo de TypeScript. Los cambios están en los commits [6947f32](https://github.com/marcosdevin04-bit/Flight-Dynamics---NASA/commit/6947f32) y [d798d50](https://github.com/marcosdevin04-bit/Flight-Dynamics---NASA/commit/d798d50).

La corrección cubre la lectura del escenario. Queda abierta la precisión de la frase “the same test” en las explicaciones generadas. Una formulación más fiel sería “The record matches the material and pressure you specified.” No probamos Opus, Fable ni Sol. Para esta demo mantendríamos Haiku con el presupuesto disponible.

## Cómo llevar la corrección a Vercel

La bitácora técnica del equipo documenta un despliegue manual. Quien tenga acceso al proyecto de Vercel debe abrir una terminal en la copia del repo que ya esté vinculada al proyecto que sirve **flight-dynamics-mu.vercel.app**. [Procedimiento registrado por el equipo](../risks-and-todo.md)

1. Ejecutá estos comandos desde esa carpeta, uno por vez. Si hay cambios locales pendientes, guardalos antes de seguir.

   ~~~sh
   git status --short
   git switch main
   git pull --ff-only origin main
   git merge-base --is-ancestor d798d50 HEAD
   ~~~

2. El último comando debe terminar con código 0 (normalmente no imprime nada). Desde esa misma carpeta, ejecutá **vercel --prod**. Si la CLI pide vincular la carpeta, elegí el proyecto existente del equipo. Si no tenés la CLI instalada, podés ejecutar **npx vercel --prod**. Esperá a que el despliegue de producción figure como **Ready** y comprobá el dominio asignado. [CLI de Vercel](https://vercel.com/docs/cli/deploy)

3. Si el equipo ya conectó GitHub a Vercel, también se puede publicar desde el panel del proyecto, en **Deployments → Create Deployment**, seleccionando la rama de producción **main**. Comprobá que el commit desplegado incluya la corrección. [Despliegues desde Git](https://vercel.com/docs/git)

## Cómo comprobarlo en la web pública

Abrí [Ask the evidence en producción](https://flight-dynamics-mu.vercel.app/#tests) y pegá esta pregunta literal:

> For Mylar in a lunar habitat at 34% oxygen and 8.2 psi with no forced flow, what did the experiments show?

La app debe mostrar Mylar, 34 % de O₂, 56,5 kPa y 0 cm/s, junto con **“No matching test in the data we reviewed.”** La prueba pasa si muestra esas condiciones y el mensaje sobre la evidencia sin pedir que vuelvas a ingresar el material. El modo describe el resultado dentro del catálogo revisado.

Para comprobar también el cambio anterior de la cámara, abrí [Flame lab](https://flight-dynamics-mu.vercel.app/#simulation). Los dos selectores de gravedad deben ofrecer microgravedad, Luna y Tierra. El segundo también permite apagar la comparación.
