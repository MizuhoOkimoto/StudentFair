
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
    }
  },
  {
    timestamps: true,
  }
);

const Administer = {
  user_id: 'admin',
  password: 'admin01'
}

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
