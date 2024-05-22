export function getRandomInt(max: number): number {
  let r = Math.floor(Math.random() * max);

  return r;
}

export type Cell = {
  revealed: boolean;
  isMine: number;
  isFlagged: boolean;
  adjacentMines: number;
};


export function calculateCellAdjacentMines(
  x: number,
  y: number,
  board: Cell[][]
): number {
  let totalMines = 0;

  const coordsToCheck: number[][] = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];

  const maxHeight: number = board.length;
  const maxWidth: number = board[0].length;

  for (let i = 0; i < coordsToCheck.length; i++) {
    const coords = coordsToCheck[i];
    const m = coords[0];
    const n = coords[1];
    if (!(m < 0 || m >= maxWidth || n < 0 || n >= maxHeight)) {
      let cell = board[n][m];

      if (cell.isMine) {
        totalMines++;
      }
    }
  }

  return totalMines;
}

export function calculateBoardAdjacentMines(board: Cell[][]): Cell[][] {
  let newBoard: Cell[][] = [];

  for (let j = 0; j < board.length; j++) {
    const row = board[j];

    let newRow: Cell[] = [];

    for (let i = 0; i < row.length; i++) {
      let cell: Cell = row[i];

      cell.adjacentMines = calculateCellAdjacentMines(i, j, board);

      newRow.push(cell);
    }
    newBoard.push(newRow);
  }
  return newBoard;
}