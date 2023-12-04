import React, { useState } from "react"
import Player from "./components/Player.jsx"
import Gameboard from "./components/Gameboard.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning_combinations.js"; 
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2',
}

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner (gameBorad, players){
  let winner;

  for(const conbination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBorad[conbination[0].row][conbination[0].column];
    const secondSquareSymbol = gameBorad[conbination[1].row][conbination[1].column];
    const thirdSquareSymbol = gameBorad[conbination[2].row][conbination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBorad = [...initialGameboard.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player} = turn;
        const { row, col } = square;

        gameBorad[row][col] = player;
    }
    return gameBorad;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBorad = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBorad, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns,
      ];

      return updateTurns;
    });
  }
  
  function handleResetGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
      [symbol]: newName
      };
    })
  }

  return (
    
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
            <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} /> 
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onReset={handleResetGame}/>}
          <Gameboard onSelectSquare={handleSelectSquare} board={gameBorad} />
       </div>
        <Log turns={gameTurns} />
      </main>
    </>
  )
}

export default App

