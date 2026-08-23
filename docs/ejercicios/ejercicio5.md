# Ejercicio 5 - Mantenimiento de senderos

## Descripción

Un parque nacional tiene $V$ refugios de montaña, numerados de $1$ a $V$, unidos por senderos. Cada sendero conecta dos refugios y se puede recorrer en los dos sentidos.

Mantener un sendero abierto cuesta dinero, y cada sendero tiene su propio costo de mantenimiento. Los senderos que el parque no mantiene se cierran y no se pueden usar.

La administración necesita que desde cualquier refugio se pueda llegar a cualquier otro usando solo senderos mantenidos, tal vez pasando por refugios intermedios. Dentro de esa condición, quiere gastar lo menos posible.

Determine el **costo total mínimo de mantenimiento**.

Si ni siquiera manteniendo todos los senderos del parque se puede llegar de cualquier refugio a cualquier otro, la tarea es imposible.

## Entrada

- La primera línea contiene dos enteros $V$ y $E$ ($1 \leq V \leq 10^5$, $0 \leq E \leq 10^6$), la cantidad de refugios y la cantidad de senderos.
- Las siguientes $E$ líneas contienen tres enteros $u$, $v$ y $w$ ($1 \leq u, v \leq V$, $u \neq v$, $1 \leq w \leq 10^6$), que indican que hay un sendero entre el refugio $u$ y el refugio $v$ cuyo mantenimiento cuesta $w$.

Puede haber más de un sendero entre el mismo par de refugios, con costos distintos.

## Salida

Imprima un único entero: el costo total mínimo de mantenimiento.

Si hay un solo refugio, no hace falta mantener ningún sendero e imprima `0`.

Si no es posible conectar todos los refugios entre sí, imprima `imposible`.

## Restricciones

- Utilizar el algoritmo de **Kruskal** con una estructura de **conjuntos disjuntos**.
- La estructura de conjuntos disjuntos debe implementar las **dos optimizaciones vistas en el curso**:
  - **Compresión de caminos** al buscar el representante de un refugio.
  - **Unión por altura**, colgando siempre el árbol más bajo del más alto.
- Resolver en orden temporal $O(E \log E)$ en el peor caso, siendo $E$ la cantidad de senderos.
- Orden espacial $O(V + E)$.
- El costo total puede superar el rango de un entero de 32 bits.

## Ejemplo

### Input 1

```
5 6
1 2 3
2 3 4
1 3 10
3 4 2
4 5 7
3 5 8
```

### Output 1

```
16
```

### Explicación 1

```cytoscape
{"nodes": ["1","2","3","4","5"], "edges": [["1","2",3],["2","3",4],["1","3",10],["3","4",2],["4","5",7],["3","5",8]]}
```

Los senderos, mirados de más barato a más caro:

| Sendero | Costo | ¿Se mantiene? | Motivo |
| ------- | ----- | ------------- | ------ |
| 3 – 4 | 2 | sí | Conecta dos refugios que estaban separados. |
| 1 – 2 | 3 | sí | Conecta dos refugios que estaban separados. |
| 2 – 3 | 4 | sí | Une el grupo `1, 2` con el grupo `3, 4`. |
| 4 – 5 | 7 | sí | Trae el refugio 5, el último que faltaba. |
| 3 – 5 | 8 | no | Los refugios 3 y 5 ya se alcanzan entre sí. |
| 1 – 3 | 10 | no | Los refugios 1 y 3 ya se alcanzan entre sí. |

El costo total es $2 + 3 + 4 + 7 = 16$.

Mantener los seis senderos costaría 34, pero dos de ellos no agregan ningún recorrido nuevo. Con cuatro senderos alcanza para conectar cinco refugios.

---

### Input 2

```
4 5
1 2 1
2 3 6
3 4 6
4 1 6
2 4 6
```

### Output 2

```
13
```

### Explicación 2

```cytoscape
{"nodes": ["1","2","3","4"], "edges": [["1","2",1],["2","3",6],["3","4",6],["4","1",6],["2","4",6]]}
```

Para conectar cuatro refugios hacen falta tres senderos. El más barato del parque cuesta 1, y los otros cuatro cuestan 6 cada uno. Hay que mantener el de 1 y dos de los de 6, así que el costo total es $1 + 6 + 6 = 13$.

Este ejemplo muestra que **el conjunto elegido no es único, pero el costo sí lo es**. Hay cinco formas distintas de conectar los cuatro refugios con tres senderos:

- `1 – 2`, `2 – 3`, `3 – 4`
- `1 – 2`, `2 – 3`, `4 – 1`
- `1 – 2`, `2 – 3`, `2 – 4`
- `1 – 2`, `3 – 4`, `4 – 1`
- `1 – 2`, `3 – 4`, `2 – 4`

Las cinco cuestan 13. La única combinación de tres senderos que no sirve es `1 – 2`, `4 – 1`, `2 – 4`, porque conecta los refugios 1, 2 y 4 entre sí pero deja al refugio 3 afuera.

---

### Input 3

```
5 3
1 2 4
2 3 5
4 5 6
```

### Output 3

```
imposible
```

### Explicación 3

```cytoscape
{"nodes": ["1","2","3","4","5"], "edges": [["1","2",4],["2","3",5],["4","5",6]]}
```

Manteniendo los tres senderos, los refugios quedan agrupados así: `1, 2, 3` por un lado y `4, 5` por el otro.

No hay ningún sendero entre esos dos grupos, así que no existe forma de ir del refugio 1 al refugio 4. La respuesta es `imposible`.

Notar que sí se logra conectar parte del parque. Eso no alcanza: hay que poder ir de **cualquier** refugio a **cualquier** otro.

---

### Input 4

```
1 0
```

### Output 4

```
0
```

### Explicación 4

Hay un solo refugio y ningún sendero. Desde ese refugio ya se llega a todos los refugios del parque, porque es el único.

No hace falta mantener ningún sendero, así que el costo total es `0`, y no `imposible`.

---

### Input 5

```
4 5
1 2 1
2 3 1
1 3 1
3 4 100
3 4 50
```

### Output 5

```
52
```

### Explicación 5

```cytoscape
{"nodes": ["1","2","3","4"], "edges": [["1","2",1],["2","3",1],["1","3",1],["3","4",100],["3","4",50]]}
```

Los refugios 1, 2 y 3 están unidos por un triángulo de senderos que cuestan 1 cada uno. Los tres son baratos, pero **mantener los tres sería un desperdicio**: con dos cualesquiera de ellos los tres refugios ya se alcanzan entre sí. El tercero solo repite un recorrido que ya existe.

| Sendero | Costo | ¿Se mantiene? | Motivo |
| ------- | ----- | ------------- | ------ |
| 1 – 2 | 1 | sí | Conecta dos refugios que estaban separados. |
| 2 – 3 | 1 | sí | Trae el refugio 3. |
| 1 – 3 | 1 | no | Los refugios 1 y 3 ya se alcanzan por el refugio 2. |
| 3 – 4 | 50 | sí | Es la única forma de traer el refugio 4, y la más barata de las dos. |
| 3 – 4 | 100 | no | El refugio 4 ya está conectado. |

El costo total es $1 + 1 + 50 = 52$.

Quedarse con los tres senderos más baratos del parque daría 3, pero esa respuesta es incorrecta: el refugio 4 quedaría aislado. No alcanza con elegir los más baratos, hay que descartar los que no conectan nada nuevo.

Este ejemplo también muestra que puede haber dos senderos entre el mismo par de refugios. Entre el 3 y el 4 hay uno de 50 y otro de 100, y se mantiene el de 50.
