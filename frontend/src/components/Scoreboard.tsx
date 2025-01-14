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

	const scores: Score[] = data as Score[]

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

	return (
		<table
			style={{
				textAlign: "left",
				border: "1px solid gray",
				backgroundColor: "#DCDCDC",
				margin: "2rem",
			}}
		>
			<thead>
				<tr>
					<th>Name</th>
					<th>Time (seconds)</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{scores.map((row: Score, yIndex: number) => {
					return (
						<tr key={row.id}>
							<td style={{ paddingRight: "10rem", border: "1px solid gray" }}>
								{row.name}
							</td>
							<td style={{ paddingRight: "10rem", border: "1px solid gray" }}>
								{row.time}
							</td>
							<td style={{ paddingRight: "10rem", border: "1px solid gray" }}>
								{row.date}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
