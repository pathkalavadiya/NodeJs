const mongoose=require("mongoose");

//momgodb  shema 
const userschema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    job_title:{
        type:String,
    },
    gender :{
        type:String,
    },
},{
    timestamps:true,
});

//mongodb model
const  User=mongoose.model("user",userschema);

module.exports=User;