import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../components/css/LogIn-Register.css';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';

const CreatePost = (prop) => {
  const create_date = new Date();
  const userInfo = prop.userData;

  const [file, setFile] = useState(null);
  const [postNum, setPostNum] = useState(null);
  const onInputChange = (e) => {
    setFile(e.target.files);
  };

  const onSubmitHandler = async (e) => {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();
    console.log(file);

    const posts = await axios.get(`http://localhost:8080/posts/`);

    const newpost = {
      email: userInfo.email,
      field: e.target.type_post.value,
      title: e.target.title.value,
      category: e.target.category.value,
      desc: e.target.itemDetail.value,
      con: e.target.item_condition.value,
      price: e.target.item_price.value,
    };

    console.log(newpost);

    // Send the user data to the backend

    axios.post('http://localhost:8080/posts/create_post', newpost).then((res) => {
      console.log(res.data);
      setPostNum(res.data.post_number);
      uploadPhoto(res.data.post_number);
    });

    // Render to the log in page
    //window.location = '/LogIn';
    const formData = new FormData();

    if (file !== null) {
      for (var i = 0; i < file.length; i++) {
        formData.append('photo', file[i]);
        console.log(i);
      }
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const uploadPhoto = (postNum) => {
      let address =
        'http://localhost:8080/posts/upload_post_pic/' + postNum + '/' + prop.userData.email;
      axios.post(address, formData, config).then((res) => {
        console.log(res.data);
        if (res.data != false) {
          alert('Your post is successfully created!');
          window.location = '/lists';
        }
      });
    };
  };

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
        <div className="input-container">
          Type of Post
          <div className="typeOfService">
            <label htmlFor="type_post"></label>
            <select aria-label="type_post" id="type_post">
              <option>Sell</option>
              <option>Buy</option>
            </select>
          </div>
          Item Condition
          <div className="itemCondition">
            <label htmlFor="item_condition"></label>
            <select aria-label="item_condition" id="item_condition">
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
        </div>
        <div className="input-container">
          Item Price
          <input type="text" name="item_price" id="item_price" placeholder="Price" />
          Item Location
          <label htmlFor="location"></label>
          <select aria-label="pick_location" id="location">
            <option>Toronto</option>
            <option>Niagara</option>
            <option>Kingston</option>
            <option>Vancouver</option>
            <option>Montreal</option>
          </select>
        </div>
        <div className="input-container">
          Category
          <select aria-label="pick_category" id="category">
            <option>Computer Accessories</option>
            <option>Textbook</option>
            <option>Lab Materials</option>
            <option>Electronics</option>
          </select>
        </div>

        <div className="input-container file-container">
          <input
            type="file"
            className="form-control-file"
            name="photo"
            id="photo"
            multiple="multiple"
            onChange={onInputChange}
          />
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
