import React from "react";
import Board from "./components/Board";
import "./App.css";
import ScoreBoard from "./components/Scoreboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sweeper
      </header>
      <div className="App-difficulty-parent">
        <button className='App-button'>Custom</button>
        <button className='App-button'>Medium</button>
        <button className='App-button'>Hard</button>
        <button className='App-button'>Expert</button>
      </div>
      <ScoreBoard />
      <button className="App-button">Play</button>
      <div className="App-board">
        <Board />
      </div>
    </div>
  );
}

export default App;
