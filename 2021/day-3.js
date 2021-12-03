const input = ``
const bytes = input.split("\n")

// Part 1
const flipBits = byte => byte.split('').map(x => Number(x === '0')).join('')

const powerConsumption = () => {
  const sums = bytes[0].split('').map((_, bitIndex) => (
    bytes.reduce((acc, byte) => acc + parseInt(byte[bitIndex], 10), 0))
  )

  const gamma = sums.map(sum => Number(bytes.length - sum <= sum)).join('')
  const epsilon = flipBits(gamma)

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

console.log(powerConsumption())

// Part 2
const filterForRating = (flipBool) => {
  return bytes[0].split('').reduce((remaining, _, bitIndex) => {
    if (remaining.length === 1) { return remaining }
    const sum = remaining.reduce((acc, byte) => acc + parseInt(byte[bitIndex], 10), 0)
    const common = Number(remaining.length - sum <= sum)
    const comparator = flipBool ? Number(!common) : common
    return remaining.filter(byte => parseInt(byte[bitIndex], 10) === comparator)
  }, [...bytes])[0]
}

const lifeSupportRating = () => {
  const o2GenRating = filterForRating(false)
  const co2ScrubRating = filterForRating(true)
  return parseInt(o2GenRating, 2) * parseInt(co2ScrubRating, 2)
}

console.log(lifeSupportRating())
