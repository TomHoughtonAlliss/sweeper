import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sweeper
      </header>
      <div className="App-difficulty-parent">
          <div className='App-difficulty-box'>Easy</div>
          <div className='App-difficulty-box'>Medium</div>
          <div className='App-difficulty-box'>Hard</div>
          <div className='App-difficulty-box'>Expert</div>
        </div>
    </div>
  );
}

export default App;
