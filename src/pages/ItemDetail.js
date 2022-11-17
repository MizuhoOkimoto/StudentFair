import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import Loading from '../components/Loading';
import '../components/css/Item-Detail.css';
import mainImg1 from '../img/post_pic/mac-book.avif';
import subImg1 from '../img/post_pic/mac-book2.webp';
import subImg2 from '../img/post_pic/mac-book3.webp';

const clickedReport = () => {
  window.location = '/report';
};

const ItemDetail = (prop) => {
  const { post } = useParams();

  const [curPost, setCurPost] = useState();
  const [sell, setSell] = useState();
  const url = 'http://localhost:8080/posts/detail/' + post;
  console.log(post);

  useEffect(() => {
    if (curPost === undefined || curPost.length == 0)
      axios.get(url).then((res) => {
        console.log(res.data);
        setCurPost(res.data);
      });
  }, [curPost]);
  console.log(curPost);
  useEffect(() => {
    if (curPost != undefined) {
      const sellUrl = 'http://localhost:8080/users/getSellInfo/' + curPost.user_id;

      if (sell === undefined || sell.length == 0)
        axios.get(sellUrl).then((res) => {
          console.log(res.data);
          setSell(res.data);
        });
    }
  }, [sell]);
  if (curPost != undefined) {
    const sellUrl = 'http://localhost:8080/users/getSellInfo/' + curPost.user_id;

    if (sell === undefined || sell.length == 0)
      axios.get(sellUrl).then((res) => {
        console.log(res.data);
        setSell(res.data);
      });
  }
  console.log(sell);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const inputData = {
      to: sell.email,
      from: prop.userData.email,
      desc: e.target.contactSeller.value,
    };
    const url = 'http://localhost:8080/posts/detail/contact/' + post;

    axios.post(url, inputData).then((result) => {
      console.log(result);
    });
  };

  const clickedSeeMoreBtn = () => {
    window.location = '/allUserPost';
  };

  return (
    <div className="item-detail-container">
      {curPost !== undefined ? (
        <div className="item-detail-box">
          <div className="detail-header">
            <div className="detail-title">{curPost.post_title}</div>
            <div className="detail-price">$ {curPost.price}</div>
            <div className="detail-address">
              <div className="address-label">Location:</div>
              <div className="address-value">{curPost.location}</div>
            </div>
          </div>
          <div className="detail-body">
            <div className="detail-images">
              <img className="main-image" src={mainImg1} alt="main-product-img" />
              <div className="detail-sub-images">
                <img className="sub-image" src={subImg1} alt="sub-product-img1"></img>
                <img className="sub-image" src={subImg2} alt="sub-product-img2"></img>
                <div className="sub-image see-more-images">More images+</div>
              </div>
            </div>
            <div className="detail-desc">
              <div className="desc-title">Description</div>
              <div className="desc-content">{curPost.description}</div>
            </div>
            {prop.userData.email !== '' ? (
              <div className="contact-seller">
                <div className="contact-form">
                  <form
                    className="user-form sign-up contact-seller"
                    action="/"
                    method="POST"
                    onSubmit={onSubmitHandler}
                  >
                    <div className="title">
                      <div className="form-title">
                        <p>Contact to Seller</p>
                      </div>
                      <div>
                        <p>
                          Name: {sell !== undefined ? sell.fname + ' ' + sell.lname : ''}
                          <br />
                          Email: {sell !== undefined ? sell.email : ''}
                          <br />
                          Phone: {sell !== undefined ? sell.phone : ''}
                        </p>
                      </div>
                      <i className="fas fa-times"></i>
                    </div>
                    <div className="border" />
                    <textarea
                      className="report-text-area"
                      type="text"
                      name="contactSeller"
                      id="contactSeller"
                      placeholder="Type your message"
                      maxLength="1000"
                      cols="88"
                      rows="3"
                    />
                    <div className="input-container sign-up item-detail-submit-btn">
                      <input type="submit" name="submit" id="submitSignUp" value="Send message" />
                    </div>
                  </form>
                </div>
                <div className="post-contact">
                  <div>{sell !== undefined ? sell.fname + ' ' + sell.lname : ''}</div>
                  <div>Phone: {sell !== undefined ? sell.phone : ''}</div>
                  <div>Location: {sell !== undefined ? sell.city : ''}</div>
                  <div>Rate: {}</div>

                  <Button className="button" color="gray" onClick={clickedSeeMoreBtn}>
                    View other item from the user
                  </Button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="detail-footer">
            <Link className="btn-link" to="/AllUserPost">
              <Button className="btn" color="gray">
                Back to the List
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ItemDetail;
