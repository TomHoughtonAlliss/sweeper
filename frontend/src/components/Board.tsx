function instantiateBoard(width: number, height: number, bombs: number): number[][] {
    const board: number[][] = [];

    for (let i = 0; i < height; i++) {
        const row: number[] = [];
        for (let j = 0; j < width; j++) {
            row.push(0);
        }
        board.push(row);
    }

    return board
}

export default function Board() {
    let board = instantiateBoard(10, 10, 10)

    return (<div style={{display: "inline-flex", paddingTop: 50, paddingBottom: 50}}>{
            board.map(
                (row: number[], yIndex: number) => {
                return (<div style={{}}>{
                    row.map(
                        (cell: number, xIndex: number) => {
                            return <div style={{border: "1px solid gray", width: "30px", height: "30px"}}>{cell}</div>
                        }
                    )
                }</div>)
            }
        )
}</div>)
}