import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../App.css";

function GameInProgress() {
  const [firstMove, setFirstMove] = useState("");
  const [showResult, setShowResult] = useState(false); // State to control visibility of the result
  const [showGameUI, setShowGameUI] = useState(false); // State to control visibility of the game UI



  const choose = () => {
    // Add your logic for choosing a move and displaying the result here
    // Example: Determine the result and set showResult to true to display it
    const result = "You win!";
    setShowResult(true);
  };

  return (
    <div>
      <h1>Game id </h1>
      {showGameUI && ( // Conditionally render based on the showGameUI state
        <div className="firstPlayerMove">
          <Button onClick={() => setFirstMove("Rock")}>Rock</Button>
          <Button onClick={() => setFirstMove("Paper")}>Paper</Button>
          <Button onClick={() => setFirstMove("Scissors")}>Scissors</Button>
          <br></br>
          {showResult && <div>You choose {firstMove}</div>}
          <Button onClick={choose}>Choose</Button>
        </div>
      )}
      <hr></hr>
      <div className="secondPlayerMove">
        <Button>Rock</Button>
        <Button>Paper</Button>
        <Button>Scissors</Button>
      </div>
    </div>
  );
}

export default GameInProgress;
