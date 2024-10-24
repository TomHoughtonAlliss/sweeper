import { useEffect, useState } from "react";
import {
  instantiateBoard,
  revealAllMines,
  checkIfGameWon,
} from "../helpers/helper_methods";
import type { CellType } from "../helpers/helper_methods";
import Cell from "./Cell";

function leftClickCell(
  x: number,
  y: number,
  board: CellType[][],
  setBoard: (board: CellType[][]) => void,
  setGameWon: (won: boolean) => void,
  setGameLost: (lost: boolean) => void,
  clickCount: number,
  setClickCount: (count: number) => void,
  setTimerStarted: (on: boolean) => void,
  setStartTime: (time: number) => void,
) {
  if (clickCount === 0) {
    setClickCount(1);
    setStartTime(Date.now());
    setTimerStarted(true);
  }

  let newBoard: CellType[][];

  if (board[y][x].isMine) {
    newBoard = revealAllMines(board);
    setGameLost(true);
    setGameWon(false);
    setTimerStarted(false);
    setClickCount(0);
  } else {
    newBoard = [...board];
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

    newBoard[y][x].revealed = true;
    if (newBoard[y][x].adjacentMines === 0) {
      for (let i = 0; i < coordsToCheck.length; i++) {
        const m = coordsToCheck[i][0];
        const n = coordsToCheck[i][1];

        if (0 <= m && m < board[0].length && 0 <= n && n < board.length) {
          if (!board[n][m].revealed) {
            leftClickCell(
              m, 
              n, 
              newBoard, 
              setBoard, 
              setGameWon, 
              setGameLost,
              clickCount,
              setClickCount,
              setTimerStarted,
              setStartTime,
            );
          }
        }
      }
    }
  }

  if (checkIfGameWon(board)) {
    setGameWon(true);
    setGameLost(false);
    setTimerStarted(false);
    setClickCount(0);
  }

  setBoard(newBoard);
}

function rightClickCell(
  xIndex: number,
  yIndex: number,
  board: CellType[][],
  setBoard: (board: CellType[][]) => void,
  setGameWon: (won: boolean) => void,
  setGameLost: (lost: boolean) => void,
  setTimerStarted: (on: boolean) => void,
  setClickCount: (count: number) => void,
) {
  const newBoard = [...board];

  newBoard[yIndex][xIndex].isFlagged = !newBoard[yIndex][xIndex].isFlagged;

  if (checkIfGameWon(board)) {
    setGameWon(true);
    setGameLost(false);
    setTimerStarted(false);
    setClickCount(0);
  }

  setBoard(newBoard);
}

export default function Board({
  width,
  height,
  numberOfBombs,
  gameWon,
  gameLost,
  setGameWon,
  setGameLost,
  clickCount,
  setClickCount,
  setTimerStarted,
  setStartTime,
}: {
  width: number;
  height: number;
  numberOfBombs: number;
  gameWon: boolean;
  gameLost: boolean;
  setGameWon: (gameWon: boolean) => void;
  setGameLost: (gameLost: boolean) => void;
  clickCount: number;
  setClickCount: (count: number) => void;
  setTimerStarted: (on: boolean) => void;
  setStartTime: (time: number) => void;
}) {
  const [board, setBoard] = useState<CellType[][]>([]);

  useEffect(() => {
    const initialBoard = instantiateBoard(width, height, numberOfBombs);
    setBoard(initialBoard);
  }, [width, height, numberOfBombs]);

  return (
    <div
      style={{
        display: "flex",
        margin: "2rem",
        border: "1px solid gray",
      }}
    >
      {board.map((row, j) => {
        return (
          <div
            style={{}}
            key={"what the flip"}
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          >
            {row.map((cell, i) => {
              return (
                <Cell
                  key={"what the other flip"}
                  cell={cell}
                  xIndex={i}
                  yIndex={j}
                  board={board}
                  setBoard={setBoard}
                  gameWon={gameWon}
                  gameLost={gameLost}
                  onClick={() =>
                    leftClickCell(
                      i,
                      j,
                      board,
                      setBoard,
                      setGameWon,
                      setGameLost,
                      clickCount,
                      setClickCount,
                      setTimerStarted,
                      setStartTime,
                    )
                  }
                  onContextMenu={() =>
                    rightClickCell(
                      i,
                      j,
                      board,
                      setBoard,
                      setGameWon,
                      setGameLost,
                      setTimerStarted,
                      setClickCount,
                    )
                  }
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
