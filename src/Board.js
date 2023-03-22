import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Board = ({ bot }) => {
  const navigate = useNavigate();
  const [squares] = useState(CreateButtons());
  const [isX, setIsX] = useState(true);
  const [XWins, setXWins] = useState(0);
  const [OWins, setOWins] = useState(0);
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // set value of a square and check if game is ended
  const setValue = (i) => {
    if (gameOver) return;
    if (squares[i].state !== null) return;

    squares[i].state = isX ? "X" : "O";
    setIsX(!isX);
    const response = isEnded(squares);
    if (response === false) {
      setWinner("tie");
      setGameOver(true);
    } else if (response !== true) {
      setWinner(response);
      if (response === "X") {
        setXWins(XWins + 1);
      } else {
        setOWins(OWins + 1);
      }
      setGameOver(true);
    }
  };

  // for catching when the it's the bots turn
  useEffect(() => {
    if (gameOver === false && bot === true && isX === false) {
      setValue(botDecision(squares));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isX, gameOver]);

  // creates buttons/the game board
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

  // reset the board
  const reset = () => {
    setWinner("");
    setGameOver(false);
    squares.forEach((square) => {
      square.state = null;
    });
    setIsX(isX);
  };

  return (
    <div>
      <button className="main-menu" onClick={() => navigate("/start")}>
        Main menu
      </button>
      <div className="board xs-screen">
        <div>
          <div className="next-up">
            Current player:{" "}
            <label className={isX ? "transparent X" : "transparent O"}>
              {isX ? "X" : "O"}
            </label>
          </div>
          <div className="game-area">{buttons}</div>
        </div>
        <div className="score-area">
          <p>SCORE</p>
          <p>
            <label className="transparent X">X:</label> {XWins}
          </p>
          <p>
            <label className="transparent O">O:</label> {OWins}
          </p>
          <button
            className="play-again"
            onClick={() => reset()}
            disabled={!gameOver}
          >
            Play again
          </button>
          <p className="game-info">{gameOver ? displayText(winner) : ""}</p>
        </div>
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

/* holds winning combinations */
function winningBoard() {
  return [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];
}

/* Checks if game has ended */
function isEnded(squares) {
  const wins = winningBoard();

  for (let i = 0; i < wins.length; ++i) {
    const [x, y, z] = wins[i];
    if (
      squares[x].state &&
      squares[x].state === squares[y].state &&
      squares[x].state === squares[z].state
    ) {
      if (squares[x].state !== null) {
        return squares[x].state;
      }
    }
  }

  if (squares.some((item) => item.state === null) === false) {
    return false;
  }
  return true;
}

/* Creates the game board */
function botDecision(squares) {
  const probability = Math.random();

  // make a smart decision. But not to smart
  if (probability < 0.8) {
    const wins = winningBoard();
    for (let i = 0; i < wins.length; ++i) {
      const [x, y, z] = wins[i];
      if (
        squares[x].state != null &&
        squares[x].state === squares[y].state &&
        squares[z].state === null
      ) {
        return squares[z].id;
      } else if (
        squares[y].state != null &&
        squares[y].state === squares[z].state &&
        squares[x].state === null
      ) {
        return squares[x].id;
      } else if (
        squares[x].state != null &&
        squares[x].state === squares[z].state &&
        squares[y].state === null
      ) {
        return squares[y].id;
      }
    }
  }
  // else just do random number
  var square = Math.floor(Math.random() * 9);
  while (squares[square].state != null) {
    square = Math.floor(Math.random() * 9);
  }

  return square;
}

export default Board;
