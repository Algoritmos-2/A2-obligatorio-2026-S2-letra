# Ejercicio 9 - El bailecito del arquero

## Descripción

La final de la copa del barrio terminó empatada y se define por penales.

En el arco de nuestro equipo está el **Pato Zarandeo**. Como arquero es una muralla: cuando se concentra, no le entra ni una. Pero también tiene otra carrera paralela: es tiktoker. Cada vez que se pone a bailar sobre la línea antes de un penal, el video explota en las redes y le llueven **likes**. El problema es que mientras baila se distrae, y esa pelota va adentro seguro.

Antes de comenzar la tanda, el DT le dice al Pato:

> "Pato, está todo bien con tus bailecitos. Pero escuchame una cosa: esto es una final, no podemos perder."

El Pato quiere viralizarse lo más posible sin que el equipo pierda la tanda.

La tanda sigue estas reglas:

1. Se patean $K$ rondas, siempre las $K$ completas. En cada ronda patea primero nuestro equipo (**A**) y después el rival (**B**).
2. El Pato vio todos los entrenamientos y ya sabe qué pateadores de A la meten: $a_i$ vale 1 si el pateador $i$ de A convierte y 0 si la erra.
3. Antes de cada tiro de B, decide:
   - **Bailar**: suma $\text{likes}_i$, pero se desconcentra y B convierte.
   - **No bailar**: se planta y ataja seguro.
4. El público se aburre: si el Pato baila en un tiro justo después de haber bailado en el anterior, ese baile da solo la mitad de likes ($\lfloor \text{likes}_i / 2 \rfloor$, redondeado hacia abajo). Esto vale para cada baile de una racha: el tercer baile seguido también da $\lfloor \text{likes}_i / 2 \rfloor$, no un cuarto.
5. Para que el DT no pase nervios, **A nunca puede quedar abajo en el marcador** en ningún momento de la tanda. Ir empatados sí está permitido, también al terminar las $K$ rondas.

Determine la **máxima cantidad de likes** que puede juntar el Pato respetando las reglas anteriores.

## Entrada

- La primera línea contiene un entero $K$ ($1 \leq K \leq 1000$), la cantidad de rondas.
- La segunda línea contiene $K$ enteros $a_1 \ldots a_K$, separados por espacios.
- La tercera línea contiene $K$ enteros $\text{likes}_1 \ldots \text{likes}_K$, separados por espacios.

Donde:

- $a_i \in \{0, 1\}$: 1 si el pateador $i$ de A convierte, 0 si la erra.
- $\text{likes}_i$: los likes que da bailar en el tiro $i$ de B, con $1 \leq \text{likes}_i \leq 10^4$.

## Salida

Imprima un único entero: la máxima cantidad de likes que puede juntar el Pato. Si el Pato no puede bailar en ningún tiro, imprima `0`.

## Restricciones

- Utilizar **programación dinámica con memoización** para resolver el problema.
- Resolver en orden temporal $O(K^2)$ en el peor caso, siendo $K$ la cantidad de rondas.
- Orden espacial $O(K^2)$.

## Ejemplo

### Input 1

```
3
1 1 1
10 20 30
```

### Output 1

```
40
```

### Explicación 1

A convierte los tres penales, así que el Pato podría bailar en todos los tiros. Pero los bailes seguidos dan la mitad: bailar en los tres da $10 + 10 + 15 = 35$.

Conviene saltear el tiro del medio y bailar en el primero y en el último, que así no van seguidos: $10 + 30 = 40$.

---

### Input 2

```
3
0 1 1
100 40 31
```

### Output 2

```
55
```

### Explicación 2

En el primer tiro no puede bailar, por más que valga 100 likes. A erró, el marcador está 0 a 0, y si B convierte A queda abajo.

Baila en el segundo tiro (40) y en el tercero, que va seguido y da $\lfloor 31 / 2 \rfloor = 15$. Total: 55. Bailar solo en el tercero daría 31, y solo en el segundo, 40.

---

### Input 3

```
3
0 0 0
5 5 5
```

### Output 3

```
0
```

### Explicación 3

A no convierte nunca, así que antes de cada tiro de B el marcador está empatado. Cualquier baile dejaría a A abajo: el Pato no puede bailar en ningún tiro.

---

### Input 4

```
5
1 0 1 1 0
30 50 20 40 10
```

### Output 4

```
95
```

### Explicación 4

Una tanda óptima:

| Ronda | A | ¿Baila? | Marcador | Likes |
| ----- | - | ------- | -------- | ----- |
| 1 | convierte | no | 1 a 0 | 0 |
| 2 | erra | sí | 1 a 1 | 50 |
| 3 | convierte | no | 2 a 1 | 0 |
| 4 | convierte | sí | 3 a 2 | 40 |
| 5 | erra | sí, seguido | 3 a 3 | $\lfloor 10 / 2 \rfloor = 5$ |

Total: 95.

---

### Input 5

```
5
1 1 1 0 0
1 2 3 100 100
```

### Output 5

```
152
```

### Explicación 5

Los dos últimos tiros valen mucho, pero en esas rondas A erra. Para bailar en los dos, A tiene que llegar a la ronda 4 con dos goles de ventaja. Con tres goles a favor, el Pato puede gastar uno solo antes.

Bailar en el tiro 3 da más likes que en el 2, pero deja al baile del tiro 4 seguido y le corta los likes a la mitad: $3 + 50 + 50 = 103$.

Conviene bailar en el 2 (2), saltear el 3 y bailar en el 4 (100) y en el 5, seguido ($\lfloor 100 / 2 \rfloor = 50$). Total: 152.
