import React from "react";
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
        Scoreboard in this Region
      </div>
      <div>
        <button className="App-button">Play</button>
      </div>
    </div>
  );
}

export default App;
