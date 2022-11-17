
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from '../components/Button';



const clickToCancel = () => {
  window.location = '/myProfile';
};



const EditPage = (prop) => {
  let email = prop.userData.email;
  let fullname = prop.userData.fname + " " + prop.userData.lname;
  const [file,setFile] =useState(null);
  const onInputChange = (e) => {
    setFile(e.target.files[0])
    
  }
  const onSubmitHandler = (e) => {
    
    e.preventDefault();

    
    const updatedData = {  
      email: email,  
      newPhone: e.target.newPhone.value,
      newCity: e.target.newCity.value,
     
    };    
    
   

    axios.post('http://localhost:8080/users/update_info', updatedData).then((res) => {
            console.log(res.data);
            prop.updateInfo(updatedData);
            window.location = '/MyProfile';
         });
    
  };

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
      <form className="user-form sign-up" action="/" method="POST" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Edit Profile</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          <p id="email">{email}</p>
        </div>
        <div className="input-container">
          <p id="fullname">{fullname}</p>
        </div>
        
        <div className="input-container">
          <input type="text" name="newPhone" id="newPhone" placeholder="Phone Number" />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="text" name="newCity" id="newCity" placeholder="City" />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>
        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submit" value="Update" />
        </div>
        <div className="input-container sign-up" onClick={clickToCancel}>
          <input type="submit" name="delete" id="clickedDeleteBtn" value="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default EditPage;
