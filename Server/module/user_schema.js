const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_schema = new Schema({
    email:{
        type:String,
        require: true,    
        unique: true
    },
    fname:{
        type:String,
        require: true
    },
    lname:{
        type:String,
        require: true
    },
    birthday:{
        type:Date,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    pimage:{
        type:String,
        require: false
    },
    create_date:{
        type:Date,
        default: Date.now()
    },
    introduce:{
        type:String,
        require: false
    },
    user_rate:{
        type:Number,
        default: 0
    }
})

user_schema.pre('save', function(next){
    var user = this;

    bcrypt.genSalt(10)
    .then((salt) => {
        bcrypt.hash(user.password, salt)
        .then((encrypted_password) =>{
            user.password = encrypted_password
            next()
        })
        .catch((err)=>{
            console.log(`Error Occured When Hashing. ${err}`)
        })
    }).catch((err)=>{
        console.log(`Error Occured When Salting. ${err}`)
    })

})

const user_model = mongoose.model('user_data', user_schema)
module.exports = user_model