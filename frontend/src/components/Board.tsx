type Cell = {
  revealed: boolean;
  isMine: number;
  isFlagged: boolean;
  adjacentMines: number;
};

function getRandomInt(max: number): number {
  let r = Math.floor(Math.random() * max);

  return r;
}

function calculateCellAdjacentMines(
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
    if (!((m < 0 || m >= maxHeight) || (n < 0 || n >= maxWidth))) {
        let cell = board[n][m];

        if (cell.isMine) {
        totalMines++;
        }
    }
  }

  return totalMines;
}

function calculateBoardAdjacentMines(board: Cell[][]): Cell[][] {
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

function instantiateBoard(
  width: number,
  height: number,
  bombs: number
): Cell[][] {
  let board: Cell[][] = [];
  let bombCoords: number[][] = [];

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
    const row: Cell[] = [];
    for (let i = 0; i < width; i++) {
      let cell: Cell = {
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

export default function Board() {
  let board = instantiateBoard(10, 10, 10);

  return (
    <div
      style={{
        display: "inline-flex",
        margin: "2rem",
        border: "1px solid gray",
      }}
    >
      {board.map((row: Cell[], yIndex: number) => {
        return (
          <div style={{}}>
            {row.map((cell: Cell, xIndex: number) => {
              return (
                <div
                  style={{
                    border: "0.5px solid gray",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#DCDCDC",
                  }}
                  >
                  {cell.isMine ? "X" : (cell.adjacentMines === 0 ? " " : cell.adjacentMines)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
