import notfound_pic from '../img/pensil.png';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div id="wrapper">
      <img
        className="notfound_image"
        src={notfound_pic}
        alt="not found Img"
        style={{
          marginTop: '90px',
        }}
      ></img>
      <div id="info">
        <h1
          style={{
            fontSize: '4rem',
            color: 'gray',
          }}
        >
          Oops!
        </h1>
        <h2
          style={{
            fontSize: '2rem',
            color: 'gray',
          }}
        >
          404 - PAGE NOT FOUND
        </h2>
        <Button
          style={{
            backgroundColor: 'tomato',
            color: 'white',
            borderColor: 'tomato',
            marginTop: '30px',
            marginBottom: '60px',
          }}
        >
          <Link
            to="/"
            style={{
              color: 'white',
            }}
          >
            Go back to StudentFair Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
