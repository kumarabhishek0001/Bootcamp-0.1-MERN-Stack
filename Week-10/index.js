// username, password
// organizations
// boards
// issues
const express = require('express');
const jwt = require('jsonwebtoken');
const chalk = require('chalk')
const { authMiddleWare } = require('./middleware');

let USER_ID = 0;
let ORGANIZATION_ID = 0;
let BOARD_ID = 0;
let ISSUE_ID = 0;

const users = [{
    // id: 1,
    // username : "harkirat",
    // password : 123123

}];


const organizations = [
//     {
//     id: 1,
//     title: "100xDevs",
//     description: "Learning coding platform",
//     admin: 1,
//     members: [2]
// }, {
//     id:2,
//     title: "Ramans Org",
//     description: "experinment",
//     admin:1,
//     members: []
// }
];


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
        id: USER_ID = USER_ID + 1,
    });

    console.log(chalk.green("user created"));
    console.log(users[users.length-1]);

    res.json({
        message: "User created successfully"
    })
})

app.post('/signin', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username && user.password === password);

    if(!userExists){
        res.status(403).json({
            message: "Invalid credentials"
        })
        return
    }

    const token = jwt.sign({
        userId: userExists.id
    }, "abhishek123");
    
    console.log(chalk.green('user signed in'))
    console.log(chalk.blueBright('user exists', userExists.id))
    console.log(chalk.red(`credentials-> username: ${username}, password: ${password}`))
    console.log(chalk.red(`token: ${token}`))

    res.json({
        token
    })

})

// AUTHENTICATED ROUTES - MIDDLEWARE
app.post('/organization', authMiddleWare, (req, res) => {
    const userId = req.userId;
    console.log(`user id: ${userId} is trying to create an org`)

    const data = {
        id: ORGANIZATION_ID = ORGANIZATION_ID+1,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    }
    organizations.push(data)

    console.log(chalk.green('organization added successfully!!'))
    console.log(organizations[organizations.length-1]);

    res.json({
        message: "organization created",
        id: ORGANIZATION_ID,
    })
    
})

app.post('/add-member-to-organization', authMiddleWare, (req, res) => {
    const userId = req.userId;
    console.log(`user id: ${userId} is trying to add a member`)

    const organizationId = req.body.organizationId;
    console.log(`adding in organization: ${organizationId}`)

    const memberUserUsername = req.body.memberUserUsername;
    console.log(`adding member with username: ${memberUserUsername}`)

    const organization = organizations.find(org => org.id === organizationId);
    console.log(`organization found: ${organization.id}`)

    if(!organization){
        res.status(411).json({
            message: "organization does NOT exist"
        })
        return 
    }
    if(organization.admin !== userId){
        res.status(411).json({
            message: "Unauthorized action"
        })

        return 
    }
    
    const memberUser = users.find(u => u.username === memberUserUsername);

    if(!memberUser){
        res.status(411).json({
            message: "user with this username does not exist"
        })
        return
    }

    organization.members.push(memberUser.id);
    console.log(chalk.green("member added successfully!"))
    console.log(organizations[organizations.length-1])

    res.json({
        message: "member user added"
    })
})

app.post('/board', (req, res) => {
    
})

app.post('/issue', (req, res) => {
    
})

// READ ENDPOINT
app.get('/organization', authMiddleWare, (req, res) => {

    const userId = req.userId;
    const organizationId = parseInt(req.query.organizationId);
    console.log(organizationId)

    const organization = organizations.find(org => org.id === organizationId);

    if(!organization){
        res.status(411).json({
            message: "Organization does NOT exist"
        })
        return 
    }
    if(organization.admin !== userId){
        res.status(411).json({
            message: "Unauthorized action"
        })

        return 
    }

    res.json({
        organization: {
            ...organization,
            members: organization.members.map(memberId => {
                const user = users.find(user => user.id === memberId);
                return {
                    id: user.id,
                    username: user.username
                }
            })
        }
    })

})


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
app.delete('/members', authMiddleWare, (req, res) => {

    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = organizations.find(org => org.id === organizationId);
    if(!organization){
        res.status(411).json({
            message: "Organization does NOT exist"
        })
        return 
    }
    if(organization.admin !== userId){
        res.status(411).json({
            message: "Unauthorized action"
        })

        return 
    }
    
    const memberUser = users.find(u => u.username === memberUserUsername);

    if(!memberUser){
        res.status(411).json({
            message: "user with this username does not exist"
        })
        return
    }

    organization.members = organization.members.filter(user => user.id != memberUser.id);

    res.json({
        message: "member user removed"
    })

    console.log(organizations.find(org => org.id = organizationId))
    
})


app.listen(port, () => {
    console.log(`listening to port http://localhost:${port}`)
})