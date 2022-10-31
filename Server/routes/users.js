//Libaraies / Imported
/*
 * Update list Oct.12
 * Added libraries
 * - path
 * - bcryptjs
 * Added Regular Expression
 * - email
 * - password
 */
const bcrypt = require('bcryptjs');
const path = require('path');
const { nextTick } = require('process');
const router = require('express').Router();
const NodeEmailer = require('nodemailer');
let User = require('../module/user_schema');
require('dotenv').config({ path: '../.env' });
const emailRegExp =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//const pwdRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/;
// First end poiun that handles incoming HTTP GET requests on the users URL path
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// E-mail Setting
const transporter = NodeEmailer.createTransport({
  service: 'gmail',
  auth: { user: 'demian824@gmail.com', pass: process.env.EMAIL_KEY },
});

// Send Temp Password to User 
const sendTempPassword = async (temp, email, name) =>{
  const mailOptions = {
    to: email,
    subject: 'You Get a Temporary Password - Do Not Reply',
    html: 
        `
          Here is your temporary password. <br>
          <br>
          Your Full Name: ${name}<br>
          ${temp}<br>
          Please Reset to New Password On The StudentFair
          <br><br>
          Thanks To use StudetnFair Service.
          <br>
          <br>
          sincerely<br>
          StudentFair Team        <br>
          Team9, PRJ666           <br>
          Team Member:            <br>
          Mizuho Okimoto          <br>
          Jun Song                <br>
          WonChul Choi            <br>
          Tasin Rahman            <br>
          Copyright © Winter 2022, All rights reserved | PRJ666 Team 9<br>
          `,
  }
  await transporter.sendMail(mailOptions);
}

//Admin Account
const Admin = {
  email:  'admin@admin.com',
  pwd:    process.env.DB_CONFIG_PWD
}; 


// POST - Login Page
router.route('/login').post((req, res) => {
  let validData = {};
  let isValid = true;

  const { email, password } = req.body;
  if (typeof email !== 'string' || email.length === 0) {
    validData.email = 'Must write your e-mail';
    isValid = false;
  } else if (email.length < 2 || !emailRegExp.test(email)) {
    validData.email = 'Please write your e-mail';
    isValid = false;
  }
  if (typeof password !== 'string' || password.length === 0) {
    validData.password = 'Must write your Password';
    isValid = false;
  }
  // else if (password.length < 8 || !pwdRegExp.test(password)){
  //   validData.password = "Please write your Password(over 8)"
  //   isValid = false;
  // }

  if (isValid) {
    let error = [];
    //Check Admin ID 
    if(req.body.email === Admin.email){
      if(req.body.password === Admin.pwd){
        //TODO: Move To Admin Page
        console.log("admin");
      }
      else{
        error.push('Password does not match!');
        res.send('Password does not match!');
      }
    }
    else{
     
      User.findOne({
        email: req.body.email,
      })
        .then((user) => {
          if (user.email) {
            bcrypt.compare(req.body.password, user.password).then((match) => {
              if (match) {
                req.session.user = user;
                res.json(user);
                //console.log(`Success to log-in ${req.session.user}`)
              } else {
                error.push('Password does not match!');
                res.send('Password does not match!');
              }
            });
          } else {
            console.log(`Error comparing passwords: ${err},`);
            error.push('Error=compared password');
          }
        })
        .catch((err) => {
          console.log(`Error finding the user from the database: ${err},`);
          error.push('Error=Not found on Data');
          res.send('There is No Validated E-mail.');
        });
    }
  }
});

// POST - Register Page
/*
 * Update list Oct.12
 * Change address 'add' to 'register'
 * Added conditions to check every field on register page.
 * Change variable declare
 *
 *
 *
 */
router.route('/register').post((req, res) => {
  let isValid = true;
  let validData = {};
  //changed
  const { email, fname, lname, password, phone, city } = req.body;

  if (typeof fname !== 'string' || fname.length === 0) {
    validData.fName = 'Must write your first name';
    isValid = false;
  } else if (fname.length < 2) {
    validData.fname = 'Please write your first name';
    isValid = false;
  }
  if (typeof lname !== 'string' || lname.length === 0) {
    validData.lname = 'Must write your last name';
    isValid = false;
  } else if (lname.length < 2) {
    validData.lname = 'Please write your last name';
    isValid = false;
  }
  if (typeof email !== 'string' || email.length === 0) {
    validData.email = 'Must write your e-mail';
    isValid = false;
  } else if (email.length < 2 || !emailRegExp.test(email)) {
    validData.email = 'Please write your e-mail';
    isValid = false;
  }
  // if(typeof password !== "string" || password.length === 0){
  //   validData.password = "Must write your Password"
  //   isValid = false;
  // }
  // else if (password.length < 8 || !pwdRegExp.test(password)){
  //   validData.pwd = "Please write your Password(over 8)"
  //   isValid = false;
  // }
  console.log(isValid);
  if (isValid) {
    const newUser = new User({
      email,
      fname,
      lname,
      password,
      phone,
      city,
    });

    newUser
      .save()
      .then(() => {
        res.json(newUser);
      })
      .catch((err) => res.status(400).json('Error: ' + err));
    console.log(newUser);
    console.log(req.body);
  } else {
    res.json(isValid);
    console.log(req.body);
  }
});

// POST -edit
router.route('/update_info').post((req, res) => {
  const { email, newPhone, newCity } = req.body;
 
  User.findOne({email: email})
      .then((user) => {
        User.updateOne(
          { email: email },
          {
            $set: {
              phone: newPhone,
              city: newCity,
            },
          }
        ).then(() => {
          res.send("Updated")
        }).catch((err) => {
            console.log(err);
            res.send("err")
          });

        
      })
  
});

// POST -forgot account
router.route('/forgot-account').post((req, res) => {
  const { email, isFound } = req.body;
  console.log(req.body);
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (user) res.send(true);
      else res.send(false);
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST -forgot Password
router.route('/forgot-password').post((req, res) => {
  const email = req.body.email;
  const tempPassword = 'temp' + Math.floor(Math.random() * (9999 - 1000 + 1000));
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey('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');

  bcrypt.genSalt(10).then((salt) => {
    bcrypt
      .hash(tempPassword, salt)
      .then((result) => {
        let temppwd = result;
        User.find({ email: email })
          .then((data) => {
            User.updateOne(
              { email: email },
              {
                $set: {
                  password: temppwd,
                },
              }
            ).catch((err) => {
                console.log(err);
            });
            const emailaddress = data[0].email;
            const fullName = data[0].fname + " " + data[0].lname;
            sendTempPassword(tempPassword, emailaddress, fullName);  
            res.send(tempPassword);
          })
          .catch((err) => {
            console.log(`Error Occured When Hashing. ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Error Occured When Salting. ${err}`);
      });
  });
});

// POST - Reset Password
router.route('/rest-password').post((req, res) => {
  const { email, newPassword } = req.body;
  
  console.log(email + ", " + newPassword);

  bcrypt.genSalt(10).then((salt) => {
    bcrypt
      .hash(newPassword, salt)
      .then((result) => {
        let temppwd = result;
        User.find({ email: email })
          .then((data) => {
            User.updateOne(
              { email: email },
              {
                $set: {
                  password: temppwd,
                },
              }
            ).catch((err) => {
                console.log(err);
            });
            
            res.send(temppwd);
          })
          .catch((err) => {
            console.log(`Error Occured When Hashing. ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Error Occured When Salting. ${err}`);
      });
  });  

});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send(true);
  res.redirect('/')
  
});

router.post('/delete', (req, res) =>{
  const {email}  = req.body;
  console.log(email);
  User.deleteOne({email: req.body.email})
      .then(() => {
        res.send(true);
      })
      .catch(err =>  console.log(`Error : ${err}`));
})

module.exports = router;
