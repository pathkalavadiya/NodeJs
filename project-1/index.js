const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const users=require("./MOCK_DATA.json");
const fs=require("fs");
const { type } = require("os");
const PORT=8000;

//connections
mongoose
 .connect("mongodb://127.0.0.1:27017/userDB")
  .then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log("error",err);
});


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
const  User=mongoose.model("user1",userschema);

//return html format data
//middle ware-plugin
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=>{
    console.log("hello from middel ware1"); 
    next();
});

app.use((req,res,next)=>{
fs.appendFile("log.txt",`${Date.now()}:${req.method}:${req.path}\n`,(err,data)=>{
   next();
    }
);
});


app.get("/users",async(req,res)=>{
    const alldbusers=await User.find({});
    const html=`
    <ul>
${alldbusers.map((user)=> `<li>${user.first_name}-${user.email}</li>`).join("")}
    </ul>`;
    return res.send(html);
});



app.get("/api/users",async(req,res)=>{
    const alldbusers=await User.find({});

    return res.json(alldbusers);

});

app.route("/api/users/:id")
.get(async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(400).json({status:"user not found"});
    }
    return res.json(user);
})  

.patch(async(req,res)=>{
await User.findByIdAndUpdate(req.params.id,{last_name:"Weak"});
    return res.json({status:"updated"});
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: " user deleted" });
  });

app.post("/api/users",async(req,res)=>{
    const body=req.body;
    //  users.push({id: users.length+1,...body});
    //  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
    //     if(err){
    //         return res.status(500).json({status:"error", message: err.message});
    //     }
    //     return res.status(201).json({status:"success",id:users.length+1});
    //  })
    if(!body||!body.first_name||!body.email || !body.last_name || !body.job_title || !body.gender){
        return res.status(400).json({status:"error",message:"plz provide all details"});
    }
    const result=await User.create({
    first_name:body.first_name,
    last_name:body.last_name,
    email:body.email,
    job_title:body.job_title,
    gender:body.gender
   });
   console.log("result",result);
  return res.status(201).json({status:"success"});
});
app.listen(PORT,()=>{
    console.log(`server is ready on PORT: ${PORT}`)
});