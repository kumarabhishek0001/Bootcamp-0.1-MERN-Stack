const express = require('express')
const app = express()
const port = 3000

// used to read the body that is sent in the body in request-> req.body -> this is required
app.use(express.json())

const notes = [];

//frontend endpoint
app.get('/', (req, res) => {
  res.sendFile('D:\\Bootcamp-0.1-MERN-Stack\\Week-9\\frontend\\index.html')
})

app.post('/notes', (req,res) => {
  const note = req.body.note;

  notes.push(note);

  res.json({
    message: "Note added successfully!!"
  })
})

app.get('/notes', (req, res) => {
  res.json({
    notes
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
