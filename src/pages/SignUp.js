import { useState, useEffect } from 'react';
import styled from 'styled-components';

import '../components/css/LogIn-Register.css';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';

const SignUp = () => {
  return (
    <div className="signUp-container">
      <form className="user-form sign-up" action="/" method="POST">
        <div className="title">
          <div className="form-title">
            <p>Sign up</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          <input type="text" name="email" id="email_signUp" placeholder="Email address" />
          <i className="far fa-envelope"></i>
          <div className="error"></div>
        </div>
        <p>We'll email you trip confirmations and receipts.</p>
        <div className="input-container">
          <input type="text" name="fName" id="fName" placeholder="First name" />
          <i className="far fa-user"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="text" name="lName" id="lName" placeholder="Last name" />
          <i className="far fa-user"></i>
          <div className="error"></div>
        </div>
        <p>Make sure it matches the name on your government ID.</p>
        <div className="input-container">
          <input type="date" name="birthDate" id="birth" placeholder="Birth date" />
          <div className="error"></div>
        </div>
        <p>
          To sign up, you need to be at least 18. Your birthday won’t be shared with other people
          who use StudentFair.
        </p>
        <div className="input-container">
          <input
            type="password"
            name="password"
            id="passwordSignUp"
            placeholder="Create a Password"
          />
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
        <div className="input-container sign-up">
          <input type="reset" id="resetSignUp" value="Reset" />
        </div>
        <Link className="nav-link logIn_btn" to="/logIn">
          <p>Log In</p>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
