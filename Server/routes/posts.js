const Post = require('../module/post_schema');
const express = require('express');
const router = express.Router();
const path = require('path');
const { route } = require('./users');
const multer = require('multer');
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, 'uploads/post_pic');
  },
  filename: (req, file, callback) => {
    //const ext = file.minetype.split('/')[1];
    callback(null, `Post_${curPostNumber}_${curEmail}_${file.originalname}`)
  },
});

const isImage = (req, file, callback) =>{
  if(file.mimetype.startsWith('image')){
    callback(null, true);
  }
  else{
    callback(new Error('Only Image is Allowed'))
  }
};
const upload = multer({
  storage: multerConfig,
  fitter: isImage,
});

var postListFromDB = [];
var curPostNumber;
var curEmail;


router.post('/upload_post_pic/:postid/:email', upload.array('photo') ,(req, res) =>{
  var params = req.params;
  const file = req.files;

  let imgArray = [];
  for(let i = 0; i < file.length; i++){    
    imgArray.push(`uploads/post_pic/${params.postid}_${params.email}_${file[i].originalname}`);
  }
  
  
  Post.findOne({post_number: params.postid})
      .then(() => {
        Post.updateOne(
          { post_number: params.postid },
          {
            $set: {
              img: imgArray,
            },
          }
        ).then(() =>{
          res.send(true);
        }).catch((err) => {
            console.log(err);
            res.send(err);
          });
     });


});
router.post('/create_post', (req, res) => {
  const { email, field, title, category, desc, con, price } = req.body;
  curEmail = email;
  let lastPost;
  Post.find()
    .then((data) => {   
      lastPost = data[data.length - 1];
      curPostNumber = Number(lastPost.post_number) + 1
       

      const newPost = new Post({
        post_number: curPostNumber, 
        user_id: email,
        post_field: field,
        post_title: title,
        post_category: category,
        description: desc,
        condition: con,
        price: price
      });

      newPost.save().then(()=>{
        res.send(newPost);
       }).catch((err) =>{
          res.status(400).json('Error: ' + err);
        });
    })
    .catch((err) => res.status(400).json('Error: ' + err));

});


router.route('/getPostByLastest').get((req, res) =>{
  Post.find()
      .then((data) => {      
        postListFromDB = data;      
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  let PostByLastest = [];
  PostByLastest = Post.getPostByLastest(postListFromDB);
  res.send(PostByLastest);

});

router.post('/delete/:postid', (req, res) =>{
  const {post_id}  = req.params.postid;
  Post.deleteOne({post_number: post_id})
      .then(() => {
        res.send(true);
      })
      .catch(err =>  console.log(`Error : ${err}`));
     
});

router.route('/getBuyPost').get((req, res) =>{
 
  Post.find({post_field: 'Buy'})
      .then((data) => { 
        res.send(data);
      }).catch((err) => res.status(400).json('Error: ' + err));
  
  

});

router.get('/getUserPost/:email', (req, res) =>{
  const email = req.params.email;
  Post.find({
    user_id: email
  }).then((data)=>{
    res.send(data);
  }).catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/getSellPost', (req, res) =>{
  Post.find({post_field: 'Sell'})
      .then((data) => {      
        res.send(data);
      }).catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/', (req, res) => {
  Post.find()
    .then((data) => {      
      let posts = data;
      postListFromDB = data;
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