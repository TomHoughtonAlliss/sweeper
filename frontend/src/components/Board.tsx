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

function instantiateBoard(
  width: number,
  height: number,
  bombs: number
): Cell[][] {
  const board: Cell[][] = [];
  let bombCoords: number[][] = [];

  for (let i = 0; i < bombs; i++) {
    let randX = getRandomInt(width);
    let randY = getRandomInt(height);

    const cellContained = (cell: number[]) => cell[0] === randX && cell[1] === randY

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
  return board
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
                  {cell.isMine}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
