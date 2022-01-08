const express = require("express");
const authRouter = express.Router();
const authModel = require("../database/authModel")
const bcrypt = require("bcrypt");
const passport = require("passport");

passport.use(authModel.createStrategy()) //telling passport to use the default local strategy 

passport.serializeUser(function(user, done) { // telling passport what to store in a session
    done(null, user.id);
});

passport.deserializeUser(function(id, done) { //telling passport to alter ID in the session into an object.
    authModel.findById(id, function(err, user) {
      done(err, user);
    });
});


authRouter.post("/signup", async(req,res)=> {
    authModel.register({username: req.body.username}, req.body.password, (err, user)=> { //
        if(err){
            console.log(err);
            res.redirect("/")
        } else {
            passport.authenticate("local")(req,res, ()=>{
                res.send(`hey ${user.username}`)
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
            res.send(`hey ${req.user.username}`)
           })
       }
   })
})


module.exports = authRouter;