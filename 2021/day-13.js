const input = ``

let [dots, folds] = input.split("\n\n")
dots = dots.split("\n").map(dot => dot.split(',').map(axis => parseInt(axis, 10))).map(dot => ({ x: dot[0], y: dot[1] }))
folds = folds.split("\n").map(fold => fold.split('fold along ')[1].split('=')).map(fold => ({ axis: fold[0], value: fold[1] }))

const dotString = (dot) => `${dot.x},${dot.y}`
let firstCount = 0

const capitals = folds.reduce((remaining, fold) => {
  const dotObj = remaining.reduce((acc, dot) => {
    let newDot = { ...dot }
    if (dot[fold.axis] > fold.value) {
      newDot[fold.axis] = fold.value - (newDot[fold.axis] - fold.value)
      remaining.push(newDot)
    }
    acc[dotString(newDot)] = true
    return acc
  }, {})
  firstCount = firstCount || Object.keys(dotObj).length
  return remaining.filter(dot => dot[fold.axis] < fold.value)
}, [...dots])

// Part 1
console.log(firstCount)

// Part 2
const dotExists = (arr, x, y) => arr.some(a => a.x === x && a.y === y)

const printCapitals = () => {
  const {x, y} = capitals.reduce((acc, dot) => {
    acc.x = Math.max(acc.x, dot.x)
    acc.y = Math.max(acc.y, dot.y)
    return acc
  }, { x: 0, y: 0 })

  let str = ''
  for (let a = 0; a <= y; a++) {
    for (let b = 0; b <= x; b++) {
      str = `${str}${dotExists(capitals, b, a) ? '#' : '.'}`
    }
    str = str + "\n"
  }
  console.log(str)
}

printCapitals()
