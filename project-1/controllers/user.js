// const { model } = require("mongoose");
const User=require("../models/user");
// ...existing code...
async function handleGetallUsers(req, res) {
    const alldbusers = await User.find({});
    return res.json(alldbusers);
}

async function handleGetUsersById(req, res) {
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(400).json({status:"user not found"});
    }
    return res.json(user);
}

async function handlePatchOperations(req, res) {
    await User.findByIdAndUpdate(req.params.id,{last_name:"Weak"});
    return res.json({status:"updated"});
}


async function handleDeleteOperations(req, res) {
  await User.findByIdAndDelete(req.params.id);
    return res.json({ status: " user deleted" });
}

   //  users.push({id: users.length+1,...body});
    //  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
    //     if(err){
    //         return res.status(500).json({status:"error", message: err.message});
    //     }
    //     return res.status(201).json({status:"success",id:users.length+1});
    //  })
async function CreateNewUser(req, res) {
 const body=req.body;
 
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
  return res.status(201).json({status:"success",id:result._id});
}

 module.exports={
    handleGetallUsers,
    handleGetUsersById,
    handlePatchOperations,
    handleDeleteOperations,
    CreateNewUser,
};