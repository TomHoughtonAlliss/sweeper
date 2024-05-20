import { randomInt } from "crypto";

type Cell = {
  revealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

function instantiateBoard(
  width: number,
  height: number,
  bombs: number
): Cell[][] {
  const board: Cell[][] = [];
  let bombCoords: number[][] = [];

  for (let i = 0; i < bombs; i++) {
    let randX = randomInt(width);
    let randY = randomInt(height);

    while (Array.prototype.includes([randX, randY])) {
      randX = randomInt(width);
      randY = randomInt(height);
    }

    bombCoords.push([randX, randY]);
  }

  for (let i = 0; i < height; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < width; j++) {
      let cell: Cell = {
        revealed: false,
        isMine: false,
        isFlagged: false,
        adjacentMines: 0,
      };

      if (Array.prototype.includes([j, i])) {
        cell.isMine = true;
      }

      row.push(cell);
    }
    board.push(row);
  }

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
                  {cell.adjacentMines}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
