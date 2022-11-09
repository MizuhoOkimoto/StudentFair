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
  const user = {};

  console.log(user);

  // Send the user data to the backend

  //let
  axios.post('http://localhost:8080/users/createPost', user).then((res) => {
    console.log(res);
    if (res.data != false) {
      alert('Your post is successfully created!');
      window.location = '/allList';
    }
  });

  // Render to the log in page
  //window.location = '/LogIn';
};

const CreatePost = (prop) => {
  const create_date = new Date();
  const userInfo = prop.userData;
  console.log(userInfo);
  return (
    <div className="signUp-container">
      <form className="user-form sign-up" action="/" method="POST" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Create Your Post</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          User Name
          <span>
            {userInfo.fname} {userInfo.lname}
          </span>
        </div>
        <div className="input-container">
          User Email
          <span>{userInfo.email}</span>
        </div>
        <div className="input-container">
          Create Date
          <span>
            {create_date.getFullYear()}-{create_date.getMonth() + 1}-{create_date.getDate()}
          </span>
        </div>
        <div className="input-container">
          <input type="text" name="title" id="title" placeholder="Title" />
        </div>
        <div className="input-container post-options">
          <span>Type of Post</span>
          <div className="typeOfService">
            <label htmlFor="type_post"></label>
            <select aria-label="type_post" id="type_post">
              <option>Sell</option>
              <option>Buy</option>
            </select>
          </div>
          <span>Item Condition</span>
          <div className="itemCondition">
            <label htmlFor="item_condition"></label>
            <select aria-label="item_condition" id="item_condition">
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <span>Item Price</span>
          <input type="text" name="item_price" id="item_price" placeholder="Price" />
          <span>Item Location</span>
          <input type="text" name="location" id="location" placeholder="Location" />
        </div>
        <div className="input-container">
          <input type="text" name="category" id="category" placeholder="Category" />
        </div>

        <div className="input-container file-container">
          <input type="file" name="fragment-file" id="fragment-file" multiple="multiple" />
          <span id="filename">Click here to upload your pics</span>
        </div>

        <textarea
          className="report-text-area"
          type="text"
          name="itemDetail"
          id="itemDetail"
          placeholder="Item Details"
          maxLength="1000"
          cols="88"
          rows="7"
        />
        <div className="input-container sign-up">
          <input type="submit" name="submitPost" id="submitPost" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
