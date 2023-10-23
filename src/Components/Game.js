import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css'

function Game(){
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});
    const data = localStorage.getItem("user");
    const navigateToGame = () => {
        navigate("/startgame");
      };
      const navigateToJoin = () => {
        navigate("/joingame",{state:data});
      };
      const asyncFn = async () => {  
        const token = localStorage.getItem("token");
        
        await setToken(token);
        await console.log(token);
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
  useEffect(() => {
        asyncFn();
    }, []);
    return <div><div className='gameButtons'><h2>Welcome to game</h2><Button onClick={navigateToGame} className='btnStart'>Start or join game</Button>
    <Button className='btnMe'>About me</Button>
    <Button className='btnRules'>About game</Button></div></div>
}

export default Game;