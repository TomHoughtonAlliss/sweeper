import { useEffect, useState } from "react";

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
    if (!(m < 0 || m >= maxWidth || n < 0 || n >= maxHeight)) {
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

function revealAllMines(board: Cell[][]): Cell[][] {
  let newBoard: Cell[][] = [];
  for (let j = 0; j < board.length; j++) {
    const row: Cell[] = board[j];
    let newRow: Cell[] = [];
    for (let i = 0; i < row.length; i++) {
      let cell: Cell = row[i];

      if (cell.isMine) {
        cell.revealed = true;
      }

      newRow.push(cell);
    }
    newBoard.push(newRow);
  }
  return newBoard;
}

function gameWon(board: Cell[][]): boolean {
  for (let j = 0; j < board.length; j++) {
    let row = board[j];
    for (let i = 0; i < row.length; i++) {
      let cell = row[i];

      if (
        !((cell.isMine && cell.isFlagged) || (!cell.isMine && cell.revealed))
      ) {
        return false;
      }
    }
  }
  return true;
}

interface BoardProps {
  width: number;
  height: number;
  numberOfBombs: number;
}

export default function Board({ width, height, numberOfBombs }: BoardProps) {
  let initialBoard = instantiateBoard(width, height, numberOfBombs);
  const [board, setBoard] = useState<Cell[][]>(initialBoard);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    // Generate the board here
    const newBoard = instantiateBoard(width, height, numberOfBombs);
    setBoard(newBoard);
  }, [width, height, numberOfBombs]);

  function revealCell(x: number, y: number, board: Cell[][]) {
    let newBoard = [...board];

    newBoard[y][x].revealed = true;

    if (gameWon(newBoard)) {
      setGameFinished(true);
    }

    if (board[y][x].isMine) {
      newBoard = revealAllMines(newBoard);
      setGameOver(true);
    }

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

    const maxHeight = board.length;
    const maxWidth = board[0].length;
    if (board[y][x].adjacentMines === 0) {
      for (let i = 0; i < coordsToCheck.length; i++) {
        const coords = coordsToCheck[i];
        const x = coords[0];
        const y = coords[1];

        if (!(x < 0 || x >= maxWidth || y < 0 || y >= maxHeight)) {
          if (!board[y][x].revealed) {
            revealCell(x, y, board);
          }
        }
      }
    }

    setBoard(newBoard);
  }
  function flagCell(x: number, y: number, board: Cell[][]) {
    let newBoard = [...board];

    newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged;

    setBoard(newBoard);
  }

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
          <div
            style={{}}
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          >
            {row.map((cell: Cell, xIndex: number) => {
              if (cell.revealed) {
                if (cell.isMine) {
                  return (
                    <div
                      style={{
                        border: "0.5px solid gray",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#B0B0B0",
                        fontSize: "25px",
                        color: "red",
                      }}
                    >
                      ⦿
                    </div>
                  );
                } else {
                  return (
                    <div
                      style={{
                        border: "0.5px solid gray",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#B0B0B0",
                      }}
                      onClick={() => revealCell(xIndex, yIndex, board)}
                      onContextMenu={() => flagCell(xIndex, yIndex, board)}
                    >
                      {cell.adjacentMines === 0 ? " " : cell.adjacentMines}
                    </div>
                  );
                }
              } else if (cell.isFlagged) {
                return (
                  <div
                    style={{
                      border: "0.5px solid gray",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: gameFinished ? "green" : "DCDCDC",
                      color: "red",
                      fontWeight: "1000",
                    }}
                    onClick={() => revealCell(xIndex, yIndex, board)}
                    onContextMenu={() => flagCell(xIndex, yIndex, board)}
                  >
                    ⚑
                  </div>
                );
              } else {
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
                    onClick={() => revealCell(xIndex, yIndex, board)}
                    onContextMenu={() => flagCell(xIndex, yIndex, board)}
                  ></div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}
