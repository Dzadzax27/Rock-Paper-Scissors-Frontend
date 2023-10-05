import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import { Link } from "react-router-dom";
import '../App.css'

function GameInProgress(){
  const location = useLocation();
  useEffect(() => {
      console.log(location.state);
    }, [location.state]);
    return (
        <div>
          <h1>Game id {location.state.id}</h1>
          <div className='firstPlayerMove'>
          <Button>Rock</Button>
          <Button>Paper</Button>
          <Button>Scissors</Button>
          </div>
          <hr></hr>
          <div className='secondPlayerMove'>
          <Button>Rock</Button>
          <Button>Paper</Button>
          <Button>Scissors</Button>
          </div>
        </div>
      );
}

export default GameInProgress;