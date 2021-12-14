const input = ``
const lines = input.split("\n").map(line => line.split('-'))

const tree = lines.reduce((acc, [a, b]) => {
  acc[a] = acc[a] || []
  acc[b] = acc[b] || []
  if (!acc[a].includes(b)) {
    acc[a].push(b)
  }

  if (!acc[b].includes(a)) {
    acc[b].push(a)
  }
  return acc
}, {})

const smallCave = (cave) => cave[0] === cave[0].toLowerCase()
const capCave = cave => cave === 'start' || cave === 'end'
const underSmallCaveLimit = (path, key) => {
  const counts = path.split(',')
    .filter(cave => smallCave(cave) && !capCave(cave))
    .reduce((acc, cave) => {
      acc[cave] = Number(acc[cave] ?? 0) + 1
      return acc
    }, {})
  return Object.values(counts).every(count => count < 2) && !capCave(key)
}

let wins = []

const traverse = (path, cave, conditional) => {
  const split = path.split(',').filter(x => x)
  path = [...split, cave].join(',')
  if (cave === 'end') {
    wins.push(path)
    return
  }
  tree[cave].forEach(branch => {
    if (conditional(path, branch)) {
      traverse(path, branch, conditional)
    }
  })
}

// Part 1
traverse('', 'start', (path, cave) => !path.includes(cave) || !smallCave(cave))
console.log(wins.length)

wins = []

// Part 2
traverse('', 'start', (path, cave) => !path.includes(cave) || !smallCave(cave) || underSmallCaveLimit(path, cave))
console.log(wins.length)
