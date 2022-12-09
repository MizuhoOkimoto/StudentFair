import axios from 'axios';
import '../components/css/LogIn-Register.css';
import { Link } from 'react-router-dom';
import '../components/css/Footer.css';

function LogIn(prop) {
 

  const onSubmitHandler = (e) => {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();

    const inputData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios.post('http://localhost:8080/users/login', inputData).then((res) => {
      let data = res.data;
      console.log(
        process.env.REACT_APP_ADMIN_EMAIL,
        process.env.REACT_APP_ADMIN_PASS + ': This is admin'
      );
      if (
        inputData.email === `${process.env.REACT_APP_ADMIN_EMAIL}` &&
        inputData.password === `${process.env.REACT_APP_ADMIN_PASS}`
      ) {
        prop.setUser(data);
        console.log(data, 'HI');
        console.log('this is admin');
        window.location = '/admin';
        //navigate('/admin'); -> require to refresh the page, so reverted back to window.location above
        console.log('does not call admin page');
        return;
      } else if (typeof data !== 'string') {
        prop.setUser(res.data);
        window.location = '/MyProfile/';
      } else {
        alert("Password or Id doesn't match! Please try again.");
      }
    });
  };

  return (
    <div className="logIn-container">
      <form className="user-form log-in" action="/login" method="post" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Log in</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border"></div>
        <div className="input-container">
          <input type="text" name="email" id="email" placeholder="Username" />
          <i className="far fa-envelope"></i>
          <div className="error"></div>
        </div>
        <div className="input-container">
          <input type="password" name="password" id="password" placeholder="Password" />
          <i className="fas fa-lock"></i>
          <div className="error"></div>
        </div>

        <div className="input-container sign-up">
          <input className="log-in-button" type="submit" name="" id="submit" value="Log in" />
        </div>
        <div>
          <Link className="findPw" to="/findId">
            Forgot <span>Username?</span>
          </Link>
          <span> or </span>
          <Link className="findPw" to="/findPw">
            Forgot <span> Password?</span>
          </Link>
        </div>
        {/* <p>{errMessage}</p> */}
      </form>
    </div>
  );
}

export default LogIn;
