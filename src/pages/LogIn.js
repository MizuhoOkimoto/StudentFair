import { useState, useEffect, Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import '../components/css/LogIn-Register.css';

import { Link } from 'react-router-dom';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    // Binding 'this' to each of these methods. So 'this' will refer correctly.
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeUserEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
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
      password: this.state.password,
    };
    console.log(user);
    axios.post('http://localhost:8080/users/login', user).then((res) => console.log(res.data));
  }
  render(){
    return (
      <div className="logIn-container">
        <form className="user-form log-in" action="/login" method="post" onSubmit={this.onSubmit}>
          <div className="title">
            <div className="form-title">
              <p>Log in</p>
            </div>
            <i className="fas fa-times"></i>
          </div>
          <div className="border"></div>
          <div className="input-container">
            <input 
              type="text"
              name="email" 
              id="email" 
              placeholder="Username" 
              value={this.state.email}
              onChange={this.onChangeUserEmail}
            />
            <i className="far fa-envelope"></i>
            <div className="error"></div>
          </div>
          <div className="input-container">
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Password" 
              value={this.state.password}
              onChange={this.onChangeUserPassword}
            />
            <i className="fas fa-lock"></i>
            <div className="error"></div>
          </div>
  
          <div className="input-container sign-up">
            <input type="submit" name="submit" id="submitLogin" value="Log in" />
          </div>
          <div className="input-container sign-up">
            <input type="reset" id="resetLogin" value="Reset" />
          </div>
          <a
            className="findPw"
            href="https://www.WWBnB.ca/rooms/39981203?adults=1&check_in=2020-10-12&check_out=2020-10-15&source_impression_id=p3_1602289368_TJdwirxiN8oVAZ5D"
          >
            Forgot password?
          </a>
          <br />
          <Link className="nav-link signUp_btn" to="/signUp">
            <p>Sign Up</p>
          </Link>
        </form>
      </div>
    );
  }
}

