# Ejercicio 7 - Remontadas épicas

## Descripción

Un torneo tiene $N$ participantes, numerados de $1$ a $N$. Antes de empezar se publica el **ranking inicial** y al terminar se publica el **ranking final**. Los dos ordenan a los mismos participantes, del puesto 1 (el mejor) al puesto $N$.

Para la crónica del torneo, la organización quiere contar las **remontadas épicas**. Un participante $B$ hace una remontada épica sobre un participante $A$ si se cumplen las dos condiciones:

1. En el ranking final, $B$ queda **por encima** de $A$.
2. En el ranking inicial, el puesto de $B$ es **mayor que el doble** del puesto de $A$.

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
5
4 2 5 1 3
3 5 4 1 2
```

### Output 1

```
3
```

### Explicación 1

El ranking final, con el puesto inicial de cada participante:

| Puesto final | Participante | Puesto inicial |
| ------------ | ------------ | -------------- |
| 1 | 3 | 5 |
| 2 | 5 | 3 |
| 3 | 4 | 1 |
| 4 | 1 | 4 |
| 5 | 2 | 2 |

Hay siete pares en los que un participante terminó por encima de otro que había arrancado delante:

| Termina arriba | Termina abajo | Puestos iniciales | ¿Remontada épica? |
| -------------- | ------------- | ----------------- | ----------------- |
| 3 | 5 | 5 y 3 | no, $5 \leq 2 \times 3$ |
| 3 | 4 | 5 y 1 | sí, $5 > 2 \times 1$ |
| 3 | 1 | 5 y 4 | no, $5 \leq 2 \times 4$ |
| 3 | 2 | 5 y 2 | sí, $5 > 2 \times 2$ |
| 5 | 4 | 3 y 1 | sí, $3 > 2 \times 1$ |
| 5 | 2 | 3 y 2 | no, $3 \leq 2 \times 2$ |
| 1 | 2 | 4 y 2 | no, $4 \leq 2 \times 2$ |

Tres de ellos son remontadas épicas.

Notar que el participante 4 arrancó primero y el 3 arrancó último: las condiciones comparan puestos, no números de participante.

---

### Input 2

```
4
1 2 3 4
4 2 1 3
```

### Output 2

```
1
```

### Explicación 2

Acá el ranking inicial es `1 2 3 4`, así que cada participante arrancó en el puesto de su número.

| Termina arriba | Termina abajo | Puestos iniciales | ¿Remontada épica? |
| -------------- | ------------- | ----------------- | ----------------- |
| 4 | 2 | 4 y 2 | no, $4 = 2 \times 2$ |
| 4 | 1 | 4 y 1 | sí, $4 > 2 \times 1$ |
| 4 | 3 | 4 y 3 | no, $4 < 2 \times 3$ |
| 2 | 1 | 2 y 1 | no, $2 = 2 \times 1$ |

El 4 sobre el 2 y el 2 sobre el 1 quedan en el doble justo, y no cuentan.

---

### Input 3

```
6
1 2 3 4 5 6
3 1 2 6 4 5
```

### Output 3

```
1
```

### Explicación 3

| Termina arriba | Termina abajo | Puestos iniciales | ¿Remontada épica? |
| -------------- | ------------- | ----------------- | ----------------- |
| 3 | 1 | 3 y 1 | sí, $3 > 2 \times 1$ |
| 3 | 2 | 3 y 2 | no, $3 < 2 \times 2$ |
| 6 | 4 | 6 y 4 | no, $6 < 2 \times 4$ |
| 6 | 5 | 6 y 5 | no, $6 < 2 \times 5$ |

El 3 y el 6 suben dos puestos cada uno, pero solo el 3 hace una remontada épica. Para remontar sobre quien arrancó primero alcanza con haber arrancado tercero. Para remontar sobre quien arrancó cuarto, en cambio, hay que haber arrancado noveno o más atrás.

---

### Input 4

```
6
1 2 3 4 5 6
6 5 4 3 2 1
```

### Output 4

```
6
```

### Explicación 4

El ranking final es el inicial dado vuelta, así que los 15 pares se cruzan.

| Participante | Puesto inicial | Remonta sobre |
| ------------ | -------------- | ------------- |
| 6 | 6 | 1 y 2 |
| 5 | 5 | 1 y 2 |
| 4 | 4 | 1 |
| 3 | 3 | 1 |
| 2 | 2 | nadie |
| 1 | 1 | nadie |

El total es $2 + 2 + 1 + 1 = 6$. El 6 sobre el 3, el 4 sobre el 2 y el 2 sobre el 1 quedan en el doble justo.
