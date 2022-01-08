const express = require("express");
const connectDB = require("../social-blog/database/mongoose")
const authModel = require("../social-blog/database/authModel")
const authRouter = require("../social-blog/router/authRouter")
const blogRouter = require("../social-blog/router/blogRouter");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express()


app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    secret: "This is the secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(blogRouter)
app.use("/auth",authRouter)

connectDB()

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})