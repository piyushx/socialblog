const mongoose = require("mongoose");
const {Schema} = mongoose;


const blogSchema = new Schema({
    title: String,
    description: String,
    date: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "profile"
    },
    category: String,
    tags: Array
})

module.exports = mongoose.model("blog", blogSchema);