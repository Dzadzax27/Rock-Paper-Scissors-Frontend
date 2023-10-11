import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import "../App.css";

function StartGame() {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");
  const [token, setToken] = useState("");
  const [nameGame, setnameGame] = useState("");
  const [game, setGame] = useState({});
  const [userData, setUserData] = useState({});
  const [showGameElements, setShowGameElements] = useState(false);
  const [showPlayer2, setShowPlayer2] = useState(false);
  const [firstMove, setFirstMove] = useState("");
  const [secondMove, setSecondMove] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showCreate, setShowCreate] = useState(true);
  const [showJoin, setShowJoin] = useState(true);
  const [showWinner, setShowWinner] = useState(false);
  const [showPick1, setShowPick1] = useState(false);
  const [pick1, setPick1] = useState("");
  const [pick2, setPick2] = useState("");
  const [winner, setWinner] = useState(false);
  const userID = localStorage.getItem("user");
  const [disabled, setDisabled] = useState(false);
  const [disabledSecond, setDisabledSecond] = useState(true);
  const [isCreator, setIsCreator] = useState(false);

  const socket = io.connect("http://localhost:3001", {
    query: { token },
  });

  useEffect(() => {
    socket.on("player2Joined", (data) => {});
    socket.on("choice", (data) => {
      setShowResult(true);
    });
    socket.on("startGame", (data) => {
      try {
        setShowCreate(false);
        setShowGameElements(true);
        console.log("room", socket.rooms);
      } catch (error) {
        console.error("Error in socket.on startGame:", error);
      }

      return () => {
        socket.off("startGame");
      };
    });
    socket.on("endGame", (data) => {
      setWinner(data.winner);
      setShowWinner(true);
      setDisabledSecond(true);
      console.log(winner)
      socket.emit("gameFinished",{winner: data.winnerid,roomID:roomID})
    });
    socket.on("pick 1 choosed", (data) => {
      setPick1(data.pick1);
      setDisabled(true);
      setDisabledSecond(false);
    });
    socket.on("pickSent", (data) => {
      setShowPick1(true);
      setPick1(data.pick1);
      setPick2(data.pick2);
      console.log(pick1, pick2, roomID);
      socket.emit("pick", { pick1: pick1, pick2: pick2, id: roomID });
    });
  }, [socket]);

  const cleanPage = () => {
    setShowCreate(false);
    setShowGameElements(true);
  };

  const add = async () => {
    try {
      const token = localStorage.getItem("token");
      await setToken(token);
      const data = localStorage.getItem("user");
      const response = await fetch(`http://localhost:3001/game/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name: nameGame, user: data }),
      });
      const Game = await response.json();
      setGame(Game);
      console.log("Game", Game);
      socket.emit("createGame", { game: Game }, (acknowledgment) => {
        if (acknowledgment) {
          console.log('Event "createGame" was acknowledged on the server.');
        } else {
          console.error(
            'Event "createGame" was not acknowledged on the server.'
          );
        }
      });
      setRoomID(Game.id);
      cleanPage();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const asyncFn = async () => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("user");
    await setToken(token);
    if (token != null) {
      try {
        const response = await fetch(`http://localhost:3001/user/me`, {
          headers: { authorization: "Bearer " + token },
        })
          .then((res) => res.json())
          .then((data) => setUserData(data));
      } catch (error) {
        const response = await fetch(`http://localhost:3001/game/delete`, {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId:roomID }),})
        navigate("/login");
      }
    } else {
      const response = await fetch(`http://localhost:3001/game/delete`, {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId:roomID }),})
      navigate("/login");
    }
  };
  const sendChoice = () => {
    console.log("choice 1 sent");

    socket.emit("pick1", { pick1: firstMove, roomID: roomID });
  };
  const sendChoice2 = () => {
    console.log(pick1, secondMove, roomID);
    socket.emit("pick2", { pick1: pick1, pick2: secondMove, roomID: roomID });
  };
  const joinGame = () => {
    console.log("join;", userID, roomID);
    socket.emit("joinGame", {
      player: userID,
      roomID: roomID,
    });
    setRoomID(roomID);
    console.log(socket);
  };

  useEffect(() => {
    asyncFn();
  }, []);

  return (
    <div className="gameInProgress">
      {showGameElements && (
        <div className="startingGame">
          <h1>Game id {roomID}</h1>
          <div className="firstPlayerMove">
            <Button className="btnRock" onClick={() => setFirstMove("Rock")} disabled={disabled}><img
            src="https://static.thenounproject.com/png/477914-200.png" className="rock"/>
            </Button>
            <Button className="btnPaper" onClick={() => setFirstMove("Paper")} disabled={disabled}><img
            src="https://static.thenounproject.com/png/477912-200.png" className="paper"
            />
            </Button>
            <Button
            className="btnScissors"
              onClick={() => setFirstMove("Scissors")}
              disabled={disabled}><img
              src="https://static.thenounproject.com/png/341564-200.png"
              className="scissors"
            />
            </Button>
            <br></br>
            <Button onClick={sendChoice}>Send</Button>
            {showResult && <div>You choose {firstMove}</div>}
          </div>
          {showPick1 && (
        <div>
          pick1 is {pick1} and pick2 is {pick2}
        </div>
      )}
          <hr></hr>
      {showWinner && <div>Winner is {winner}</div>}
          <div className="secondPlayerMove">
            <Button
              onClick={() => setSecondMove("Rock")}
              disabled={disabledSecond} className="btnRock"
            ><img
            src="https://static.thenounproject.com/png/477914-200.png" className="rock"/>
            </Button>
            <Button
              onClick={() => setSecondMove("Paper")}
              disabled={disabledSecond} className="btnPaper"
            ><img
            src="https://static.thenounproject.com/png/477912-200.png" className="paper"
            />
            </Button>
            <Button
              onClick={() => setSecondMove("Scissors")}
              disabled={disabledSecond} className="btnScissors"> 
              <img
              src="https://static.thenounproject.com/png/341564-200.png"
              className="scissors"
            />
            </Button><br></br>
          <Button onClick={sendChoice2} className="btnSend">Send</Button>
          </div>
          <div> {showPlayer2 && <div>player2 joined</div>}</div>
        </div>
      )}{" "}
      {showCreate && (
        <>
          <div className="createOrJoin">
            <h1 className="haboutGame">Create game</h1>
            <div className="createGame">
              <label>name:</label><br></br>
              <input onChange={(e) => setnameGame(e.target.value)}></input>
              <br></br>
              <Button onClick={add} className="createButton">
                Create game
              </Button>
            </div>
            <hr className="hrGame"></hr>
            <div className="join">
              <label>Enter roomID </label><br></br>
              <input
                onChange={(e) => setRoomID(e.target.value)}
                value={roomID}
              ></input>
              <br></br>
              <Button onClick={joinGame} className="btnJoin">
                Join
              </Button>
            </div>
          </div>
        </>
      )}
      
    </div>
  );
}

export default StartGame;
