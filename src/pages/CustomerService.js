import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../components/css/LogIn-Register.css';
import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
//import { create } from '../../Server/module/report_schema';

function CustomerService(prop) {
  const create_date = new Date();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newReport = {
      email: prop.userData.email,
      category: '',
      title: e.target.title.value,
      description: e.target.desc.value,
      date: create_date,
    };

    axios.post('http://localhost:8080/reports/customerService', newReport).then((res) => {
      console.log(res);
      if (res.data === true) {
        alert('Your service ticket successfully submitted');
        window.location = '/';
      } else {
        alert('You need to type details. Please check again.');
      }
    }, []);
  };

  return (
    <div className="signUp-container">
      <form className="user-form sign-up" action="/" method="POST" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Contact CustomerService</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border" />
        <div className="input-container">
          User Email
          <span>{prop.userData.email}</span>
        </div>
        <div className="input-container">
          User Name
          <span>
            {prop.userData.fname} {prop.userData.lname}
          </span>
        </div>
        <div className="input-container">
          Date
          <span>
            {create_date.getFullYear()}-{create_date.getMonth() + 1}-{create_date.getDate()}
          </span>
        </div>
        <div className="input-container">
          <input type="text" name="title" id="title" placeholder="Title" />
        </div>
        <textarea
          className="report-text-area"
          type="text"
          name="desc"
          id="desc"
          placeholder="Details"
          maxLength="1000"
          cols="88"
          rows="7"
        />

        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submitSignUp" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default CustomerService;
