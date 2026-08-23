# Ejercicio 1 - Catálogo del museo

## Descripción

El Museo Nacional conserva dos colecciones que nunca compartieron un sistema de identificación. Las **monedas** se identifican por su número de catálogo, que es un entero. Las **pinturas** se identifican por su título, que es una cadena.

El área de conservación necesita un sistema que registre altas y responda consultas sobre las dos colecciones. Una pieza que ya está registrada no se vuelve a registrar. Ninguna pieza se da de baja. Las dos colecciones son independientes: una moneda nunca se compara con una pintura.

Cada colección se mantiene ordenada según su propio criterio:

1. Las **monedas** se ordenan por número de catálogo, de menor a mayor.
2. Las **pinturas** se ordenan por título, en orden alfabético.

El sistema procesa una secuencia de operaciones. Para cada consulta debe **imprimir el resultado en el orden de la colección consultada**.

## Entrada

- La primera línea contiene un entero $N$ ($1 \leq N \leq 2 \times 10^5$), la cantidad de operaciones.
- Las siguientes $N$ líneas contienen una operación cada una. Toda operación empieza por su nombre, seguido de la letra de la colección: `M` para monedas y `P` para pinturas.

Las operaciones de alta registran una pieza. Si la pieza ya estaba registrada, la operación no tiene efecto.

```
ALTA M <C>
ALTA P <T>
```

Las operaciones de búsqueda consultan si una pieza está registrada.

```
BUSCAR M <C>
BUSCAR P <T>
```

Las operaciones de rango consultan un intervalo. El primer valor es el extremo inferior y el segundo es el extremo superior.

```
RANGO M <desde> <hasta>
RANGO P <desde> <hasta>
```

El intervalo de `RANGO` es **cerrado en los dos extremos**. Se reporta toda pieza registrada cuya clave sea **mayor o igual** que `desde` y **menor o igual** que `hasta`. Una pieza cuya clave coincide exactamente con `desde` se reporta. Una pieza cuya clave coincide exactamente con `hasta` también se reporta.

Donde:

- $C$: número de catálogo de una moneda, con $1 \leq C \leq 10^{12}$.
- $T$: título de una pintura. Cadena de 1 a 20 letras latinas minúsculas, sin espacios.

Los valores `desde` y `hasta` tienen el mismo formato y las mismas cotas que la clave de la colección consultada. No hace falta que estén registrados.

Además:

- En toda operación `RANGO`, el extremo inferior es menor o igual que el extremo superior, según el orden de la colección consultada.
- La suma de las piezas reportadas por todas las operaciones `RANGO` no supera $10^6$.

## Salida

- `ALTA` no imprime nada, tampoco cuando la pieza ya estaba registrada.
- `BUSCAR` imprime `si` si la pieza está registrada, o `no` en caso contrario.
- `RANGO` imprime una línea por cada pieza registrada que pertenece al intervalo cerrado, en el orden de la colección. Los dos extremos se incluyen. Si ninguna pieza pertenece al intervalo, no imprime nada.

Cada pieza se imprime así:

- Una **moneda**: su número de catálogo.
- Una **pintura**: su título.

## Restricciones

- Implementar un **único TAD árbol AVL parametrizado por tipo** (`template` en C++, genérico en Java) e instanciarlo una vez por colección. No se acepta una implementación distinta por colección.
- `ALTA` y `BUSCAR` en orden temporal $O(\log K)$ en el peor caso, siendo $K$ la cantidad de piezas registradas en esa colección al momento de ejecutar la operación.
- `RANGO` en orden temporal $O(\log K + R)$ en el peor caso, siendo $R$ la cantidad de piezas que esa consulta reporta.

## Ejemplo

### Input 1

```
12
ALTA M 500
ALTA M 120
ALTA M 900
ALTA M 500
ALTA P girasoles
ALTA P guernica
ALTA P gioconda
BUSCAR M 120
BUSCAR M 700
RANGO M 100 600
RANGO M 1000 2000
RANGO P a z
```

### Output 1

```
si
no
120
500
gioconda
girasoles
guernica
```

### Explicación 1

El cuarto `ALTA M 500` no tiene efecto, porque el catálogo 500 ya estaba registrado. La colección de monedas queda con 120, 500 y 900.

`BUSCAR M 120` encuentra la moneda. `BUSCAR M 700` no la encuentra, porque nunca se registró.

`RANGO M 100 600` reporta 120 y 500. La moneda 900 supera el extremo superior.

`RANGO M 1000 2000` no reporta nada. Ninguna moneda registrada llega al extremo inferior.

`RANGO P a z` reporta las tres pinturas, en orden alfabético. Notar que se imprimen ordenadas, y no en el orden en que se dieron de alta.

---

### Input 2

```
10
ALTA M 10
ALTA M 20
ALTA M 30
ALTA M 40
RANGO M 20 30
RANGO M 10 40
RANGO M 21 29
RANGO M 20 20
BUSCAR M 20
RANGO M 41 50
```

### Output 2

```
20
30
10
20
30
40
20
si
```

### Explicación 2

Este ejemplo muestra que los dos extremos del intervalo se incluyen.

| Consulta | Reporta | Motivo |
| -------- | ------- | ------ |
| `RANGO M 20 30` | 20 y 30 | Las dos monedas coinciden con un extremo, y las dos entran. |
| `RANGO M 10 40` | 10, 20, 30 y 40 | El intervalo abarca la colección entera. |
| `RANGO M 21 29` | nada | Entre 21 y 29 no hay ninguna moneda registrada. |
| `RANGO M 20 20` | 20 | Los dos extremos coinciden, así que el intervalo contiene una sola clave. |
| `RANGO M 41 50` | nada | Toda la colección queda por debajo del extremo inferior. |

Comparar la primera consulta con la tercera deja clara la diferencia. `RANGO M 20 30` reporta las monedas 20 y 30 porque los extremos entran. `RANGO M 21 29` no reporta ninguna, porque al mover los extremos un lugar hacia adentro las dos quedan afuera.

---

### Input 3

```
9
ALTA P guernica
ALTA P girasoles
ALTA P gioconda
ALTA P nenufares
ALTA P grito
RANGO P gi gz
RANGO P a f
BUSCAR P gioconda
RANGO P grito nenufares
```

### Output 3

```
gioconda
girasoles
grito
guernica
si
grito
guernica
nenufares
```

### Explicación 3

Las cinco pinturas, en orden alfabético, quedan así:

```
gioconda
girasoles
grito
guernica
nenufares
```

`RANGO P gi gz` reporta las cuatro pinturas que empiezan con `g`. El extremo inferior `gi` es anterior a `gioconda`, porque es un prefijo más corto. El extremo superior `gz` es posterior a `guernica`, porque comparando letra a letra la `z` es posterior a la `u`. La pintura `nenufares` queda afuera, porque la `n` es posterior a la `g`.

`RANGO P a f` no reporta nada. Todas las pinturas empiezan con `g` o con `n`, y las dos letras son posteriores a la `f`.

`RANGO P grito nenufares` reporta tres pinturas. Los dos extremos están registrados y los dos se incluyen: `grito` abre el intervalo y `nenufares` lo cierra.

---

### Input 4

```
5
BUSCAR M 1
RANGO P a z
ALTA P unica
RANGO P unica unica
BUSCAR P otra
```

### Output 4

```
no
unica
no
```

### Explicación 4

Las dos primeras operaciones consultan colecciones vacías. `BUSCAR M 1` imprime `no`. `RANGO P a z` no imprime nada, porque no hay ninguna pintura registrada.

`RANGO P unica unica` consulta un intervalo cuyos dos extremos coinciden. La pintura `unica` está registrada y coincide con los dos extremos, así que se reporta.

`BUSCAR P otra` imprime `no`. La colección de pinturas tiene una sola pieza, y no es esa.
