import { useEffect, useState } from "react";
import {
  instantiateBoard,
  revealAllMines,
  checkIfGameWon,
} from "../helpers/helper_methods";
import type { CellType } from "../helpers/helper_methods";
import Cell from "./Cell";
import { GameConfig, TimerConfig } from "./Game";

function win(
  {
    config,
    setConfig,
    timer,
    setTimer,
  }: {
    config: GameConfig,
    setConfig: (c: GameConfig) => void,
    timer: TimerConfig,
    setTimer: (c: TimerConfig) => void,
  }) {
  setConfig({
    ...config,
    gameWon: true,
    gameLost: false,
    clickCount: 0,
  });

  setTimer({
    ...timer,
    timerStarted: false,
  });
}

function lose(
  {
    config,
    setConfig,
    timer,
    setTimer,
  }: {
    config: GameConfig,
    setConfig: (c: GameConfig) => void,
    timer: TimerConfig,
    setTimer: (c: TimerConfig) => void,
  }) {
  setConfig({
    ...config,
    gameWon: false,
    gameLost: true,
    clickCount: 0,
  });

  setTimer({
    ...timer,
    timerStarted: false,
  });
}

function leftClickCell(
  x: number,
  y: number,
  board: CellType[][],
  setBoard: (board: CellType[][]) => void,
  config: GameConfig,
  setConfig: (c: GameConfig) => void,
  timer: TimerConfig,
  setTimer: (c: TimerConfig) => void,
) {
  if (config.clickCount === 0) {
    setConfig({
      ...config,
      clickCount: 1,
    });

    setTimer({
      startTime: Date.now(),
      timerStarted: true,
    });
  }

  let newBoard: CellType[][];

  if (board[y][x].isMine) {
    newBoard = revealAllMines(board);
    lose({
      config,
      setConfig,
      timer,
      setTimer,
    });
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
              config,
              setConfig,
              timer,
              setTimer,
            );
          }
        }
      }
    }
  }

  if (checkIfGameWon(board)) {
    win({
      config,
      setConfig,
      timer,
      setTimer,
    })
  }

  setBoard(newBoard);
}

function rightClickCell(
  xIndex: number,
  yIndex: number,
  board: CellType[][],
  setBoard: (board: CellType[][]) => void,
  config: GameConfig,
  setConfig: (c: GameConfig) => void,
  timer: TimerConfig,
  setTimer: (c: TimerConfig) => void,
) {
  const newBoard = [...board];

  newBoard[yIndex][xIndex].isFlagged = !newBoard[yIndex][xIndex].isFlagged;

  if (checkIfGameWon(board)) {
    win({
      config,
      setConfig,
      timer,
      setTimer,
    })
  }

  setBoard(newBoard);
}

export default function Board({
  config,
  setConfig,
  timer,
  setTimer,
}: {
  config: GameConfig,
  setConfig: (c: GameConfig) => void,
  timer: TimerConfig,
  setTimer: (c: TimerConfig) => void,
}) {
  const [board, setBoard] = useState<CellType[][]>([]);

  useEffect(() => {
    const initialBoard = instantiateBoard(config);
    setBoard(initialBoard);
  }, [config.width, config.height, config.numberOfBombs]);

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
                  gameWon={config.gameWon}
                  gameLost={config.gameLost}
                  onClick={() =>
                    leftClickCell(
                      i,
                      j,
                      board,
                      setBoard,
                      config,
                      setConfig,
                      timer,
                      setTimer,
                    )
                  }
                  onContextMenu={() =>
                    rightClickCell(
                      i,
                      j,
                      board,
                      setBoard,
                      config,
                      setConfig,
                      timer,
                      setTimer,
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
