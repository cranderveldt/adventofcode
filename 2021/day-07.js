const input = ``

const crabs = input.split(",").map(x => parseInt(x, 10)).sort((a, b) => a - b)

// Part 1
const linearFuel = crabs.reduce((minSteps, target) => {
  const steps = crabs.reduce((sum, crab) => sum + Math.abs(crab - target), 0)
  return Math.min(steps, minSteps)
}, Infinity)

console.log(linearFuel)

// Part 2
const dynamicFuel = crabs.reduce((minSteps, target) => {
  const steps = crabs.reduce((sum, crab) => {
    const diff = Math.abs(crab - target)
    return sum + Math.floor((Math.pow(diff, 2) + diff) / 2)
  }, 0)
  return Math.min(steps, minSteps)
}, Infinity)

console.log(dynamicFuel)
