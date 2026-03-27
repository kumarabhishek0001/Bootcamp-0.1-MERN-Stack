const chalk = require('chalk');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
const PORT = 3002;


let CURRENT_USER_ID = 1;
let CURRENT_TODO_ID = 1;

let USERS = [];
let TODOS = [];

app.get('/', (req, res) => {
    res.send('Hello world!')
})

// CREATE endpoints
app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(user => user.username === username);

    if(userExists){
        return res.status(422).json({
            message: "User already exists"
        })
    }

    const userData = {
        userId: CURRENT_USER_ID++,
        username,
        password
    }

    USERS.push(userData);

    res.status(201).send(USERS);
})


app.post('/signin', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const checkCredentials = USERS.find(user => user.username === username && user.password === password);
    
    if(!checkCredentials){
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    console.log(process.env.JWT_SECRET)
    const token = jwt.sign(username, process.env.JWT_SECRET)

    res.json({
        token
    })
})
// app.post('todo')

// READ endpoints
// app.get('/todos')

// UPDATE endpoints
// app.put('/todo/:todoId')

// DELETE endpoints
// app.delete('/todo/:todoId')

app.listen(PORT, () => {
    console.log("App listening to "+chalk.green('http://localhost:'+PORT))
})