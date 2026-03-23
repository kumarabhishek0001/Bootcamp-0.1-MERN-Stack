const https = require('https');
const agent = new https.Agent({
  keepAlive: false   // ⭐ disables socket reuse
});
require('dotenv').config()
const apiKey = process.env.KEY
const express = require('express')
const chalk = require('chalk')
const axios = require('axios')
const path = require('path')
const app = express()

const port = 3000

app.use(express.static(path.join(__dirname, 'frontend')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "homepage.html"))
})

// path parameters
app.get('/getmovie/:name', async (req, res) => {
  const movieName = req.params.name;

  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        httpsAgent: agent,
        params: {
          query: movieName,
          include_adult: false,
          language: 'en-US',
          page: 1
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    console.log("ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: "Network is busy, please try again"
    });
  }
});

app.listen(port, () => {
  console.log("Example app listening on port " + chalk.green(`http://localhost:${port}`))
})
