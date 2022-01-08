const mongoose = require("mongoose");
const {Schema} = mongoose
const passportLocalMongoose = require("passport-local-mongoose")

const authSchema = new Schema({
 username: String,
 password: String,
})

authSchema.plugin(passportLocalMongoose); //installing plugin to add credentials in an easy way.

module.exports =  mongoose.model("credential", authSchema);