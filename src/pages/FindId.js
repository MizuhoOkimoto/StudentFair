import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../components/css/LogIn-Register.css';
import App from '../App.js';

import { Link, redirect} from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import { render } from '@testing-library/react';

function FindId() {

  const [message, setMessage] = useState('');
  const [isFound, setIsFound] = useState(false);
  const onSubmitHandler = (e) => {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();

    const inputData = {
      email: e.target.email.value,
      dummy: false
    };   

    axios.post('http://localhost:8080/users/forgot-account', inputData)
    .then((res) => {
      let data = res.data

      if(data){
        setMessage( "You have an account :" + e.target.email.value);
      }
      else{
        setMessage( "We could not find your account on our page. Please Sign up");
      }
    });
  };

  return (
    <div className="logIn-container">
      <form className="user-form log-in" action="/findId" method="post" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Find My Username</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          <input type="text" name="email" id="email" placeholder="Email Address" />
          <i className="far fa-envelope"></i>
          <div className="error"></div>
        </div>
        {/* <div className="input-container">
          <input type="text" name="fname" id="fname" placeholder="First name" />
          <i className="far fa-user"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="text" name="lname" id="lname" placeholder="Last name" />
          <i className="far fa-user"></i>
          <div className="error"></div>
        </div> */}

        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submit" value="Find My Username" />
        </div>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default FindId;
