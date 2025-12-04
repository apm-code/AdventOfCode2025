# 🎄 Advent of Code 2025 – Día 2  
## Parte 2 – Gift Shop  
## Explicación completa + traducción del enunciado

---

# 📝 Traducción del enunciado

En la parte 1 buscábamos IDs inválidos que fueran exactamente “una secuencia repetida dos veces”.

Pero el dependiente descubre que todavía hay IDs inválidos:  
el elfo pequeño había hecho **más patrones tontos**.

Ahora, un ID es inválido si es:

> **una secuencia de dígitos repetida al menos dos veces**.

Ejemplos inválidos:

- `12341234` → `1234` repetido 2 veces  
- `123123123` → `123` repetido 3 veces  
- `1212121212` → `12` repetido 5 veces  
- `1111111` → `1` repetido 7 veces  

Es decir, cualquier número que se pueda expresar como:

```
patrón + patrón + patrón + ... (k veces)
donde k >= 2
```

Los IDs de los rangos del input se recorren como en la parte 1, pero ahora la regla para decidir qué IDs sumar cambia.

Tu trabajo:  
👉 **Suma todos los IDs inválidos con estas nuevas reglas.**

---

# 🧠 Qué significa ser un ID inválido (parte 2)

Un número es inválido si:

1. Convertido a string, de longitud `L`,  
2. existe una longitud de patrón `len` tal que:
   - `len` divide exactamente a `L`,
   - el número de repeticiones es `k = L / len`,
   - `k >= 2`,
   - al dividir la cadena en trozos de tamaño `len`, **todos son iguales**.

Ejemplos:

- `"1111111"` → patrón `"1"` repetido 7 veces → inválido  
- `"121212"` → patrón `"12"` repetido 3 veces → inválido  
- `"1234"` → no tiene patrón repetido → válido  
- `"123123"` → `"123"` repetido 2 veces → inválido  

---

# 🧪 Cómo lo comprobamos en código

Dado un número `n`:

1. `s = String(n)`  
2. Longitud `L = s.length`  
3. Probamos todos los `len` desde 1 hasta `L/2`  
4. Si `L % len !== 0`, ese `len` no sirve  
5. Extraemos `chunk = s.slice(0, len)`  
6. Comprobamos todas las ventanas del string:
   ```
   s[0:len], s[len:2len], s[2len:3len], ...
   ```
   Si todas coinciden con `chunk`, → inválido.

---

# 🛠️ Código completo de `part2.js`

```js
const fs = require('fs')

// 1. Leemos el archivo input.txt
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

// 2. Separamos por comas para obtener los rangos "a-b"
const rangeStrings = input
  .trim()
  .split(',')
  .map(r => r.trim())
  .filter(r => r.length > 0)

let sum = 0

// 3. Recorremos cada rango
for (const range of rangeStrings) {
  const [startStr, endStr] = range.split('-')

  const start = Number(startStr)
  const end = Number(endStr)

  if (Number.isNaN(start) || Number.isNaN(end)) {
    console.log('Rango inválido, se ignora: ', range)
    continue
  }

  // 4. Recorremos todos los IDs del rango [start, end]
  for (let id = start; id <= end; id++) {
    if (isInvalidId(id)) {
      sum += id
    }
  }
}

// 5. Mostramos el resultado final
console.log('Suma de IDs inválidos (parte 2):', sum)

// ---------------------
// Función auxiliar (parte 2)
// ---------------------
function isInvalidId(n) {
  const s = String(n)
  const L = s.length

  // Probamos todas las posibles longitudes de patrón
  for (let len = 1; len <= Math.floor(L / 2); len++) {
    if (L % len !== 0) continue

    const repetitions = L / len
    if (repetitions < 2) continue // necesitamos al menos 2 repeticiones

    const chunk = s.slice(0, len)
    let ok = true

    // Comprobamos si toda la cadena es chunk repetido
    for (let i = len; i < L; i += len) {
      if (s.slice(i, i + len) !== chunk) {
        ok = false
        break
      }
    }

    if (ok) {
      return true
    }
  }

  return false
}
```

---

# 🧾 Resumen

- Parte 1: repetido exactamente **2 veces**  
- Parte 2: repetido **2 o más veces**  
- Probamos todas las posibles longitudes de patrón  
- Si el número es repeticiones exactas del mismo substring → ID inválido  
- Lo sumamos al total  

Ejecuta:

```bash
node part2.js
```

El resultado es la respuesta de la parte 2.
