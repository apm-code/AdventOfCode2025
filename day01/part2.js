const fs = require('fs')

// 1. Leemos el input como texto
const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8')

// 2. Se separa en líneas y se quitan espacios y líneas vacías
const lines = input.split('\n')
                   .map(line => line.trim())
                   .filter(line => line.length > 0)

// 3. El dial empieza en 50
let position = 50

// 4. Contador de veces que el dial pasa por 0
let timesAtZero = 0

// 5. Se recorre cada línea
for (const line of lines) {
  // Primera letra: L o R
  const direction = line[0]

  // Distancia recorrida (números)
  const distance = Number(line.slice(1))

  // Por seguridad, comprobamos que distance es un número
  if (Number.isNaN(distance)) {
    console.log("Línea ignorada (no es un número): ", line)
    continue
  }

  if (direction !== 'R' && direction !== 'L'){
    console.log("Dirección desconocida, línea ignorada: ", line)
    continue

  }

  // Se simulan los "click" de cada rotación
  for (let i = 0; i < distance; i++) {
    if (direction === 'R')
      position = (position + 1) % 100

    else
      position = (position - 1 + 100) % 100

    // Después de cada click, se comprueba si nos encontramos en 0
    if (position === 0)
      timesAtZero++

  }

}

// Se muestra el resultado
console.log("La contraseña del método 0x434C49434B es: ", timesAtZero)