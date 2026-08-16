# Bitácora

La documentación del obligatorio consiste en una **bitácora de trabajo** en formato **markdown** (`bitacora.md`), que se entrega junto con el código fuente.

La bitácora es un registro cronológico del proceso de trabajo: algo similar al historial de git, pero más extenso y narrado. Lo importante no es el resultado final sino el **proceso**: hilos de pensamiento, decisiones, intentos descartados, correcciones y avances.

## Qué debe contener

- **Una entrada por cada día trabajado**, con la fecha.
- **Quién trabajó** ese día: un integrante en particular o en conjunto.
- **Qué se hizo y cómo se pensó**: ideas exploradas, decisiones de diseño y su justificación, partes de implementaciones, bugs encontrados y cómo se corrigieron, resultados de pruebas, dudas que quedaron abiertas.
- **Uso de IA**, si lo hubo ese día: herramienta, consultas relevantes y qué se hizo con la respuesta. Ver [Uso de IA](/uso-ia).

No hay un mínimo de largo por entrada: un día de poco avance puede tener dos líneas. Lo que se evalúa es que la bitácora refleje fielmente el proceso real de trabajo.

## Ejemplo

```markdown
# Bitácora — Obligatorio 1

## 2026-09-02 — Juana
- Leí la letra del ejercicio 3. Primera idea: mantener los elementos ordenados
  en un vector, pero la inserción queda O(n) y la letra pide O(log n).
- Pensándolo mejor, un heap resuelve la inserción y el mínimo en O(log n).
  Mañana lo hablamos con Pedro.

## 2026-09-04 — En conjunto (Juana y Pedro)
- Decidimos usar un min-heap para el ejercicio 3. Implementamos el TAD Heap
  con arreglo (flotar/hundir).
- Bug: `hundir` comparaba solo con el hijo izquierdo; en el caso de prueba 4
  devolvía un orden incorrecto. Lo corregimos comparando con el menor de los
  dos hijos.
- Pasan los casos de prueba 1 a 5 del ejercicio 3.

## 2026-09-06 — Pedro
- Empecé el ejercicio 4. Le pregunté a ChatGPT qué significa el error
  "segmentation fault" y estrategias para encontrar el origen; con eso
  encontré un puntero sin inicializar en `ListImp.cpp` (queda citado acá
  y comentado en el código).
- El ejercicio 4 compila pero todavía no pasa el caso de prueba 2.
```

## Formato de entrega

- Archivo `bitacora.md` en la **raíz del zip** de la entrega, junto al código fuente y a la [declaración de autoría](/autoria) (`autoria.md`).
- Debe incluir una carátula (título con los datos de los estudiantes al inicio del archivo).
- Al final, una tabla que resuma los resultados obtenidos con los casos de prueba provistos por la cátedra:

| Problema | Resultado |
|----------|-----------|
| 1        | Completo (pasan todas las pruebas) |
| 2        | Parcial (pasan algunas pruebas) |
| 3        | En proceso (implementado, no pasa pruebas) |
| 4        | No implementado (o no compila) |

!> La falta de bitácora, o una bitácora que no refleje el proceso de trabajo (por ejemplo, escrita íntegramente el día de la entrega), implicará la pérdida de puntos.
