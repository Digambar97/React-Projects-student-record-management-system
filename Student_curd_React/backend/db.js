const mysql =  require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Rathod@123",
    database:"student"
});

db.connect((err)=>{
   if(err){
    console.log("Error While Connecting");
   } else{
    console.log("Mysql Connected  ");
   }
});

module.exports =  db;