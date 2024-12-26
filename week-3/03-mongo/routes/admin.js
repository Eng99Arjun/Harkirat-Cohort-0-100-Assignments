const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();


// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.create({
        username:username,
        password:password
    })
    .then(function(value)
    {
        res.status(200).json({
            message:"Admin created successfully"
        });
    })
    .catch(function(err)
    {
        res.status(400).json({
            message:"Admin creation failed"
        });
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    // use zod for validation
    Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price
    })
    .then(function(value)
    {
        res.status(200).json({
            message:"Course created successfully",
            id:value._id
            //get id

        });
    })
    .catch(function(err)
    {
        res.status(400).json({
            message:"Course creation failed"
        });
    })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
    .then(function(response)
    {
        res.status(200).json({
            courses:response
        });
    }) 
});

module.exports = router;