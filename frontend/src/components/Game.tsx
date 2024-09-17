import { useState, useRef } from "react";
import Board from "./Board";
import Difficulty from "./Difficulty";
import Timer from "./Timer";

export default function Game() {

  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [numberOfBombs, setNumberOfBombs] = useState<number>(10);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);

  const timerRef = useRef<{ start: () => void; stop: () => void; reset: () => void }>(null);

  const [key, setKey] = useState<number>(0);

  const handlePlayClick = () => {
    setKey(prevKey => prevKey + 1);
    setGameWon(false);
    setGameLost(false);
    if (timerRef.current) {
      timerRef.current.reset();
      timerRef.current.start();
    }
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
            margin: "1rem auto",
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
        timerRef={timerRef}
      />
      <div>

        <Timer ref={timerRef}/>

      </div>
      <div>
        {gameWon ? <span>true</span> : <span>false</span>}
      </div>
      <div>
        {gameLost ? <span>true</span> : <span>false</span>}
      </div>
    </div>
  );
}
