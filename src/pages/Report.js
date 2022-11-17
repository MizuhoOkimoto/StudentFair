import axios from 'axios';
import '../components/css/LogIn-Register.css';
import { Link, useNavigate } from 'react-router-dom';

// This is for waring message
//import {Alert} from 'react-bootstrap';

function Report(prop) {
  const create_date = new Date();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newReport = {
      email: prop.userData.email,
      category: '',
      title: e.target.reportTitle.value,
      description: e.target.reportDesc.value,
      date: create_date,
    };

    axios.post('http://localhost:8080/reports/create_report', newReport).then((res) => {
      console.log(res);

      // if(res.)

      if (res.data === true) {
        alert('Your report successfully reported');
        window.location = '/';
      } else {
        alert('You typed wrong report number. Please check again.');
      }
    }, []);
  };

 
  return (

    // Display waring message:
    // <div>
    //         {prop.flag === 'false' ? (
    //           <div className="waring">
    //             <Alert variant="danger">
    //   <Alert.Heading>Hey, nice to see you</Alert.Heading>
    //   <p>
    //     Aww yeah, you successfully read this important alert message. This
    //     example text is going to run a bit longer so that you can see how
    //     spacing within an alert works with this kind of content.
    //   </p>
    //   <hr />
    //   <p className="mb-0">
    //     Whenever you need to, be sure to use margin utilities to keep things
    //     nice and tidy.
    //   </p>
    // </Alert>
    //           </div>
    //         ) : (

    <div className="signUp-container">
      <form className="user-form sign-up" action="/" method="POST" onSubmit={onSubmitHandler}>
        <div className="title">
          <div className="form-title">
            <p>Report</p>
          </div>
          <i className="fas fa-times"></i>
        </div>
        <div className="border" />
        <div className="input-container">
          User Email
          <span>{prop.userData.email}</span>
        </div>
        <div className="input-container">
          User Name
          <span>
            {prop.userData.fname} {prop.userData.lname}
          </span>
        </div>
        <div className="input-container">
          Date
          <span>
            {create_date.getFullYear()}-{create_date.getMonth() + 1}-{create_date.getDate()}
          </span>
        </div>
        <div className="input-container">
          Category
          <select aria-label="pick_category" id="category">
            <option>Please select Category</option>
            <option>Rude or vulgar</option>
            <option>Harassment or hate speech</option>
            <option>Spam orCopyright issue</option>
            <option>Inappropriate post</option>
            <option>Other</option>
          </select>
        </div>

        <div className="input-container">
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
        />

        <div className="input-container sign-up">
          <input type="submit" name="submit" id="submitSignUp" value="Submit Report" />
        </div>
      </form>
    </div>
   
  )
    // }
    // </div>
};

export default Report;
