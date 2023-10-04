import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Registration from './Components/Registration'
import Login from './Components/Login'
import Game from './Components/Game'
import StartGame from './Components/StartGame';
import GameInProgress from './Components/gameInProgress';
import JoinGame from './Components/JoinGame';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "registration",
    element: <Registration/>,
  },
{
  path:"login",
  element: <Login/>,

},
  {
    path:"game",
    element: <Game/>,
  },
  {
    path:"startgame",
    element:<StartGame/>
},
  {
    path:"gameInProgress",
    element:<GameInProgress/>
  },
  {
    path:"joingame",
    element:<JoinGame/>
  }])
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  )
