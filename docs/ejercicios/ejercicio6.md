# Ejercicio 6 - El cartel del visitante

## Descripción

Un viejo amigo está de visita en tu ciudad y quieres asegurarte de que encuentre tu casa sin problemas. Para ello, has decidido renovar el cartel de dirección de tu hogar. 

Tienes a tu disposición una colección de $N$ placas decorativas, cada una con un número grabado. Quieres construir un cartel uniendo estas placas en una fila. 

Sin embargo, conoces la reputación de la compañía encargada de instalar el cartel: ¡suelen distraerse y podrían llegar a colocar el cartel al revés! Para evitar cualquier confusión, necesitas que la secuencia de números en tu cartel se lea exactamente igual de izquierda a derecha que de derecha a izquierda.

Además, quieres que tu casa destaque. Por lo tanto, tu objetivo es construir el cartel "mayor" posible siguiendo estas estrictas reglas de prioridad:

1. **El cartel debe ser lo más largo posible** (es decir, utilizar la mayor cantidad de placas posible de tu colección).
2. En caso de que existan múltiples formas de armar un cartel de la misma longitud máxima, la secuencia de números debe ser **lexicográficamente la mayor posible**. Esto significa que al comparar dos carteles válidos placa por placa desde el inicio, tu cartel debe tener el número más grande en la primera posición donde difieran.

Ten en cuenta que no es obligatorio utilizar todas las placas de tu colección; te pueden sobrar placas si no es posible incluirlas cumpliendo la condición de que el cartel se lea igual de ambos lados.

Determine la **secuencia de números** que conforma el cartel óptimo.

## Entrada

- La primera línea contiene un entero $N$ ($1 \leq N \leq 2 \times 10^5$), la cantidad de placas disponibles en tu colección.
- La segunda línea contiene $N$ enteros separados por espacios $A_1, A_2, \dots, A_N$ ($0 \leq A_i \leq 1000$), representando los números grabados en cada placa de tu colección.

## Salida

Imprima la secuencia de números que conforma el cartel óptimo, con un único espacio entre número y número.

## Restricciones

- Utilizar una estrategia **Greedy** para resolver el problema.
- Resolver en orden temporal $O(N)$ en el peor caso, siendo $N$ la cantidad de placas.
- Orden espacial $O(N)$.

## Ejemplos

### Input 1

```text
8
15 8 15 10 10 15 8 20
```

### Output 1

```text
15 10 8 20 8 10 15
```

### Explicación 1

Las placas disponibles en la colección son: una con `20`, tres con `15`, dos con `10` y dos con `8`. 
Para maximizar la longitud del cartel (Regla 1), debemos usar la mayor cantidad de pares posibles. Formamos un par de `15`, un par de `10` y un par de `8`.
Para que sea lexicográficamente mayor (Regla 2), ubicamos los números más grandes en los extremos. Así, la primera mitad del cartel se arma con `15 10 8`.
Nos sobran las placas `15` y `20`. Como solo podemos colocar una placa suelta en el centro, elegimos el `20` porque es mayor que el `15`, maximizando así la secuencia.

### Input 2

```text
5
1 2 1 3 2
```

### Output 2

```text
2 1 3 1 2
```

### Explicación 2

Tenemos los pares `2` y `1`. Sobra un `3` que colocamos en el medio. Priorizamos el `2` en el extremo para que sea lexicográficamente mayor.