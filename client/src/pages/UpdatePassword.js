import { useState } from 'react';
import axios from 'axios';

const clickToCancel = () => {
  window.location = '/myProfile';
};

function ChangePasswordPage(prop) {
  let email = prop.userData.email;
  let fullname = prop.userData.fname + ' ' + prop.userData.lname;
  const [message, setMessage] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (e.target.newPassword.value === e.target.rePassword.value) {
      setMessage('');
      const updatedData = {
        email: email,
        newPassword: e.target.newPassword.value,
      };
      console.log(updatedData);
      axios.post('https://student-fair-prj666.herokuapp.com/users/rest-password', updatedData).then((res) => {
        console.log(res.data);
        prop.updatePassword(res.data);
        window.location = '/myProfile';
      });
      
    } else {
      setMessage('Please Match the Password');
    }
  };

  return (
    <div className="signUp-container">
      <form className="user-form sign-up" action="/" method="POST" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Update Password</p>
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
          <input
            type="text"
            name="newPassword"
            id="newPassword"
            placeholder="Please Enter New Password"
          />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="rePassword"
            id="rePassword"
            placeholder="Please Re-Enter New Password"
          />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>
        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submit" value="Update" />
        </div>
        <div className="input-container sign-up" onClick={clickToCancel}>
          <input type="submit" name="delete" id="clickedDeleteBtn" value="Cancel" />
        </div>
        <div>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
