const express = require('express');
const router = require("./src/routes/route")

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//security middleware library import
const rateLimit = require('express-rate-limit')
const helemt = require('helmet');
const xssClean =require('xss-clean');
const  mongoSanitize=require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');


//security middleware library implimentation
app.use(cors());
app.use(helemt());
app.use(xssClean());
app.use(mongoSanitize());
app.use(hpp());

app.use(express.static('public'));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json());
const limiter = rateLimit({
    windowMs: 15 * 60 * 10000, // 15 minutes
	max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);


const uri="mongodb+srv://<username>:<password>@cluster0.fmftb.mongodb.net/zoran?retryWrites=true&w=majority";
const options = {
    user:"crudUser",
    pass:"cKCvJBxPceRvqkmp",
    autoIndex:true,
};


mongoose.connect(uri,options, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Database connect successfully")
    }
});

app.use("/api/v1", router);


//undefined router
app.use("*", (req, res)=>{
    res.status(404).json({"status":"fail", "data":"undefined route and not found"})
});

module.exports=app;