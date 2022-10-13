
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
const bcrypt = require('bcryptjs')
const path = require('path')
const router = require('express').Router();
let User = require('../module/user_schema');
const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const pwdRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/;
// First end poiun that handles incoming HTTP GET requests on the users URL path
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// POST - Login Page
router.route('/login').post((req, res) => {
  console.log(req.body);
  let validData = {};
  let isValid = true;

  const { email, password } = req.body;
  if(typeof email !== "string" || email.length === 0){
    validData.email = "Must write your e-mail"
    isValid = false;
  }
  else if (email.length < 2 || !emailRegExp.test(email)){
    validData.email = "Please write your e-mail"
    isValid = false;
  }
  if(typeof password !== "string" || password.length === 0){
    validData.password = "Must write your Password"
    isValid = false;
  }
  else if (password.length < 8 || !pwdRegExp.test(password)){
    validData.password = "Please write your Password(over 8)"
    isValid = false;
  }

  console.log(isValid);

  if(isValid){
    let error = [];
    User.findOne({
      email: req.body.email
    })
    .then((user) =>{
      console.log(user);
      console.log(error);
      if(user.email) {
        console.log(user);
        bcrypt.compare(req.body.password, user.password)
        .then((match) =>{
          console.log(match);
          if(match){
            //req.session.user = user;
            console.log(`Success to log-in ${req.body.email}`)
          }
          else{
            error.push("Password does not match!");
          }
        })
      }
      else{
        console.log(`Error comparing passwords: ${err},`);
        error.push("Error=compared password");
      }
      console.log(error);
    })
    .catch((err) =>{
      console.log(`Error finding the user from the database: ${err},`);
      error.push("Error=Not found on Data");
    
    })
    console.log(error);
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
  const { email, fname, lname, password } = req.body;

  if(typeof fname !== "string" || fname.length === 0){
    validData.fName = "Must write your first name"
    isValid = false;
  }
  else if (fname.length < 2){
    validData.fname = "Please write your first name"
    isValid = false;
  }
  if(typeof lname !== "string" || lname.length === 0){
    validData.lname = "Must write your last name"
    isValid = false;
  }
  else if (lname.length < 2){
    validData.lname = "Please write your last name"
    isValid = false;
  }
  if(typeof email !== "string" || email.length === 0){
    validData.email = "Must write your e-mail"
    isValid = false;
  }
  else if (email.length < 2 || !emailRegExp.test(email)){
    validData.email = "Please write your e-mail"
    isValid = false;
  }
  if(typeof password !== "string" || password.length === 0){
    validData.password = "Must write your Password"
    isValid = false;
  }
  else if (password.length < 8 || !pwdRegExp.test(password)){
    validData.pwd = "Please write your Password(over 8)"
    isValid = false;
  }

  if(isValid){
    const newUser = new User({
      email,
      fname,
      lname,
      password,
      //   pimage,
      //   create_date,
      //   introduce,
      //   user_rate
    });

    newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
    console.log(newUser);
    console.log(req.body);
  }
else{
  res.send('Need to fill up correctly')
  console.log(req.body);
}
console.log(req.body);
});

module.exports = router;
