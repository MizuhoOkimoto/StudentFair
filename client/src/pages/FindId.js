import axios from 'axios';
import '../components/css/LogIn-Register.css';
import { useNavigate } from 'react-router-dom';

function FindId() {
  const navi = useNavigate();
  // const [message, setMessage] = useState('');
  // const [isFound, setIsFound] = useState(false);
  const onSubmitHandler = (e) => {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();

    const inputData = {
      email: e.target.email.value,
      dummy: false,
    };

    axios.post('https://student-fair-prj66.herokuapp.com/users/forgot-account', inputData).then((res) => {
      let data = res.data;

      if (data) {
        alert('You have an account. Redirect to Log In page.');
        navi('/LogIn', {});
      } else {
        alert('We could not find your account on our page. Redirect to Sign Up page');
        navi('/SignUp', {});
      }
    });
  };

  return (
    <div className="logIn-container">
      <form className="user-form log-in" action="/findId" method="post" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Find My Username</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          <input type="text" name="email" id="email" placeholder="Email Address" />
          <i className="far fa-envelope"></i>
          <div className="error"></div>
        </div>
        {/* <div className="input-container">
          <input type="text" name="fname" id="fname" placeholder="First name" />
          <i className="far fa-user"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="text" name="lname" id="lname" placeholder="Last name" />
          <i className="far fa-user"></i>
          <div className="error"></div>
        </div> */}

        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submit" value="Find My Username" />
        </div>
        {/* <p>{message}</p> */}
      </form>
    </div>
  );
}

export default FindId;
