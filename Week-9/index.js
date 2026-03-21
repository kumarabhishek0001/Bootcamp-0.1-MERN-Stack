const express = require('express')
const app = express()
const port = 3000

// used to read the body that is sent in the body in request-> req.body -> this is required
app.use(express.json())

const notes = [];
const users = [];

// authentication endpoints
// signup endpoint
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find(user => user.username === username);
  if(username){
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

//frontend endpoint
app.get('/', (req, res) => {
  res.sendFile('D:\\Bootcamp-0.1-MERN-Stack\\Week-9\\frontend\\index.html')
})

// backend endpoint
app.post('/notes', (req,res) => {
  const note = req.body.note;

  notes.push(note);

  res.json({
    message: "Note added successfully!!"
  })
})

// backend endpoint
app.get('/notes', (req, res) => {
  res.json({
    notes
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
