const Post = require('../module/post_schema');
const express = require('express');
const router = express.Router();
const path = require('path');

var posts = [];

router.get('/', (req, res) => {
  Post.find()
    .exec()
    .then((post) => {
      post = post.map((value) => value.toObject());
      posts = post;
      global.posts = posts;

      res.json(posts);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/upload', (req, res) => {
  const new_post = new Post({
    post_number: posts.length,
    post_title: req.body.post_title,
    user_id: req.body.user_id,
    post_category: req.body.post_category,
    description: req.body.description,
    price: req.body.price,
    create_date: req.body.create_date,
  });
});
