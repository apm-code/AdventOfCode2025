# Explicación Detallada de `part1.js` (Advent of Code - Day 1)

Este archivo contiene una explicación **muy completa y paso a paso** de todo lo que hace el script `part1.js` para resolver el Day 1 del Advent of Code. Está escrita para que entiendas **cada concepto de JavaScript**, incluso si estás empezando desde cero.

## 1. Importar el módulo `fs`

```js
const fs = require('fs')
```

`fs` significa **File System**. Es un módulo incorporado en Node.js que permite trabajar con archivos: leer, escribir, crear carpetas, etc.

`require('fs')` carga este módulo interno de Node.

## 2. Leer el archivo de entrada

```js
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
```

`__dirname` contiene la ruta del directorio donde está este archivo.  
`readFileSync` lee `input.txt` completo como texto.

## 3. Separar el texto en líneas

```js
const lines = input
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0)
```

### `.split('\n')`
Divide el texto en un array, separando por saltos de línea.

### `.map(line => line.trim())`
Elimina espacios al principio y final de cada línea.

### `.filter(...)`
Elimina líneas vacías.

## 4. Variables iniciales

```js
let position = 50
let timesAtZero = 0
```

El dial empieza en 50.  
`timesAtZero` cuenta las veces que acaba en 0.

## 5. Recorrer instrucciones

```js
for (const line of lines) { ... }
```

Recorre cada instrucción como `"L68"`, `"R48"`, etc.

## 6. Extraer dirección y distancia

```js
const direction = line[0]
const distance = Number(line.slice(1))
```

### `line[0]`
Primer carácter: `"L"` o `"R"`.

### `.slice(1)`
Devuelve el resto, por ejemplo `"68"`.

### `Number(...)`
Convierte `"68"` → `68`.

## 7. Validación

```js
if (Number.isNaN(distance)) {
  continue
}
```

Saltamos la línea si no es un número.

## 8. Actualizar la posición

### Derecha (R)

```js
position = (position + distance) % 100
```

### Izquierda (L)

```js
position = (position - distance) % 100
if (position < 0) position += 100
```

El módulo `%` asegura que el valor siempre esté entre 0 y 99.  
El ajuste adicional corrige valores negativos.

## 9. Contar si cae en 0

```js
if (position === 0) timesAtZero++
```

Cada vez que, tras un giro, la posición sea 0, sumamos 1.

## 10. Mostrar el resultado

```js
console.log('La password es:', timesAtZero)
```

# Parte 2:
