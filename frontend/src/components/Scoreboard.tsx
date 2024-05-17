
function getScore(): string[] {
    const name: string = "Joseph";
    const time: string = "30";
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
    
    return (<div style={{}}>
        {
            scoreBoard.map(
                (scoreSet: string[], yIndex: number) => {
                    return <div style={{display: "flex"}}>{
                        scoreSet.map(
                        (item: string, xIndex: number) => {
                            return <div style={{width: "10rem", border: "1px solid gray", textAlign: "left"}}>{item}</div>
                        }
                    )}</div>
                }
            )
        }
    </div>)
}