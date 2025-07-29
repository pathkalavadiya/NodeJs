const fs=require('fs');
// fs.writeFileSync('./output.txt', 'Hello, World! This is a test file.');    

// const value=fs.readFileSync('./data.txt', 'utf-8');
// console.log(value);

// fs.readFile('./data.txt','utf-8',(err,result)=>{
//     if(err){
//         console.log('err',err);
//     }
//     else{
//         console.log(result);
//     }
// });

// fs.appendFileSync('./output.txt',new Date().getDate().toLocaleString());

fs.cpSync('./data.txt', './data_copy.txt');
fs.unlinkSync('./data_copy.txt');
