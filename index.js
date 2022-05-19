const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const port = process.env.PORT || 8800;

dotenv.config();

app.use(express.json())


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    //useCreateIndex:true,
}).then(()=>{
    console.log("MongoDB Connected!")
}).catch(err=>console.log(err));

app.get('/', (req, res) => {
    res.send("Backend is Running");
});

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(port,()=>{
    console.log("Backend server is running!")
})