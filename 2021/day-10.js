const input = ``
const lines = input.split("\n")

const matchLookup = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const closing = (symbol) => Object.values(matchLookup).includes(symbol)
const match = (open, close) => matchLookup[open] === close

const sortLines = () => {
  const sifted = lines.map(line => {
    const symbols = Array.from(line)
    return symbols.reduce((acc, symbol) => {
      if (typeof acc === 'string') { return acc }
      if (closing(symbol)) {
        const open = acc.pop()
        acc = match(open, symbol) ? acc : symbol
      } else {
        acc.push(symbol)
      }
      return acc
    }, [])
  })
  return {
    corrupted: sifted.filter(x => typeof x === 'string'),
    incomplete: sifted.filter(x => typeof x !== 'string'),
  }
}

// Part 1
const totalCorruptedScore = () => {
  const scoreLookup = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }
  const sifted = sortLines()
  return sifted.corrupted.map(x => scoreLookup[x]).reduce((acc, score) => acc + score, 0)
}

console.log(totalCorruptedScore())

// Part 2
const totalIncompleteScore = () => {
  const scoreLookup = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }
  const sifted = sortLines()
  const sorted = sifted.incomplete.map(sequence => (
    sequence
      .reverse()
      .map(x => matchLookup[x])
      .map(x => scoreLookup[x])
      .reduce((acc, num) => acc * 5 + num, 0)
  )).sort((a, b) => a - b)

  return sorted[Math.floor(sorted.length / 2)]
}

console.log(totalIncompleteScore())
