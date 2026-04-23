const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://kumarabhishek18jha12_db_user:BYBZ1e9opgMnn7sJ@cluster0.drirtsd.mongodb.net/trello-week-12')

// models
const userSchema = mongoose.Schema({
    username: String,
    password: String
})

const organizationSchema = mongoose.Schema({
    title: String,
    description: String,
    admin: mongoose.Types.ObjectId,
    members: [mongoose.Types.ObjectId]
})

const organizationModel = mongoose.model("organiztion", organizationSchema);
const userModel = mongoose.model("users", userSchema);

module.exports = {
    organizationModel,
    userModel
}