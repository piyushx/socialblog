const express = require("express");
const authRouter = express.Router();

authRouter.get("/", (req,res)=> {
    res.send("This is the router")
})

module.exports = authRouter;