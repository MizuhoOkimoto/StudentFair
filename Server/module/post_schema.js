const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_number: 
    {
        type:String,
        require: true,
        unique: true
    },
    user_id:  {
        type:String,
        require: true
    },
    post_category:  {
        type:String,
        require: true
    },
    description: 
    {
        type:String,
        require: true
    },
    price: {
        type:Number,
        require: true
    },
    create_date:  {
        type:Date,
        require: true
    },
    time:  {
        type:Number,
        require: true
    },
})

const post = mongoose.model('Post', postSchema)
module.exports = post

const posts = [
    {
        post_number: 1,
        post_title: 'Test Book1',
        user_id:  'demian824@gmail.com',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 4 2021',
    },
    {
        post_number: 2,
        post_title: 'Test Book2',
        user_id:  'demian824@gmail.com',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 15 2021',
    },
    {
        post_number: 3,
        post_title: 'Test Book3',
        user_id:  'demian824@gmail.com',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Sep 4 2022',
    },
    {
        post_number: 4,
        post_title: 'Test Book4',
        user_id:  'wchoi28@myseneca.ca',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 4 2022',
    },
    {
        post_number: 5,
        post_title: 'Test Book5',
        user_id:  'mizuho@myseneca.ca',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 5 2022',
    },
    {
        post_number: 6,
        post_title: 'Test Book6',
        user_id:  'mizuho@myseneca.ca',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 5 2022',
    },
    {
        post_number: 7,
        post_title: 'Test Book7',
        user_id:  'mizuho@myseneca.ca',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 7 2022',
    },
    {
        post_number: 8,
        post_title: 'Test Book8',
        user_id:  'song@myseneca.ca',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 7 2022',
    },
    {
        post_number: 9,
        post_title: 'Test Book9',
        user_id:  'song@myseneca.ca',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 17 2022',
    },
    {
        post_number: 10,
        post_title: 'Test Book10',
        user_id:  'song@myseneca.ca',
        post_category:  'Text Book',
        description: 'Test Text Book',
        price: 19.99,
        create_date:  'Oct 17 2022',
    },

];

module.exports.getAll = () => {
    return posts;
};

module.exports.getPostByCategory = (category) => {

    var postByCategory = [];

    for(var e in posts){
        if(e.category === category){
            postByCategory.push(e);
        }
    }    
    return postByCategory;
};

module.exports.getPostByUserId = (user) => {

    var postByUserId = [];

    for(var e in posts){
        if(e.category === user){
            postByUserId.push(e);
        }
    }    
    return postByUserId;
};

module.exports.getPostByKeyword = (Keyword) => {

    var postByKeyword = [];

    for(var e in posts){
        if(e.post_title === Keyword){
            postByKeyword.push(e);
        }
        else if(e.post_title.include(Keyword)){
            postByKeyword.push(e);
        }
    }    
    return postByKeyword;
};

