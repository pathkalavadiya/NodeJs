const express=require("express");
const router=express.Router();
const {handleGetallUsers,handleGetUsersById,handlePatchOperations,handleDeleteOperations,CreateNewUser}=require("../controllers/user");
// router.get("/users",async(req,res)=>{
//     const alldbusers=await User.find({});
//     const html=`
//     <ul>
// ${alldbusers.map((user)=> `<li>${user.first_name}-${user.email}</li>`).join("")}
//     </ul>`;
//     return res.send(html);
// });



router.route("/")
.get(handleGetallUsers)
.post(CreateNewUser);

router.route("/:id")
.get(handleGetUsersById)

.patch(handlePatchOperations)
  .delete(handleDeleteOperations);


module.exports=router;