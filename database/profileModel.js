const mongoose = require("mongoose");
const {Schema} = mongoose;
const authModel = require("./authModel");


const profileSchema = new Schema({
    username: String,
    name: String,
    email: String,
    mobile: Number,
})

module.exports = mongoose.model("profile", profileSchema);

