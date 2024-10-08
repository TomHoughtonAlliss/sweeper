import type { CellType } from "../helpers/helper_methods"

function getStyleAndIcon(cell: CellType, gameWon: boolean) {
  if (cell.revealed) {
    if (cell.isMine) {
      const cellStyle = {
        border: "0.5px solid gray",
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B0B0B0",
        fontSize: "25px",
        color: "red",
      };
      const cellIcon = "⦿";

      return { cellStyle, cellIcon };

    }
    const cellStyle = {
      border: "0.5px solid gray",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#B0B0B0",
    }
    const cellIcon = cell.adjacentMines === 0 ? " " : cell.adjacentMines;

    return { cellStyle, cellIcon };

  }
  if (cell.isFlagged) {
    const cellStyle = {
      border: "0.5px solid gray",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: gameWon ? "#c5edca" : "#DCDCDC",
      color: "red",
      fontWeight: "1000",
    }
    const cellIcon = "⚑";

    return { cellStyle, cellIcon };
  }
  const cellStyle = {
    border: "0.5px solid gray",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCDCDC",
  }
  const cellIcon = " ";

  return { cellStyle, cellIcon };
}

export default function Cell(
  {
    cell,
    xIndex,
    yIndex,
    board,
    setBoard,
    gameWon,
    gameLost,
    onClick,
    onContextMenu,
  }: {
    cell: CellType;
    xIndex: number;
    yIndex: number;
    board: CellType[][];
    setBoard: (board: CellType[][]) => void;
    gameWon: boolean;
    gameLost: boolean;
    onClick: (x: number, y: number, board: CellType[][], setBoard: (board: CellType[][]) => void) => void;
    onContextMenu: (x: number, y: number, board: CellType[][], setBoard: (board: CellType[][]) => void) => void;
  }) {
  const cellConditions = getStyleAndIcon(cell, gameWon);
  const cellStyle = cellConditions.cellStyle;
  const cellIcon = cellConditions.cellIcon;

  return (
    <div
      style={cellStyle}
      onClick={() => onClick(xIndex, yIndex, board, setBoard)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(xIndex, yIndex, board, setBoard);
      }}
      onKeyUp={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}
    >
      {cellIcon}
    </div>
  );

}