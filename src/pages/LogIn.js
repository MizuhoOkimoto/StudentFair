import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../components/css/LogIn-Register.css';
import App from '../App.js';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';





function LogIn(prop){  
  
  const [errMessage, setErrMessage] = useState('');

  const onSubmitHandler = (e) => {
  
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();
  
    const inputData = {
      email: e.target.email.value,
      password: e.target.password.value
    };
  
    axios.post('http://localhost:8080/users/login', inputData).then((res) => {
      let data = res.data;
      console.log(typeof(data));
      if(typeof(data) !== 'string'){
        prop.setUser(res.data.email, res.data.password);
        window.location = '/MyProfile';
      }
      else{
        console.log(data);
        setErrMessage('');
        setErrMessage(data);
      }
    });
  };

  return (
    <div className="logIn-container">
      <form className="user-form log-in" 
            action="/login" 
            method="post" 
            onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Log in</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          <input type="text" name="email" id="email" placeholder="Username" />
          <i className="far fa-envelope"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="password" name="password" id="password" placeholder="Password" />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>

        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submit" value="Log in" />
        </div>
        <a
          className="findPw"
          href="https://www.WWBnB.ca/rooms/39981203?adults=1&check_in=2020-10-12&check_out=2020-10-15&source_impression_id=p3_1602289368_TJdwirxiN8oVAZ5D"
        >
          Forgot password?
        </a>
        <p>
          {errMessage}
        </p>
      </form>
    </div>
  );
};

export default LogIn;