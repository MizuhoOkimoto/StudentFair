import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Link } from 'react-router-dom';

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
  const { params } = prop;
  console.log(params);
  
  const onSubmitHandler = (e) =>{
    e.preventDefault();
    const inputData = {
      to: '',
      //from: prop.userData.email,
      desc: e.target.contactSeller.value,
    };
    const postNum = 1;
    const url = 'http://localhost:8080/posts/detail/contact/' + postNum;

    axios.post(url, inputData).then((result) => {
      console.log(result);
    });
  };
   
  
  return (
    <div className="item-detail-container">
      <div className="item-detail-box">
        <div className="detail-header">
          <div className="detail-title">MacBook Air M2 Chip</div>
          <div className="detail-price">$ 1445</div>
          <div className="detail-address">
            <div className="address-label">Address:</div>
            <div className="address-value">180 - Fairview Mall Dr</div>
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
            <div className="desc-content">
              OPEN EVERYDAY FROM 10AM TILL 8PM CANADIAN OUTLET 644 DANFORTH AVENUE PAPE & DANFORTH
              TORONTO, ON M4K 1R3 647 786 4344 (MAIN NUMBER) 416 792 4545
            </div>
          </div>

          <div className="contact-seller">
            <form className="user-form sign-up contact-seller" action="/" method="POST" onSubmit={onSubmitHandler}>
              <div className="title">
                <div className="form-title">
                  <p>Contact to Seller</p>
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
              <div className="input-container sign-up">
                <input type="submit" name="submit" id="submitSignUp" value="Send message" />
              </div>
            </form>
          </div>
        </div>
        <div className="detail-footer">
          <Button onClick={clickedReport} className="detail-report-button" color="red">
            Report
          </Button>
          <Link className="btn-link" to="/lists">
            <Button className="btn" color="gray">
              Back to the List
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
