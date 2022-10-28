import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const clickToCancel = () => {
  window.location = '/myProfile';
};

const clickToUpdate = () => {
  window.location = '/myProfile';
};

const editPage = (prop) => {
  return (
    <div className="signUp-container">
      {/* <div>
        <div>User Name</div>
        <div> {prop.userData.email}</div>
      </div>
      <div>
        <div>Name</div>
        <div>
          {' '}
          {prop.userData.fname} {prop.userData.lname}
        </div>
      </div>
      <div>
        <div>Phone</div>
        <div></div>
      </div>
      <div>
        <div>City</div>
        <div></div>
      </div> */}
      <form className="user-form sign-up" action="/" method="POST" onSubmit={clickToUpdate}>
        <div className="title">
          <div className="form-title">
            <p>Edit Profile</p>
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
          <input type="text" name="phone" id="phone" placeholder="Phone Number" />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="text" name="city" id="city" placeholder="City" />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>
        <div className="input-container sign-up" onClick={clickToUpdate}>
          <input type="submit" name="update" id="clickedUpdateBtn" value="Update" />
        </div>
        <div className="input-container sign-up" onClick={clickToCancel}>
          <input type="submit" name="delete" id="clickedDeleteBtn" value="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default editPage;
