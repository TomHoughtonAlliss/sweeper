import { faker } from '@faker-js/faker';

function getScore(): string[] {
    const name: string = faker.person.firstName();;;;;;
    const time: string = "30s";
    const date: string = "14/02/1994";

    const score: string[] = [name, time, date];

    return score;

}

function getScoreBoard(): string[][] {
    const scores: string[][] = [];

    for (let i = 0; i < 10; i++) {
        scores.push(getScore());
    }

    return scores;
}

export default function ScoreBoard() {
    const scoreBoard: string[][] = getScoreBoard();
    
    return (<div style={{display: "flex"}}>
        <table style={{textAlign: "left"}}>
            <tr>
                <th>Name</th>
                <th>Time (seconds)</th>
                <th>Date</th>
            </tr>
            {scoreBoard.map(
                (row: string[], yIndex: number) => {
                    return <tr>
                        <td style={{paddingRight: "10rem"}}>{row[0]}</td>
                        <td style={{paddingRight: "10rem"}}>{row[1]}</td>
                        <td style={{paddingRight: "10rem"}}>{row[2]}</td>
                    </tr>
                }
            )}
        </table>
    </div>)
}