
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
  // else if (password.length < 8 || !pwdRegExp.test(password)){
  //   validData.password = "Please write your Password(over 8)"
  //   isValid = false;
  // }

  if(isValid){
    let error = [];
    User.findOne({
      email: req.body.email
    })
    .then((user) =>{
      if(user.email) {
        console.log(user);
        bcrypt.compare(req.body.password, user.password)
        .then((match) =>{
          if(match){
            //req.session.user = user;
            res.json(user)
            //console.log(`Success to log-in ${req.body.email}`)
          }
          else{
            error.push("Password does not match!");
            res.send("Password does not match!");
          }
        })
      }
      else{
        console.log(`Error comparing passwords: ${err},`);
        error.push("Error=compared password");
      }
      console.log("123 " + error);
    })
    .catch((err) =>{
      console.log(`Error finding the user from the database: ${err},`);
      error.push("Error=Not found on Data");
      res.send("There is No Validated E-mail.")
    
    })
 
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
  // if(typeof password !== "string" || password.length === 0){
  //   validData.password = "Must write your Password"
  //   isValid = false;
  // }
  // else if (password.length < 8 || !pwdRegExp.test(password)){
  //   validData.pwd = "Please write your Password(over 8)"
  //   isValid = false;
  // }
  console.log(isValid);
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
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json('Error: ' + err));
    console.log(newUser);
    console.log(req.body);
  }
  else{
    res.json(isValid)
    console.log(req.body);
  }
  
  
});

// POST -edit
router.route('/edit/:_email',(req, res) =>{
  const {email, newPassword} = req.body;
  User.findOne({email: email})
      .exec()
      .then((date) => {
        if(newPassword.length < 8 || !pwdRegExp.test(newPassword)){
          User.updateOne({email: email},
            {$set: {
              password: newPassword    
            }})
            .save()
        }
        else{
          res.send('Please Enter Right Passwords')
        }        
      })

});

// password generator
function tempPasswordGenerator(){
  return "temp" + Math.floor((Math.random() * (( 9999 - 1000) + 1000)));
}

// POST -forgot Password
router.route('/forgot-password').post((req,res) => {
  const email = req.body.email;
  const tempPassword = tempPasswordGenerator();
  User.find({email: email})
  .exec()
  .then((err, data) =>{
    User.updateOne({email: email},
      {$set: {
        password: tempPassword
      }})
    .save() //?
    .then(() => {
      console.log('Success')
    })
    .catch(err => {
      console.log(err)
    })
  })
});

// POST - Reset Password
router.route('/rest-password').post((req,res) => {

  const email = req.body.email;
  User.findOneAndUpdate( email, {
    password: req.body.password
  } );

});

module.exports = router;
