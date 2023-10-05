import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import '../App.css';
import { io } from 'socket.io-client';


function JoinGame(){
    const navigate = useNavigate();
    const [roomID,setRoomID]=useState("");
    const token = localStorage.getItem("token");
    const socket = io.connect("http://localhost:3001",{
        query:{token}
    });
    const userID = localStorage.getItem("user");
    
    const joinGame=()=>{
        socket.emit('joinGame',{
            player:userID,
            roomID:roomID
        });
    }
    socket.on('startGame', (data) => {
        console.log("startGame event received");
        try {
          navigate("/gameInProgress", { state: { id: roomID } });
        } catch (error) {
          console.error("Error in socket.on startGame:", error);
        }})
    
    return (
        <div className='join'>
          <label>enter roomID   </label><input onChange={(e)=>setRoomID(e.target.value)}></input><br></br>
          <Button onClick={joinGame} className='btnJoin'>Join</Button>
        </div>
      );
}

export default JoinGame;