import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../components/css/LogIn-Register.css';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';

const onSubmitHandler = (e) => {
  // This will prevent the default html form submit behavior from taking place.
  e.preventDefault();
  // TO DO
  // - Make a validation of each fields.
  // - If any fields is empty, cannot move to log-in page.
  const user = {
    email: e.target.email.value,
    fname: e.target.fname.value,
    lname: e.target.lname.value,
    password: e.target.password.value,
    phone: '',
    city: ''
  };

  console.log(user);

  // Send the user data to the backend

  //let
  axios.post('http://localhost:8080/users/register', user).then((res) => {
    console.log(res);
    if (res.data != false) {
      alert('Welcome to Student Fair!');
      window.location = '/LogIn';
    }
  });

  // Render to the log in page
  //window.location = '/LogIn';
};

const SignUp = () => {
  return (
    <div className="signUp-container">
      <form className="user-form sign-up" action="/" method="POST" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Sign up</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          <input type="text" name="email" id="email" placeholder="Email address" />
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
        <div className="input-container">
          <input type="password" name="password" id="password" placeholder="Create a Password" />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>
        <p className="agreement">
          By selecting Agree and continue below, I agree to StudentFair’s
          <a href="">Terms of Service</a>,<a href="">Payments Terms of Service</a>,
          <a href="">Privacy Policy</a>, and
          <a href="">Nondiscrimination Policy</a>.
        </p>
        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submitSignUp" value="Agree and continue" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
