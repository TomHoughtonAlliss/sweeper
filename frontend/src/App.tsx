import React from "react";
import Board from "./Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sweeper
      </header>
      <div className="App-difficulty-parent">
        <button className='App-button'>Easy</button>
        <button className='App-button'>Medium</button>
        <button className='App-button'>Hard</button>
        <button className='App-button'>Expert</button>
      </div>
      <div className="App-scoreboard">
        <Board />
      </div>
      <div>
        <button className="App-button">Play</button>
      </div>
    </div>
  );
}

export default App;
