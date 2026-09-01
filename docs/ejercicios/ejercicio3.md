# Ejercicio 3 - Consolidación de respaldos

## Descripción

Un servidor guarda $N$ archivos de respaldo. Para liberar espacio, el operario los consolida hasta que queda un único archivo.

Consolidar dos archivos obliga a leer los dos y escribir el resultado, así que **cuesta la suma de sus tamaños**. El operario repite siempre el mismo paso:

1. Elegir los **dos archivos más chicos** que estén disponibles en ese momento.
2. Consolidarlos en un archivo nuevo, cuyo tamaño es la **suma** de los tamaños de los dos.
3. El costo de esa consolidación es el tamaño del archivo nuevo.
4. Los dos archivos consolidados dejan de estar disponibles. **El archivo nuevo queda disponible**, y más adelante puede volver a consolidarse con otro.

El paso se repite hasta que queda un solo archivo disponible.

Determine el **costo total**, que es la suma de los costos de todas las consolidaciones realizadas.

Si en algún momento hay más de dos archivos con el tamaño mínimo, no importa cuáles dos se elijan: el costo total es el mismo.

## Entrada

- La primera línea contiene un entero $N$ ($1 \leq N \leq 2 \times 10^6$), la cantidad de archivos de respaldo.
- Las siguientes $N$ líneas contienen un entero $T$ ($1 \leq T \leq 10^6$) cada una, el tamaño de un archivo.

## Salida

Imprima un único entero: el costo total de consolidar los $N$ archivos en uno solo.

Si hay un único archivo, no se realiza ninguna consolidación y el costo total es `0`.

## Restricciones

- Utilizar un **heap binario** para resolver el problema.
- Resolver en orden temporal $O(N \log N)$ en el peor caso, siendo $N$ la cantidad de archivos.
- Orden espacial $O(N)$.
- El costo total puede superar el rango de un entero de 32 bits.

## Ejemplo

### Input 1

```
4
1
2
3
4
```

### Output 1

```
19
```

### Explicación 1

| Paso | Se consolidan | Costo | Archivos disponibles al terminar |
| ---- | ------------- | ----- | -------------------------------- |
| 1 | 1 y 2 | 3 | 3, 3, 4 |
| 2 | 3 y 3 | 6 | 6, 4 |
| 3 | 4 y 6 | 10 | 10 |

El costo total es $3 + 6 + 10 = 19$.

Notar el paso 2. De los dos archivos de tamaño 3, uno es el archivo original y el otro es el que salió del paso 1. Los archivos originales de tamaño 1 y 2 ya no están disponibles, pero su contenido sigue adentro del archivo nuevo. Consolidar el archivo nuevo vuelve a leer y a escribir ese contenido, y por eso se paga de nuevo.

Los tamaños de los archivos suman $1 + 2 + 3 + 4 = 10$, pero el costo total es 19. Cada archivo original se paga una vez por cada consolidación que copia su contenido, ya sea directamente o adentro de un archivo nuevo que lo contiene:

$$1 \times 3 + 2 \times 3 + 3 \times 2 + 4 \times 1 = 19$$

El contenido del archivo de tamaño 1 se copia en las tres consolidaciones: en el paso 1 como archivo original, y en los pasos 2 y 3 adentro de los archivos nuevos de tamaño 3 y 6. El contenido del archivo de tamaño 4 se copia solo en la última.

---

### Input 2

```
4
4
5
6
7
```

### Output 2

```
44
```

### Explicación 2

| Paso | Se consolidan | Costo | Archivos disponibles al terminar |
| ---- | ------------- | ----- | -------------------------------- |
| 1 | 4 y 5 | 9 | 6, 7, 9 |
| 2 | 6 y 7 | 13 | 9, 13 |
| 3 | 9 y 13 | 22 | 22 |

El costo total es $9 + 13 + 22 = 44$.

Este ejemplo muestra que **hay que volver a buscar los dos más chicos en cada paso**. En el paso 2 el archivo nuevo de tamaño 9 ya no es de los dos más chicos: los más chicos son el 6 y el 7, que todavía no se tocaron.

Recorrer los archivos de menor a mayor una sola vez y consolidarlos en ese orden da un resultado distinto y equivocado:

| Paso | Se consolidan | Costo |
| ---- | ------------- | ----- |
| 1 | 4 y 5 | 9 |
| 2 | 9 y 6 | 15 |
| 3 | 15 y 7 | 22 |

Eso da 46, no 44. El error está en el paso 2: consolida el archivo nuevo cuando todavía había archivos más chicos disponibles.

---

### Input 3

```
1
42
```

### Output 3

```
0
```

### Explicación 3

Hay un solo archivo, así que no hay nada que consolidar. No se realiza ninguna consolidación y el costo total es `0`.

El costo total **no** es 42. El tamaño de un archivo se paga cuando una consolidación copia su contenido, y acá no hay ninguna consolidación.

---

### Input 4

```
2
7
13
```

### Output 4

```
20
```

### Explicación 4

Con dos archivos hay una sola consolidación, que cuesta $7 + 13 = 20$.

Este es el único caso en el que el costo total coincide con la suma de los tamaños. Con dos archivos cada uno participa exactamente de una consolidación, así que cada tamaño se paga una sola vez.

---

### Input 5

```
6
1
1
1
1
1
1
```

### Output 5

```
16
```

### Explicación 5

| Paso | Se consolidan | Costo | Archivos disponibles al terminar |
| ---- | ------------- | ----- | -------------------------------- |
| 1 | 1 y 1 | 2 | 1, 1, 1, 1, 2 |
| 2 | 1 y 1 | 2 | 1, 1, 2, 2 |
| 3 | 1 y 1 | 2 | 2, 2, 2 |
| 4 | 2 y 2 | 4 | 2, 4 |
| 5 | 2 y 4 | 6 | 6 |

El costo total es $2 + 2 + 2 + 4 + 6 = 16$, contra una suma de tamaños de apenas 6.

Los tres primeros pasos consolidan los seis archivos originales de a pares, porque mientras queden archivos de tamaño 1 esos son los más chicos. Recién en el paso 4 se empiezan a consolidar los archivos nuevos entre sí.

Consolidar en el orden de la entrada, uniendo cada archivo al resultado anterior, daría $2 + 3 + 4 + 5 + 6 = 20$. La diferencia es grande justamente porque hay muchos archivos del mismo tamaño.
