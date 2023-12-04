// import { useState } from "react";



const Gameboard = ({ onSelectSquare, board }) => {
    

    // const [gameBorad, setGameBoard] = useState(initialGameboard);

    // function handleSelectSqure(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         // prevGameBoard[rowIndex][colIndex] = "X";
    //         // return prevGameBoard;
    //         return updatedBoard;
    //     });

    //     onSelectSqure();
    // }


  return (

        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                    </li>
                    ))}
               </ol>
            </li>
            ))}
        </ol>
   
  )
}

export default Gameboard