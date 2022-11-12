const Post = require('../module/post_schema');
const User = require('../module/user_schema');
const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config({ path: '../.env' });
const NodeEmailer = require('nodemailer');
// E-mail Setting
const transporter = NodeEmailer.createTransport({
  service: 'gmail',
  auth: { user: 'demian824@gmail.com', pass: process.env.EMAIL_KEY },
});

// Send Temp Password to User 
const deliveryMessage = async ( toAddress, fromAddress, name, post, desc) =>{
  const mailOptions = {
    to: toAddress,
    subject: 'You Get a Meessage about your ',
    html: 
        `
          Hello, ${name}. 
          You have got a message from ${fromAddress} <br>
          <br>
          User - ${fromAddress} - is interested about your post
          <br>
          Post Info
          - ${post.post_number}
          - ${post.post_title}
          <br><br>
          Message
          ${desc}
          <br>
          <br>
          sincerely<br>
          StudentFair Team        <br>
          Team9, PRJ666           <br>
          Team Member:            <br>
          Mizuho Okimoto          <br>
          Jun Song                <br>
          WonChul Choi            <br>
          Tasin Rahman            <br>
          Copyright © Winter 2022, All rights reserved | PRJ666 Team 9<br>
          `,
  }
  await transporter.sendMail(mailOptions);
}


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
  let params = req.params;
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
        ).then((data) =>{
          res.send(data);
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

router.get('/getPostByLastest', (req, res) =>{
  Post.find()
      .then((data) => {      
        postListFromDB = data;      
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  let PostByLastest = [];
  PostByLastest = Post.getPostByLastest(postListFromDB);
  res.send(PostByLastest);

});
// detail page
router.get('/detail/:post_number', (req, res) =>{
  const post_number  = req.params.post_number;
  
  Post.findOne({post_number: post_number})
  .then((result) =>{
    res.send(result);
  })
 
});

router.post('/detail/contact/:post_number', (req, res) => {
  const post_number = req.params.post_number;

  const { to, from, desc } = req.body;
  console.log(post_number);
  console.log(to);
  console.log(from);
  console.log(desc);
  User.find({
    email: to
  }).then((user) =>{
    let name = user.fname + ' ' + user.lname;

    Post.find({
      post_number: post_number
    }).then((result) => {
      deliveryMessage(to, from, name, result, desc);
    }).catch(err => console.log(err));


    
  }).catch(err => console.log(err));

})


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