import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from '../components/Button';

const clickToCancel = () => {
  window.location = '/myProfile';
};

const UploadProfilePic = (prop) => {
  let email = prop.userData.email;
  let fullname = prop.userData.fname + ' ' + prop.userData.lname;
  let uploadAddress = 'http://localhost:8080/users/upload_userPic/' + email;
  console.log(prop.userData);
  const [file, setFile] = useState(null);

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios.post(uploadAddress, formData, config).then((res) => {
      console.log('line 42');
      console.log(res.data);
      console.log(res);
      prop.updateProfilePic(res.data);

      window.location = '/myProfile';
    });
  };

  return (
    <div className="signUp-container">
      <form className="user-form sign-up" action="/" method="POST" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Update Profile Picture</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>

        <div className="input-container">
          <input type="file" className="form-control-file" name="photo" onChange={onInputChange} />
        </div>
        <div className="input-container sign-up">
          <input className="upload-btn" type="submit" name="submit" id="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default UploadProfilePic;
