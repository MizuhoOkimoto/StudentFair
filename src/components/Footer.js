import styled from "styled-components";

const FooterBox = styled.footer`
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterBox>
      <div className="footer-box">
        <hr />
        <p className="copyright">
          Copyright ©{new Date().getFullYear()} All rights reserved | This site
          is made by Jun Song
        </p>
      </div>
    </FooterBox>
  );
};

export default Footer;
