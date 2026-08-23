# Ejercicio 4 - Orden de compilación

## Descripción

Una herramienta de compilación procesa los $V$ módulos de un proyecto, numerados de $1$ a $V$. Cada módulo tiene además una **prioridad**, y un módulo puede depender de otros: no se puede compilar hasta que todos los módulos de los que depende estén compilados.

La herramienta compila **de a un módulo por vez**. En cada paso elige el próximo entre los módulos que están **listos**. Un módulo está listo cuando todavía no se compiló y todos los módulos de los que depende ya se compilaron.

Cuando hay más de un módulo listo, la herramienta elige así:

1. El módulo de **menor prioridad**.
2. Si varios módulos listos comparten esa prioridad mínima, el de **menor número**.

Los números de módulo no se repiten, así que esas dos reglas siempre eligen un único módulo. El orden de compilación queda determinado por completo.

Si las dependencias forman un ciclo, quedan módulos que nunca llegan a estar listos y la compilación no se puede completar.

Determine el **orden en que la herramienta compila los módulos**.

## Entrada

- La primera línea contiene dos enteros $V$ y $A$ ($1 \leq V \leq 5 \times 10^5$, $0 \leq A \leq 10^6$), la cantidad de módulos y la cantidad de dependencias.
- La segunda línea contiene $V$ enteros $P_1, P_2, \ldots, P_V$ ($1 \leq P_i \leq 10^9$), donde $P_i$ es la prioridad del módulo $i$.
- Las siguientes $A$ líneas contienen dos enteros $u$ y $v$ ($1 \leq u, v \leq V$, $u \neq v$), que indican que el módulo $u$ debe compilarse **antes** que el módulo $v$.

Las prioridades pueden repetirse. Las dependencias no se repiten.

## Salida

Si se pueden compilar todos los módulos, imprima $V$ líneas. Cada línea contiene el número de un módulo, en el orden en que la herramienta lo compila.

Si las dependencias forman un ciclo, imprima una única línea con la palabra `imposible`, y nada más. En ese caso no se imprime ningún módulo, ni siquiera los que sí se podrían haber compilado.

## Restricciones

- Utilizar un **heap binario** para decidir cuál es el próximo módulo a compilar.
- Resolver en orden temporal $O((V + A) \log V)$ en el peor caso, siendo $V$ la cantidad de módulos y $A$ la cantidad de dependencias.
- Orden espacial $O(V + A)$.

## Ejemplo

### Input 1

```
5 4
5 2 1 4 3
1 3
2 3
3 4
3 5
```

### Output 1

```
2
1
3
5
4
```

### Explicación 1

Las prioridades son:

| Módulo | 1 | 2 | 3 | 4 | 5 |
| ------ | - | - | - | - | - |
| Prioridad | 5 | 2 | 1 | 4 | 3 |

El módulo 3 depende del 1 y del 2. Los módulos 4 y 5 dependen del 3.

En el diagrama, cada flecha va del módulo que se compila **antes** al que se compila **después**.

```cytoscape
{"directed": true, "layout": "breadthfirst", "nodes": ["1","2","3","4","5"], "edges": [["1","3"],["2","3"],["3","4"],["3","5"]]}
```

| Paso | Módulos listos | Se compila | Motivo |
| ---- | -------------- | ---------- | ------ |
| 1 | 1, 2 | **2** | El módulo 2 tiene prioridad 2 y el módulo 1 tiene prioridad 5. |
| 2 | 1 | **1** | Es el único listo. El módulo 3 todavía espera al 1. |
| 3 | 3 | **3** | Ya se compilaron el 1 y el 2, sus dos dependencias. |
| 4 | 4, 5 | **5** | El módulo 5 tiene prioridad 3 y el módulo 4 tiene prioridad 4. |
| 5 | 4 | **4** | Es el único que queda. |

Notar que el orden **no** es 1, 2, 3, 4, 5. Ese también respeta las dependencias, pero ignora las prioridades: en el paso 1 elegiría el módulo 1, que tiene prioridad 5, cuando el módulo 2 estaba listo con prioridad 2.

---

### Input 2

```
4 2
7 7 7 7
3 1
4 2
```

### Output 2

```
3
1
4
2
```

### Explicación 2

Los cuatro módulos tienen la misma prioridad, así que decide siempre el número de módulo.

Las dependencias forman dos cadenas independientes: el 3 antes que el 1, y el 4 antes que el 2.

```cytoscape
{"directed": true, "layout": "breadthfirst", "nodes": ["1","2","3","4"], "edges": [["3","1"],["4","2"]]}
```

| Paso | Módulos listos | Se compila | Motivo |
| ---- | -------------- | ---------- | ------ |
| 1 | 3, 4 | **3** | Empatan en prioridad. El módulo 3 tiene número menor. |
| 2 | 1, 4 | **1** | Empatan en prioridad. El módulo 1 tiene número menor. |
| 3 | 4 | **4** | Es el único listo. |
| 4 | 2 | **2** | Quedó listo recién cuando se compiló el 4. |

En el paso 2 el módulo 1 ya está listo, porque su única dependencia, el módulo 3, se compiló en el paso 1.

El resultado no es 1, 2, 3, 4. Aunque todos empaten en prioridad, el módulo 1 no puede ir primero: depende del módulo 3.

---

### Input 3

```
4 0
3 1 3 2
```

### Output 3

```
2
4
1
3
```

### Explicación 3

No hay ninguna dependencia, así que los cuatro módulos están listos desde el principio y se compilan por prioridad.

| Módulo | 1 | 2 | 3 | 4 |
| ------ | - | - | - | - |
| Prioridad | 3 | 1 | 3 | 2 |

El módulo 2 tiene la menor prioridad y va primero. Después el módulo 4. Los módulos 1 y 3 empatan con prioridad 3, así que decide el número: primero el 1 y después el 3.

---

### Input 4

```
3 3
1 2 3
1 2
2 3
3 1
```

### Output 4

```
imposible
```

### Explicación 4

El módulo 1 debe compilarse antes que el 2, el 2 antes que el 3, y el 3 antes que el 1. Las tres dependencias forman un ciclo.

```cytoscape
{"directed": true, "layout": "circle", "nodes": ["1","2","3"], "edges": [["1","2"],["2","3"],["3","1"]]}
```

Ningún módulo queda listo en el primer paso, porque los tres esperan a otro. La compilación no puede empezar.

---

### Input 5

```
5 4
1 2 3 4 5
1 2
3 4
4 5
5 3
```

### Output 5

```
imposible
```

### Explicación 5

Los módulos 3, 4 y 5 forman un ciclo entre ellos. Los módulos 1 y 2 no participan del ciclo y sí se podrían compilar: el 1 está listo desde el principio, y el 2 queda listo apenas se compila el 1.

```cytoscape
{"directed": true, "layout": "cose", "nodes": ["1","2","3","4","5"], "edges": [["1","2"],["3","4"],["4","5"],["5","3"]]}
```

Igual la respuesta es `imposible`, y **no se imprime el 1 ni el 2**. Alcanza con que un solo módulo no se pueda compilar para que la compilación completa sea imposible.
