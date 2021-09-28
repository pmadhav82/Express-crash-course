const express = require("express");
 const exphbs = require("express-handlebars");


const app = express();
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");


const port = process.env.port||8000;

const members =[{name:"Madhav pandey",
id:1,
status:"active",
location:"sydney"},{name:"Madhav pandey",
id:2,
status:"active",
location:"sydney"},{name:"Madhav pandey",
id:3,
status:"active",
location:"sydney"},
{name:"Nishanta Pandey",
id:3,
status:"active",
location:"Nepal"}]




const comments =[] ;
app.get("/",(req,res)=>{
    res.render("home",{
        showHeading:true,
        title:"My App",
      comments
    });
})


app.use(express.urlencoded({extended:true}));

app.post("/",(req,res)=>{

const newComment ={
    name:req.body.name,
    comment:req.body.comment
}
comments.push(newComment);
res.redirect("/");

})

let items =[];

app.get("/todo",(req,res)=>{
    res.render("todo",{
        heading:"ToDo app",
        items
    })
})

app.post("/todo",(req,res)=>{
  
    let newItem = req.body.item;
    items.push(newItem);
    res.redirect("/todo");
})






app.listen(port,()=>{
    console.log("Server is running on port " + port);
})
