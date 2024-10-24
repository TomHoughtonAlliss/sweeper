
export default function Difficulty(
  {
    setWidth,
    setHeight,
    setNumberOfBombs,
  }: {
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    setNumberOfBombs: (numberOfBombs: number) => void;
  }
) {

  function changeDimensions(
    width: number,
    height: number,
    numberOfBombs: number,
    setWidth: (width: number) => void,
    setHeight: (height: number) => void,
    setNumberOfBombs: (numberOfBombs: number) => void,
  ) {
    setWidth(width);
    setHeight(height);
    setNumberOfBombs(numberOfBombs);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <button
        type="button"
        onClick={() => changeDimensions(8, 8, 10, setWidth, setHeight, setNumberOfBombs)}
        style={{
          margin: "2rem auto",
          marginRight: "10px",
        }}
      >
        Beginner
      </button>

      <button
        type="button"
        style={{
          margin: "2rem auto",
          marginRight: "10px",
        }}
        onClick={() => changeDimensions(16, 16, 40, setWidth, setHeight, setNumberOfBombs)}
      >
        Intermediate
      </button>

      <button
        type="button"
        onClick={() => changeDimensions(16, 30, 40, setWidth, setHeight, setNumberOfBombs)}
        style={{
          margin: "2rem auto",
          marginRight: "10px",
        }}
      >
        Expert
      </button>
      
    </div>
  );
}