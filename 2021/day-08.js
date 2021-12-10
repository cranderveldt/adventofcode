const input = ``

const segments = input.split("\n").map(segment => {
  let [ signal, output ] = segment.split(" | ").map(phrase =>
    phrase.split(" ").map(y => y.split('').sort().join(''))
  )
  signal = signal.sort((a, b) => a.length - b.length)
  return { signal, output }
})

// Part 1
const countUniqueValues = (lengths) => {
  return segments.reduce((count, segment) => (
    count + segment.output.filter(x => lengths.includes(x.length)).length
  ), 0)
}

console.log(countUniqueValues([2, 4, 3, 7]))

// Part 2
String.prototype.difference = function(str) {
  return Array.from(this).filter(x => !str.includes(x)).join('')
}

const getLookupForSignal = (signal) => {
  let lookup = {
    1: signal[0],
    4: signal[2],
    7: signal[1],
    8: signal[9],
  }

  lookup.a = lookup[7].difference(lookup[1])

  lookup[9] = signal
    .filter(str => str.length === 6)
    .filter(str => str.difference(lookup[4] + lookup.a).length === 1)[0]

  const [zero, six] = signal
    .filter(str => str.length === 6 && str !== lookup[9])
    .sort((a, b) =>
      a.difference(lookup[1]).length - b.difference(lookup[1]).length
    )
  lookup[0] = zero
  lookup[6] = six

  lookup[3] = signal
    .filter(str => str.length === 5)
    .filter(str => str.difference(lookup[1]).length === 3)[0]

  lookup.c = lookup[1].difference(lookup[6])

  const [two, five] = signal
    .filter(str => str.length === 5 && str !== lookup[3])
    .sort((a, b) =>
      a.difference(lookup.c).length - b.difference(lookup.c).length
    )

  lookup[2] = two
  lookup[5] = five

  for (let i = 0; i < 10; i++) {
    lookup[lookup[i]] = i
  }

  return lookup
}

const calcOutputValue = () => {
  return segments.reduce((value, segment) => {
    const lookup = getLookupForSignal([...segment.signal])
    const output = segment.output.reduce((acc, str) => acc + lookup[str], '')
    return value + parseInt(output, 10)
  }, 0)
}

console.log(calcOutputValue())
