import { useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const clickSound = new Audio("/justsomesounds-click-sound-432501.mp3");
const winSound = new Audio("/freesound_community-success-1-6297.mp3");
function App() {
  const [board, setBoard] = useState(Array(9).fill(" "));
  const [difficulty, setDifficulty] = useState("hard");
  const [status, setStatus] = useState("Your Turn");

  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);

  const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  const playWinSound = () => {
    winSound.currentTime = 0;
    winSound.play();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const checkWinner = (b, player) => {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return wins.some(combo =>
      combo.every(index => b[index] === player)
    );
  };

  const isDraw = (b) => !b.includes(" ");

  const handleClick = async (index) => {
    if (board[index] !== " " || status !== "Your Turn") return;

    playClickSound();

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    if (checkWinner(newBoard, "X")) {
      setStatus("You Win 🎉");
      setPlayerScore(p => p + 1);
      playWinSound();
      triggerConfetti();
      return;
    }

    if (isDraw(newBoard)) {
      setStatus("Draw 🤝");
      setDrawScore(d => d + 1);
      return;
    }

    setStatus("AI Thinking...");

    await new Promise(resolve => setTimeout(resolve, 700));

    const response = await axios.post(`${API_URL}/move`, {
      board: newBoard,
      difficulty
    });

    const aiMove = response.data.move;

    if (aiMove !== null && aiMove !== undefined) {
      newBoard[aiMove] = "O";
      setBoard([...newBoard]);

      if (checkWinner(newBoard, "O")) {
        setStatus("AI Wins 🤖");
        setAiScore(a => a + 1);
        playWinSound();
        triggerConfetti();
        return;
      }

      if (isDraw(newBoard)) {
        setStatus("Draw 🤝");
        setDrawScore(d => d + 1);
        return;
      }
    }

    setStatus("Your Turn");
  };

  const restartGame = () => {
    setBoard(Array(9).fill(" "));
    setStatus("Your Turn");
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe AI</h1>

      <div className="scoreboard">
        <div className="score">
          <h3>You</h3>
          <p>{playerScore}</p>
        </div>
        <div className="score">
          <h3>AI</h3>
          <p>{aiScore}</p>
        </div>
        <div className="score">
          <h3>Draws</h3>
          <p>{drawScore}</p>
        </div>
      </div>

      <h2 className={status.includes("Win") ? "winner" : ""}>
        {status}
      </h2>

      <select onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div className="board">
        {board.map((cell, i) => (
          <div
            key={i}
            className={`cell ${cell !== " " ? "filled" : ""}`}
            onClick={() => handleClick(i)}
          >
            <span className={cell === "X" ? "x" : "o"}>
              {cell}
            </span>
          </div>
        ))}
      </div>

      <button onClick={restartGame} className="restart">
        Restart Game
      </button>
    </div>
  );
}

export default App;