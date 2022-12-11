import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../components/css/My-Profile.css';
import axios from 'axios';

const onClickEvent = () => {
  window.location = '/editProfile';
};
const onClickChangePasswordEvent = () => {
  window.location = '/update_password';
};

const clickToDelete = () => {
  if (window.confirm('Are you sure to delete your account?') === true) {
    alert('Your account is safely deleted.');
    window.location = '/deleteAccount';
  } else {
    alert('You canceled delete your account!');
  }
};

function MyProfile(prop) {
  const temp = prop.userData;
  //console.log(temp, ' TEMP');
  const [userPost, setUserPost] = useState();
  //const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (userPost === undefined || userPost.length === 0) {
      axios.get(`https://student-fair-prj66.herokuapp.com/users/${temp.email}`).then((res) => {
        if (res !== undefined) {
          prop.setUser(res.data[0]);
        }
      });
      //console.log(prop.userData.email);
      axios.get(`https://student-fair-prj66.herokuapp.com/posts/getRecent/${temp.email}`).then((res) => {
        //console.log(res);
        //console.log(res.data);
        setUserPost(res.data);
      });
    }
  }, [userPost]);

  // Mizuho modified this clickedSeeMoreBtn clickhandler
  // 1. Moved to inside the MyProfile function
  // 2. Used navigate instead of window.location to prevent refreshing page
  // because if the page refresh, it loses props
  const clickedSeeMoreBtn = () => {
    navigate('/myProfile/post/history');
  };

  const deletePostHandler = async () => {
    await axios.delete(`https://student-fair-prj66.herokuapp.com/posts/delete/${userPost.post_number}`);
    axios.get(`https://student-fair-prj66.herokuapp.com/posts/getRecent/${prop.userData.email}`).then((res) => {
      console.log(res.data);
      setUserPost(res.data);
    });
  };

  const editPostHandler = () => {
    navigate('/updatePost', { state: { postNum: userPost.post_number } });
  };

  const clickToAdmin = () => {
    navigate('/admin');
  };

  //let uploadAddress = 'http://localhost:8080/users/upload_userPic/' + prop.userData.email;
  //const [file, setFile] = useState(null);
  // const onInputChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('photo', file);
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };

  //   axios.post(uploadAddress, formData, config).then((res) => {
  //     console.log(res.data);
  //     alert('Success To Upload');
  //     window.location = '/myProfile';
  //   });
  // };
  
  return (
    <div className="myProfile-container">
      <div className="myProfile-card">
        <div className="top-container">
          <div className="top-section">
            <div className="profile-image">
              <img
                className="item-image"
                //src="https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                src={prop.userData.imgURL}
                alt="profile"
              />
            </div>
            <Link className="nav-link profile-pic-upload-btn" to="/myProfile/upload_picture">
              Update Picture
            </Link>
            <div className="my-profile-container">
              <div className="my-profile">{prop.userData.fname}'s Profile</div>
              <div className="my-profile-upload"></div>
            </div>
          </div>
        </div>
        <div className="body-section">
          <div className="main-profile-container">
            <Button className="edit-btn" color="gray" onClick={onClickEvent}>
              Edit
              <br />
              Profile
            </Button>
            <Button className="edit-btn" color="gray" onClick={onClickChangePasswordEvent}>
              Change
              <br />
              Password
            </Button>
            <Button className="edit-btn" color="gray" onClick={clickToDelete}>
              Delete
              <br />
              Profile
            </Button>

            {temp.isAdmin === 'true' && (
              <Button className="edit-btn" color="gray" onClick={clickToAdmin}>
                Admin
                <br />
                Page
              </Button>
            )}

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
              <div className="value">{prop.userData.phone}</div>
            </div>
            <div className="name-section city">
              <div className="label">City</div>
              <div className="value">{prop.userData.city}</div>
            </div>
          </div>

          {/* NOTE: If it's true, && renders the component, if it's false, the component does not display */}
          {userPost && (
            <div className="profile-history-container">
              <p>Your Latest Post</p>
              <div className="post-item-card">
                <img className="item-image" src={userPost.img[0]} alt="product" />
                <div className="item-desc-container">
                  <div className="item-title">{userPost.post_title}</div>
                  <div className="item-price">$ {userPost.price}</div>
                </div>
                <div className="btns">
                  <Button className="button" color="gray" onClick={editPostHandler}>
                    Edit Post
                  </Button>
                  <Button className="button" color="#c94c4c" onClick={deletePostHandler}>
                    Delete Post
                  </Button>
                </div>
              </div>
              <div className="seeMoreBtn">
                <Button className="button" color="gray" onClick={clickedSeeMoreBtn}>
                  See More...
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
