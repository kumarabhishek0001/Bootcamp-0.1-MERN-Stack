const express = require('express')
const app = express()
const port = 3000

app.use(express.json())



let requestCount = 0;
function middleWare(req, res, next){
  console.log("Request:", req.url);
  requestCount++;
  next();
}


app.get('/', (req, res) => {
  // middleWare()
  res.sendFile("D:\\Bootcamp-0.1-MERN-Stack\\Week-8\\landing.html")
})

app.get('/sum',middleWare, (req, res) => {

  // middleWare();

  const a = parseInt(req.query.a);
  console.log(a);

  const b = parseInt(req.query.b);
  console.log(b)

  const sum = a + b;

  // sending json
  res.json({
    "ans": sum
  })

  // sending a normal string
  // res.send(sum.toString())

  // sending HTML
  // res.send("<h1>"+ sum+"</h1>")
})

app.post('/sub',middleWare, (req, res) => {

  // middleWare();
  const a = parseInt(req.body.a);
  //console.log("index a:", a)

  const b = parseInt(req.body.b);

  const sub = b - a;

  res.json({
    "answer": sub,
  })
})

// path parameters
app.post('/mul',middleWare, (req, res) => {

  // middleWare()
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  const mul = a * b;

  res.json({
    "answer": mul,
  })

})

app.get('/div', (req, res) => {

  const a = parseInt(req.query.a);
  
  const b = parseInt(req.query.b);
  
  if(b==0){
    res.status(401).json({
      "message": "Cannot divide a number by zero"
    })
    return
  }

  result = a/b;

  res.send("<h1>" + result + "</h1>");
})

app.get('/status',middleWare, (req, res) => {
  // middleWare();
  res.send("<h1>" + "UP" + "</h1>");
})

app.get('/requestCount', (req, res) => {
  // middleWare();
  res.json({
    "Request Count" : requestCount
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
