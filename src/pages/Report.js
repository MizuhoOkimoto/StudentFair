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
    email: e.target,
    reportPostNumber: e.target,
    reportDesc: e.target,
  };

  console.log(user);

  // Send the user data to the backend

  //let
  axios.post('http://localhost:8080/users/report', user).then((res) => {
    console.log(res);
    if (res.data === true) {
      alert('Your report successfully reported');
      window.location = '/';
    } else {
      alert('You typed wrong report number. Please check again.');
    }
  });

  // Render to the log in page
  //window.location = '/LogIn';
};

const Report = (prop) => {
  console.log(prop.userData);
  //   console.log(prop);
  //   if (!prop.userData.email) {
  //     alert('Only Registered User can report.');
  //     //   window.location = '/allList';
  //   }
  return (
    <div className="signUp-container">
      <form className="user-form sign-up" action="/" method="POST" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Report</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border" />
        <div className="input-container">
          Reporter Id
          <span>{prop.userData.email}</span>
        </div>
        <div className="input-container">
          Reporter Name
          <span>
            {prop.userData.fname} {prop.userData.lname}
          </span>
        </div>
        <div className="input-container">
          Report Date
          <span>
            {new Date().getFullYear()}-{new Date().getMonth() + 1}-{new Date().getDate()}
          </span>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="reportPostNumber"
            id="reportPostNumber"
            placeholder="Post Number"
          />
        </div>
        <textarea
          className="report-text-area"
          type="text"
          name="reportDesc"
          id="reportDesc"
          placeholder="Report Details.."
          maxLength="1000"
          cols="88"
          rows="7"
        />

        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submitSignUp" value="Submit Report" />
        </div>
      </form>
    </div>
  );
};

export default Report;
