const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    birthday: {
      type: String, //fix later
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    // pimage: {
    //   type: String,
    //   require: false,
    // },
    // create_date: {
    //   type: Date,
    //   default: Date.now(),
    // },
    // introduce: {
    //   type: String,
    //   require: false,
    // },
    // user_rate: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

// user_schema.pre('save', function (next) {
//   var user = this;

//   bcrypt
//     .genSalt(10)
//     .then((salt) => {
//       bcrypt
//         .hash(user.password, salt)
//         .then((encrypted_password) => {
//           user.password = encrypted_password;
//           next();
//         })
//         .catch((err) => {
//           console.log(`Error Occured When Hashing. ${err}`);
//         });
//     })
//     .catch((err) => {
//       console.log(`Error Occured When Salting. ${err}`);
//     });
// });

const User = mongoose.model('User', userSchema);
module.exports = User;
