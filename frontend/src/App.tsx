import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import NamePicker from "./components/NamePicker";
import ScoreBoard from "./components/Scoreboard";

function App() {

  const [name, setName] = useState("AAA");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Sweeper</h1>
      <NamePicker setter={setName} />
      <Game name={name} />
      <ScoreBoard />
    </div>
  );
}

export default App;
