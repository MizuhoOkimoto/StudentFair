//User
/*
//1. Import Libraries
const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const user_schema = require('../module/user_schema');
const router = express.Router();
const emailRegExp =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const pwdRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/;

//Dummy
var user_database = [
  {
    email: 'wchoi28@myseneca.ca',
    fName: 'Wonchul',
    lName: 'Choi',
    password: '12346789',
  },
];

//2. get register
router.get('/register', function (req, res) {
  res.json(user_database);
});
//3. post register
router.post('/register', function (req, res) {
  const { email, fName, lName, password } = req.body;
  test.push({
    email: email,
    fName: fName,
    lName: lName,
    password: password,
  });
  return res.send('susses');
});
//4. get login
router.get('/login', (req, res) => {
  res.json(user_database);
});
//5. post login
router.post('/login', (req, res) => {
  let valid_data = {};
  let valid_password = true;

  const { email, password } = res.body;
  console.log(email + ', ' + password);
});
//6. get log out
*/
