
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const post_schema = new Schema({
    post_id:{
        type:Number,
        require: true,    
        unique: true
    },
    post_title:{
        type:String,
        require: true
    },
    post_course:{
        type:String,
        default: ''
    },
    post_price:{
        type:Number,
        require: true
    },
    post_count:{
        type:Number,
        default: 0
    },
    post_describ:{
        type:String,
        require: true
    },
    user_email:{
        type:String,
        require: true
    },
    alternative_contact:{
        type:String, 
        default:''
    },
    create_date:{
        type:Date,
        default: Date.now()
    }
})
const post_model = mongoose.model('post_data', post_schema)
module.exports = post_model