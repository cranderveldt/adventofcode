
const input = `` // Input goes here
const nums = input.split("\n").map(x => parseInt(x, 10))

// Part 1
const inc_count = nums.reduce((acc, num, index) => acc + (!!nums[index - 1] && num > nums[index - 1] ? 1 : 0), 0)
console.log(inc_count)

// Part 2
const sumFromRange = (range, index, arr) => range.reduce((acc, r) => acc + arr[index + r], 0)

const window_inc_count = nums.reduce((acc, num, index) => {
  if (!nums[index - 1] || !nums[index + 2]) { return acc }
  const b = sumFromRange([0, 1, 2], index, nums)
  const a = sumFromRange([-1, 0, 1], index, nums)
  return acc + (b > a ? 1 : 0)
}, 0)

console.log(window_inc_count)
