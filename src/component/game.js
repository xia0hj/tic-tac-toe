import React from 'react';
import Board from './board.js';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                { squaresValue: Array(9).fill(null), curStep:null },
            ],
            xIsNext: true,
            stepIdx: 0,
        };
    }

    jumpTo(step) {
        this.setState({
            stepIdx: step,
            xIsNext: (step % 2 === 0),
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepIdx+1);
        const current = history[history.length-1];
        const curSquaresValue = current.squaresValue.slice();
        if (calculateWinner(curSquaresValue) || curSquaresValue[i]) {
            return;
        }
        curSquaresValue[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squaresValue: curSquaresValue, curStep: indexToPosition(i) }]),
            xIsNext: !this.state.xIsNext,
            stepIdx: history.length,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepIdx];
        const winner = calculateWinner(current.squaresValue);

        const moves = history.map((step, idx) => {
            //const desc = idx ? 'Go to move #' + idx + ', '+ step.curStep : 'Go to game start';
            const desc = idx ? `Go to move #${idx} (${step.curStep})` : 'Go to game start';
            return <li key={idx}><button onClick={() => { this.jumpTo(idx) }} className={idx===this.state.stepIdx?'bold-button':null} >{desc}</button></li>;
        });


        let status;
        if (winner) {
            status = 'winner: ' + winner;
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board squaresValue={current.squaresValue} onClick={(i) => { this.handleClick(i) }} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function indexToPosition(i){
    switch(i){
        case 0: return [0,0];
        case 1: return [0,1];
        case 2: return [0,2];
        case 3: return [1,0];
        case 4: return [1,1];
        case 5: return [1,2];
        case 6: return [2,0];
        case 7: return [2,1];
        case 8: return [2,2];
        default: return null;
    }
}