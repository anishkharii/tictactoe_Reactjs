import { useEffect, useState } from "react";
import { Play, Bot } from "lucide-react";

import "./home.css";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
const Home = () => {
  const [firstPlayer, setFirstPlayer] = useState("X");
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showPopUp) {
      setTimeout(() => {
        setShowPopUp(false);
      }, 8000);
    }
  });
  const playGame = () => {
    navigate("/game/" + firstPlayer);
  };

  const playGameBot = () => {
    navigate("/bot");
  };
  return (
    <>
      <div className="home-background">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 2000 1400"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <defs>
            {" "}
            <clipPath id="shape-0">
              {" "}
              <path
                fill="currentColor"
                d="M537,451Q471,583,325,572Q179,561,114.5,440Q50,319,106,183Q162,47,289.5,98Q417,149,510,234Q603,319,537,451Z"
              ></path>{" "}
            </clipPath>{" "}
            <clipPath id="shape-1">
              {" "}
              <path
                fill="currentColor"
                d="M565,466Q485,591,337.5,596Q190,601,138.5,471Q87,341,136.5,206.5Q186,72,320.5,107Q455,142,550,241.5Q645,341,565,466Z"
              ></path>{" "}
            </clipPath>{" "}
          </defs>{" "}
          <rect width="2000" height="1400" fill="#f1f3f8" />{" "}
          <g
            clipPath="url(#shape-0)"
            transform="translate(695, 355.26226105802164)"
          >
            {" "}
            <path
              fill="none"
              stroke="#30c5be"
              strokeWidth="20"
              d="M537,451Q471,583,325,572Q179,561,114.5,440Q50,319,106,183Q162,47,289.5,98Q417,149,510,234Q603,319,537,451Z"
            />{" "}
          </g>{" "}
          <g
            clipPath="url(#shape-1)"
            transform="translate(565.6179365303052, 342.6050629593374)"
          >
            {" "}
            <path
              fill="none"
              stroke="#eeb434"
              strokeWidth="20"
              d="M565,466Q485,591,337.5,596Q190,601,138.5,471Q87,341,136.5,206.5Q186,72,320.5,107Q455,142,550,241.5Q645,341,565,466Z"
            />{" "}
          </g>{" "}
          <g transform="translate(500,609.688013136289)">
            {" "}
            <svg
              width="1000"
              height="180.623973727422"
              viewBox="0 0 1218 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
            </svg>{" "}
          </g>{" "}
        </svg>
      </div>
      <div className="home">
        <div className="logo-text">
          <span>X</span>
          <span>O</span>
        </div>
        <div className="player-select">
          <p>Pick Player 1&apos;s Mark</p>
          <div className="player-tile-container">
            <div
              onClick={() => setFirstPlayer("X")}
              className={`player-tile ${
                firstPlayer === "X" ? "active-player" : ""
              }`}
            >
              X
            </div>
            <div
              onClick={() => setFirstPlayer("O")}
              className={`player-tile ${
                firstPlayer === "O" ? "active-player" : ""
              }`}
            >
              O
            </div>
          </div>
        </div>
        <button onClick={playGame} className="home-btn">
          <Play />
          <span>New Game(Vs Player)</span>
        </button>
        <button onClick={() => setShowPopUp(true)} className="home-btn">
          <Bot />
          <span>New Game(Vs Bot)</span>
        </button>
        <div className={`small-pop-up ${showPopUp ? "show" : ""}`}>
          <CircleX onClick={() => setShowPopUp(false)} />
          <span>
            Bot Not Available in this Version. Please wait for update 😃.
          </span>
          <div
            style={
              showPopUp
                ? { animation: "moving-line 8s linear" }
                : { animation: "" }
            }
            className="line-moving"
          ></div>
        </div>
      </div>
    </>
  );
};

export default Home;
