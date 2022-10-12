import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import '../components/css/LogIn-Register.css';

import { Link } from 'react-router-dom';

const LOGIN_SERVER_URL = 'http://localhost:8080/login';

// const fetchData = () => {
//   //const response = await axios.get(SERVER_URL)
//   //setNewUser(response.data)
//   fetch(LOGIN_SERVER_URL)
//     .then((res) => res.json())
//      .then((data)=> {
//          setNewUser(data)
//          console.log(data)
//     })
// }

// import Button from "../components/Button";
//import Button from '../components/Button';

const LogIn = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    var email = e.target.email;
    var password = e.target.password;

    //await axios.post(SERVER_URL, {email, fName, lName,password})
    //fetchData()
    // fetch('http://localhost:8080/login', {
    //   headers:{
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email,
    //     password
    //   })
    // })
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
          <input type="submit" name="submit" id="submitLogin" value="Log in" />
        </div>
        <div className="input-container sign-up">
          <input type="reset" id="resetLogin" value="Reset" />
        </div>
        <a
          className="findPw"
          href="https://www.WWBnB.ca/rooms/39981203?adults=1&check_in=2020-10-12&check_out=2020-10-15&source_impression_id=p3_1602289368_TJdwirxiN8oVAZ5D"
        >
          Forgot password?
        </a>
        <br />
        <Link className="nav-link signUp_btn" to="/signUp">
          <p>Sign Up</p>
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
