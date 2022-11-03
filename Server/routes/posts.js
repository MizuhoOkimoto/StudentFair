const Post = require('../module/post_schema');
const express = require('express');
const router = express.Router();
const path = require('path');

var postListFromDB = [];

router.route('/').get((req, res) => {
  Post.find()
    .then((data) => {
      let posts = data;
      postListFromDB = data;
      req.session.posts = posts;
      console.log('Count of posts : ' + data.length);
      res.send(posts);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/getPostByLastest').get((req, res) => {
  Post.find()
    .then((data) => {
      postListFromDB = data;
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  let PostByLastest = [];
  PostByLastest = Post.getPostByLastest(postListFromDB);
  res.send(PostByLastest);
});

router.route('/getBuyPost').get((req, res) => {
  let buyPostList;
  Post.find({ post_field: 'Buy' })
    .then((data) => {
      buyPostList = data;
      res.send(buyPostList);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/getSellPost').get((req, res) => {
  let buyPostList;
  Post.find({ post_field: 'Sell' })
    .then((data) => {
      buyPostList = data;
      res.send(buyPostList);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/sample_data').get((req, res) => {
  Post.find().count({}, (err, count) => {
    if (err) {
      return res.send(err);
    } else if (count === 0) {
      Post.collection.insertMany(Post.getSample(), (err, docs) => {
        if (err) {
          return res.send(err);
        } else {
          console.log('Success');
        }
      });
    } else {
      console.log('Data is already loaded');
    }
  });
});

module.exports = router;
