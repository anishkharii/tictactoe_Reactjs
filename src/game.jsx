import { useEffect, useState } from "react";
import "./App.css";
import { RotateCcw } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

function Game() {
    const navigate = useNavigate();
 

  
  const firstPlayer = useParams().firstPlayer==='O' ? 'O' : 'X';

  const [user1Score, setUser1Score] = useState(0);
  const [user2Score, setUser2Score] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(firstPlayer || "X");
  const [restartMenu, setRestartMenu] = useState(false);
  const [winMenu, setWinMenu] = useState(false);
  const [winStatus, setWinStatus] = useState("");
  const [winPositions, setWinPositions] = useState([]);
  const [board, setBoard] = useState(Array(9).fill(""));

  useEffect(() => {
    checkWinner();
    if (winMenu) {
      const timeout = setTimeout(() => {
        nextRound();
      }, 4000);
      return () => {clearTimeout(timeout);};
    }
  })
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setUser1Score(0);
    setUser2Score(0);
    setTieScore(0);
    setCurrentPlayer("X");
    setRestartMenu(false);
    setWinMenu(false);
    setWinPositions([]);
    navigate("/");
    window.location.reload();
  };
  const nextRound = () => {
    setBoard(Array(9).fill(""));
    setRestartMenu(false);
    setWinPositions([]);
    setWinMenu(false);
  };

  const checkWinner = () => {
    if (winMenu) {
      return;
    }
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinStatus(board[a]);
        setWinMenu(true);
        setWinPositions(winningPositions[i]);
        if (board[a] === "X") {
          setUser1Score((prevScore) => prevScore + 1);
        } else if (board[a] === "O") {
          setUser2Score((prevScore) => prevScore + 1);
        }
        return board[a];
      }
    }

    if (!board.includes("")) {
      setWinMenu(true);
      setWinStatus("tie");
      setTieScore((prevScore) => prevScore + 1);
      return "tie";
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] || checkWinner()) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  return (
    <div className="app">
      <div className="header">
        <div className="logo-text">
          <span>X</span>
          <span>O</span>
        </div>
        <div className="player-turn">{currentPlayer} Turn</div>
        <div className="restart-btn" onClick={() => setRestartMenu(true)}>
          <RotateCcw />
        </div>
      </div>

      <div className="game-board">
        {board.map((value, index) => (
          <div
            key={index}
            style={{
              backgroundColor: winPositions.includes(index)
                ? winStatus === "X"
                  ? "#30c5be"
                  : "#eeb434"
                : "",
              color: winPositions.includes(index)
                ? winStatus === "X"
                  ? "#1e3640"
                  : "#1e3640"
                : "",
            }}
            className={`game-btn ${
              board[index] === "X" ? "x-color-text" : "o-color-text"
            }`}
            onClick={() => handleCellClick(index)}
            disabled
          >
            {value}
          </div>
        ))}
      </div>

      <div className="score">
        <div className="user1-score">
          <span>X</span>
          <span>{user1Score}</span>
        </div>
        <div className="tie-score">
          <span>Tie</span>
          <span>{tieScore}</span>
        </div>
        <div className="user2-score">
          <span>O</span>
          <span>{user2Score}</span>
        </div>
      </div>

      <div className={`${restartMenu || winMenu ? "pop-up-container" : ""}`}>
        <div className={`pop-up ${winMenu ? "" : "hide"}`}>
          <h1>
            {winStatus === "tie" ? "It's a Tie!" : `Player ${winStatus} Wins!`}
          </h1>
          <div className="action-btns">
            <button className="quit-btn" onClick={()=>setRestartMenu(true)}>
              Quit
            </button>
            <button className="next-btn" onClick={() => nextRound()}>
              Next Round
            </button>
          </div>
          <span>Playing Next Round...</span>
            <div 
            style={
                winMenu? {animation:"moving-line 4s linear"}:{animation:"none"}
            }  className="line-moving"></div>
        </div>

        <div className={`pop-up ${restartMenu ? "" : "hide"}`}>
          <h1>RESTART GAME?</h1>
          <div className="action-btns">
            <button
              className="cancel-btn"
              onClick={() => setRestartMenu(false)}
            >
              No, Cancel
            </button>
            <button className="restart-btn-primary" onClick={restartGame}>
              Yes, Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
