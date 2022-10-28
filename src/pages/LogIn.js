import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../components/css/LogIn-Register.css';

import { Link, redirect } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import '../components/css/Footer.css';
import { render } from '@testing-library/react';

function LogIn(prop) {
  // const [errMessage, setErrMessage] = useState('');

  const onSubmitHandler = (e) => {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();

    const inputData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios.post('http://localhost:8080/users/login', inputData).then((res) => {
      let data = res.data;

      if (typeof data !== 'string') {
        prop.setUser(res.data);
        window.location = '/MyProfile';
      } else {
        alert("Password or Id doesn't match! Please try again.");
        // setErrMessage('');
        // setErrMessage(data);
      }
    });
  };

  return (
    <div className="logIn-container">
      <form className="user-form log-in" action="/login" method="post" onSubmit={onSubmitHandler}>
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
        <div>
          <Link className="findPw" to="/findId">
            Forgot <span>Username?</span>
          </Link>
          <span> or </span>
          <Link className="findPw" to="/findPw">
            Forgot <span> Password?</span>
          </Link>
        </div>
        {/* <p>{errMessage}</p> */}
      </form>
    </div>
  );
}

export default LogIn;
