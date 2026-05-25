require('dotenv').config();
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const z = require('zod')

const log = console.log;

const express = require('express');
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DB_KEY
})

const signUpSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
    email: z.email()
})


const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.post('/signup', async (req, res) => {

    const {data, success, error} = signUpSchema.safeParse(req.body);

    if(!success){
        return res.status(403).json({
            message: "Incorrect inputs",
            error: error.issues
        })
    }


    const username = data.username;
    const email = data.email;
    const password = data.password;

    const hashedPassword = await bcrypt.hash(password, 10)

    const response = await pool.query(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id, username`, [username, email, hashedPassword]);

    log(response)

    res.json({
        message: "User created successfully",
        id: response.rows[0].id,
        username: response.rows[0].username,

    })
})

app.post('/signin', async (req, res) => {   
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.json({
            message: "username and password fields are required."
        })
    }

    log(chalk.green('query: ') + `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`)

    const response = await pool.query(`SELECT * FROM users WHERE username = '$1'`, [username])

    log(response);

    const userExsits = response.rows[0];

    if (!userExsits) {
        return res.json({
            message: 'Incorrect Credentials!'
        })
    }

    const correctPassword = await bcrypt.compare(password, userExsits.password);
    log(chalk.red('bcrypt response: '))
    log(correctPassword);

    if (correctPassword) {
        const userId = userExsits.id;

        const token = jwt.sign({ userId }, process.env.JWT_KEY)

        res.json({
            message: 'SUCCESS',
            token: token
        })
    } else {

        return res.json({
            message: 'Incorrect Credentials!'
        })

    }


})

app.get('/getuser', async(req, res) => {
    const userId = req.body.userId;
    const query = 'SELECT username, email, created_at FROM users WHERE id=$1';
    const value = [userId];

    const resonse = await pool.query(query, value);

    res.json({
        message: "Data fetched successfully",
        resonse
    })
})

app.get('/getalltodos', async(req, res) => {
    const userId = req.body.userId;
    
    const query = 'SELECT * FROM todo_test WHERE user_id = $1';
    const value = [userId];

    const response = await pool.query(query, value);
    res.json({
        fetch: "success",
        response
    })
})

app.listen(PORT, () => {
    log(chalk.green(`SERVER LIVE ON http://localhost:${PORT}`))
})