import { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/css/LogIn-Register.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UpdatePost = (prop) => {
  const navigate = useNavigate();
  const location = useLocation();
  const number = location.state.postNum;

  console.log(location.state.postNum, 'POST NUMBER IN THE EditPost.js');

  const Update_date = new Date();
  const userInfo = prop.userData;

  const [file, setFile] = useState(null);
  const [postNum, setPostNum] = useState(null);
  const [post, setPost] = useState();

  const onInputChange = (e) => {
    setFile(e.target.files);
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:8080/posts/detail/${number}`);
      console.log(res);
      setPost(res.data);
    };
    getPost();
  }, []);

  const onSubmitHandler = (e) => {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();
    console.log(file);
    const newpost = {
      field: e.target.type_post.value,
      title: e.target.title.value,
      category: e.target.category.value,
      desc: e.target.itemDetail.value,
      con: e.target.item_condition.value,
      price: e.target.item_price.value,
    };

    console.log(newpost);

    // Send the user data to the backend
    axios.put(`http://localhost:8080/posts/${number}`, newpost).then((res) => {
      console.log(res.data);
      setPostNum(res.data.post_number);
      console.log(file);
      if (file) {
        uploadPhoto(number);
      }
    });

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
          alert('Your post is successfully Updated!');
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
            <p>Update Your Post</p>
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
          Updated Date
          <span>
            {Update_date.getFullYear()}-{Update_date.getMonth() + 1}-{Update_date.getDate()}
          </span>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={post?.post_title}
            onChange={(e) => setPost({ ...post, post_title: e.target.value })}
          />
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
            <select
              aria-label="item_condition"
              id="item_condition"
              value={post?.condition}
              onChange={(e) => setPost({ ...post, condition: e.target.value })}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
        </div>
        <div className="input-container">
          Item Price
          <input
            type="text"
            name="item_price"
            id="item_price"
            placeholder="Price"
            value={post?.price}
            onChange={(e) => setPost({ ...post, price: e.target.value })}
          />
          Item Location
          <label htmlFor="location"></label>
          <select
            aria-label="pick_location"
            id="location"
            value={post?.post_location}
            onChange={(e) => setPost({ ...post, post_location: e.target.value })}
          >
            <option>Toronto</option>
            <option>Niagara</option>
            <option>Kingston</option>
            <option>Vancouver</option>
            <option>Montreal</option>
          </select>
        </div>
        <div className="input-container">
          Category
          <select
            aria-label="pick_category"
            id="category"
            value={post?.post_category}
            onChange={(e) => setPost({ ...post, post_category: e.target.value })}
          >
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
          value={post?.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
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
          <input
            type="submit"
            name="submitPost"
            id="submitPost"
            value="Update"
            // navigate(-1) is for going back to the previous page
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
