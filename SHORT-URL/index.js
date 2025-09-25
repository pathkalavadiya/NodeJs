const express = require('express');
const app =express();

const {connectDB}=require("./connect");
const url=require('./routes/url');
const URL=require('./models/url');
const PORT = 8001;

connectDB('mongodb://localhost:27017/shortURL')
  .then(()=>{ console.log("Connected to DB")});


app.use(express.json());
 
app.use("/url",url);

app.get('/:shortID',async (req,res)=>{
  const shortID=req.params.shortID;

  const entry=await URL.findOneAndUpdate({
    shortID
  },{$push:{
    visitHistory:{timeStamp:Date.now()}
  }})
  res.redirect(entry.redirectURL);
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});