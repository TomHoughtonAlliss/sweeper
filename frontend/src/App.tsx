import "./App.css";
import Game from "./components/Game";
import NamePicker from "./components/NamePicker";
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
      <NamePicker />
      <Game />
      <ScoreBoard />
    </div>
  );
}

export default App;
