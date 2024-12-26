const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username  = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })
    .then((value)=>{
        res.status(200).json({
            message:"User created successfully"
        });
    }).catch((err)=>{
        res.status(400).json({
            message:"User creation failed"
        });
    });
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username  = req.body.username;
    const password = req.body.password;

    User.findOne({
        username,
        password
    })
    if(User){
        const token = jwt.sign({
            username
        },JWT_SECRET);
    
        res.json({
            token
        });
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then(function(response)
    {
        res.status(200).json({
            courses:response
        });
    })
    
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses:courseId
    }
    }).catch(function(err){
        Console.log(err);
    });
    res.json({
        message:"Course purchased successfully"
    });
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User
    .findOne({username:req.username});
    console.log(user.purchasedCourses); // it gives array of purchased courses id.
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    });
    res.json({
        courses:courses
    })

});

module.exports = router