import axios from 'axios';
import '../components/css/LogIn-Register.css';
import { useNavigate } from 'react-router-dom';


function FindPw(prop) {
  const navi = useNavigate();
  // const [message, setMessage] = useState('');

  const onSubmitHandler = (e) => {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();

    const inputData = {
      email: e.target.email.value,
      dummy: false,
    };

    axios.post('http://localhost:8080/users/forgot-password', inputData).then((res) => {
      let data = res.data;
      console.log(data);
      // setMessage('Your temporary password : ' + res.data);
      if (typeof data !== 'string') {
        console.log(typeof data);
        prop.setUser(res.data);
        alert("Can't find your password. Please try again.");
        //window.location = '/LogIn';
        navi('/FindPw', {});
      } else {
        console.log(data);
        alert('Your temporary password is sent to your registered email.');
        // setErrMessage('');
        // setErrMessage(data);
        navi('/LogIn', {});
      }
    });
  };

  return (
    <div className="logIn-container">
      <form className="user-form log-in" action="/findPw" method="post" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Find My Password</p>
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
          <input type="submit" name="submit" id="submit" value="Find My Password" />
        </div>

        {/* <p>{message}</p> */}
      </form>
    </div>
  );
}

export default FindPw;
