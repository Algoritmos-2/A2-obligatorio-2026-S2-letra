# Ejercicio 7 - Remontadas épicas

## Descripción

Un torneo tiene $N$ participantes, numerados de $1$ a $N$. Antes de empezar se publica el **ranking inicial** y al terminar se publica el **ranking final**. Los dos ordenan a los mismos participantes, del puesto 1 (el mejor) al puesto $N$.

Para la crónica del torneo, la organización quiere contar las **remontadas épicas**. Un participante $B$ hace una remontada épica sobre un participante $A$ si se cumplen las dos condiciones:

1. En el ranking final, $B$ queda **por encima** de $A$.
2. En el ranking inicial, el puesto de $B$ es **mayor que el doble** del puesto de $A$.

Es decir, $B$ arrancó muy por debajo de $A$ en el ranking inicial y aun así terminó por encima. Por ejemplo, quien arrancó quinto hace una remontada épica si termina por encima de quien arrancó primero o segundo ($5 > 2 \times 1$ y $5 > 2 \times 2$), pero no si termina por encima de quien arrancó tercero ($5 \leq 2 \times 3$).

Un participante puede remontar sobre varios, y cada remontada cuenta por separado.

Determine la **cantidad total de remontadas épicas** del torneo.

## Entrada

- La primera línea contiene un entero $N$ ($1 \leq N \leq 10^6$), la cantidad de participantes.
- La segunda línea contiene el ranking inicial: $N$ enteros separados por espacios. El primero es el participante que arrancó en el puesto 1, el segundo el que arrancó en el puesto 2, y así hasta el puesto $N$.
- La tercera línea contiene el ranking final, con el mismo formato.

Cada participante, de $1$ a $N$, aparece exactamente una vez en cada ranking. El número de un participante no tiene relación con sus puestos.

## Salida

Imprima un único entero: la cantidad total de remontadas épicas. Si no hay ninguna, imprima `0`.

## Restricciones

- Utilizar **dividir y conquistar** para resolver el problema.
- Resolver en orden temporal $O(N \log N)$ en el peor caso, siendo $N$ la cantidad de participantes.
- Orden espacial $O(N)$.
- La cantidad de remontadas épicas puede superar el rango de un entero de 32 bits.

## Ejemplo

### Input 1

```
3
1 2 3
3 2 1
```

### Output 1

```
1
```

### Explicación 1

El ranking inicial es `1 2 3`, así que cada participante arrancó en el puesto de su número. El ranking final es el inicial dado vuelta.

Para que $B$ remonte sobre $A$, $B$ tiene que quedar por encima de $A$ en el ranking final (condición 1) y haber arrancado por debajo de $A$ en el ranking inicial, porque si arrancó por encima su puesto inicial no puede ser mayor que el doble del de $A$ (condición 2). Alcanza entonces con revisar los pares que cumplen esas dos cosas. Acá son tres, uno por fila:

| $B$ | Puesto final de $B$ | Puesto inicial de $B$ | $A$ | Puesto final de $A$ | Puesto inicial de $A$ | ¿Remontada épica? |
| --- | ------------------- | --------------------- | --- | ------------------- | --------------------- | ----------------- |
| 3 | 1 | 3 | 2 | 2 | 2 | no, $3 < 2 \times 2$ |
| 3 | 1 | 3 | 1 | 3 | 1 | sí, $3 > 2 \times 1$ |
| 2 | 2 | 2 | 1 | 3 | 1 | no, $2 = 2 \times 1$ |

Solo el 3 sobre el 1 es una remontada épica. El 2 sobre el 1 queda en el doble justo y no cuenta: el puesto inicial de $B$ tiene que ser **mayor** que el doble.

---

### Input 2

```
5
4 2 5 1 3
3 5 4 1 2
```

### Output 2

```
3
```

### Explicación 2

Acá los números de los participantes no coinciden con sus puestos, y las condiciones comparan **puestos**. Por eso el primer paso es ver en qué puesto terminó y en qué puesto arrancó cada uno:

| Participante | Puesto final | Puesto inicial |
| ------------ | ------------ | -------------- |
| 3 | 1 | 5 |
| 5 | 2 | 3 |
| 4 | 3 | 1 |
| 1 | 4 | 4 |
| 2 | 5 | 2 |

Por ejemplo, el participante 3 terminó primero y había arrancado último, y el participante 4 terminó tercero y había arrancado primero.

Los pares en los que $B$ quedó por encima de $A$ en el ranking final y por debajo en el inicial son siete:

| $B$ | Puesto final de $B$ | Puesto inicial de $B$ | $A$ | Puesto final de $A$ | Puesto inicial de $A$ | ¿Remontada épica? |
| --- | ------------------- | --------------------- | --- | ------------------- | --------------------- | ----------------- |
| 3 | 1 | 5 | 5 | 2 | 3 | no, $5 < 2 \times 3$ |
| 3 | 1 | 5 | 4 | 3 | 1 | sí, $5 > 2 \times 1$ |
| 3 | 1 | 5 | 1 | 4 | 4 | no, $5 < 2 \times 4$ |
| 3 | 1 | 5 | 2 | 5 | 2 | sí, $5 > 2 \times 2$ |
| 5 | 2 | 3 | 4 | 3 | 1 | sí, $3 > 2 \times 1$ |
| 5 | 2 | 3 | 2 | 5 | 2 | no, $3 < 2 \times 2$ |
| 1 | 4 | 4 | 2 | 5 | 2 | no, $4 = 2 \times 2$ |

Tres de esos pares son remontadas épicas.

---

### Input 3

```
4
1 2 3 4
4 2 1 3
```

### Output 3

```
1
```

### Explicación 3

Acá el ranking inicial es `1 2 3 4`, así que cada participante arrancó en el puesto de su número. Los pares en los que $B$ quedó por encima de $A$ en el ranking final y por debajo en el inicial son:

| $B$ | Puesto final de $B$ | Puesto inicial de $B$ | $A$ | Puesto final de $A$ | Puesto inicial de $A$ | ¿Remontada épica? |
| --- | ------------------- | --------------------- | --- | ------------------- | --------------------- | ----------------- |
| 4 | 1 | 4 | 2 | 2 | 2 | no, $4 = 2 \times 2$ |
| 4 | 1 | 4 | 1 | 3 | 1 | sí, $4 > 2 \times 1$ |
| 4 | 1 | 4 | 3 | 4 | 3 | no, $4 < 2 \times 3$ |
| 2 | 2 | 2 | 1 | 3 | 1 | no, $2 = 2 \times 1$ |

El 4 sobre el 2 y el 2 sobre el 1 quedan en el doble justo, y no cuentan.

---

### Input 4

```
6
1 2 3 4 5 6
3 1 2 6 4 5
```

### Output 4

```
1
```

### Explicación 4

Los pares en los que $B$ quedó por encima de $A$ en el ranking final y por debajo en el inicial son:

| $B$ | Puesto final de $B$ | Puesto inicial de $B$ | $A$ | Puesto final de $A$ | Puesto inicial de $A$ | ¿Remontada épica? |
| --- | ------------------- | --------------------- | --- | ------------------- | --------------------- | ----------------- |
| 3 | 1 | 3 | 1 | 2 | 1 | sí, $3 > 2 \times 1$ |
| 3 | 1 | 3 | 2 | 3 | 2 | no, $3 < 2 \times 2$ |
| 6 | 4 | 6 | 4 | 5 | 4 | no, $6 < 2 \times 4$ |
| 6 | 4 | 6 | 5 | 6 | 5 | no, $6 < 2 \times 5$ |

El 3 y el 6 suben dos puestos cada uno, pero solo el 3 hace una remontada épica. Para remontar sobre quien arrancó primero alcanza con haber arrancado tercero. Para remontar sobre quien arrancó cuarto, en cambio, hay que haber arrancado noveno o más atrás.

---

### Input 5

```
6
1 2 3 4 5 6
6 5 4 3 2 1
```

### Output 5

```
6
```

### Explicación 5

El ranking final es el inicial dado vuelta: cada participante termina por encima de todos los que arrancaron por encima de él. Cada uno remonta sobre los que arrancaron en un puesto menor que la mitad del suyo:

| $B$ | Puesto final de $B$ | Puesto inicial de $B$ | Remonta sobre |
| --- | ------------------- | --------------------- | ------------- |
| 6 | 1 | 6 | 1 y 2 |
| 5 | 2 | 5 | 1 y 2 |
| 4 | 3 | 4 | 1 |
| 3 | 4 | 3 | 1 |
| 2 | 5 | 2 | nadie |
| 1 | 6 | 1 | nadie |

El total es $2 + 2 + 1 + 1 = 6$. El 6 sobre el 3, el 4 sobre el 2 y el 2 sobre el 1 quedan en el doble justo.
