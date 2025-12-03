# 🎄 Advent of Code 2025 – Hecho en JavaScript

Este repositorio contiene mis soluciones del **Advent of Code 2025(adventofcode.com/2025)**, realizadas en **JavaScript con Node.js**.  
El objetivo principal es aprender y mejorar en:

- JavaScript   
- Lógica y resolución de problemas  
- Lectura y procesamiento de archivos  
- Pensamiento algorítmico  

Cada día, en principio, incluye:  
- `input.txt` → Input real del día  
- `part1.js` → Solución parte 1  
- `part2.js` → Solución parte 2  
- `readmeDAYXXPartXX.md` → Explicación detallada del día

---

## 📦 Requisitos

- **Node.js**   
- **Visual Studio Code** u otro editor  

Para comprobar la versión de Node:

```bash
node -v
```

---

## 📁 Estructura del repositorio

```
AdventOfCode2025/
  setupDay.mjs
  session.txt
  .gitignore
  README.md
  day01/
    input.txt
    part1.js
    part2.js
    readmeDay01Part1.md
    readmeDay01Part2.md
  day02/
    input.txt
    part1.js
    part2.js
    readmeDay02Part1.md
    readmeDay02Part2.md
  ...
```

---

## ⚙️ Script para generar automáticamente cada día

Este proyecto usa `setupDay.mjs` para:

- Crear la carpeta del día  
- Descargar automáticamente el `input.txt`  
- Crear plantillas de código para cada parte  

### 1️⃣ Añadir tu cookie de sesión

Crear un archivo:

```
session.txt
```

y pegar dentro tu cookie `session` de Advent of Code (Menú de desarrollador > Almacenamiento > Cookies).  
(**IMPORTANTE:** No la subas a GitHub.)

### 2️⃣ Crear un día nuevo

Ejecutar:

```bash
node setupDay.mjs 1
```

Esto generará:

```
day01/
  input.txt
  part1.js
  part2.js
```

Para cualquier otro día:

```bash
node setupDay.mjs 2
node setupDay.mjs 3
```

---

## ▶️ Ejecutar las soluciones

Entrar en la carpeta del día:

```bash
cd day01
```

Ejecutar las partes:

```bash
node part1.js
node part2.js
```

---

## 🧠 Objetivo del repositorio

Este proyecto me sirve para:

- Practicar JavaScript desde cero  
- Resolver retos reales y progresivos  
- Documentar mi aprendizaje  
- Profundizar en:
  - Arrays (`map`, `filter`, `reduce`, `slice`…)  
  - Matemáticas modulares  
  - Bucles  
  - Lectura/escritura de archivos  
  - Buenas prácticas  

---

## 📚 Documentación adicional

Algunos días incluyen:

```
readmeDay01Part1.md
readmeDay01Part2.md
```

con explicaciones paso a paso.

---

## ⭐ Progreso

| Día | Parte 1 | Parte 2 |
|-----|---------|---------|
| 01  | ⭐      | ⏳      |
| 02  | ⏳      | ⏳      |
| ... | ...     | ...     |

---

## ❄️ ¡Feliz Advent of Code!

Cada puzzle trae un nuevo reto, una nueva lección  
y un poco de espíritu navideño ✨
