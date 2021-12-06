const input = ``

const sequence = input.split("\n")[0].split(',').map(x => parseInt(x, 10))
const boards = input.split("\n\n").slice(1).map(x => (
  x.split("\n").map(y => (
    y.trim().split(/\s+/).map(z => (
      { value: parseInt(z, 10), called: false }
    ))
  ))
))
let winners = []

const alreadyWon = boardId => !!winners.find(winner => winner.id === boardId)

const checkWin = (board, boardId) => {
  if (alreadyWon(boardId)) { return false }

  const anyWin = board.reduce((acc, row, rowIndex) => {
    acc.rowWin = acc.rowWin || row.every(col => col.called)
    row.forEach((col, colIndex) => acc.colWins[colIndex] = acc.colWins[colIndex] && col.called)
    acc.leftDiagonal += Number(row[rowIndex].called)
    acc.rightDiagonal += Number(row[board.length - 1 - rowIndex].called)
    return acc
  }, {
    rowWin: false,
    colWins: board[0].map(_ => true),
    leftDiagonal: 0,
    rightDiagonal: 0,
  })

  return anyWin.rowWin ||
         anyWin.colWins.some(colWin => colWin) ||
         anyWin.leftDiagonal === boards.length ||
         anyWin.rightDiagonal === boards.length
}

const winnerScore = (board, pull) => {
  const sumOfUnmarked = board.reduce((acc, row) => acc + row.filter(col => !col.called).reduce((ac, col) => ac + col.value, 0), 0)
  return sumOfUnmarked * pull
}

const win = (board, pull, id) => {
  winners.push({ board, id, pull, score: winnerScore(board, pull) })
}

sequence.forEach(pull => {
  boards.forEach((board, boardIndex) => {
    board.forEach(row => {
      row.filter(col => col.value === pull).forEach(col => col.called = true)
    })
    if (checkWin(board, boardIndex)) {
      win(board, pull, boardIndex)
    }
  })
})

// Part 1
console.log(winners[0].score)

// Part 2
console.log(winners[winners.length - 1].score)
