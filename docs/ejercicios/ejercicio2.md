# Ejercicio 2 - El taller de imprenta

## Descripción

Un taller de imprenta compone palabras con tipos móviles: piezas de metal, una por letra. Para componer una palabra, el operario necesita un tipo por cada letra que la palabra usa. Las letras repetidas necesitan tipos repetidos.

El taller guarda los tipos agrupados en cajones. Dos palabras se componen con el mismo cajón cuando necesitan exactamente los mismos tipos, es decir, las mismas letras y cada una la misma cantidad de veces.

Por ejemplo, `roma`, `amor` y `mora` se componen con el mismo cajón, porque las tres necesitan un tipo de cada una de las letras `a`, `m`, `o` y `r`. En cambio `ala` y `lea` se componen con cajones distintos: `ala` necesita dos tipos de la letra `a`, y `lea` necesita uno solo más un tipo de la letra `e`.

El taller registra las palabras del catálogo de la temporada. Después recibe consultas. Para cada palabra consultada hay que informar **cuántas palabras registradas se componen con el mismo cajón que ella**.

Dos reglas que conviene tener presentes:

1. Dos palabras registradas iguales cuentan como **dos palabras distintas**.
2. Consultar una palabra **no la registra**. Una palabra consultada se cuenta a sí misma solo si además fue registrada.

Al terminar las consultas hay que informar cuántos cajones distintos hicieron falta para las palabras registradas, y cuántas palabras se componen con el cajón más grande.

## Entrada

- La primera línea contiene un entero $N$ ($1 \leq N \leq 10^5$), la cantidad de palabras registradas.
- Las siguientes $N$ líneas contienen una palabra registrada cada una.
- La línea siguiente contiene un entero $Q$ ($1 \leq Q \leq 10^5$), la cantidad de consultas.
- Las siguientes $Q$ líneas contienen una palabra consultada cada una.

Toda palabra, registrada o consultada, es una cadena de 1 a 20 letras latinas minúsculas, sin espacios.

## Salida

- Imprima $Q$ líneas, una por consulta y en el orden en que llegan. La línea $i$ contiene la cantidad de palabras registradas que se componen con el mismo cajón que la consulta $i$. Si ninguna palabra registrada usa ese cajón, imprima `0`.
- Imprima una última línea con dos enteros separados por un espacio: la cantidad de cajones distintos que hicieron falta para las $N$ palabras registradas, y la cantidad de palabras que se componen con el cajón más grande.

La salida tiene siempre $Q + 1$ líneas.

## Restricciones

- Utilizar una **tabla de hash abierta**, con resolución de colisiones por encadenamiento.
- Registrar una palabra y responder una consulta, las dos en orden temporal $O(L)$ promedio, siendo $L$ el largo de la palabra involucrada. El orden es exactamente ese: **no admite ningún término que dependa de la cantidad de palabras que comparten cajón**, que puede llegar a ser $N$.
- El factor de carga de la tabla debe quedar acotado. El largo esperado de cada cadena no debe depender de $N$.
- Obtener la última línea de la salida en $O(M + D)$ en el peor caso, siendo $M$ la cantidad de cubetas de la tabla y $D$ la cantidad de cajones distintos.
- Resolver el problema completo en orden temporal lineal, en promedio, respecto del tamaño total de la entrada.

El alfabeto tiene 26 letras y se considera constante a efectos del orden.

## Ejemplo

### Input 1

```
6
roma
amor
mora
sol
los
casa
3
ramo
sol
perro
```

### Output 1

```
3
2
0
3 3
```

### Explicación 1

Las seis palabras registradas se reparten en tres cajones:

| Cajón | Tipos que necesita | Palabras registradas |
| ----- | ------------------ | -------------------- |
| 1 | `a` `m` `o` `r` | `roma`, `amor`, `mora` |
| 2 | `l` `o` `s` | `sol`, `los` |
| 3 | `a` `a` `c` `s` | `casa` |

`ramo` necesita los tipos `a`, `m`, `o` y `r`, así que usa el cajón 1. Ese cajón tiene 3 palabras registradas.

`sol` usa el cajón 2, que tiene 2 palabras registradas. Notar que `sol` está registrada y también se consulta: se cuenta a sí misma.

`perro` necesita los tipos `e`, `o`, `p`, `r` y `r`. Ninguna palabra registrada usa ese cajón, así que la respuesta es `0`.

La última línea informa que hicieron falta 3 cajones, y que el cajón más grande compone 3 palabras.

---

### Input 2

```
5
ala
ala
lea
ala
eal
2
ala
ale
```

### Output 2

```
3
2
2 3
```

### Explicación 2

Este ejemplo muestra las dos reglas del enunciado.

Las cinco palabras registradas usan dos cajones:

| Cajón | Tipos que necesita | Palabras registradas |
| ----- | ------------------ | -------------------- |
| 1 | `a` `a` `l` | `ala`, `ala`, `ala` |
| 2 | `a` `e` `l` | `lea`, `eal` |

La palabra `ala` está registrada tres veces. **Las tres cuentan por separado**, así que su cajón compone 3 palabras.

Los dos cajones son distintos aunque compartan las letras `a` y `l`. El primero necesita **dos** tipos de la letra `a`, y el segundo necesita **uno solo** más un tipo de la letra `e`. La cantidad de cada letra importa, no solo qué letras aparecen.

La consulta `ale` usa el cajón 2, que compone 2 palabras. Notar que `ale` no está registrada, y consultarla tampoco la registra: la última línea sigue informando 5 palabras repartidas en 2 cajones, con 3 en el mayor.

---

### Input 3

```
1
z
3
z
zz
a
```

### Output 3

```
1
0
0
1 1
```

### Explicación 3

Hay una sola palabra registrada, así que hay un solo cajón y ese cajón compone una sola palabra.

`z` usa ese cajón y la respuesta es `1`.

`zz` necesita **dos** tipos de la letra `z`, así que usa un cajón distinto del de `z`. Dos palabras de largos distintos nunca se componen con el mismo cajón, porque necesitan cantidades distintas de tipos.

`a` necesita un tipo de la letra `a`, que ninguna palabra registrada usa.

---

### Input 4

```
4
abc
bca
cab
acb
2
bac
abd
```

### Output 4

```
4
0
1 4
```

### Explicación 4

Las cuatro palabras registradas son reordenamientos de las mismas tres letras, así que las cuatro se componen con el mismo cajón. Hizo falta un solo cajón, y ese cajón compone las 4 palabras.

`bac` usa ese mismo cajón, así que la respuesta es `4`.

`abd` necesita un tipo de la letra `d`, que ese cajón no tiene. Ninguna palabra registrada usa el cajón de `abd`, así que la respuesta es `0`.
