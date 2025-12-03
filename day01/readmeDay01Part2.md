# Advent of Code – Day 1 (Parte 2)  
## Explicación detallada de `part2.js`

En la **parte 1** contábamos cuántas veces, al final de cada rotación, el dial quedaba en `0`.

En la **parte 2**, el método nuevo (“password method 0x434C49434B”) nos dice:

> Hay que contar **todas** las veces que el dial pasa por `0` en cada *click*,  
> tanto durante la rotación como al final de la rotación.

Es decir:

- Cada rotación se compone de muchos **pasos de 1 en 1** (clicks).
- En cada click miramos si el dial termina en `0`.
- Si es así, sumamos 1 al contador.

---

## 1. Código completo de `part2.js`

```js
const fs = require('fs')

// Leemos el input como texto
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

// Separamos en líneas y limpiamos
const lines = input
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0)

// Posición inicial del dial
let position = 50

// Contador de veces que el dial pasa por 0
let timesAtZero = 0

for (const line of lines) {
  const direction = line[0]
  const distance = Number(line.slice(1))

  if (Number.isNaN(distance)) {
    console.log('Línea ignorada (distancia no numérica):', line)
    continue
  }

  if (direction !== 'L' && direction !== 'R') {
    console.log('Dirección desconocida, línea ignorada:', line)
    continue
  }

  // Recorremos cada "click" de la rotación
  for (let i = 0; i < distance; i++) {
    if (direction === 'R') {
      // Un click a la derecha: +1 con módulo 100
      position = (position + 1) % 100
    } else {
      // Un click a la izquierda: -1 con módulo 100
      position = (position - 1 + 100) % 100
    }

    // Después de cada click, miramos si estamos en 0
    if (position === 0) {
      timesAtZero++
    }
  }
}

console.log('La password del método 0x434C49434B es:', timesAtZero)
```

---

## 2. Diferencia clave con la parte 1

- **Parte 1**:  
  Para cada rotación `Lxx` o `Ryy`, hacíamos un único cálculo del tipo:

  ```js
  position = (position + distance) % 100
  ```

  y luego mirábamos si **la posición final** era 0.

- **Parte 2**:  
  Ahora descomponemos cada rotación en muchos pasos de 1 click:

  - Si la rotación es `R48`, hacemos 48 pasos:
    - click 1, click 2, ..., click 48
  - En cada click movemos el dial de 1 en 1.
  - En cada click comprobamos si la posición es 0.

---

## 3. Bucle externo: procesar cada instrucción

```js
for (const line of lines) {
  const direction = line[0]
  const distance = Number(line.slice(1))
  ...
}
```

- `line[0]` → obtiene el primer carácter: `'L'` o `'R'`.
- `line.slice(1)` → devuelve el resto del string, por ejemplo:
  - `"L68".slice(1) → "68"`
  - `"R1000".slice(1) → "1000"`
- `Number(...)` convierte ese texto en número:

```js
Number("68")   // 68
Number("1000") // 1000
```

Si el número no es válido, lo saltamos con:

```js
if (Number.isNaN(distance)) {
  continue
}
```

---

## 4. Bucle interno: simular cada click

```js
for (let i = 0; i < distance; i++) {
  if (direction === 'R') {
    position = (position + 1) % 100
  } else {
    position = (position - 1 + 100) % 100
  }

  if (position === 0) {
    timesAtZero++
  }
}
```

### 4.1. ¿Por qué `i < distance`?

Si `distance = 5`, queremos exactamente **5 clicks**:

- i = 0 → click 1
- i = 1 → click 2
- i = 2 → click 3
- i = 3 → click 4
- i = 4 → click 5
- i = 5 → ya no entra (porque 5 < 5 es falso)

### 4.2. Movimiento a la derecha

```js
position = (position + 1) % 100
```

- Sumamos 1 a la posición
- `% 100` hace que pase de 99 a 0 correctamente

Ejemplo:

- De 98 → un click → 99
- De 99 → un click → (99 + 1) % 100 = 0
- De 0 → un click → (0 + 1) % 100 = 1

### 4.3. Movimiento a la izquierda

```js
position = (position - 1 + 100) % 100
```

Aquí restamos 1, pero para evitar negativos, sumamos 100 antes del `%`:

Ejemplo:

- De 1 → un click a la izquierda:

  ```js
  position = (1 - 1 + 100) % 100 = 100 % 100 = 0
  ```

- De 0 → un click a la izquierda:

  ```js
  position = (0 - 1 + 100) % 100 = 99 % 100 = 99
  ```

Así conseguimos que el dial sea siempre un número entre `0` y `99`.

### 4.4. Comprobar si estamos en 0

```js
if (position === 0) {
  timesAtZero++
}
```

- Se ejecuta **después de cada click**.
- No importa si es un “punto intermedio” o el final de la rotación:  
  si el dial está en `0`, contamos 1.

---

## 5. Ejemplo mental: R1000 desde 50

El enunciado dice:

> Si el dial está en 50 y haces `R1000`, pasa por 0 un total de 10 veces.

Comprobamos la lógica:

- La posición después de `k` clicks a la derecha es:
  - `(50 + k) % 100`
- Esto vale `0` cuando:
  - `50 + k ≡ 0 (mod 100)` → `k ≡ 50 (mod 100)`

Los valores de `k` entre 1 y 1000 que cumplen esto son:

- 50, 150, 250, 350, 450, 550, 650, 750, 850, 950 → **10 veces**

Nuestro bucle:

```js
for (let i = 0; i < 1000; i++) {
  position = (position + 1) % 100
  if (position === 0) timesAtZero++
}
```

contaría exactamente esas 10 veces.

---

## 6. Resultado final

Al terminar de procesar todas las líneas:

```js
console.log('La password del método 0x434C49434B es:', timesAtZero)
```

El valor de `timesAtZero` es el número que tienes que introducir como respuesta en la **parte 2** del Day 1.

---

## 7. Resumen rápido

- **Parte 1**:  
  Contabas solo si el dial acababa en 0 **al final de la rotación**.

- **Parte 2**:  
  Cuentas cada vez que el dial está en 0 **después de cada click individual**.

- Para simularlo:
  - Para cada orden (`Lxx` o `Ryy`), haces un bucle de `distance` pasos.
  - En cada paso mueves la posición de 1 en 1.
  - En cada paso miras si `position === 0` y, si sí, sumas 1.

Con esto tienes una explicación detallada y un `part2.js` claro y fácil de entender.
