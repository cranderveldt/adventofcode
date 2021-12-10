const input = ``
const rows = input.split("\n").map(row => Array.from(row).map(col => parseInt(col, 10)))

const checkFourSides = (target, y, x) => {
  const positions =  [[0, 1], [0, -1], [-1, 0], [1, 0]]
  return positions.reduce((acc, [yOffset, xOffset]) => (
    acc && target < (rows[y + yOffset]?.[x + xOffset] ?? 10)
  ), true)
}

// Part 1
const calcRiskLevel = () => (
  rows.reduce((acc1, row, y) => (
    acc1 + row.reduce((acc2, col, x) => (
      acc2 + (checkFourSides(col, y, x) ? col + 1 : 0)
    ), 0)
  ), 0)
)

console.log(calcRiskLevel())

// Part 2
const valueForPos = ({ x, y }) => rows[y]?.[x] ?? 10
const posToString = ({ x, y }) => `${x},${y}`
const comparePoints = (a, b) => a.x === b.x && a.y === b.y
const lowdown = (pos, dir) => {
  Object.keys(dir).forEach(axis => pos[axis] = pos[axis] + dir[axis])
  return { value: valueForPos(pos), pos, dir }
}

const tracer = (pos, dir) => {
  const forward = lowdown({ ...pos }, dir)
  const left = lowdown({ ...pos }, { x: dir.y, y: dir.x * -1 })
  const leftCorner = lowdown({ ...left.pos }, { x: left.dir.y, y: left.dir.x * -1 })

  const rightDir = { x: dir.y * -1, y: dir.x }

  if (left.value < 9 && leftCorner.value > 8) {
    // console.log(`${left.value}: Left side is ${left.value} at ${posToString(left.pos)}, and I see a ${leftCorner.value} on my left corner at ${posToString(leftCorner.pos)}; turning left and moving`)
    return { wall: false, pos: left.pos, dir: left.dir }
  } else if (forward.value > 8) {
    // console.log(`-: Wall ahead at ${posToString(forward.pos)}, turning right and staying on ${posToString(pos)}`)
    return { wall: true, pos, dir: rightDir }
  } else {
    // console.log(`${forward.value}: Moving forward to ${posToString(forward.pos)} from ${posToString(pos)} because ${forward.value} is great! Left Corner: ${posToString(leftCorner.pos)}`)
    return { wall: false, pos: forward.pos, dir }
  }
}

const traceEdges = (low) => {
  let pos = { ...low }
  let dir = { x: 0, y: -1 }
  let firstWall = null
  let wall = false
  let done = false
  let points = { [pos.y]: [ pos.x ] }
  // console.log(`Starting at ${posToString(pos)} facing up`)

  while (!done) {
    let trace = tracer(pos, dir)
    if (firstWall && !comparePoints(pos, trace.pos) && comparePoints(trace.pos, firstWall)) {
      // console.log(`Detected starting wall ${posToString(firstWall)}, trace is complete`)
      done = true
    }
    pos = trace.pos
    dir = trace.dir
    wall = trace.wall
    if (!points[pos.y] || !points[pos.y].includes(pos.x)) {
      points[pos.y] = points[pos.y] || []
      points[pos.y].push(pos.x)
    }
    if (wall && !firstWall) {
      firstWall = { ...pos }
    }
  }
  return points
}

const findBasins = () => {
  const lows = []
  rows.forEach((row, y) => {
    row.forEach((col, x) => {
      if (checkFourSides(col, y, x)) {
        lows.push({ x, y })
      }
    })
  })

  const basins = lows.map(low => traceEdges(low)).map(trace => {
    return Object.keys(trace).map(y => parseInt(y, 10)).reduce((acc, y) => {
      const xEdges = trace[y].sort((a, b) => a - b)
      let count = 0
      for (let x = xEdges[0]; x <= xEdges[xEdges.length - 1]; x++) {
        count = count + (rows[y][x] < 9 ? 1 : 0)
      }
      return acc + count
    }, 0)
  }).sort((a, b) => b - a)

  return basins[0] * basins[1] * basins[2]
}

console.log(findBasins())
