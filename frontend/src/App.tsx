import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";
import Game from "./components/Game";
import ScoreBoard from "./components/Scoreboard";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Sweeper</h1>
      <Game />
      <ScoreBoard />
    </div>
  );
}

export default App;
