const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  post_number: {
    type: String,
    require: true,
    unique: true,
  },
  user_id: {
    type: String,
    require: true,
  },
  post_field: {
    type: String,
    require: true,
  },
  post_title: {
    type: String,
    require: true,
  },
  post_category: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  condition: {
    type: String,
    require: false,
  },
  price: {
    type: Number,
    require: true,
  },
  location: {
    type: String,
    require: false,
  },
  create_date: {
    type: Date,
    require: true,
  },
  img:{
    require: false,
  }
});

const post = mongoose.model('Post', postSchema);
module.exports = post;

const posts = [
  {
    post_number: 1,
    post_title: 'iPhon 11',
    user_id: 'JunSong@myseneca.ca',
    post_field: 'Sell',
    post_category: 'Electronics',
    description: 'AAA state no crack damage',
    price: 995.0,
    location: 'Toronto',
    create_date: 'Oct 4 2021',
  },
  {
    post_number: 2,
    post_title: 'RTX 3060',
    user_id: 'demian824@gmail.com',
    post_field: 'Sell',
    post_category: 'Text Book',
    description: 'No mining used for gaming',
    price: 1445.0,
    location: 'Thornhill',
    create_date: 'Oct 15 2021',
  },
  {
    post_number: 3,
    post_title: 'Milk and Honey',
    user_id: 'mizuhoOkimoto@gmail.com',
    post_field: 'Sell',
    post_category: 'Text Book',
    description: 'A+ quality',
    price: 25.0,
    create_date: 'Sep 4 2022',
  },
  {
    post_number: 4,
    post_title: 'MacBook Air M2 Chip',
    user_id: 'wchoi28@myseneca.ca',
    post_field: 'Sell',
    post_category: 'Text Book',
    description:
      'OPEN EVERYDAY FROM 10AM TILL 8PM CANADIAN OUTLET 644 DANFORTH AVENUE PAPE & DANFORTH TORONTO, ON M4K 1R3 647 786 4344 (MAIN NUMBER) 416 792 4545',
    price: 1445.0,
    location: 'Toronto',
    create_date: 'Oct 4 2022',
  },
  {
    post_number: 5,
    post_title: 'Test Book5',
    user_id: 'mizuho@myseneca.ca',
    post_field: 'Sell',
    post_category: 'Text Book',
    description: 'Test Text Book',
    price: 19.99,
    location: 'Toronto',
    create_date: 'Oct 5 2022',
  },
  {
    post_number: 6,
    post_title: 'Test Book6',
    user_id: 'mizuho@myseneca.ca',
    post_field: 'Buy',
    post_category: 'Text Book',
    description: 'Test Text Book',
    price: 19.99,
    location: 'Toronto',
    create_date: 'Oct 5 2022',
  },
  {
    post_number: 7,
    post_title: 'Test Book7',
    user_id: 'mizuho@myseneca.ca',
    post_field: 'Buy',
    post_category: 'Text Book',
    description: 'Test Text Book',
    price: 19.99,
    location: 'Toronto',
    create_date: 'Oct 7 2022',
  },
  {
    post_number: 8,
    post_title: 'Test Book8',
    user_id: 'demian824@gmail.com',
    post_field: 'Buy',
    post_category: 'Text Book',
    description: 'Test Text Book',
    price: 19.99,
    location: 'Toronto',
    create_date: 'Oct 7 2022',
  },
  {
    post_number: 9,
    post_title: 'Test Book9',
    user_id: 'demian824@gmail.com',
    post_field: 'Sell',
    post_category: 'Text Book',
    description: 'Test Text Book',
    price: 19.99,
    location: 'Toronto',
    create_date: 'Oct 17 2022',
  },
];

module.exports.getSample = () => {
  return posts;
};
module.exports.getPostByCategory = (data, category) => {
  var postByCategory = [];

  for (var e in data) {
    if (e.category == category) {
      postByCategory.push(e);
      console.log(e);
    }
  }
  return postByCategory;
};
module.exports.getPostByLastest = function (data) {
  // for(var i = data.length - 1, j = 0; i <= 0 && j < 4; i--, j++){
  //   PostByLastest.push(data[i]);
  // }
  let PostByLastest = [];
  let i = 0;
  let postListFromDB = [];
  post
    .find()
    .then((data) => {
      postListFromDB = data;
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  let j = postListFromDB.length - 1;

  while (i < 4) {
    PostByLastest[i] = postListFromDB[j];
    i++;
    j--;
  }
  return PostByLastest;
};
module.exports.getPostByUser = (data, user) => {
  var postByUser = [];

  for (var e in data) {
    if (e.user_id == user) {
      postByUser.push(e);
    }
  }
  return postByUser;
};

module.exports.getPostByField = (data, field) => {
  var postByField = [];

  for (var e in data) {
    if (e.post_field == field) {
      postByField.push(e);
    }
  }
  return postByField;
};

module.exports.getPostByKeyword = (data, Keyword) => {
  var postByKeyword = [];

  for (var e in data) {
    if (e.post_title == Keyword) {
      postByKeyword.push(e);
    } else if (e.post_title.include(Keyword)) {
      postByKeyword.push(e);
    }
  }
  return postByKeyword;
};
