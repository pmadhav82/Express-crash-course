const { response } = require("express");
const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("This is user section");
})


//fetch and send weather info from openweather map
const https = require("https");
const city = "Melbourne";

const mykey = "2e8f0a7dd3688402b0ad036b43641a69";
const url = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${mykey}&units=metric`;

 

router.get("/weather",(req,res)=>{
https.get(url,(response)=>{
    response.on("data",(data)=>{
        const weatherData = JSON.parse(data);
      
        
res.json(weatherData);
        })
})

})


router.get("/new",(req,res)=>{
    res.send("New user form");
})

//dynamic url always has to be at buttom

router.route("/:id").get((req,res)=>{
    res.send("get user with the id "  + req.params.id);
}).put((req,res)=>{
    res.send(`update user having id ${req.params.id}`)
}).delete((req,res)=>{
    res.send(`Delete user have an id ${req.params.id}`)
})

module.exports = router;