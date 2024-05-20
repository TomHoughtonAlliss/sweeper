function instantiateBoard(
  width: number,
  height: number,
  bombs: number
): number[][] {
  const board: number[][] = [];

  for (let i = 0; i < height; i++) {
    const row: number[] = [];
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
    board.push(row);
  }

  return board;
}

export default function Board() {
  let board = instantiateBoard(10, 10, 10);

  return (
    <div style={{ 
        display: "inline-flex",
        margin: "2rem",
        border: "1px solid gray"
        }}>
      {board.map((row: number[], yIndex: number) => {
        return (
          <div style={{}}>
            {row.map((cell: number, xIndex: number) => {
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
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
