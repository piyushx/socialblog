const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/blogDB")
}
module.exports =  connectDB
