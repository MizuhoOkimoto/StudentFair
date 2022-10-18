import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import Loading from '../components/Loading';
import '../components/css/My-Profile.css';

const MyProfile = (prop) => {
  console.log(prop.userData);

  return (
    <div className="myProfile-container">
      <div className="myProfile-card">
        <div className="top-container">
          <div className="top-section">
            <div className="profile-image"></div>
            <div className="my-profile">{prop.userData.fname}'s Profile</div>
          </div>
        </div>
        <div className="body-section">
          <div className="main-profile-container">
            <Button className="edit-btn" color="gray">
              Edit Profile
            </Button>
            <div className="name-section name">
              <div className="label">Name</div>
              <div className="value">
                {prop.userData.fname} {prop.userData.lname}
              </div>
            </div>
            <div className="name-section user-name">
              <div className="label">User name</div>
              <div className="value">{prop.userData.email}</div>
            </div>
            <div className="name-section phone">
              <div className="label">Phone</div>
              <div className="value">456-456-4564</div>
            </div>
            <div className="name-section city">
              <div className="label">City</div>
              <div className="value">Toronto, ON</div>
            </div>
          </div>
          <div className="profile-history-container">
            <p>Your Post</p>
            <div className="post-item-card">
              <img
                className="item-image"
                src="https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="product"
              />
              <div className="item-desc-container">
                <div className="item-title">Mac Book Air M2 Chips</div>
                <div className="item-price">$ 2000</div>
              </div>
              <div className="btns">
                <Button className="button" color="gray">
                  Edit Post
                </Button>
                <Button className="button" color="#c94c4c">
                  Delete Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
