require('dotenv').config();
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

const log = console.log;

const express = require('express');
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DB_KEY
})


const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.post('/signup', async(req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;



    // log(chalk.green(`INSERT INTO users(username, email, password) VALUES ('${username}', '${email}', '${password}')`))
    // VULNERABLE TO SQL INJECTION -> WRITING A QUERY INSTEAD OF ONLY PASSWORD
    // SINCE INSTEAD OF PASSWORD MY QUERY IS PASSED IT SEND DB A QUERY THAT COULD CAUSE DAMAGE TO DATA

    // const response = await pool.query(`INSERT INTO users(username, email, password) VALUES ('${username}', '${email}', '${password}') RETURNING id, username`);

    // INSTEAD USE THIS
    const response = await pool.query(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id, username`, [username, email, password]);

    log(response)

    res.json({
        message: "User created successfully",
        id: response.rows[0].id,
        username: response.rows[0].username,

    })
})

app.post('/signin', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        return res.json({
            message: "username and password fields are required."
        })
    }

    log(chalk.green('query: ') + `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`)
    
    const response = await pool.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`)

    
    log(response);

    const userExsits = response.rows[0];

    if(!userExsits){
        return res.json({
            message: 'Incorrect Credentials!'
        })
    }

    const userId = userExsits.id;

    const token = jwt.sign({userId}, process.env.JWT_KEY)

    res.json({
        message: 'SUCCESS',
        token: token
    })
})

app.listen(PORT, () => {
    log(chalk.green(`SERVER LIVE ON http://localhost:${PORT}`))
})