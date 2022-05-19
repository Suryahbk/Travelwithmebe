const router = require("express").Router();
const Pin = require("../models/Pin");

// Creating a pin
router.post("/", async(req,res)=>{
    const newPin = new Pin(req.body);  // Using newPin variable we create a pin using model(Pin) and req.body = title,desc,rating etc. which we send inside this body.
    try{
        const savedPin = await newPin.save(); // Using savedPin variable we use save method to save the newPin.
        res.status(200).json(savedPin); // savedPin is responded with 200 status.
    }catch(err){
        res.status(500).json(err)
    }
});

// get all pins
router.get("/", async (req,res)=>{
    try{
         const pins = await Pin.find(); // With pins variable, we use find method to get pins through Pin model from db.
         res.status(200).json(pins);
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router