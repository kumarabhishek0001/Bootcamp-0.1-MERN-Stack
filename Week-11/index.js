const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const { authMiddleware } = require('./middleware');
const { todoModel, userModel } = require('./models');

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
app.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // SEARCH IN DB
    const userExists = await userModel.findOne({
        username,
        password
    })

    

    // IF USER ALREADY EXISTS IN DB
    if(userExists){
        return res.status(422).json({
            message: "User already exists"
        })
    }

    const userData = {
        username,
        password
    }

    const newUser = await userModel.create(userData);

    // res.status(201).json({
    //     id: newUser._id,
    //     username: newUser.username,
    //     password: newUser.password,
    //     createdOn: newUser.createdOn
    // })

    res.status(201).json({
        id: newUser._id
    });
})


app.post('/signin', async (req, res) => {

    const username = req.body.username;
    

    const password = req.body.password;
    

    // CHECK CREDENTIALS FROM THE DB
    const checkCredentials = await userModel.findOne({
        username,
        password
    });

    
    
    if(!checkCredentials){
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    // console.log(process.env.JWT_SECRET)
    const userId = checkCredentials._id;
    const token = jwt.sign({userId}, process.env.JWT_SECRET)

    res.json({
        token,
        // credentials: checkCredentials,
        message: "success"
    })
})

// AUTHENTICATED ENDPOINT
app.post('/addTodo', authMiddleware, (req, res) => {
    const userId = req.userId;
    // console.log(chalk.red(userId));
    const title = req.body.title;
    // console.log(title);
    const description = req.body.description;
    // console.log(description);

    const userTodo = {
        todoId: CURRENT_TODO_ID++,
        title,
        description,
        userId
    }

    TODOS.push(userTodo);

    res.send(TODOS)


})

// READ endpoints
// app.get('/todos')

// UPDATE endpoints
// app.put('/todo/:todoId')

// DELETE endpoints
// app.delete('/todo/:todoId')

app.listen(PORT, () => {
    console.log("App listening to "+chalk.green('http://localhost:'+PORT))
})