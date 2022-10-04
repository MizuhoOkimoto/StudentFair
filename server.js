//Import Libraries
const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

//Environment Variables
const HTTP_PORT = process.env.PORT
const MONGOCODE = process.env.MONGODB_CONNECT

//Application Setting
const app = express()
app.use(express.json)
app.use(express.urlencoded({extended:true}))
app.use(cors())

//Set Config
dotenv.config({path:'path:./config/keys.env'})

//Mongo DB Connect
mongoose.connect(MONGOCODE, {
    //useNewUrlParser: true
})
.then(() => {
    console.log('Connected to the MongoDB database.');
})
.catch((err) => {
    console.log(`There was a problem connecting to MongoDB ... ${err}`)
});

//Page Error
app.use(function(err,req,res,next){
    console.error(err.stack)
    res.status(500).send("Something borke!")
})
//Page Not Found
app.use((req,res) =>{
    res.status(404).send('Page Not Found')
})


function onHttpStart(){
    console.log('Express http server listening on : ' + HTTP_PORT)
}

app.listen(HTTP_PORT, onHttpStart)