# Autoría

Los estudiantes deben especificar las fuentes de información y recursos utilizados para la resolución de cada ejercicio. Esto incluye:

- Código discutido o desarrollado en clase.
- Recursos o ejemplos encontrados en la web. Se debe especificar la URL de la página.
- Código generado por herramientas de inteligencia artificial generativa (IAG). Ver las pautas en [Uso de IA](/uso-ia).

!> Es imprescindible citar correctamente todas las fuentes utilizadas. La omisión de esta información podría considerarse como plagio, lo cual conllevaría a acciones disciplinarias según las políticas de la universidad. La transparencia en la citación de fuentes es crucial para mantener la integridad académica del obligatorio.

## Cómo declarar la autoría

La declaración de autoría se entrega en un archivo `autoria.md` en la **raíz del zip**, junto al código fuente y la [bitácora](/documentacion), con un apartado por ejercicio. Si un ejercicio no utilizó fuentes externas, también debe indicarse. Los templates provistos por la cátedra ya incluyen este archivo con la estructura esperada.

### Ejemplo de declaración

```markdown
# Declaración de autoría — Obligatorio 1

## Ejercicio 3
- TAD Heap basado en la implementación vista en clase (semana 8),
  adaptado para soportar elementos con prioridad repetida.
- Corrección de la función `hundir` con ayuda de ChatGPT
  (debugging sobre código propio, ver entrada del 2026-09-04).

## Ejercicio 4
- Función de lectura de grafos basada en el ejemplo de
  https://cp-algorithms.com/graph/breadth-first-search.html
- El resto de la implementación es íntegramente propia.

## Ejercicio 5
- Implementación íntegramente propia, sin fuentes externas.
```

### Ejemplo en el código fuente

Además de la declaración en la bitácora, los fragmentos tomados de otras fuentes o generados por IAG deben señalarse con un comentario en el lugar donde se usan:

```cpp
// Fragmento generado con GitHub Copilot: plantilla de la clase NodoAVL.
// Adaptado: se agregó el campo altura y el constructor por parámetros.
struct NodoAVL {
    ...
};
```

```cpp
// Basado en el algoritmo de Floyd visto en clase (semana 10).
void ordenarHeap(int* arr, int n) {
    ...
}
```

## Consideraciones

- Citar una fuente **no exime** de comprender el código: en la [defensa](/defensa) se debe poder explicar y justificar todo lo entregado, incluyendo los fragmentos de terceros o generados por IAG.
- En caso de existir dudas sobre la autoría, plagio o uso no atribuido de IAG, el docente podrá convocar al equipo a una instancia específica e individual sobre el tema.
