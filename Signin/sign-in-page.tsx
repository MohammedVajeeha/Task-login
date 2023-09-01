import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './sign-in-page.css';
import { log } from 'console';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then((d) => {
        console.log(d)
        if (d.status === 200)
          localStorage.setItem("user", email)
        navigate("/profile")
      }).catch((err) => {
        console.log(err)
      });

      // if (response.ok) {
      //   const responseData = await response.json();
      //   if (responseData.usernameMatch) {
      //     localStorage.setItem('userEmail', responseData.user.email);
      //     navigate('/profile'); // Redirect to the profile page
      //   } else {
      //     // Show an error message when email and password don't match
      //     alert('Email or password is incorrect');
      //   }
      // } else {
      //   // Handle other server errors here, e.g., invalid credentials or server down
      //   const errorMessage = await response.text();
      //   console.log({errorMessage});

      //   alert('Enter valid details');
      //   }
    } catch (error) {
      // Handle network errors or other unexpected errors
      console.error('An error occurred during sign-in:', error);
    }
  };


  return (
    <div className="AppContainer">
      <div className="LeftSection">
        <img src={'logo-jin.png'} alt='pimage' />
      </div>
      <div className="RightSection">
        <div className="SigninForm" >
          <h2 className="heading-sign">Sign In</h2>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa fa-envelope"></i>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa fa-lock"></i>
          </div>

          <div className="signin-btns" >
            <button className="btn1-signin" type="submit" onClick={handleSignIn}>
              Sign In
            </button>
            <button className="btn2-signin" onClick={() => {
              navigate("/profile")
            }} type="button">
              Sign In with o365
            </button>
          </div>


        </div>
        <div className="SignUpLink">
          <a href="/signup">You can sign up here.</a>
        </div>
      </div>

    </div>
  );
};

export default SignInPage;
