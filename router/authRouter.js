const express = require("express");
const authRouter = express.Router();
const authModel = require("../database/authModel")
const bcrypt = require("bcrypt");

authRouter.post("/signup", async(req,res)=> {

    const {username, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const securepassword = bcrypt.hashSync(password, salt)

    const credentials = {
        username: username,
        password: securepassword
    }

    let user = await authModel.findOne({username:username})
    if(user){
        res.send("user already exist")
    } else {
        authModel.create(credentials);
        res.send("welcome")
    }

})

authRouter.post("/login", async(req,res)=> {
    const {username, password} = req.body

    let user = await authModel.findOne({username:username})
    console.log(user);
    if(user) {
        let samepassword = bcrypt.compareSync(password, user.password)
        if(samepassword) {
            res.send("welcome")
        } else {
            res.send("Password incorrect")
        } 
    } else {
        res.send("user not found")
    }
})

module.exports = authRouter;