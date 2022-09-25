import React from 'react';
import styled from "styled-components";
import './css/Footer.css';
//import { Link } from "react-router-dom";

const FooterBox = styled.footer`
  bottom: 0;
  width: 100%;
  background-color: antiquewhite;
`;

const Footer = () => {
  return (
    <FooterBox>
      <div className="footer-box">
        
        <section className="footer">
    
      <section className="footer-info">
        <section className="footer-info-left">
          <section className="footer-info__title">
              StudentFair
          </section>
          <section to="/" className="footer-info__contents">
              About us
          </section>
          <section className="footer-info__contents">
            <a href="https://github.com/MizuhoOkimoto/StudentFair" target="blank">
              GitHub
            </a>
          </section>       
        </section>

        <section className="footer-info-center">
          <section className="footer-info__title">
            EXPLORE
          </section>
          <section className="footer-info__contents">
            Home
          </section>
          <section className="footer-info__contents">
            Product list
          </section>
        </section>
        <section className="footer-info-right">
          <section className="footer-info__title">
            SUPPORT
          </section>
          <section className="footer-info__contents">
            Contact us
          </section>
          <section className="footer-info__contents">
            Report post
          </section>
        </section>
      </section>

      <section className="copy-right">
      Copyright ©{new Date().getFullYear()} All rights reserved | PRJ666 Team 9
          </section>

    </section>
      </div>
    </FooterBox>
  );
};

export default Footer;
