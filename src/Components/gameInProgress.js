import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css'

function gameInProgress(){
    const gameData=localStorage.getItem("game");
    console.log(gameData); 
    return (
        <div>
          <h1>Game id</h1>
          
        </div>
      );
}

export default gameInProgress;