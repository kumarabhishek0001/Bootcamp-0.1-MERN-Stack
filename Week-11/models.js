const chalk = require('chalk')
const mongoose = require('mongoose');
require('dotenv').config


async function connectDb(){
    console.log(chalk.green('Connecting'));
    await mongoose.connect(process.env.DB_KEY);
    console.log(chalk.green('connected successfully'));
}

connectDb().catch((err) => {
    console.log(err);
    console.log(chalk.red('Cannot connect to DB'));
})

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    createdOn: {type: Date, default:Date.now}
});

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    priority: Number,
    date: {type: Date, default: Date.now},
    userId: mongoose.Types.ObjectId,
})

const userModel = mongoose.model('users', userSchema);
const todoModel = mongoose.model('todos', todoSchema);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}