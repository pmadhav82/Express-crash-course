

const express = require("express");
const app = express();
const path = require("path");

const members = require("./member");




const port = process.env.port||8080;

app.use(express.urlencoded({extended:true}));

//static folder
 app.use(express.static(path.join(__dirname,"Public")));


/*
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})*/

/*
 app.post("/", (req,res)=>{
     res.send(`Welcome ${req.body.fn}`);
 })
*/



 app.get("/api/members",(req,res)=>{
    
     res.json(members);   
 })


 
 

app.get("/api/members/:id",(req,res)=>{

 //function to check given member id included or not in member array
const found = (array, value)=>{
    return array.some((arrayValue)=>{
        return value == arrayValue.id;
    })
}

 // const found = members.some(member=>member.id === parseInt(req.params.id));

 
    if(found(members, parseInt(req.params.id))){
        res.json(members.filter(members=> members.id === parseInt(req.params.id)));
    }else{
        res.status(400).send(`<h1>There is no member with id ${req.params.id}
        <a href = "/api/members">Go back </a>
        `);
    }
})



//post new member

app.post("/",(req,res)=>{
    const newMember ={
        id:req.body.id,
        name:req.body.member_name,
        status:req.body.status,
        location:req.body.location
    }

 
    if(!newMember.name){
        return res.status(400).send(`please you have not enter name 
        <a href = "/">Go back </a>
        `)
    }else{
        members.push(newMember);
        
        res.send(`Member created successfully
        <a href = "/">Go back </a>
        <br>
        <a href = "/api/members">Get Member information </a>
        `)

    
    }


})


//Using router
const userRouter = require("./user");


app.use("/user",userRouter);


app.listen(port,()=>{
    console.log("server is runnig on port " + port );
})
