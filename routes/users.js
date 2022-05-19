const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


router.post("/register", async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10); // creating salt using bacrypt package.
        const hashedPassword = await bcrypt.hash(req.body.password,salt) // hashing the password of requested body with the salt.

        const newUser = new User({
            username:req.body.username, //here i am indicating my own property instead of indicating all property(req.body).
            email:req.body.email,
            password:hashedPassword,
        });

        const user =  await newUser.save();
        res.status(200).json(user._id);

    } catch (err){
        res.status(500).json(err)
    }
});

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username}) //using model schema of User we r finding one username from db.
        !user && res.status(400).json("Wrong username or password!") // if there is no user response with 400.

        const validPassword = await bcrypt.compare( // validating the password through compare method between the saved password and user entered password.
            req.body.password,
            user.password
            );
            !validPassword && res.status(400).json("Wrong user or password!") // if not validated return 400 error.

            res.status(200).json({_id: user._id, username: user.username});

    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})




module.exports = router;