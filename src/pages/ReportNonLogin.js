import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Alert} from 'react-bootstrap';

function ReportNonLogin() {
    const create_date = new Date();

    return (
        <>
        <Alert variant="danger" style={{width: "700px", margin:"30px auto"}}>
      <Alert.Heading>How can we help?</Alert.Heading>
      <p>
        Report post requires Sing up/Log in. Please Log in and submit your report.<br/>
        If you would like to contact us, please visit our customer service page.
      </p>
      <hr />
      <p className="mb-0" style={{display: "flex", color:"black", textDecoration: "underline", justifyContent: "center", color: "blue"}}>
          <div><Link to="/signUp"style={{margin: "20px", color: "blue"}}>Sign Up</Link></div>
          <div><Link to="/logIn"style={{margin: "20px", color: "blue"}}>Log in</Link></div>
          <div><Link to="/customerService" style={{margin: "20px", color: "blue"}}>Contact Us</Link></div>
      </p>
    </Alert>
    

        <div className="signUp-container">
          <form className="user-form sign-up" >
            <div className="title">
              <div className="form-title">
                <p>Report</p>
              </div>
              <i className="fas fa-times"></i>
            </div>
            <div className="border" />
            <div className="input-container">
              User Email
            </div>
            <div className="input-container">
              User Name

            </div>
            <div className="input-container">
              Date
              <span>
                {create_date.getFullYear()}-{create_date.getMonth() + 1}-{create_date.getDate()}
              </span>
            </div>
            <div className="input-container" >
              Category
              <select aria-label="pick_category" id="category" disabled>
                <option>Please select Category</option>
                <option>Rude or vulgar</option>
                <option>Harassment or hate speech</option>
                <option>Spam orCopyright issue</option>
                <option>Inappropriate post</option>
                <option>Other</option>
              </select>
            </div>
    
            <div className="input-container" disabled>
              <input type="text" name="reportTitle" id="reportTitle" placeholder="Report Title" />
            </div>
            <textarea
              className="report-text-area"
              type="text"
              name="reportDesc"
              id="reportDesc"
              placeholder="Report Details"
              maxLength="1000"
              cols="88"
              rows="7"
              disabled
            />
    
            <div className="input-container sign-up" style={{backgroundColor: "gray", borderColor:"gray"}}>
              <input type="submit" name="submit" id="submitSignUp" value="Submit Report" disabled />
            </div>
          </form>
        </div>
        </>
      );
}
export default ReportNonLogin;
