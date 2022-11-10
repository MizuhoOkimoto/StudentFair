import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import Loading from '../components/Loading';
import '../components/css/Item-Detail.css';

const clickedReport = () => {
  window.location = '/report';
};

const ItemDetail = () => {
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
            <img
              className="main-image"
              src="https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            />
            <div className="detail-sub-images">
              <img
                className="sub-image"
                src="https://kjca.images.icas.io/api/v1/f72ed6af/images/9b/9b2ca975-ebd3-4b06-abf0-618d9e3dd2f4?rule=kijijica-640-webp"
              ></img>
              <img
                className="sub-image"
                src="https://kjca.images.icas.io/api/v1/f72ed6af/images/cb/cbcee4e8-b1e0-4453-ab79-5f2c09f39188?rule=kijijica-640-webp"
              ></img>
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
            <form className="user-form sign-up contact-seller" action="/" method="POST">
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
          <Link className="btn-link" to="/allList">
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
