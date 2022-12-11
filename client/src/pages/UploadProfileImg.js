import { useState } from 'react';
import axios from 'axios';

// const clickToCancel = () => {
//   window.location = '/myProfile';
// };

const UploadProfilePic = (prop) => {
 
  let email = prop.userData.email;

  let uploadAddress = 'https://student-fair-prj666.herokuapp.com/users/upload_userPic/' + email;

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
      prop.updateProfilePic(res.data);
      console.log(res.data);
      alert("Success To Upload");
      
      window.location = '/myProfile';
    });
  };

  return (
    <div className="signUp-container">
      <form className="user-form sign-up" action="/myProfile" method="POST" onSubmit={onSubmitHandler}>
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
