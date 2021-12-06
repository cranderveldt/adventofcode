const input = ``

const fishes = input.split(",").map(x => parseInt(x, 10))

const breed = (days) => {
  const schools = fishes.reduce((acc, fish) => {
    acc[fish] = (acc[fish] || 0) + 1
    return acc
  }, {})

  for (let day = 0; day < days; day++) {
    Object.keys(schools).map(x => parseInt(x, 10)).forEach(key => {
      schools[key - 1] = schools[key]
      schools[key] = 0
    })

    if (schools[-1]) {
      schools[6] = (schools[6] || 0) + schools[-1]
      schools[8] = schools[-1]
    }
    delete schools[-1]
  }

  return Object.keys(schools).reduce((acc, key) => acc + schools[key], 0)
}

// Part 1
console.log(breed(80))

// Part 2
console.log(breed(256))
