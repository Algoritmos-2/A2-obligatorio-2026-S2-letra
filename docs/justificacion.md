# Justificación de órdenes

Para cada ejercicio cuya letra plantea **restricciones de órdenes** (tiempo o espacio), se debe entregar una justificación breve de por qué la solución cumple dichas restricciones, indicando qué estructuras de datos o algoritmos se utilizaron y cómo contribuyen a cumplir los requisitos de eficiencia.

La justificación se entrega en un archivo `justificacion.md` en la **raíz del zip**, junto al código fuente, la [bitácora](/documentacion) y la [declaración de autoría](/autoria), con un apartado por ejercicio. Los ejercicios sin restricciones de órdenes no requieren justificación (puede indicarse "sin restricciones de órdenes"). Los templates provistos por la cátedra ya incluyen este archivo con la estructura esperada.

## Ejemplo

```markdown
# Justificación de órdenes — Obligatorio 1

## Ejercicio 2
Sin restricciones de órdenes.

## Ejercicio 3
La letra exige inserción y extracción del mínimo en O(log n). Usamos un
min-heap sobre arreglo: flotar y hundir recorren a lo sumo la altura del
árbol, que es O(log n) por ser completo.

## Ejercicio 5
La letra exige búsqueda en O(1) promedio. Usamos una tabla de hash abierta
con n cubetas y función de hash módulo; con un factor de carga acotado,
el largo esperado de cada lista es constante.
```

!> Una justificación ausente o incorrecta en un ejercicio con restricciones puede implicar la pérdida de puntos de dicho ejercicio, aun cuando pase todas las pruebas.
