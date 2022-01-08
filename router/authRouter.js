const express = require("express");
const authRouter = express.Router();
const authModel = require("../database/authModel")
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose")

passport.use(authModel.createStrategy())

passport.serializeUser(authModel.serializeUser());
passport.deserializeUser(authModel.deserializeUser());


authRouter.post("/signup", async(req,res)=> {
    authModel.register({username: req.body.username}, req.body.password, (err, user)=> {
        if(err){
            console.log(err);
            res.redirect("/")
        } else {
            passport.authenticate("local")(req,res, ()=>{
                res.send("hey homey")
            })
        }
    })
})

authRouter.post("/login", async(req,res)=> {
   const user = new authModel(
    {
        username: req.body.username,
        password: req.body.password
    }
   )

   req.login(user, (err)=> {
       if(err){
           console.log(err);
           res.redirect("/")
       } else {
           passport.authenticate('local')(req,res, ()=> {
               res.send("Hey homey")
           })
       }
   })
})

module.exports = authRouter;