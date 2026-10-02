# Ejercicio 10 - Criptoaritmética

## Descripción

Un diario publica todos los domingos acertijos de **criptoaritmética**: sumas en las que cada dígito fue reemplazado por una letra. Por ejemplo:

```
   SEND
+  MORE
-------
  MONEY
```

Resolver el acertijo es descubrir qué dígito esconde cada letra. Las reglas son:

1. Cada letra representa un dígito del $0$ al $9$, y es el mismo dígito en todas las palabras donde aparece.
2. Letras distintas representan dígitos distintos.
3. Una palabra de **más de una letra** no puede empezar con $0$. Una palabra de **una sola letra** sí puede valer $0$.
4. Al reemplazar cada letra por su dígito, la suma tiene que dar bien.

Cada letra vale lo mismo en todo el acertijo, pero cada acertijo es independiente de los demás: la `A` de un acertijo no tiene nada que ver con la `A` de otro.

Antes de publicar los acertijos, el diario necesita saber cuáles tienen solución y, para esos, cuál imprimir en la página de respuestas. Un acertijo puede tener más de una solución. En ese caso se imprime:

1. La de **menor resultado**.
2. Si varias comparten ese resultado, la de **menor primer sumando**.
3. Si también empatan, la de **menor segundo sumando**, y así con los sumandos siguientes.

Dos soluciones distintas le dan un dígito distinto a alguna letra, y esa letra aparece en alguna palabra, así que no pueden coincidir en todas las palabras. Estas reglas siempre eligen una única solución.

Para cada acertijo, determine **la solución que se imprime**, o si el acertijo no tiene solución.

## Entrada

- La primera línea contiene un entero $T$ ($1 \leq T \leq 100$), la cantidad de acertijos.
- Después vienen los $T$ acertijos, uno detrás del otro. Cada acertijo ocupa estas líneas:
  - Una línea con un entero $K$ ($2 \leq K \leq 5$), la cantidad de sumandos.
  - $K$ líneas con un sumando cada una, en el orden en que aparecen en la suma.
  - Una línea con el resultado.

Cada palabra tiene entre $1$ y $10$ letras mayúsculas, de la `A` a la `Z`, sin tildes ni `Ñ`. En cada acertijo aparecen **a lo sumo $10$ letras distintas**.

Las palabras pueden repetirse, y un sumando puede ser más largo que el resultado.

## Salida

Imprima $T$ líneas, una por acertijo, en el orden de la entrada.

Si el acertijo tiene solución, la línea es la suma resuelta: los sumandos en el orden de la entrada separados por ` + `, después ` = ` y el resultado, cada palabra reemplazada por su número. Por ejemplo:

```
9567 + 1085 = 10652
```

Si el acertijo no tiene solución, la línea es `imposible`.

## Restricciones

- Utilizar **backtracking**, asignando un dígito a una letra por vez.
- Con $10$ cifras, un número puede superar el rango de un entero de 32 bits.

## Ejemplo

### Input 1

```
1
2
SEND
MORE
MONEY
```

### Output 1

```
9567 + 1085 = 10652
```

### Explicación 1

Hay un solo acertijo, y esta es su única solución. Cada letra vale:

| Letra | D | E | M | N | O | R | S | Y |
| ----- | - | - | - | - | - | - | - | - |
| Dígito | 7 | 5 | 1 | 6 | 0 | 8 | 9 | 2 |

Para controlarla alcanza con hacer la suma a mano, de derecha a izquierda:

| Columna | Letras | Cuenta | Cifra del resultado | Acarreo |
| ------- | ------ | ------ | ------------------- | ------- |
| Unidades | D + E = Y | 7 + 5 = 12 | 2, que es Y | 1 |
| Decenas | N + R = E | 1 + 6 + 8 = 15 | 5, que es E | 1 |
| Centenas | E + O = N | 1 + 5 + 0 = 6 | 6, que es N | 0 |
| Unidades de mil | S + M = O | 0 + 9 + 1 = 10 | 0, que es O | 1 |
| Decenas de mil | (ninguna) = M | 1 | 1, que es M | 0 |

La última columna muestra por qué $M$ tiene que valer $1$. Dos números de cuatro cifras suman menos de $20000$, así que la quinta cifra del resultado solo puede ser el acarreo, que es $1$.

---

### Input 2

```
1
2
AB
BA
CC
```

### Output 2

```
12 + 21 = 33
```

### Explicación 2

Este acertijo tiene 32 soluciones. Algunas son:

| A | B | C | Suma |
| - | - | - | ---- |
| 1 | 2 | 3 | 12 + 21 = 33 |
| 2 | 1 | 3 | 21 + 12 = 33 |
| 1 | 3 | 4 | 13 + 31 = 44 |
| 4 | 5 | 9 | 45 + 54 = 99 |

$AB + BA$ vale $11 \cdot (A + B)$ y $CC$ vale $11 \cdot C$, así que la suma da bien cuando $C = A + B$. Ni $A$ ni $B$ pueden valer $0$ porque son la primera letra de una palabra de dos letras, y además tienen que ser distintos. Entonces el resultado más chico es $33$, con $A + B = 1 + 2$.

Hay dos soluciones con resultado $33$: `12 + 21 = 33` y `21 + 12 = 33`. Desempata el primer sumando, y $12 < 21$.

---

### Input 3

```
3
2
A
B
AA
3
A
A
A
BA
2
A
B
A
```

### Output 3

```
imposible
5 + 5 + 5 = 15
1 + 0 = 1
```

### Explicación 3

Hay tres acertijos. Todos usan la letra `A`, pero en cada uno puede valer algo distinto.

**Primer acertijo:** `A + B = AA`. $AA$ vale $11 \cdot A$, así que la suma pide $A + B = 11 \cdot A$, es decir, $B = 10 \cdot A$. $A$ no puede valer $0$ porque es la primera letra de $AA$. Entonces $B$ tendría que valer al menos $10$, y eso no es un dígito. La respuesta es `imposible`.

**Segundo acertijo:** `A + A + A = BA`. Hay tres sumandos, y son la misma palabra. En las unidades, $A + A + A$ tiene que terminar en $A$. Eso solo pasa con $A = 0$ o con $A = 5$:

- Con $A = 0$ la suma da $0$, así que $BA$ valdría $0$ y $B$ también tendría que ser $0$. No puede: $B$ es la primera letra de $BA$, y además $A$ y $B$ son letras distintas.
- Con $A = 5$ la suma da $15$, así que $B = 1$.

La única solución es `5 + 5 + 5 = 15`.

**Tercer acertijo:** `A + B = A`. La suma da bien cuando $B = 0$, y $B$ puede valer $0$ porque es una palabra de una sola letra. $A$ puede valer cualquier dígito del $1$ al $9$. No puede ser $0$, porque ese dígito ya lo tiene $B$. Hay nueve soluciones, y la de menor resultado es `1 + 0 = 1`.
