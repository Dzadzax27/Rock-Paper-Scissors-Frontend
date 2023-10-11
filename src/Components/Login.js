import React, { useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

function Login(){
  const navigate = useNavigate();
    const [usernameReg,setUsernameReg]=useState('');
    const [passwordReg,setPasswordReg]=useState('');
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const navigateToGame = () => {
      navigate('/game');
    };
    const login = async () => {
        await handleSubmit();
        if(submitted){
        try {
          const response = await fetch(`http://localhost:3001/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: usernameReg, password: passwordReg }),
          });
          
          if (!response.ok) {
            throw new Error('Registration failed');
          }
          
          const data = await response.json();
          if(data.success===true)
          {
            console.log(data);
            await localStorage.setItem("user", data.user.id);
            await localStorage.setItem("token", data.token);
            await setError(false);
            await navigateToGame();
            
          }
        } catch (error) {
          console.error('Registration error:', error);
        }}
      };
      const handleSubmit = (e) => {
        if ( usernameReg === '' || passwordReg === '') {
            setError(true);
        }else {
            setSubmitted(true);
        }
    };
    const errorMessage = () => {
      return (
          <div
              className="error"
              style={{
                  display: error ? '' : 'none',
                  color: 'red',
              }}>
              <font>Please enter all the fields</font>
          </div>
      );
    };
    const successMessage = () => {
      return (
          <div
              className="success"
              style={{
                  display: submitted ? '' : 'none',
                  color:'green'
              }}>
              <font>User {usernameReg} successfully registered!!</font>
          </div>
      );
  };
  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }
    return <div><div className='loginDiv'><h1>Login</h1>
    <div className='Informations'>
    <lable>email: </lable><br></br><input onChange={(e)=>setUsernameReg(e.target.value)}></input><br></br>
    <lable>password: </lable><br></br><input type={type} onChange={(e)=>setPasswordReg(e.target.value)}></input><span class="flex justify-around items-center" onClick={handleToggle}>
                  <Icon class="absolute mr-10" icon={icon} size={25}/>
              </span>
    <br></br>
    <Button onClick={login} className='btnLogin'>Login</Button>
    </div>
    <div className="messages">
    {errorMessage()}
</div>
    </div>
    </div>
}
export default Login;