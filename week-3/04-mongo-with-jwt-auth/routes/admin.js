const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../../04-mongo-with-jwt-auth/db");
const router = Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username  = req.body.username;
    const password = req.body.password;

   Admin.create({
        username: username,
        password: password
    })
    .then((value) => {
        res.status(200).json({
            message:"Admin created successfully"
        });
    }).catch((err) => {
        res.status(400).json({
            message:"Admin creation failed"
        });    
    });
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username  = req.body.username;
    const password = req.body.password;

    //const isValidated = await 
    User.find({
        username: username,
        password: password
    })
    if(User){
        const token = jwt.sign({
            username
        },JWT_SECRET);
    
        res.json({
            token
        });
    } else {
        res.status(400).json({
            message:"Invalid username or password"
        });
    }



    
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