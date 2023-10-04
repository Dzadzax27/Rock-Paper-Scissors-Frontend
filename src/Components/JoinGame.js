import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css'

function JoinGame(){
    const gameData=localStorage.getItem("game");
    console.log(gameData); 
    return (
        <div className='join'>
          <label>enter roomID   </label><input></input><br></br>
          <Button className='btnJoin'>Join</Button>
        </div>
      );
}

export default JoinGame;