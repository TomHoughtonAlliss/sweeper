import { useEffect, useState } from "react";
import Board from "./Board";
import Difficulty from "./Difficulty";
import Timer from "./Timer";
import { useQueryClient } from "@tanstack/react-query";
import getPostScoreMutation from "../requests/post_scores";

export default function Game({ name }: { name: string }) {
	const [width, setWidth] = useState<number>(10);
	const [height, setHeight] = useState<number>(10);
	const [numberOfBombs, setNumberOfBombs] = useState<number>(10);
	const [gameWon, setGameWon] = useState<boolean>(false);
	const [gameLost, setGameLost] = useState<boolean>(false);
	const [startTime, setStartTime] = useState<number>(Date.now());
	const [timerStarted, setTimerStarted] = useState<boolean>(false);
	const [clickCount, setClickCount] = useState<number>(0);

	const [key, setKey] = useState<number>(0);

	const queryClient = useQueryClient();

	const handleResetClick = () => {
		setKey((prevKey) => prevKey + 1);
		setGameWon(false);
		setGameLost(false);
		setStartTime(Date.now());
		setTimerStarted(false);
		setClickCount(0);
	};

	const postScore = getPostScoreMutation();

	useEffect(() => {
		if (gameWon) {
			postScore.mutate({ time: Math.floor((Date.now() - startTime) / 1000), name: name });
		}
	}, [gameWon, startTime]);

	return (
		<>
			<div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
					}}
				>
					<Difficulty
						setWidth={setWidth}
						setHeight={setHeight}
						setNumberOfBombs={setNumberOfBombs}
					/>
				</div>
				<button
					type="button"
					onClick={handleResetClick}
					style={{
						display: "flex",
						justifyContent: "center",
						alignSelf: "center",
						margin: "1px auto",
					}}
				>
					Reset
				</button>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
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
			</div>
			<div>
				<Timer startTime={startTime} stopped={!timerStarted} />
			</div>
		</>
	);
}
