const fs = require('fs')

// 1. Leemos el archivo input.txt
const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8')

// 2. Separamos por comas para obtener los rangos "a-b"
const rangeStrings = input.trim()
                          .split(',')
                          .map(r => r.trim())
                          .filter(r => r.length > 0)

let sum = 0

// 3. Recorremos cada rango
for (const range of rangeStrings) {
  const [startStr, endStr] = range.split('-')

  const start = Number(startStr)
  const end = Number(endStr)

  if (Number.isNaN(start) || Number.isNaN(end)){
    console.log("Rango inválido, se ingora: ", range)
    continue
  }

  // 4. Recorremos todos los IDs del rango [start, end]
  for (let id = start; id <= end; id++){
    if (isInvalidId(id))
      sum += id
  }

}

// 5. Mostramos el resultado
console.log("Suma de IDs inválidos: ", sum)

// Función auxiliar para comprobar validez IDs
function isInvalidId(n){
  const s = String(n)
  const l = s.length

  // Probamos todas las posibles longitudes
  for (let len = 1; len <= Math.floor(l / 2); len++){
    if (l % len !== 0)
      continue // Si l no es múltiplo de len, no encaja

    const repetitions = l / len
    if (repetitions < 2)
      continue

    const chunk = s.slice(0, len)
    let ok = true

    // Se comprueba si toda la cadena es un chunk repetido
    for (let i = len; i < l; i += len){
      if (s.slice(i, i + len) !== chunk){
        ok = false
        break
      }
    }

    if (ok)
      return true

  }

  return false

}
