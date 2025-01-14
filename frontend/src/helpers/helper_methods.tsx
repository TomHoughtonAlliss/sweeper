export function getRandomInt(max: number): number {
  const r = Math.floor(Math.random() * max);

  return r;
}

export type CellType = {
  revealed: boolean;
  isMine: number;
  isFlagged: boolean;
  adjacentMines: number;
};

export function revealAllMines(board: CellType[][]): CellType[][] {
  const newBoard: CellType[][] = [];
  for (let j = 0; j < board.length; j++) {
    const row: CellType[] = board[j];
    const newRow: CellType[] = [];
    for (let i = 0; i < row.length; i++) {
      const cell: CellType = row[i];

      if (cell.isMine) {
        cell.revealed = true;
      }

      newRow.push(cell);
    }
    newBoard.push(newRow);
  }
  return newBoard;
}

export function calculateCellAdjacentMines(
  x: number,
  y: number,
  board: CellType[][]
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
      const cell = board[n][m];

      if (cell.isMine) {
        totalMines++;
      }
    }
  }

  return totalMines;
}

export function calculateBoardAdjacentMines(board: CellType[][]): CellType[][] {
  const newBoard: CellType[][] = [];

  for (let j = 0; j < board.length; j++) {
    const row = board[j];

    const newRow: CellType[] = [];

    for (let i = 0; i < row.length; i++) {
      const cell: CellType = row[i];

      cell.adjacentMines = calculateCellAdjacentMines(i, j, board);

      newRow.push(cell);
    }
    newBoard.push(newRow);
  }
  return newBoard;
}

export function instantiateBoard(
  width: number,
  height: number,
  bombs: number
): CellType[][] {
  let board: CellType[][] = [];
  const bombCoords: number[][] = [];

  for (let i = 0; i < bombs; i++) {
    let randX = getRandomInt(width);
    let randY = getRandomInt(height);

    const cellContained = (cell: number[]) =>
      cell[0] === randX && cell[1] === randY;

    while (bombCoords.some(cellContained)) {
      randX = getRandomInt(width);
      randY = getRandomInt(height);
    }

    bombCoords.push([randX, randY]);
  }

  for (let j = 0; j < height; j++) {
    const row: CellType[] = [];
    for (let i = 0; i < width; i++) {
      const cell: CellType = {
        revealed: false,
        isMine: 0,
        isFlagged: false,
        adjacentMines: 0,
      };

      const cellContains = (cell: number[]) => cell[0] === i && cell[1] === j;

      if (bombCoords.some(cellContains)) {
        cell.isMine = 1;
      }

      row.push(cell);
    }
    board.push(row);
  }
  board = calculateBoardAdjacentMines(board);

  return board;
}

export function checkIfGameWon(board: CellType[][]): boolean {
  for (let j = 0; j < board.length; j++) {
    const row = board[j];
    for (let i = 0; i < row.length; i++) {
      const cell = row[i];

      if (
        !((cell.isMine && cell.isFlagged) || (!cell.isMine && cell.revealed))
      ) {
        return false;
      }
    }
  }
  return true;
}

export function getDate(): string {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
}