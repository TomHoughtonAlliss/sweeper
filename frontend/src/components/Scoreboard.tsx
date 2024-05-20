import { faker } from "@faker-js/faker";

function getScore(): string[] {
  const name: string = faker.person.firstName();
  const time: string = String(Math.floor(Math.random() * 100));
  const date: string = "14/02/1994";

  const score: string[] = [name, time, date];

  return score;
}

function sortRows(rows: string[][]): string[][] {
  rows.sort((first: string[], second: string[]) => {
    return Number(first[1]) - Number(second[1]);
  });

  return rows;
}

function getScoreBoard(): string[][] {
  let scores: string[][] = [];

  for (let i = 0; i < 10; i++) {
    scores.push(getScore());
  }

  scores = sortRows(scores);

  return scores;
}

export default function ScoreBoard() {
  const scoreBoard: string[][] = getScoreBoard();

  return (
    <div style={{}}>
      <table
        style={{
          marginTop: "2rem",
          marginBottom : "2rem",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left",
          border: "1px solid gray",
          backgroundColor: "#DCDCDC",
        }}
      >
        <tr>
          <th>Name</th>
          <th>Time (seconds)</th>
          <th>Date</th>
        </tr>
        {scoreBoard.map((row: string[], yIndex: number) => {
          return (
            <tr>
              <td style={{ paddingRight: "10rem", border: "1px solid gray" }}>
                {row[0]}
              </td>
              <td style={{ paddingRight: "10rem", border: "1px solid gray" }}>
                {row[1]}
              </td>
              <td style={{ paddingRight: "10rem", border: "1px solid gray" }}>
                {row[2]}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
