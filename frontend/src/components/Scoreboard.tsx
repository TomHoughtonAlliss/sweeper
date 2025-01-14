import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

type Score = {
	id: string;
	name: string;
	time: number;
	date: string;
};

async function getScores(): Promise<Score[]> {
	const res = await fetch("http://localhost:8000/scores", {
		method: "GET",
	});

	const data = await res.json();

	const scores: Score[] = data as Score[];

	scores.sort((a, b) => a.time - b.time);

	return data as Score[];
}

export default function ScoreBoard() {
	const [scores, setScores] = useState<Score[]>([]);

	useEffect(() => {
		async function fetchScores() {
			const scores = await getScores();
			setScores(scores);
		}
		fetchScores();
	}, []);

	const cellStyling = {
		paddingRight: "5rem",
		border: "1px solid gray",
	};

	const headerStyling = {
		fontWeight: "bold",
		fontFamily: "sans-serif",
	};

	return (
		<table
			style={{
				textAlign: "left",
				border: "1px solid gray",
				backgroundColor: "#FFFFFF",
				margin: "2rem",
				fontFamily: "monospace",
			}}
		>
			<thead>
				<tr>
					<th style={headerStyling}>Name</th>
					<th style={headerStyling}>Time (seconds)</th>
					<th style={headerStyling}>Date</th>
				</tr>
			</thead>
			<tbody>
				{scores.map((row: Score, yIndex: number) => {
					return (
						<tr key={row.id}>
							<td style={cellStyling}>{row.name}</td>
							<td style={cellStyling}>{row.time}</td>
							<td style={cellStyling}>{row.date}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
