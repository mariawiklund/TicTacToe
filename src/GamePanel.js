import { useState } from "react";
const GamePanel = () => {
  const [isX, setIsX] = useState(true);
  const [squares] = useState(CreateButtons());
  const [XWins, setXWins] = useState(0);
  const [OWins, setOWins] = useState(0);
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const setValue = (i) => {
    if (gameOver) return;
    if (squares[i].state !== null) return;

    squares[i].state = isX ? "X" : "O";
    const response = isEnded(squares);
    if (response === false) {
      setWinner("tie");
      setGameOver(true);
    } else if (response !== true) {
      if (response === "X") {
        setWinner(response);
        setXWins(XWins + 1);
      } else {
        setWinner(response);
        setOWins(OWins + 1);
      }
      setGameOver(true);
    }
    setIsX(!isX);
  };

  const buttons = squares.map((btn) => (
    <div key={btn.id}>
      <button
        className={`cell ${squares[btn.id].state}`}
        onClick={() => setValue(btn.id)}
      >
        {btn.state}
      </button>
    </div>
  ));

  const playAgain = () => {
    setWinner("");
    setGameOver(false);
    squares.forEach((square) => {
      square.state = null;
    });
    setIsX(isX);
  };

  return (
    <div className="board xs-screen">
      <div className="game-area">{buttons}</div>
      <div className="score-area">
        <p>SCORE</p>
        <p className="X">X: {XWins}</p>
        <p className="O">O: {OWins}</p>
        <button
          className="play-again"
          onClick={() => playAgain()}
          disabled={!gameOver}
        >
          Play again
        </button>
        <p className="game-info">{gameOver ? displayText(winner) : ""}</p>
      </div>
    </div>
  );
};

/* Sets the text when game ended */
function displayText(winner) {
  if (winner === "tie") return "It's a tie!";
  if (winner === "X") return "X wins!";
  if (winner === "O") return "O wins!";
}

/* Creates the game board */
function CreateButtons() {
  const list = [];

  for (let i = 0; i < 9; ++i) {
    list.push({
      id: i,
      state: null,
    });
  }

  return list;
}

/* Checks if game has ended */
function isEnded(list) {
  const wins = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let i = 0; i < wins.length; ++i) {
    const [x, y, z] = wins[i];
    if (
      list[x].state &&
      list[x].state === list[y].state &&
      list[x].state === list[z].state
    ) {
      if (list[x].state !== null) return list[x].state;
    }
  }

  if (list.some((item) => item.state === null) === false) return false;
  return true;
}

export default GamePanel;
