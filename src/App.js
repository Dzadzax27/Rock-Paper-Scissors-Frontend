import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
function App() {
  return <div><div className='main'><h1>Welcome to game</h1>
  <div className='Buttons'>
   <Link to="/login"> <Button className='LoginButton'>Login</Button></Link>
   <Link to="/registration"> <Button className='RegisterButton'>Register</Button></Link></div>
  </div>
  </div>
}

export default App;
