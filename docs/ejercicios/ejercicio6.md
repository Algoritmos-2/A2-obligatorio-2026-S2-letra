# Ejercicio 6 - El cartel del visitante

## Descripción

Un vecino espera la visita de un viejo amigo y quiere que encuentre su casa sin problemas. Para eso decide renovar el cartel con la dirección.

Tiene una colección de $N$ placas decorativas, cada una con un número grabado, y arma el cartel poniendo placas en fila.

La empresa que instala los carteles tiene fama de distraída y a veces los coloca al revés. Para que eso no importe, la secuencia de números del cartel tiene que leerse igual de izquierda a derecha que de derecha a izquierda.

Entre los carteles que cumplen esa condición, el vecino quiere el mayor según estas reglas, en orden de prioridad:

1. El cartel debe usar la **mayor cantidad de placas** posible.
2. Si hay varios carteles con esa cantidad de placas, el cartel debe ser **lexicográficamente el mayor**: al comparar dos carteles placa por placa desde el inicio, gana el que tiene el número más grande en la primera posición donde difieren.

No hace falta usar todas las placas.

Determine la **secuencia de números** que conforma el cartel óptimo.

## Entrada

- La primera línea contiene un entero $N$ ($1 \leq N \leq 2 \times 10^5$), la cantidad de placas de la colección.
- La segunda línea contiene $N$ enteros separados por espacios $A_1, A_2, \dots, A_N$ ($0 \leq A_i \leq 1000$), los números grabados en cada placa.

## Salida

Imprima la secuencia de números que conforma el cartel óptimo, con un único espacio entre número y número.

## Restricciones

- Utilizar una **estrategia greedy** para resolver el problema.
- Resolver en orden temporal $O(N)$ en el peor caso, siendo $N$ la cantidad de placas.
- Orden espacial $O(N)$.

## Ejemplo

### Input 1

```
8
15 8 15 10 10 15 8 20
```

### Output 1

```
15 10 8 20 8 10 15
```

### Explicación 1

La colección tiene una placa con `20`, tres con `15`, dos con `10` y dos con `8`.

Por la regla 1 se usan todos los pares: uno de `15`, uno de `10` y uno de `8`. Por la regla 2, los números más grandes van hacia los extremos, así que la primera mitad del cartel es `15 10 8`.

Sobran un `15` y el `20`, y en el centro entra una sola placa suelta. Va el `20`, que es mayor que el `15`.

---

### Input 2

```
5
1 2 1 3 2
```

### Output 2

```
2 1 3 1 2
```

### Explicación 2

Hay un par de `2` y un par de `1`, y sobra un `3`, que va en el centro. El `2` va en los extremos porque es mayor que el `1`.

---

### Input 3

```
7
0 9 0 0 9 0 5
```

### Output 3

```
9 0 0 5 0 0 9
```

### Explicación 3

Hay un par de `9` y dos pares de `0`, y sobra un `5`, que va en el centro.

El par de `9` va en los extremos aunque haya más placas con `0`. Lo que decide el orden es el número de cada placa, no cuántas placas hay con ese número.

---

### Input 4

```
10
0 0 0 0 0 0 0 0 0 0
```

### Output 4

```
0 0 0 0 0 0 0 0 0 0
```

### Explicación 4

Las diez placas forman cinco pares y no sobra ninguna, así que el cartel no tiene placa central.
