const express=require('express');
const app=express();
// require('dotenv').config();


const bodyparser=require('body-parser');
app.use(bodyparser.json());
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});