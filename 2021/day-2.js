const input = ``
const instructions = input.split("\n").map(x => [x.split(' ')[0], parseInt(x.split(' ')[1], 10)])

// Part 1
const pilotSubSimple = () => {
  const loc = [0, 0]
  instructions.forEach(([dir, amount]) => {
    const axis = dir === 'forward' ? 0 : 1
    const coef = dir === 'up' ? -1 : 1
    loc[axis] += (amount * coef)
  })
  console.log(loc)
  return loc[0] * loc[1]
}
console.log(pilotSubSimple())


// Part 2
const pilotSubAim = () => {
  const loc = [0, 0, 0]
  instructions.forEach(([dir, amount]) => {
    const moving = dir === 'forward'
    const coef = dir === 'up' ? -1 : 1
    if (moving) {
      loc[0] += amount
      loc[1] += (amount * loc[2])
    } else {
      loc[2] += (amount * coef)
    }
  })
  console.log(loc)
  return loc[0] * loc[1]
}
console.log(pilotSubAim())
