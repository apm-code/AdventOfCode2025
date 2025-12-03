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
for (const range of rangeStrings){
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

  // Si la longitud es impar, no puede ser repetida
  if (s.length % 2 === 1)
    return false

  const half = s.length / 2
  const first = s.slice(0,half)
  const second = s.slice(half)

  // Devuelve true si las dos mitades son exactamente iguales
  return first === second

}