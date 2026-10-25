# Ejercicio 7 - Remontadas épicas

## Descripción

Una carrera tiene $N$ corredores. Los dorsales van del $1$ al $N$ y se reparten según la clasificación previa: el mejor clasificado lleva el dorsal $1$, el segundo el dorsal $2$, y así hasta el dorsal $N$. Cuanto más bajo es el dorsal, más se espera que ese corredor llegue adelante.

Para la crónica de la carrera, la organización quiere contar las **remontadas épicas**. Un corredor hace una remontada épica sobre otro si **llega antes** que él aunque su dorsal es **mayor que el doble** del dorsal del otro.

Por ejemplo, el dorsal $5$ hace una remontada épica si llega antes que el $1$ o que el $2$ ($5 > 2 \times 1$ y $5 > 2 \times 2$), pero no si llega antes que el $3$ ($5 < 2 \times 3$).

Un corredor puede remontar sobre varios, y cada remontada cuenta por separado.

Determine la **cantidad total de remontadas épicas** de la carrera.

## Entrada

- La primera línea contiene un entero $N$ ($1 \leq N \leq 10^6$), la cantidad de corredores.
- La segunda línea contiene los $N$ dorsales en el orden de llegada, separados por espacios: primero el dorsal de quien llegó primero, después el de quien llegó segundo, y así hasta el último.

Cada dorsal, de $1$ a $N$, aparece exactamente una vez.

## Salida

Imprima un único entero: la cantidad total de remontadas épicas. Si no hay ninguna, imprima `0`.

## Restricciones

- Utilizar **dividir y conquistar** para resolver el problema.
- Resolver en orden temporal $O(N \log N)$ en el peor caso, siendo $N$ la cantidad de corredores.
- Orden espacial $O(N)$.
- La cantidad de remontadas épicas puede superar el rango de un entero de 32 bits.

## Ejemplo

### Input 1

```
3
3 2 1
```

### Output 1

```
1
```

### Explicación 1

Solo puede haber remontada épica cuando el que llega antes tiene un dorsal mayor que el que llega después. Acá hay tres pares así, uno por fila:

| Llega antes | Llega después | ¿Remontada épica? |
| ----------- | ------------- | ----------------- |
| 3 | 2 | no, $3 < 2 \times 2$ |
| 3 | 1 | sí, $3 > 2 \times 1$ |
| 2 | 1 | no, $2 = 2 \times 1$ |

Solo el 3 sobre el 1 es una remontada épica. El 2 sobre el 1 no cuenta: el dorsal de quien remonta tiene que ser **mayor** que el doble, y 2 es justo el doble de 1.

---

### Input 2

```
5
5 3 1 4 2
```

### Output 2

```
3
```

### Explicación 2

Los pares en los que el que llega antes tiene un dorsal mayor son siete:

| Llega antes | Llega después | ¿Remontada épica? |
| ----------- | ------------- | ----------------- |
| 5 | 3 | no, $5 < 2 \times 3$ |
| 5 | 1 | sí, $5 > 2 \times 1$ |
| 5 | 4 | no, $5 < 2 \times 4$ |
| 5 | 2 | sí, $5 > 2 \times 2$ |
| 3 | 1 | sí, $3 > 2 \times 1$ |
| 3 | 2 | no, $3 < 2 \times 2$ |
| 4 | 2 | no, $4 = 2 \times 2$ |

Tres de esos pares son remontadas épicas.

---

### Input 3

```
4
4 2 1 3
```

### Output 3

```
1
```

### Explicación 3

Los pares en los que el que llega antes tiene un dorsal mayor son cuatro:

| Llega antes | Llega después | ¿Remontada épica? |
| ----------- | ------------- | ----------------- |
| 4 | 2 | no, $4 = 2 \times 2$ |
| 4 | 1 | sí, $4 > 2 \times 1$ |
| 4 | 3 | no, $4 < 2 \times 3$ |
| 2 | 1 | no, $2 = 2 \times 1$ |

El 4 sobre el 2 y el 2 sobre el 1 quedan en el doble justo, y no cuentan.

---

### Input 4

```
6
3 1 2 6 4 5
```

### Output 4

```
1
```

### Explicación 4

Los pares en los que el que llega antes tiene un dorsal mayor son cuatro:

| Llega antes | Llega después | ¿Remontada épica? |
| ----------- | ------------- | ----------------- |
| 3 | 1 | sí, $3 > 2 \times 1$ |
| 3 | 2 | no, $3 < 2 \times 2$ |
| 6 | 4 | no, $6 < 2 \times 4$ |
| 6 | 5 | no, $6 < 2 \times 5$ |

El 3 y el 6 llegan antes que dos dorsales menores cada uno, pero solo el 3 hace una remontada épica: para remontar sobre el dorsal 4 hace falta un dorsal de 9 o más.

---

### Input 5

```
6
6 5 4 3 2 1
```

### Output 5

```
6
```

### Explicación 5

Los corredores llegan en orden inverso al de los dorsales, así que cada uno llega antes que todos los de dorsal menor. En vez de listar los 15 pares, la tabla resume sobre quiénes remonta cada corredor:

| Dorsal | Remonta sobre |
| ------ | ------------- |
| 6 | 1 y 2 |
| 5 | 1 y 2 |
| 4 | 1 |
| 3 | 1 |
| 2 | nadie |
| 1 | nadie |

Total: $2 + 2 + 1 + 1 = 6$. El 6 sobre el 3, el 4 sobre el 2 y el 2 sobre el 1 quedan en el doble justo.
