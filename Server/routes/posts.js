const Post = require('../module/post_schema');
const express = require('express');
const router = express.Router();
const path = require('path');


router.route('/').get((req, res) => {
  Post.find()
    .then((data) => {      
      let posts = data;
      req.session.posts = posts
      console.log('Count of posts : ' + data.length);
      res.send(posts);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});
router.route('/sample_data').get((req, res) => {
  Post.find().count({}, (err, count) =>{
    if(err){
        return res.send(err);
    }
    else if(count === 0) {
      Post.collection.insertMany(Post.getSample(), (err, docs)=>{
            if(err){
                return res.send(err);
            }
            else {
                console.log("Success");
                
            }
        });
    }
    else{
        console.log("Data is already loaded");

    }
});
});

module.exports = router;