//Import Libraries
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const HTTP_PORT = process.env.PORT || 8080;

//Application Setting
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//Mongoose.connection
const uri = process.env.MONGODB_CONNECT;
mongoose.connect(uri, {
  // These are no longer supported options
  // useNewUrlParser: true,
  // useCreateIndex: true
});

const connection = mongoose.connection;
connection.on('open', () => {
  console.log('Connected to the MongoDB database.');
});

//Add for the routes
const general = require('./routes/general');
app.use('/', general);
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something borke!');
});

function onHttpStart() {
  console.log('Express http server listening on : ' + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);
