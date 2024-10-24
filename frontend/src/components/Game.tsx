import { useState } from "react";
import Board from "./Board";
import Difficulty from "./Difficulty";
import Timer from "./Timer";

export default function Game() {

  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [numberOfBombs, setNumberOfBombs] = useState<number>(10);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  const [key, setKey] = useState<number>(0);

  const handlePlayClick = () => {
    setKey(prevKey => prevKey + 1);
    setGameWon(false);
    setGameLost(false);
    setStartTime(Date.now());
    setTimerStarted(false);
  }

  return (
    <div>
      <div>
        <Difficulty
          setWidth={setWidth}
          setHeight={setHeight}
          setNumberOfBombs={setNumberOfBombs}
        />
        <button
          type="button"
          onClick={handlePlayClick}
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            margin: "1px auto",
          }}
        >
          Play
        </button>
      </div>
      <Board
        key={key}
        width={width}
        height={height}
        numberOfBombs={numberOfBombs}
        gameWon={gameWon}
        gameLost={gameLost}
        setGameWon={setGameWon}
        setGameLost={setGameLost}
        clickCount={clickCount}
        setClickCount={setClickCount}
        setTimerStarted={setTimerStarted}
        setStartTime={setStartTime}
      />
      <div>
        <Timer startTime={startTime} stopped={!timerStarted} />
      </div>
    </div>
  );
}
