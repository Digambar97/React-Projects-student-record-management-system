const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

app.post("/create-student",(req,res)=>{
    const {name,email,course,age} =  req.body;
    const sql =  "insert into students(name,email,course,age) values(?,?,?,?)";
    db.query(sql,[name,email,course,age],(err,result)=>{
        if(err){
            return res.status(500).json({message:"Error While creating Student Record",success:false});
        }
        return res.status(201).json({message:"Student Record Created  Successfully",success:true});
    });
})

app.get("/get-student",(req,res)=>{
    const sql = "select * from students";
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({message:"Students Data is Not Found"});
        }
        return res.status(200).json({message:"Students Data Featch Successfully",data:result});
    });
})

app.put("/update-student/:id",(req,res)=>{
    const {id} = req.params;
    const {name,email,course,age} = req.body;
    const sql = "update students set name=?,email=?,course=?,age=? where id =?";
    db.query(sql,[name,email,course,age,id],(err,result)=>{
        if(err){
            return res.status(500).json({message:"Student Data is Not update "});
        }
        return res.status(200).json({message:"Student Data Update Successfully"});
    });
})

app.delete("/delete-student/:id",(req,res)=>{
    const {id} = req.params;
    const sql = "delete from students where id =  ?";
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).json({message:"Student Data Not Delete"});
        }
        return res.status(200).json({message:"Student Delete",result});
    });
})


app.listen(port,(err)=>{
    if(err){
        console.log("Error WHile Connecting to  Server");
    }else{
        console.log("Server is Running on Port "+port);
    }
})
