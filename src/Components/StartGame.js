import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { io } from 'socket.io-client';
import "../App.css";

function StartGame() {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState('');
  const [token, setToken] = useState("");
  const [nameGame, setnameGame] = useState("");
  const [game, setGame] = useState({});
  const [userData, setUserData] = useState({});
  const [showGameElements, setShowGameElements] = useState(false);
  const [showPlayer2, setShowPlayer2] = useState(false);
  const [firstMove, setFirstMove] = useState("");
  const [showResult, setShowResult] = useState(false);
  const userID = localStorage.getItem('user');
  const [isCreator, setIsCreator] = useState(false);

  const socket = io.connect('http://localhost:3001/', {
    query: { token },
  });
  
  const cleanPage = () => {
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
      const Game=await response.json();
      console.log(Game);
      await socket.emit('createGame',{game:Game})
      setRoomID(Game.id);
      console.log("room",socket.rooms)
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
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };
  const sendChoice=()=>{
    setShowResult(true);
    console.log("choice 1 sent")
    socket.emit('pick1',{pick1:firstMove})
  }
  const joinGame = () => {
    socket.emit('joinGame', {
      player: userID,
      roomID: roomID,
    });
    
  }
  
  socket.on('player2Joined', (data) => {
    const { roomID: joinedRoomID } = data;
    
    if (joinedRoomID === roomID) {
      setShowPlayer2(true);
    }

  });

    socket.on('startGame', (data) => {
      try {
        
        setShowPlayer2(true);
        setShowGameElements(true);
        console.log("room",socket.rooms)
        socket.emit('player2Joined', { roomID });
      } catch (error) {
        console.error('Error in socket.on startGame:', error);
      }

    return () => {
      socket.off('startGame');
    };
  }, [roomID, navigate, socket]);
  useEffect(() => {
    asyncFn();
  }, []);

  return (
    <div>
      {showGameElements ? (
        <div>
          <h1>Game id {roomID}</h1>
          <div className="firstPlayerMove">
          <Button onClick={() => setFirstMove("Rock")}>Rock</Button>
          <Button onClick={() => setFirstMove("Paper")}>Paper</Button>
          <Button onClick={() => setFirstMove("Scissors")}>Scissors</Button>
          <br></br>
          <Button onClick={sendChoice}>Send</Button>
          {showResult && <div>You choose {firstMove}</div>}
        </div>
          <hr></hr>
          <div className="secondPlayerMove">
            <Button>Rock</Button>
            <Button>Paper</Button>
            <Button>Scissors</Button>
          </div>
         <div> { showPlayer2 && (<div>player2 joined</div>)}</div>
        </div>
      ) : (
        <>
          <h1 className="haboutGame">Create game</h1>
          <div className="createGame">
            <label>name:</label>
            <input onChange={(e) => setnameGame(e.target.value)}></input>
            <br></br>
            <Button onClick={add} className="createButton">
              Create game
            </Button>
          </div>
          <div className='join'>
          <label>Enter roomID </label>
          <input onChange={(e) => setRoomID(e.target.value)} value={roomID}></input>
          <br></br>
          <Button onClick={joinGame} className='btnJoin'>
            Join
          </Button>
        </div>
        </>
      )}
    </div>
  );
}

export default StartGame;
