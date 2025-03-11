import type { GameConfig } from "./Game";


export default function Difficulty(
  {
    config,
    setConfig,
  }: {
    config: GameConfig,
    setConfig: (config: GameConfig) => void,
  }
) {

  function changeDimensions(
    width: number,
    height: number,
    numberOfBombs: number,
    config: GameConfig,
    setConfig: (config: GameConfig) => void,
  ) {
    setConfig({
      ...config,
      width: width,
      height: height,
      numberOfBombs: numberOfBombs,
    });
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
        onClick={() => changeDimensions(8, 8, 10, config, setConfig)}
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
        onClick={() => changeDimensions(16, 16, 40, config, setConfig)}
      >
        Intermediate
      </button>

      <button
        type="button"
        onClick={() => changeDimensions(16, 30, 40, config, setConfig)}
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