import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../App.css";

function StartGame() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [nameGame, setnameGame] = useState("");
  const [userData, setUserData] = useState({});
  const add = async () => {
    try {
        const token = localStorage.getItem("token");
        await setToken(token);
      const data = localStorage.getItem("user");
      const response = await fetch(`http://localhost:3001/game/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token ,
        },
        body: JSON.stringify({ name: nameGame, user: data }),
        
      });
      const Game = await response.json();
      await navigate("/gameInProgress",{state:Game});
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const asyncFn = async () => {  
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("user");
    await setToken(token);
    if (token != null) {
      try{
        const response = await fetch(`http://localhost:3001/user/me`, {
        headers: { authorization: "Bearer " + token },
      })
        .then((res) => res.json())
        .then((data) => setUserData(data));
      }
      catch(error)
      {
        navigate("/login");
      }
    } else {
        navigate("/login");
    }};
  useEffect( () => {
    asyncFn();
  });
  return (
    <div>
      <h1 className="haboutGame">Create game</h1>
      <div className="createGame">
        <label>name:</label>
        <input onChange={(e) => setnameGame(e.target.value)}></input>
        <br></br>
        <Button onClick={add} className="createButton">
          Create game
        </Button>
      </div>
    </div>
  );
}

export default StartGame;
