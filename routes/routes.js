const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');

router.post('/data', (req,res)=>{
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
    });
    task.save((error)=>{
        if(error){
            res.json({message: error.message, type:'danger'})
        }
        else{
            req.session.message = {
                type:'success',
                message: 'User added successfully!',
            };
            res.redirect('/');
        }
    })
});



router.get("/",(req,res)=>{
    res.render("index",{title:"Task Manager"});
}); 

router.get("/login",(req,res)=>{
    res.render("login",{title:"Login Now"});
});
router.get("/register",(req,res)=>{
    res.render("register",{title:"Register Now"});
});
router.get("/data",(req,res)=>{
    res.render("data",{title:"Enter details"});
});

module.exports = router;