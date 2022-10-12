const router = require('express').Router();
let User = require('../module/user_schema');

// First end poiun that handles incoming HTTP GET requests on the users URL path
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// POST
router.route('/add').post((req, res) => {
  const email = req.body.email;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const birthday = req.bodybirthday; //fix later
  const password = req.body.password;
  //   const pimage = req.body.pimage;
  //   const introduce = req.body.introduce;
  //   const user_rate = req.body.user_rate;

  const newUser = new User({
    email,
    fname,
    lname,
    birthday,
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
});

module.exports = router;
