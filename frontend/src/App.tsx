import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";
import ScoreBoard from "./components/Scoreboard";

function App() {
  let initialWidth = 10;
  let initialHeight = 10;
  let initialNumberOfBombs = 10;

  const [width, setWidth] = useState<number>(initialWidth);
  const [height, setHeight] = useState<number>(initialHeight);
  const [numberOfBombs, setNumberOfBombs] =
    useState<number>(initialNumberOfBombs);

  function changeDimensions(
    width: number,
    height: number,
    numberOfBombs: number
  ) {
    setWidth(width);
    setHeight(height);
    setNumberOfBombs(numberOfBombs);
  }

  return (
    <div className="App">
      <header className="App-header">Sweeper</header>
      <div className="App-difficulty-parent">
        <button
          className="App-button"
          onClick={() => changeDimensions(10, 10, 10)}
        >
          Custom
        </button>
        <button
          className="App-button"
          onClick={() => changeDimensions(8, 8, 10)}
        >
          Beginner
        </button>
        <button
          className="App-button"
          onClick={() => changeDimensions(16, 16, 40)}
        >
          Intermediate
        </button>
        <button
          className="App-button"
          onClick={() => changeDimensions(30, 16, 99)}
        >
          Expert
        </button>
      </div>
      <ScoreBoard />
      <button className="App-button">Play</button>
      <div className="App-board">
        <Board width={width} height={height} numberOfBombs={numberOfBombs} />
      </div>
    </div>
  );
}

export default App;
