# Formato de entrega (código fuente)

El formato de entrega del obligatorio va a constar de un archivo zip que
en su interior contenga únicamente archivos con extensiones ".cpp" y
".h" en caso de C/C++ o ".java" en caso de utilizar Java, además de la
[bitácora](/documentacion) (`bitacora.md`) y la [declaración de
autoría](/autoria) (`autoria.md`) en la raíz. También podrán
existir directorios para organizar mejor el código y poder reutilizar
implementaciones en varios ejercicios.

> **Es importante que el archivo zip no contenga archivos de ningún otro tipo, como test/pruebas, archivos binarios, etc. Las únicas excepciones son la bitácora (`bitacora.md`) y la declaración de autoría (`autoria.md`).**

Recomendamos basarse en los templates provistos por la cátedra para minimizar la posibilidad de errores en la entrega. Los templates ya incluyen `bitacora.md` y `autoria.md` con la estructura esperada.

- Obligatorio 1 (ejercicios 1 a 5): [Template C++](https://github.com/Algoritmos-2/A2-obligatorio1-template-cpp) | [Template Java](https://github.com/Algoritmos-2/A2-obligatorio1-template-java)
- Obligatorio 2 (ejercicios 6 a 10): [Template C++](https://github.com/Algoritmos-2/A2-obligatorio2-template-cpp) | [Template Java](https://github.com/Algoritmos-2/A2-obligatorio2-template-java)

# C/C++

En el caso de C/C++, la estructura dentro del zip tendrá el siguiente
formato:

```plaintext
├── directorioA
├── directorioB
...
├── directorioZ
├── ejercicio1.cpp
├── ejercicio2.cpp
...
└── ejercicio10.cpp
```

Por ejemplo, si tuviéramos 10 ejercicios, un posible zip a entregar
podría tener:

```plaintext
├── funciones
│ └── enteros.cpp
├── tads
│ ├── ListImp.cpp
│ └── List.h
├── ejercicio1.cpp
├── ejercicio2.cpp
...
└── ejercicio10.cpp
```

Notar que es obligatorio que en la raíz del zip se encuentren los
archivos "ejercicioX.cpp". Los directorios para funciones auxiliares y
TADs pueden llamarse de cualquier forma y no son obligatorios. Un
ejemplo donde no se utilizan directorios auxiliares podría ser:

```plaintext
├── enteros.cpp
├── ListImp.cpp
├── List.h
├── ejercicio1.cpp
├── ejercicio2.cpp
...
└── ejercicio10.cpp
```

## Cómo compilar

La forma de compilar cada ejercicio es la vista en el curso, pasando por
parámetro el archivo raíz "ejercicioX.cpp", siendo X el número de
ejercicio, e indicando en el parámetro "-o" el nombre del archivo
compilado:

```bash
g++ -o ejercicioX ejercicioX.cpp -std=c++11
```

## Cómo realizar las inclusiones

Las inclusiones parten del archivo "raíz" del programa, es decir, el
"ejercicioX.cpp".

Dependiendo de si los archivos a incluir se encuentran en el mismo
directorio o no, es cómo se realizará la inclusión.

### Con directorios

Dado el siguiente caso:

```plaintext
├── funciones
│ └── enteros.cpp
├── tads
│ ├── ListImp.cpp
│ └── List.h
...
```

Se definen las inclusiones de la siguiente manera:

```c++
#include "tads/List.h"
#include "tads/ListImp.cpp"
#include "funciones/enteros.cpp"
```

### Sin directorios

Dado el caso en el que no se usan directorios:

```plaintext
├── enteros.cpp
├── ListImp.cpp
├── List.h
...
```

Se definen las inclusiones de la siguiente manera:

```c++
#include "List.h"
#include "ListImp.cpp"
#include "enteros.cpp"
```

### Aclaración sobre TADs

Notar que en el archivo raíz se incluye tanto la especificación del TAD
(List.h) como la implementación (ListImp.cpp). Lo correcto es incluir
únicamente la especificación y asignar la implementación al momento de
compilar. Esto resulta en problemas para realizar debugging y en que la
compilación sea más compleja de estandarizar, por lo que se decide que
es aceptable realizar la inclusión de la implementación.

# JAVA

En el caso de Java, la estructura dentro del zip tendrá el siguiente
formato:

```plaintext
├── directorioA
├── directorioB
...
├── directorioZ
├── Ejercicio1.java
├── Ejercicio2.java
...
└── Ejercicio10.java
```

Por ejemplo, si tuviéramos 10 ejercicios, un posible zip a entregar
podría tener:

```plaintext
├── funciones
│ └── Enteros.java
├── tads
│ └── List.java
├── Ejercicio1.java
├── Ejercicio2.java
...
└── Ejercicio10.java
```

Notar que es obligatorio que en la raíz del zip se encuentren los
archivos "EjercicioX.java". Los directorios para funciones auxiliares y
TADs pueden llamarse de cualquier forma y no son obligatorios. Un
ejemplo donde no se utilizan directorios auxiliares podría ser:

```plaintext
├── Enteros.java
├── List.java
├── Ejercicio1.java
├── Ejercicio2.java
...
└── Ejercicio10.java
```

## Cómo compilar

La forma de compilar cada ejercicio es la vista en el curso, pasando por
parámetro el archivo raíz "EjercicioX.java", siendo X el número de
ejercicio:

```bash
javac EjercicioX.java
```

## Cómo realizar las importaciones

Las importaciones parten del archivo "raíz" del programa, es decir, el
"EjercicioX.java".

Dependiendo de si los archivos a incluir se encuentran en el mismo
directorio o no, es cómo se realizan.

### Con directorios

Dado el siguiente caso:

```plaintext
├── funciones
│ └── Enteros.java
├── tads
│ └── List.java
..
```

Se definen las importaciones de la siguiente manera:

```java
import tads.List;
import funciones.Enteros;
```

Para que esto funcione es importante definir los paquetes java de las
clases que se encuentran en esos directorios.

Dado el ejemplo anterior, la clase Enteros.java debe definir su paquete
al comienzo del archivo:

```java
package funciones;
```

De la misma forma lo debe hacer la clase List.java:

```java
package tads;
```

Las clases de la raíz, "EjercicioX.java" por ejemplo, no deben tener
definido un paquete.

### Sin directorios

Dado el caso en el que no se usan directorios:

```plaintext
├── Enteros.java
├── List.java
...
```

No es necesario definir ninguna importación. Es importante que ninguna
clase del directorio raíz tenga definido un paquete al comienzo de la
misma.
