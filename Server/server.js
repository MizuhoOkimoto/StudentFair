
//Import Libraries
const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const user_controller = require('./controller/user_controller')

//Application Setting
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
//app.use('/user', user_controller)

//config
dotenv.config({path:"./config/keys.env"})
//Mongoose.connection
mongoose.connect(process.env.MONGODB_CONNECT, {
    //useNewUrlParser: true
})
.then(() => {
    console.log("Connected to the MongoDB database.");
})
.catch((err) => {
    console.log(`There was a problem connecting to MongoDB ... ${err}`)
});

app.get('/', function (req, res) {
  res.send('Generate Home Page')
})
app.get('/allList',(req, res)=>{
    res.send('Gnerate List Page')
})

//Dummy 
var user_database = [
    {
        email: 'wchoi28@myseneca.ca',
        fName: 'Wonchul',
        lName: 'Choi',
        password: '12346789'
    },
]

//2. get register
app.get('/api/user', function (req, res) {
    res.json(user_database)
  })
//3. post register
app.post('/api/user', function (req, res) {
    const {email, fName, lName, password} = req.body
    console.log(req.body)
    console.log(email)
    console.log(fName)
    console.log(lName)
    console.log(password)
    user_database.push(
        {
            email: email,
            fName: fName,
            lName: lName,
            password: password
        }
    )

    return res.send('susses')
})
//4. get login
app.get('/login', (req,res)=>{
    res.json(user_database)
})
//5. post login
app.post('/login', (req, res) =>{
    let valid_data = {}
    let valid_password = true

    const { email, password } = res.body
    console.log(email +', ' + password)
})
//6. get log out



app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send("Something borke!")
})

const HTTP_PORT = process.env.PORT;

function onHttpStart(){
    console.log("Express http server listening on : " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);