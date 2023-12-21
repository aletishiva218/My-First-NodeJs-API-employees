import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan("combined"))
app.use(helmet())
app.set("view engine","ejs")
let response;
const PORT = process.env.PORT;
const jsonData = [
    {
        id:1,
        name:"Shiva Aleti",
        age:23,
        type:"savings"
    },
    {
        id:2,
        name:"Om Jamnekar",
        age:54,
        type:"current"
    },
    {
        id:3,
        name:"Sharukhan",
        age:76,
        type:"savings"
    },
    {
        id:4,
        name:"Pranay Kapde",
        age:86,
        type:"current"
    }
]
app.get("/employees",(req,res)=>{
    try{
        if(!jsonData.length)
        throw {"error":"Dont have data"}
        res.send(jsonData)
    }catch(err){
        res.send(err)
    }
})
app.get("/random",  (req,res)=>{
    try{
        response = jsonData[Math.floor(Math.random()*jsonData.length)];
        if(!response)
        throw {"error":"Dont have any data"}
        res.send(response)
    }catch(err){
        res.send(err)
    }
})

app.get("/employee/:id",(req,res)=>{
    try{
        if(Number.isNaN(Number.parseInt(req.params.id)))
        throw {"error":"Please provide employee ID only"}
        response = jsonData.find((data)=>data.id==req.params.id);
        response = !response?{"error":"No data exists on that id"}:response;
        res.send(response)
    }catch(err){
        res.send(err)
    }
})

app.get("/employees/filter",(req,res)=>{  
    try{
        if(!req.query.type)
        throw {"error":"Please specify type"}
        response = jsonData.filter((data) => data.type == req.query.type);
        if(!response.length)
        throw {"error":"Don't have any data"}
        res.send(response)
    }catch(err){
        res.send(err)
    }
})

app.post("/employees",(req,res)=>{
  try{
    if(!(req.body.name && req.body.age && req.body.type))
    throw {"error":"Please provide complete details"}
    let newEmployee = {
        id:jsonData.length+1,
        name:req.body.name,
        age:req.body.age,
        type:req.body.type
    }
    jsonData.push(newEmployee)
    res.send(jsonData.slice(-1))
  }catch(err){
    res.send(err)
  }
})

app.put("/employees/:id",(req,res)=>{
    try{
        if(Number.isNaN(Number.parseInt(req.params.id)))
        throw {"error":"Please provide employee ID only"}
        let objIndex = jsonData.findIndex(data => data.id == req.params.id)
        if(objIndex == -1)
        throw {"error":"Data not exists with given employee ID"};
   jsonData[objIndex].name = req.body.name || jsonData[objIndex].name;
    jsonData[objIndex].age = req.body.age || jsonData[objIndex].age;
    jsonData[objIndex].type = req.body.type || jsonData[objIndex].type;
    res.send(jsonData[objIndex])
    }catch(err){
        res.send(err)
    }
})

app.patch("/employees/:id",(req,res)=>{
    try{
        if(Number.isNaN(Number.parseInt(req.params.id)))
        throw {"error":"Please provide employee ID only"}
        let objIndex = jsonData.findIndex(data => data.id == req.params.id)
        if(objIndex == -1)
        throw {"error":"Data not exists with given employee ID"};
   jsonData[objIndex].name = req.body.name || jsonData[objIndex].name;
    jsonData[objIndex].age = req.body.age || jsonData[objIndex].age;
    jsonData[objIndex].type = req.body.type || jsonData[objIndex].type;
    res.send(jsonData[objIndex])
    }catch(err){
        res.send(err)
    }
})
app.delete("/employees/:id",(req,res)=>{
    try{
        if(Number.isNaN(Number.parseInt(req.params.id)))
        throw {"error":"Please provide employee ID only"}
        let obj = jsonData.find((data)=> data.id == req.params.id)
        if(!obj)
        throw {"error":"Data not exists with given employee ID"};
            let i = jsonData.length;
        while(i--){
            if(jsonData[i] && jsonData[i].id==req.params.id)
            jsonData.splice(i,1)
        }
        res.send(jsonData) 
    }catch(err){
        res.send(err)
    }
})
app.listen(PORT,()=>{
    console.log("Server is running at ",PORT)
})