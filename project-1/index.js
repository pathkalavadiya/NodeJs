const express=require("express");


//db connection import
const {connectDB}= require("./connection")

//logging middleware import
const {logReqRes}=require("./middlewares")

//root import
const userroot=require("./routes/user")

const app=express();
// const users=require("./MOCK_DATA.json");
const { type } = require("os");
const PORT=8000;

//MongoDB connection
connectDB("mongodb://127.0.0.1:27017/userDB")
  .then(()=>{
    console.log("DB connected successfully");
});



//middle ware-plugin
app.use(express.urlencoded({extended:true}));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/user",userroot);  

app.listen(PORT,()=>{
    console.log(`server is ready on PORT: ${PORT}`)
});