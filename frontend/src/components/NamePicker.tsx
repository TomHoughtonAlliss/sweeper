import { useState } from "react";

const chars = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default function NamePicker() {
	const [letters, setLetters] = useState([
		{ c: "A", v: 0, k: 1 },
		{ c: "A", v: 0, k: 2 },
		{ c: "A", v: 0, k: 3 },
	]);

	const cycleLetter = (index: number, direction: number) => {
		setLetters((prevLetters) => {
			const newLetters = [...prevLetters];
			newLetters[index].v = (newLetters[index].v + direction + 26) % 26;
			newLetters[index].c = chars[newLetters[index].v];

			return prevLetters;
		});
	};

	return (
		<div className="name-picker" style={{ display: "flex" }}>
			{letters.map((letter, index) => (
				<div key={letter.k} className="tile">
					<button
						type="button"
						key={`button-up-${letter.k}`}
						onClick={(e) => {
							e.stopPropagation();
							cycleLetter(index, -1);
						}}
					>
						▲
					</button>
					<div
						className="letter"
						style={{
							fontSize: "15rem",
						}}
					>
						{letter.c}
					</div>
					<button
						type="button"
						key={`button-down-${letter.k}`}
						onClick={(e) => {
							e.stopPropagation();
							cycleLetter(index, 1);
						}}
					>
						▼
					</button>
				</div>
			))}
		</div>
	);
}
