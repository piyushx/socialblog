const express = require("express");
const { title } = require("process");
const blogModel = require("../database/blogModel")
const blogRouter = express.Router();

blogRouter.get("/", async(req,res)=> {
    const blogs = await blogModel.find()
res.render("home", {name: "Piyush", blogs: blogs})
})

blogRouter.post("/", async(req,res)=> {
    const{title, description} = req.body
    let today = new Date().toISOString().slice(0, 10)
    const blog = {
        title: title,
        description: description,
        date: today
    }
    blogModel.create(blog)

    res.redirect("/")
})

blogRouter.post("/delete", (req,res)=> {
    const id = req.body.id
    console.log(id);
    blogModel.findByIdAndDelete(id, ()=> {
        console.log("item deleted");
    })
    res.redirect("/")
})

blogRouter.put("/update", (req,res)=> {
    const {title, description, id} = req.body
    let today = new Date().toISOString().slice(0, 10)
    const updatedBlog = {
        title: title,
        description: description,
        date: today
    }
    blogModel.findByIdAndUpdate(id, {$set: updatedBlog})
    res.redirect("/");
})

module.exports = blogRouter
