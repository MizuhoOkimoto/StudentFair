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

let User = require('../module/user_schema');
const emailRegExp =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//const pwdRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/;
// First end poiun that handles incoming HTTP GET requests on the users URL path
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

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
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (user.email) {
          console.log(user);
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
router.route('/edit/:_email', (req, res) => {
  const { email, newPassword } = req.body;
  User.findOne({ email: email })
    .exec()
    .then((date) => {
      if (newPassword.length < 8 || !pwdRegExp.test(newPassword)) {
        User.updateOne(
          { email: email },
          {
            $set: {
              password: newPassword,
            },
          }
        ).save();
      } else {
        res.send('Please Enter Right Passwords');
      }
    });
});
// POST -forgot Password
router.route('/forgot-account').post((req, res) => {
  const { email, isFound } = req.body;
  console.log(req.body);
  console.log('186' + email);
  console.log('187' + isFound);
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
            )
              .then()
              .catch((err) => {
                console.log(err);
              });
            const emailaddress = data[0].email;
            const msg = {
              to: `${emailaddress}`,
              from: 'wchoi28@myseneca.ca',
              subject: 'You Get a Temporary Password - Do Not Reply',
              html: `
                  Here is your temporary password. <br>
                  <br>
                  Your Full Name: ${data[0].fname} ${data[0].lname}<br>
                  ${tempPassword}<br>
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
            };
            console.log(data[0].email);
            //console.log(msg)
            // sgMail
            // .send(msg)
            // .catch(err => {
            //   console.log(`Error ${err}`);
            //   res.send("Error to Send the Email");
            // });
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
  const email = req.body.email;
  User.findOneAndUpdate(email, {
    password: req.body.password,
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  console.log('logout');
});

module.exports = router;
