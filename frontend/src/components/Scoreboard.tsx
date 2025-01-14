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
		border: "1px solid gray",
    paddingLeft: "3px",
    borderLeft: "2px solid gray",
    borderRight: "2px solid gray"
	};

	const headerStyling = {
		fontWeight: "normal",
		fontFamily: "sans-serif",
    fontSize: "14px",
    padding: "5px",
    borderLeft: "2px solid gray",
    borderRight: "2px solid gray"
	};

	return (
		<table
			style={{
				textAlign: "center",
				border: "2px solid gray",
        borderCollapse: "collapse",
				backgroundColor: "#FFFFFF",
				margin: "2rem",
				fontFamily: "monospace",
			}}
		>
			<thead>
				<tr>
					<th style={headerStyling}>Name</th>
					<th style={headerStyling}>Time</th>
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
