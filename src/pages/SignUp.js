import { useState, useEffect, Component } from 'react';
import axios from 'axios';
import '../components/css/LogIn-Register.css';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    // Binding 'this' to each of these methods. So 'this' will refer correctly.
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserFname = this.onChangeUserFname.bind(this);
    this.onChangeUserLname = this.onChangeUserLname.bind(this);
    // this.onChangeUserBirthday = this.onChangeUserBirthday.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      fname: '',
      lname: '',
      birthday: '', //fix later
      password: '',
    };
  }

  onChangeUserEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeUserFname(e) {
    this.setState({
      fname: e.target.value,
    });
  }
  onChangeUserLname(e) {
    this.setState({
      lname: e.target.value,
    });
  }
  // onChangeUserBirthday(e) {
  //   this.setState({
  //     birthday: e.target.value,
  //   });
  // }
  onChangeUserPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    // This will prevent the default html form submit behavior from taking place.
    e.preventDefault();

    const user = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname,
      // birthday: this.state.birthday,
      password: this.state.password,
    };

    console.log(user);

    // Send the user data to the backend
    axios.post('http://localhost:8080/users/add', user).then((res) => console.log(res.data));

    // Render to the log in page
    window.location = '/LogIn';
  }

  render() {
    return (
      <div className="signUp-container">
        <form className="user-form sign-up" action="/" method="POST" onSubmit={this.onSubmit}>
          <div className="title">
            <div className="form-title">
              <p>Sign up</p>
            </div>
            <i className="fas fa-times"></i>
          </div>
          <div className="border"></div>
          <div className="input-container">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email address"
              value={this.state.email}
              onChange={this.onChangeUserEmail}
            />
            <i className="far fa-envelope"></i>
            <div className="error"></div>
          </div>
          <p>We'll email you trip confirmations and receipts.</p>
          <div className="input-container">
            <input
              type="text"
              name="fName"
              id="fName"
              placeholder="First name"
              value={this.state.fname}
              onChange={this.onChangeUserFname}
            />
            <i className="far fa-user"></i>
            <div className="error"></div>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="lName"
              id="lName"
              placeholder="Last name"
              value={this.state.lname}
              onChange={this.onChangeUserLname}
            />
            <i className="far fa-user"></i>
            <div className="error"></div>
          </div>
          {/* <p>Make sure it matches the name on your government ID.</p>
          <div className="input-container">
            <input
              type="date"
              name="birthDate"
              id="birth"
              placeholder="Birth date"
              value={this.state.birthday}
              onChange={this.onChangeUserBirthday}
            />
            <div className="error"></div>
          </div> */}
          <p>
            -Password should contains both uppercase and lowercase characters
            <br />
            -Password should contains digits and punctuation characters (e.g., !@#$%^&*)
          </p>
          <div className="input-container">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Create a Password"
              value={this.state.password}
              onChange={this.onChangeUserPassword}
            />
            <i className="fas fa-lock"></i>
            <div className="error"></div>
          </div>
          <p className="agreement">
            By selecting Agree and continue below, I agree to StudentFair’s
            <a href="">Terms of Service</a>,<a href="">Payments Terms of Service</a>,
            <a href="">Privacy Policy</a>, and
            <a href="">Nondiscrimination Policy</a>.
          </p>
          <div className="input-container sign-up">
            <input type="submit" name="submit" id="submit" value="Agree and continue" />
          </div>
        </form>
      </div>
    );
  }
}
