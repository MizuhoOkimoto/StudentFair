import '../components/css/LogIn-Register.css';
import { Card, Button } from 'react-bootstrap';
import customer_service from '../img/contactus_pic/customer_service.png';
import sales_service from '../img/contactus_pic/sales.png';
import tech_service from '../img/contactus_pic/tech_service.png';

function CustomerService(prop) {
  return (
    <div className="contact_us_container" style={{ height: '60vh' }}>
      <h1 style={{ color: '#e9967a', fontSize: '4.5rem', marginTop: '80px', fontWeight: '780' }}>
        <span style={{ color: 'blue', fontWeight: '800', fontSize: '6rem' }}>C</span>ontact Us
      </h1>
      <h2 style={{ fontSize: '2rem', color: 'gray', marginTop: '10px' }}>
        Have any questions? We'd love to hear from you.
      </h2>
      <div
        className="contact_cards"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <Card style={{ width: '18rem', boxShadow: '0px 1px 1px gray', margin: '20px' }}>
          <Card.Body style={{ position: 'relative' }}>
            <img
              className="customer_service"
              src={customer_service}
              alt="customer_service Img"
              style={{ width: '100px', height: '100px' }}
            ></img>
            <Card.Title style={{ fontSize: '2rem', marginTop: '0px' }}>Customer Service</Card.Title>
            <Card.Text>
              Contact Mizuho <br />
              E-mail: mokimoto@myseneca.ca Phone: 416-416-4161 (9am-5pm)
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => (window.location = 'mailto:mokimoto@myseneca.ca')}
            >
              Send an E-mail
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', boxShadow: '0px 1px 1px gray', margin: '20px' }}>
          <Card.Body style={{ position: 'relative' }}>
            <img
              className="sales_service"
              src={sales_service}
              alt="sales_service Img"
              style={{ width: '123px', height: '100px' }}
            ></img>
            <Card.Title style={{ fontSize: '2rem', marginTop: '0px' }}>Sales</Card.Title>
            <Card.Text>
              Contact Jun <br />
              E-mail: jsong89@myseneca.ca Phone: 513-513-5131 (9am-5pm)
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => (window.location = 'mailto:jsong89@myseneca.ca')}
            >
              Send an E-mail
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', boxShadow: '0px 1px 1px gray', margin: '20px' }}>
          <Card.Body style={{ position: 'relative' }}>
            <img
              className="tech_service"
              src={tech_service}
              alt="tech_service Img"
              style={{ width: '85px', height: '85px' }}
            ></img>
            <Card.Title style={{ fontSize: '2rem', marginTop: '15px' }}>
              Technical Service
            </Card.Title>
            <Card.Text>
              Contact Wonchul <br />
              E-mail: wchoi28@myseneca.ca Phone: 789-789-7897 (9am-5pm)
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => (window.location = 'mailto:wchoi28@myseneca.ca')}
            >
              Send an E-mail
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default CustomerService;
