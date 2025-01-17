import { useEffect, useState } from "react";
import Board from "./Board";
import Difficulty from "./Difficulty";
import Timer from "./Timer";
import { useQueryClient } from "@tanstack/react-query";
import getPostScoreMutation from "../requests/post_scores";

export type GameConfig = {
	width: number,
	height: number,
	numberOfBombs: number,
	gameWon: boolean,
	gameLost: boolean,
	clickCount: number,
}

export type TimerConfig = {
	startTime: number,
	timerStarted: boolean,
}

export default function Game({ name }: { name: string }) {
	const defaultConfig = {
		width: 10,
		height: 10,
		numberOfBombs: 10,
		gameWon: false,
		gameLost: false,
		clickCount: 0,
	}

	const defaultTimer = {
		startTime: Date.now(),
		timerStarted: false,
	}

	const [config, setConfig] = useState(defaultConfig);
	const [timer, setTimer] = useState(defaultTimer);

	const [key, setKey] = useState<number>(0);

	const queryClient = useQueryClient();

	const handleResetClick = () => {
		setKey((prevKey) => prevKey + 1);
		setConfig({
			...config,
			gameWon: false,
			gameLost: false,
			clickCount: 0,
		});

		setTimer({
			...defaultTimer,
		});
	};

	const postScore = getPostScoreMutation();

	useEffect(() => {
		if (config.gameWon) {
			queryClient.invalidateQueries({ queryKey: ["scores"] });
			postScore.mutate({ time: Math.floor((Date.now() - timer.startTime) / 1000), name: name });
		}
	}, [config.gameWon, timer.startTime]);

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
						config={config}
						setConfig={setConfig}
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
					config={config}
					setConfig={setConfig}
					timer={timer}
					setTimer={setTimer}
				/>
			</div>
			<div>
				<Timer startTime={timer.startTime} stopped={!timer.timerStarted} />
			</div>
		</>
	);
}
