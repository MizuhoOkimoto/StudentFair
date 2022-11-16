import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../components/css/AboutUs.css';
import main_pic from '../img/AboutUs.png';

function AboutUs(prop) {
  return (
    <div className="aboutus-container">
      {/* <div className="about-us_title">
          About Us
        </div>
        <img className="main_image" src={main_pic} alt="main Img"></img> */}
      <img className="main_image" src={main_pic} alt="main Img"></img>
      <div className="contents">
        StudentFair is Canada's main online marketplace for focusing on school supplies and class
        materials such as lab kits, textbooks etc. <br />
        Those are usually only needed for one semester, but they are very costly if bought
        brand-new.
        <br />
        Our mission is to make it easier for a streamlined marketplace for students to buy and sell
        items that they need or do not need.
      </div>

      <Container className="about_buttom">
        <Row>
          <Col className="team">
            <div className="team_titile">Our Team</div>
            <div className="team_content">
              We are Team 9 in PRJ666 NAA Course
              <br />
              Team members:
              <br />
              Mizuho Okimoto, Jun Song, Wonchul Choi
            </div>
          </Col>

          <Col className="getintouch">
            <div className="contact_title">Get in touch</div>
            <div className="contact_content">Need something? We're here to help!</div>
            <div>
              <Button className="contact_btn" style={{ background: 'gray', borderColor: 'gray' }}>
                <Link to="/customerService" className="contact_btn" style={{ color: 'white' }}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default AboutUs;
