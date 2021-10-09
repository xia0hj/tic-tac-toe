import React from 'react';
import Board from './board.js';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                { squaresValue: Array(9).fill(null) },
            ],
            xIsNext: true,
        };
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length-1];
        const curSquaresValue = current.squaresValue.slice();
        if(calculateWinner(curSquaresValue) || curSquaresValue[i]){
            return;
        }
        curSquaresValue[i]= this.state.xIsNext ? 'X' : 'O';
        this.setState({ 
            history: history.concat([ {squaresValue:curSquaresValue} ]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {

        const history = this.state.history;
        const current = history[history.length-1];
        const winner = calculateWinner(current.squaresValue);
        let status;
        if(winner){
            status = 'winner: '+winner;
        }
        else{
            status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
        }
        

        return (
            <div className="game">
                <div className="game-board">
                    <Board squaresValue={current.squaresValue} onClick={(i)=>{this.handleClick(i)}}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
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