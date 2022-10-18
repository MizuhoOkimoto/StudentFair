import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../components/css/LogIn-Register.css';
import App from '../App.js';

import { Link, redirect, useNavigate } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import { render } from '@testing-library/react';

function FindPw(prop) {
  const navi = useNavigate();
  const [errMessage, setErrMessage] = useState('');

  const onSubmitHandler = (e) => {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();

    const inputData = {
      email: e.target.email.value,
      fname: e.target.fname.value,
      lname: e.target.lname.value,
    };

    axios.post('http://localhost:8080/users/findPw', inputData).then((res) => {
      let data = res.data;
      console.log(typeof data);
      if (typeof data !== 'string') {
        console.log(typeof data);
        prop.setUser(res.data);
        //window.location = '/LogIn';
        navi('/LogIn', {
          //   user: data,
        });
      } else {
        console.log(data);
        setErrMessage('');
        setErrMessage(data);
      }
    });
  };

  return (
    <div className="logIn-container">
      <form className="user-form log-in" action="/findPw" method="post" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Find My Account Pw</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          <input type="text" name="email" id="email" placeholder="Email Address" />
          <i className="far fa-envelope"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="text" name="fname" id="fname" placeholder="First name" />
          <i className="far fa-user"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="text" name="lname" id="lname" placeholder="Last name" />
          <i className="far fa-user"></i>
          <div className="error"></div>
        </div>

        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submit" value="Find My Pw" />
        </div>
        <Link className="findPw" to="/findId">
          Forgot Account?
        </Link>
        <p>{errMessage}</p>
      </form>
    </div>
  );
}

export default FindPw;
