import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
function Registration() {
  const [nameReg,setnameReg]=useState('');
    const [usernameReg,setUsernameReg]=useState('');
    const [passwordReg,setPasswordReg]=useState('');
    const [error, setError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);
    let register = async () => {
      {handleSubmit()};
      if(submitted){
      try {
        const response = await fetch(`http://localhost:3001/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: nameReg, email: usernameReg, password: passwordReg }),
        });
        
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        const data = await response.json();
        setCorrect(true);
        console.log('Registration successful:', data);
      } catch (error) {
        console.error('Registration error:', error);
      }}
    };
    const handleSubmit = (e) => {
      const word = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (nameReg === '' || usernameReg === '' || passwordReg === '') {
          setError(true);
          
      }
      else {
        if(!passwordReg.match(word))
          {
              setErrorPassword(true);
              setError(false);
    
          }
          else
          {setSubmitted(true);
          setError(false);
          setErrorPassword(false);}
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
                display: correct ? '' : 'none',
                color:'green'
            }}>
            <font>User {usernameReg} successfully registered!!</font>
        </div>
    );}
  const errorPasswordMessage = () => {
    return (
        <div
            className="error"
            style={{
                display: errorPassword ? '' : 'none',
                color: 'red',
            }}>
            <font>Your password must contain at least 8 characters and at least one letter and at least one number.</font>
        </div>
    );
  };
    return <div><div className='registration'><h1>Registration</h1>
    <div className='Informations'><lable>name: </lable><br></br><input onChange={(e)=>setnameReg(e.target.value)}></input><br></br>
    <lable>email: </lable><br></br><input onChange={(e)=>setUsernameReg(e.target.value)}></input><br></br>
    <lable>password: </lable><br></br><input onChange={(e)=>setPasswordReg(e.target.value)}></input>
    <br></br>
    <Button className="btnRegister" onClick={register} >Register</Button><div className="messages">
    {errorMessage()}
    {errorPasswordMessage()}
</div>
</div>
    </div>
    </div>
  }
  
export default Registration;
  