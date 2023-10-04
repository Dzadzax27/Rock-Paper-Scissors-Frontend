import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
function Registration() {
  const [nameReg,setnameReg]=useState('');
    const [usernameReg,setUsernameReg]=useState('');
    const [passwordReg,setPasswordReg]=useState('');
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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
        console.log('Registration successful:', data);
      } catch (error) {
        console.error('Registration error:', error);
      }}
    };
    const handleSubmit = (e) => {
      if (nameReg === '' || usernameReg === '' || passwordReg === '') {
          setError(true);
      }else {
          setSubmitted(true);
          setError(false);
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
    return <div><div className='registration'><h1>Registration</h1>
    <div className='Informations'><lable>name: </lable><input onChange={(e)=>setnameReg(e.target.value)}></input><br></br>
    <lable>email: </lable><input onChange={(e)=>setUsernameReg(e.target.value)}></input><br></br>
    <lable>password: </lable><input onChange={(e)=>setPasswordReg(e.target.value)}></input>
    <br></br>
    <Button className="btnRegister" onClick={register} >Register</Button><div className="messages">
    {errorMessage()}
</div>
</div>
    </div>
    </div>
  }
  
export default Registration;
  