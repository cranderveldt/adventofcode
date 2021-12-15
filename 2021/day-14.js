const input = ``

let [template, rules] = input.split("\n\n")
rules = rules.split("\n").map(rule => rule.split(" -> ")).map(rule => ({ in: rule[0], out: rule[1] }))

const polymerStringToPairs = (str) => str.split('')
  .map((char, index, arr) => `${char}${arr[index + 1]}`)
  .filter((_, index, arr) => index < arr.length - 1)

const joinPairs = pairs => pairs.map((pair, index) =>
    pair.substr(0, index < (pairs.length -1) ? pair.length - 1 : pair.length )
  ).join('')

const ruleOutputForPair = (pair) => rules.find(rule => rule.in === pair).out

const strToLookup = (str) => {
  return polymerStringToPairs(str).reduce((acc, pair) => {
    acc[pair] = Number(acc[pair] ?? 0) + 1
    return acc
  }, {})
}

const splitTriads = (lookup) => {
  Object.keys(lookup).forEach(triad => {
    polymerStringToPairs(triad).forEach(pair => {
      lookup[pair] = Number(lookup[pair] ?? 0) + lookup[triad]
    })
    delete lookup[triad]
  })
  return lookup
}

const insertPairs = (lookup) => {
  Object.keys(lookup).forEach(pair => {
    const triad = `${pair[0]}${ruleOutputForPair(pair)}${pair[1]}`
    lookup[triad] = lookup[pair]
    delete lookup[pair]
  })
  return splitTriads(lookup)
}

const findPolymer = (loops, str) => {
  let lookup = strToLookup(str)

  for (let i = 0; i < loops; i++) {
    lookup = insertPairs(lookup)
  }

  const counts = Object.keys(lookup).reduce((acc, key) => {
    acc[key[0]] = Number(acc[key[0]] ?? 0) + lookup[key]
    return acc
  }, {})

  counts[str[str.length - 1]]++

  const sorted = Object.values(counts).sort((a, b) => a - b)

  return sorted[sorted.length - 1] - sorted[0]
}

// Part 1
console.log(findPolymer(10, template))

// Part 2
console.log(findPolymer(40, template))
