const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    fname: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
    },
    lname: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: false,
    },
    city: {
      type: String,
      require: false,
    },
    img_url: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  var user = this;

  bcrypt
    .genSalt(10)
    .then((salt) => {
      bcrypt
        .hash(user.password, salt)
        .then((encrypted_password) => {
          user.password = encrypted_password;
          next();
        })
        .catch((err) => {
          console.log(`Error Occured When Hashing. ${err}`);
        });
    })
    .catch((err) => {
      console.log(`Error Occured When Salting. ${err}`);
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// module.exports.tempPasswordGenerator = (() => {
//   let temp = "temp" + Math.floor((Math.random() * (( 9999 - 1000) + 1000)));

//   let encryptedPassword = bcrypt
//                 .genSalt(10)
//                 .then((salt) =>{
//                   bcrypt
//                   .hash(temp, salt)
//                 });
//   console.log("password : " + temp );
//   return encryptedPassword;
// });
