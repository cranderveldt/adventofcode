const input = ``

const rows = input.split("\n").map(row => row.split('').map(col => parseInt(col, 10)))
let flashCount = 0
let flashesPerStep = 0

const bumpByPos = (x, y) => {
  const row = rows[y] || []
  return ++row[x] || 0
}

const flash = (x, y) => {
  flashCount++
  flashesPerStep++
  rows[y][x] = -Infinity
  const steps = [-1, 0, 1]
  steps.forEach(a => {
    steps.forEach(b => {
      const value = bumpByPos(x + b, y + a)
      if (value > 9) {
        flash(x + b, y + a)
      }
    })
  })
}

const handleFlashes = () => {
  rows.forEach((row, y) => row.forEach((_, x) => {
    if (row[x] > 9) {
      flash(x, y)
    }
  }))
  rows.forEach((row, y) => row.forEach((_, x) => {
    if (row[x] === -Infinity) {
      row[x] = 0
    }
  }))
}

const advanceStep = () => {
  rows.forEach(row => row.forEach((_, x) => row[x]++))
  handleFlashes()
}

// Part 1
for (let i = 0; i < 100; i++) {
  advanceStep()
  console.log(`Flashcount: ${flashCount}`)
}

// Part 2
let steps = 0
while(flashesPerStep !== 100) {
  flashesPerStep = 0
  advanceStep()
  steps++
}

console.log(steps)
