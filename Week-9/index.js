const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

const {authMiddleware} = require('./middleware')
// used to read the body that is sent in the body in request-> req.body -> this is required
app.use(express.json())

const notes = [];
const users = [{
  username: "abhishek",
  password: "123123"
}];

// authentication endpoints
// signup endpoint
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find(user => user.username === username);

  if(userExists){
    return res.status(403).json({
      message : "user already exists"
    })
  }

  users.push({
    username: username,
    password: password
  })

  res.json({
    message: "user created successfully"
  })
})

app.post('/signin', (req, res)=> {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find(user => {
    return user.username === username && user.password === password;
  })

  if(!userExists){
    return res.status(403).json({
      message: "Invalid credentials"
    })
  }


  // sending a jwt token
  const token = jwt.sign({
    username: username
  }, "harkirat123");


  res.json({
    token: token
  })
})

//frontend endpoint
app.get('/', (req, res) => {
  res.sendFile('D:\\Bootcamp-0.1-MERN-Stack\\Week-9\\frontend\\index.html')
})

// backend endpoint
app.post('/notes', authMiddleware, (req,res) => {
  const username = req.username;
  const note = req.body.note;

  notes.push({note, username});

  res.json({
    message: "Note added successfully!!"
  })
})

// backend endpoint
app.get('/notes', authMiddleware, (req, res) => {

  const username = req.username;
  const usernote = notes.filter(note => note.username === username);

  res.json({
    notes: usernote
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.get('/signup', (req, res) => {
  res.sendFile('D:\\Bootcamp-0.1-MERN-Stack\\Week-9\\frontend\\signup.html')
})


app.get('/signin', (req, res) => {
  res.sendFile('D:\\Bootcamp-0.1-MERN-Stack\\Week-9\\frontend\\signin.html')
})