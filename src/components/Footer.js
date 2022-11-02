import React from 'react';
import styled from 'styled-components';
import './css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const FooterBox = styled.footer`
  bottom: 0;
  width: 100%;
  background-color: antiquewhite;
`;

const clickedCustomerService = () => {
  window.location = '/customerService';
};

const clickedReport = () => {
  window.location = '/report';
};

const Footer = () => {
  return (
    <FooterBox>
      <div className="footer-box">
        <section className="footer">
          <section className="footer-info">
            <section className="footer-info-left">
              <section className="footer-info__title">StudentFair</section>
              <section to="/" className="footer-info__contents">
                About Us
              </section>
              <section className="footer-info__contents">
                <a href="https://github.com/MizuhoOkimoto/StudentFair" target="blank">
                  GitHub
                </a>
              </section>
            </section>

            <section className="footer-info-center">
              <section className="footer-info__title">EXPLORE</section>
              <section className="footer-info__contents">Home</section>
              <section className="footer-info__contents">Product List</section>
            </section>
            <section className="footer-info-right">
              <section className="footer-info__title">SUPPORT</section>
              <section className="footer-info__contents" onClick={clickedCustomerService}>
                Contact Us
              </section>
              <section className="footer-info__contents" onClick={clickedReport}>
                Report Post
              </section>
            </section>
          </section>

          <section className="social-media">
            <section className="youtube social">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </section>
            <section className="facebook social">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </section>
            <section className="twitter social">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </section>
            <section className="instagram social">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
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
