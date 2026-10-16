# Ejercicio 8 - El asado de fin de curso

## Descripción

Se viene de fin de curso, don Tato es el encargado de las compras, pero tiene un problema: cuenta con una única heladera que tiene una capacidad máxima de $W$ gramos. En la carnicería hay $N$ productos disponibles pertenecientes a su vez a distintas categorías. 
Cada producto $i$ cuenta con:
- Un peso $w_i$.
- Un nivel de satisfacción $v_i$ de parte de los invitados.
- Una categoría $c_i$, donde $1$ representa **"Achuras"**, $2$ representa **"Carnes"** y $3$ representa **"Vegetales"**.

Tato quiere armar la mejor heladera posible para maximizar la satisfacción total de los invitados. Sin embargo, para que el menú no sea monótono, la invitados propusieron que **la heladera deba incluir al menos un producto de cada una de las 3 categorías**.

No es posible llevar fracciones de un producto ni comprar el mismo producto más de una vez (cada uno de los $N$ productos de la carnicería es único).

Determinar la **máxima satisfacción** que se puede lograr sin superar el peso máximo $W$ y asegurando tener al menos un producto de cada categoría, o indique si es imposible cumplir la condición.

## Entrada

- La primera línea contiene dos enteros $N$ ($3 \leq N$) y $W$ ($1 \leq W$), la cantidad de productos disponibles y la capacidad máxima de peso de la heladera, respectivamente.
- Las siguientes $N$ líneas contienen cada una tres enteros $w_i, v_i, c_i$:
  - $w_i$ ($1 \leq w_i \leq W$): peso del producto $i$.
  - $v_i$ ($1 \leq v_i \leq 10^4$): satisfacción del producto $i$.
  - $c_i$ ($c_i \in \{1, 2, 3\}$): categoría del producto $i$ (1: Achuras, 2: Carnes, 3: Vegetales).

Se garantiza que los productos de cada categoría están numerados según su aparición.

## Salida

Imprima una sola línea con la **máxima satisfacción** posible. Si no existe ninguna combinación válida que respete el límite de peso $W$ y contenga al menos un producto de cada categoría, imprima `imposible`.

## Restricciones

- Resolver utilizando **programación dinámica basada en el problema de la Mochila**.
- Orden temporal $O(N \cdot W)$ en el peor caso.
- Orden espacial $O(N \cdot W)$ en el peor caso.

## Ejemplo

### Input 1

```text
5 1000
300 400 1
500 800 2
200 300 3
400 700 2
100 150 1
```

### Output 1

```text
1500
```

### Explicación 1

```text
Los productos disponibles son:
Producto 1: Peso 300, Valor 400, Categoría 1 (Achuras)
Producto 2: Peso 500, Valor 800, Categoría 2 (Carnes)
Producto 3: Peso 200, Valor 300, Categoría 3 (Vegetales)
Producto 4: Peso 400, Valor 700, Categoría 2 (Carnes)
Producto 5: Peso 100, Valor 150, Categoría 1 (Achuras)

Para cumplir la regla hay que llevar al menos un producto de cada categoría. Una selección óptima es elegir los productos 1 (Categoría 1), 4 (Categoría 2) y 3 (Categoría 3):

• Peso total: $300 + 400 + 200 = 900 \leq 1000$.
• Categorías representadas: {1, 2, 3} (cumple la regla).
• Satisfacción total: $400 + 700 + 300 = 1500$.

Si intentáramos llevar los productos 2 y 4 (Carnes), obtendríamos $800 + 700 = 1500$ de satisfacción con peso 900, pero no tendríamos ni achuras ni vegetales.
```

### Input 2

```text
3 500
300 500 1
300 500 1
300 500 2
```

### Output 2

```text
imposible
```

### Explicación

```text
Hay productos de categorías 1 y 2, pero no hay ningún producto de la categoría 3 disponible. Por lo tanto, es imposible armar una heladerita que cumpla con la regla de incluir las tres categorías.
```

### Input 3

```text
4 600
200 100 1
300 200 2
200 150 3
100 50 3
```

### Output 3

```text
450
```

### Explicación 3

```text
Para cubrir las tres categorías se deben elegir al menos:

Producto 1 (Cat 1): Peso 200, Valor 100
Producto 2 (Cat 2): Peso 300, Valor 200
Producto 3 (Cat 3): Peso 200, Valor 150 (es mejor que el producto 4 de la misma categoría).

Sumar los tres daría un peso de $200 + 300 + 200 = 700$, que supera la capacidad $W = 600$.Sin embargo, si elegimos el producto 4 de la categoría 3 (Peso 100, Valor 50):
• Producto 1 + Producto 2 + Producto 4: Peso $200 + 300 + 100 = 600 \leq 600$.
• Satisfacción total: $100 + 200 + 50 = 350$.

Aunque la satisfacción sea menor que con el producto 3, es la única combinación válida dentro del límite de peso.
```