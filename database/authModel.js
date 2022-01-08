const mongoose = require("mongoose");
const {Schema} = mongoose
const passportLocalMongoose = require("passport-local-mongoose")

const authSchema = new Schema({
 username: String,
 password: String,
})

authSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("credential", authSchema);