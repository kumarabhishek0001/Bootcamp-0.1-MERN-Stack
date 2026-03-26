// username, password
// organizations
// boards
// issues
const express = require('express');
const jwt = require('jsonwebtoken');
const {authmiddleware} = require('./middleware');
const { authMiddleware } = require('../Week-9/middleware');


let USER_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUE_ID = 1;

const users = [{
    id: 1,
    username : "harkirat",
    passowrd : 123123

}, {
    id: 2,
    username: "raman",
    password: "123123"
}];


const organizations = [{
    id: 1,
    title: "100xDevs",
    description: "Learning coding platform",
    admin: 1,
    members: [2]
}, {
    id:2,
    title: "Ramans Org",
    description: "experinment",
    admin:1,
    members: []
}];


const boards = [{
    id: 1,
    title: "100x School website frontend code",
    organizationId: 1

}];


const issues = [{
    id: 1,
    title: "Add dark mode",
    boardId:1,
    state: "IN_PROGRESS"
}];

const app = express();
const port = 3000;
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello world!');
})

// CREATE ENDPOINT
app.post('/signup', (req, res) => {

    const username = req.body.username 
    const password = req.body.password 
    
    const userExists = users.find(users => users.username === username)
    if(userExists){
        res.status(411).json({
            message: "User with username already exists"
        })
        return;
    }

    users.push({
        username,
        password,
        id: USER_ID++,
    });

    res.json({
        message: "User created successfully"
    })
})

app.post('/signin', (req, res) => {
    
const username = req.body.username;
    const password = req.body.passowrd;

    const userExists = users.find(user => user.username === username && user.passowrd === password);

    if(!userExists){
        res.status(403).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        userId: userExists.id
    }, "abhishek123");

    res.json({
        token
    })

})

// AUTHENTICATED ROUTES - MIDDLEWARE
app.post('/organization', authmiddleware, (req, res) => {
    const userId = req.userId;

    organizations.push[{
    id: ORGANIZATION_ID++,
    title: req.body.title,
    description: req.body.title,
    admin: userId,
    members: []
    }]

    res.json({
        message: "organization created",
        id: ORGANIZATION_ID-1,
    })
    
})

app.post('/add-member-to-organization', authMiddleware, (req, res) => {
    
})

app.post('/board', (req, res) => {
    
})

app.post('/issue', (req, res) => {
    
})

// READ ENDPOINT
app.get('/boards', (req, res) => {
    
})

app.get('/issues', (req, res) => {
    
})

app.get('/members', (req, res) => {
    
})


// UPDATE ENDPOINT

app.put('/issue', (req, res) => {
    
})

// DELETE ENDPOINT
app.delete('/members', (req, res) => {
    
})


app.listen(port, () => {
    console.log(`listening to port http://localhost:${port}`)
})