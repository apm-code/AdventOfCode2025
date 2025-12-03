const fs = require('fs')

// 1. Leemos el contenido de input.txt como texto:
const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8')

// 2. Separamos por líneas y quitamos líneas vacías
const lines = input.split('\n')
                   .map(line => line.trim())
                   .filter(line => line.length > 0)

// 3. El dial empieza en 50
let position = 50

// 4. Contador de veces que se queda el dial en 0
let timesAtZero = 0

// 5. Se recorre cada línea
for (const line of lines){
  // Primera letra: L o R
  const direction = line[0]

  // Distancia recorrida (números)
  const distance = Number(line.slice(1))

  // Por seguridad, comprobamos que distance es un número
  if (Number.isNaN(distance)) {
    console.log("Línea ignorada (no es un número): ", line)
    continue
  }

  if (direction === 'R'){
    // Girar a la derecha: se suma
    position = (position + distance) % 100

  } else if (direction === 'L') {
    // Girar a la izquierda: se resta
    position = (position - distance) % 100

    if(position < 0)
      position += 100

  } else {
    // Si la instrucción no empieza por L o R, la ignoramos
    console.log("Dirección desconocida, línea introducida:", line)
    continue

  }

  // Después de aplicar el giro, miramos si estamos en 0
  if (position === 0)
    timesAtZero++

}

// 6. Mostramos el resultado
console.log("La contraseña (veces que se queda a 0) es: ", timesAtZero)