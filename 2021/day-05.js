const input = ``

const lines = input.split("\n").map(line =>
  line.split(" -> ").map(coord => {
    const arr = coord.split(',').map(point => parseInt(point, 10))
    return { x: arr[0], y: arr[1] }
  })
)

const axisDir = (line, axis) => line[0][axis] < line[1][axis] ? 1 : line[0][axis] > line[1][axis] ? -1 : 0

const countSignificantOverlaps = (filter) => {
  const usableLines = lines.filter(filter)

  const result = usableLines.reduce((acc, line) => {
    const xDir = axisDir(line, 'x')
    const yDir = axisDir(line, 'y')
    const changeAxis = line[0].x !== line[1].x ? 'x' : 'y'
    const lineDelta = Math.abs(line[0][changeAxis] - line[1][changeAxis])

    for (let i = 0; i <= lineDelta; i++) {
      const key = `${line[0].x + i * xDir},${line[0].y + i * yDir}`
      acc[key] = acc[key] || 0
      acc[key] = acc[key] + 1
    }

    return acc
  }, {})

  return Object.keys(result).filter(key => result[key] >= 2).length
}

// Part 1
console.log(countSignificantOverlaps(line => line[0].x === line[1].x || line[0].y === line[1].y))

// Part 2
console.log(countSignificantOverlaps(x => x))
