# Ejercicio 8 - El asado de fin de curso

## Descripción

Se viene el asado de fin de curso y don Tato es el encargado de las compras. Todo lo que compre tiene que entrar en su heladera, que soporta un peso máximo $W$.

En la carnicería hay $N$ productos. Cada producto tiene un **peso**, una **satisfacción** (cuánto les gusta a los invitados) y una **categoría**:

| Número | Categoría |
| ------ | --------- |
| 0 | Achuras |
| 1 | Cortes principales |
| 2 | Bebidas |
| 3 | Vegetales |

Cada producto se puede comprar a lo sumo una vez. Para que la compra quede equilibrada, los invitados ponen un **máximo de productos por categoría**: a lo sumo $L_0$ achuras, $L_1$ cortes principales, $L_2$ bebidas y $L_3$ vegetales.

Una compra es válida si su peso total no supera $W$ y respeta los cuatro máximos. No comprar nada también es una compra válida.

Determine la **máxima satisfacción total** que puede lograr don Tato con una compra válida.

## Entrada

- La primera línea contiene dos enteros $N$ y $W$ ($1 \leq N \leq 100$, $1 \leq W \leq 1000$): la cantidad de productos y el peso máximo que soporta la heladera.
- La segunda línea contiene cuatro enteros $L_0$, $L_1$, $L_2$ y $L_3$ ($0 \leq L_c \leq 3$): el máximo de productos de cada categoría.
- Las siguientes $N$ líneas describen un producto cada una, con tres enteros separados por espacios:
  - $p_i$ ($1 \leq p_i \leq 10^4$): el peso del producto.
  - $s_i$ ($1 \leq s_i \leq 10^4$): la satisfacción del producto.
  - $c_i$ ($0 \leq c_i \leq 3$): la categoría del producto.

Los productos no vienen ordenados por categoría.

## Salida

Imprima un único entero: la máxima satisfacción total de una compra válida. Si ningún producto puede comprarse, imprima `0`.

## Restricciones

- Utilizar **programación dinámica con tabulación** para resolver el problema.
- Resolver en orden temporal $O(N \cdot W \cdot L_0 \cdot L_1 \cdot L_2 \cdot L_3)$ en el peor caso, siendo $N$ la cantidad de productos y $W$ el peso máximo.
- Orden espacial $O(N \cdot W \cdot L_0 \cdot L_1 \cdot L_2 \cdot L_3)$.

## Ejemplo

### Input 1

```
5 10
1 1 1 1
3 5 0
6 10 1
4 7 1
2 4 2
3 3 3
```

### Output 1

```
16
```

### Explicación 1

Los productos son:

| Producto | Peso | Satisfacción | Categoría |
| -------- | ---- | ------------ | --------- |
| 1 | 3 | 5 | Achuras |
| 2 | 6 | 10 | Cortes principales |
| 3 | 4 | 7 | Cortes principales |
| 4 | 2 | 4 | Bebidas |
| 5 | 3 | 3 | Vegetales |

Se puede comprar a lo sumo un producto de cada categoría, y el peso total no puede pasar de $10$. Algunas compras válidas:

- Productos 1, 3 y 4: peso $3 + 4 + 2 = 9$, satisfacción $5 + 7 + 4 = 16$.
- Productos 1, 3 y 5: peso $3 + 4 + 3 = 10$, satisfacción $5 + 7 + 3 = 15$.
- Productos 1 y 2: peso $3 + 6 = 9$, satisfacción $5 + 10 = 15$.

La mejor es la primera, con **16**. El corte más valioso, el producto 2, no está en la mejor compra: pesa tanto que deja poco lugar para el resto.

---

### Input 2

```
5 8
2 2 1 2
3 9 2
3 8 2
2 7 2
4 4 0
1 1 1
```

### Output 2

```
14
```

### Explicación 2

Las tres bebidas pesan $3 + 3 + 2 = 8$ y suman $9 + 8 + 7 = 24$ de satisfacción, pero se puede comprar **a lo sumo una bebida**.

La mejor compra lleva la bebida de satisfacción $9$ (peso $3$), la achura (peso $4$) y el corte (peso $1$): peso $3 + 4 + 1 = 8$, satisfacción $9 + 4 + 1 = 14$.

---

### Input 3

```
4 5
1 1 1 0
1 10 3
2 3 0
2 4 1
3 5 2
```

### Output 3

```
9
```

### Explicación 3

El máximo de vegetales es $0$, así que el vegetal no se puede comprar, aunque sea el producto más liviano y el más valioso.

Con los otros tres productos, la mejor compra es el corte y la bebida: peso $2 + 3 = 5$, satisfacción $4 + 5 = 9$.

---

### Input 4

```
2 3
1 1 1 1
5 10 1
4 6 2
```

### Output 4

```
0
```

### Explicación 4

Los dos productos pesan más que lo que soporta la heladera. La única compra válida es no comprar nada, con satisfacción $0$.
