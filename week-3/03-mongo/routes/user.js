const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { Console } = require("console");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    User.create({
        username:username,
        password:password
    })
    .then(function(response){
        res.status(200).json({
            message:"User created successfully"
        });
    })
    .catch(function(err){
        res.status(400).json({
            message:"User creation failed"
        });
    });
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find()
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(err){
        res.status(400).json({
            message:"Failed to fetch courses"
        });
    });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
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

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User
    .findOne({username:req.headers.username});
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