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


const deliveryMessage = async (from, name, result, desc) => {
  const mailOptions = {
    to: result[0].user_id,
    subject: 'You Get a Meessage about your ',
    html: `
          Hello, ${name}. <br>
          You have got a message from ${from} <br>
          <br>
          User <br>
          - ${from} <br>
          - is interested about your post
          <br>
          Post Info<br>
          - Post Number: ${result[0].post_number}<br>
          - Post Title: ${result[0].post_title}
          <br><br>
          Message:
          - ${desc}
          <br>
          <br>
          sincerely<br>
          StudentFair Team        <br>
          Team9, PRJ666           <br>
          Team Member:            <br>
          Mizuho Okimoto          <br>
          Jun Song                <br>
          WonChul Choi            <br>
          Copyright © Winter 2022, All rights reserved | PRJ666 Team 9<br>
          `,
  };
  console.log(mailOptions);
  await transporter.sendMail(mailOptions);
};

const multer = require('multer');
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/post_pic');
  },
  filename: (req, file, callback) => {
    //const ext = file.minetype.split('/')[1];
    callback(null, `Post_${curPostNumber}_${curEmail}_${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error('Only Image is Allowed'));
  }
};
const upload = multer({
  storage: multerConfig,
  fitter: isImage,
});

var postListFromDB = [];
var curPostNumber;
var curEmail;

router.post('/search', (req, res) => {
  const keyword = req.body.keyword;
  Post.find().then((data) => {
    let result = Post.getPostByKeyword(data, keyword);
    res.send(result);
  });
});

router.post('/upload_post_pic/:postid/:email', upload.array('photo'), (req, res) => {
  let params = req.params;
  const file = req.files;

  let imgArray = [];
  for (let i = 0; i < file.length; i++) {
    imgArray.push(`uploads/post_pic/${params.postid}_${params.email}_${file[i].originalname}`);
  }

  Post.findOne({ post_number: params.postid }).then(() => {
    Post.updateOne(
      { post_number: params.postid },
      {
        $set: {
          img: imgArray,
        },
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
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
      console.log(data)
      if(!data.length){
        curPostNumber = 1;
      }else{
      lastPost = data[data.length - 1];
      curPostNumber = Number(lastPost.post_number) + 1;
      }
      const newPost = new Post({
        post_number: curPostNumber,
        user_id: email,
        post_field: field,
        post_title: title,
        post_category: category,
        description: desc,
        condition: con,
        price: price,
      });

      newPost
        .save()
        .then(() => {
          res.send(newPost);
        })
        .catch((err) => {
          res.status(400).json('Error: ' + err);
        });
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});


  // Mizuho is using this for post edit
  router.put('/:postNumber', (req, res) => {
    const postNum = req.params.postNumber;
    const { email, field, title, category, desc, con, price } = req.body;
    curEmail = email;
    console.log(req.body, "BODY");
    Post.updateOne({post_number: postNum},  {post_field: field,
      post_title : title,
      post_category:category,
      description: desc,
      condition: con,
      price: price,
      })

          .then(() => {
           res.status(201).json({"message": "Post Updated!"});
          })
          .catch((err) => {
            res.status(400).json('Error: ' + err);
          });
      })
     




// detail page
router.get('/detail/:post_number', (req, res) => {
  const post_number = req.params.post_number;
  console.log(post_number);
  Post.findOne({ post_number: post_number }).then((result) => {
    res.send(result);
  });
});

router.post('/detail/contact/:post_number', (req, res) => {
  const post_number = req.params.post_number;
  const { to, from, desc } = req.body;
  console.log(to);
  User.findOne({
    email: to,
  }).then((user) => {
    console.log(user)
      const username = user.fname + ' ' + user.lname;
      console.log(user)
      console.log(username)
      Post.find({
        post_number: post_number,
      })
        .then((result) => {

          deliveryMessage(from, username, result, desc);

        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post('/delete/:postid', (req, res) => {
  const post_id  = req.params.postid;
  console.log(post_id);
  Post.deleteOne({ post_number: post_id })
    .then(() => {
      res.send(true);
    })
    .catch((err) => console.log(`Error : ${err}`));
});

router.route('/getBuyPost').get((req, res) => {
  Post.find({ post_field: 'Buy' })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Please do not remove/modify: Using it in the AdminPosts Page
router.get('/getUserPosts/:email', (req, res) => {
  const email = req.params.email;
  Post.find({
    user_id: email,
  })
    .then((data) => {
   
      res.send(data);

    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/getRecent/:email', (req, res) => {
  const email = req.params.email;

  Post.find({
    user_id: email,
  }).then((result) => {
      let lastIndex =  result.length;
      if(lastIndex > 0){
        res.send(result[lastIndex - 1])
      }
      else if (lastIndex == 0){
        res.send(result[0])
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
} );

router.get('/getSellPost', (req, res) => {
  Post.find({ post_field: 'Sell' })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});



router.get('/', (req, res) => {
  Post.find()
    .then((data) => {
      let posts = data;
      postListFromDB = data;
      req.session.posts = posts;
      res.send(posts);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:category', (req, res) => {
  const category = req.params.category;
  
  Post.find({
    post_category: category,
  }).then((result) => {
      
    res.send(result)

  }).catch((err) => res.status(400).json('Error: ' + err));
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
