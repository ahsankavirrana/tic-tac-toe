

const GameOver = ({winner, onReset}) => {
  return (
    <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} Won!</p>
        }
        {!winner && <p>It's a draw!</p>}
        <p>
            <button onClick={onReset}>Rematch!</button>
        </p>
        <p>Designed By Ahsan Kabir</p>
    </div>
  )
}

export default GameOver