const mongoose = require("mongoose");
const {Schema} = mongoose

const authSchema = new Schema({
 username: String,
 password: String,
})

module.exports =  mongoose.model("credential", authSchema);