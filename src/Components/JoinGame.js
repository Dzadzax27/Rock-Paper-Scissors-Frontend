// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { io } from 'socket.io-client';
// import '../App.css';

// function JoinGame() {
//   const navigate = useNavigate();
//   const [roomID, setRoomID] = useState('');
//   const [showGameElements, setShowGameElements] = useState(false);
//   const [firstMove, setFirstMove] = useState('');
//   const [showResult, setShowResult] = useState(false);

//   const token = localStorage.getItem('token');
//   const userID = localStorage.getItem('user');

//   const socket = io.connect('http://localhost:3001', {
//     query: { token },
//   });

//   const joinGame = () => {
//     socket.emit('joinGame', {
//       player: userID,
//       roomID: roomID,
//     });
    
//   }
//     socket.on('startGame', (data) => {
      
//       try {
//         setShowGameElements(true);
//       } catch (error) {
//         console.error('Error in socket.on startGame:', error);
//       }

//     return () => {
//       socket.off('startGame');
//     };
//   }, [roomID, navigate, socket]);

//   return (
//     <div>
//       {showGameElements ? (
//         <div>
//           <h1>Game id {roomID}</h1>
//           <div className="firstPlayerMove">
//           <Button onClick={() => setFirstMove("Rock")}>Rock</Button>
//           <Button onClick={() => setFirstMove("Paper")}>Paper</Button>
//           <Button onClick={() => setFirstMove("Scissors")}>Scissors</Button>
//           <br></br>
//           {showResult && <div>You choose {firstMove}</div>}
//         </div>
//           <hr></hr>
//           <div className='secondPlayerMove'>
//             <Button>Rock</Button>
//             <Button>Paper</Button>
//             <Button>Scissors</Button>
//           </div>
//         </div>
//       ) : (
//         <div className='join'>
//           <label>Enter roomID </label>
//           <input onChange={(e) => setRoomID(e.target.value)} value={roomID}></input>
//           <br></br>
//           <Button onClick={joinGame} className='btnJoin'>
//             Join
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default JoinGame;
