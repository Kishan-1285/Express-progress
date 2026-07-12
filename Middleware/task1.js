const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log("request recieved");
    next();
})

app.get('/',(req,res)=>{
    res.status(200).sendFile('./docs/index.html',{root:__dirname});
})

// app.use((req,res,next)=>{
//     console.log("request recieved");
//     next();
// })

app.get('/about',(req,res)=>{
    res.status(200).sendFile('./docs/about.html',{root:__dirname});
})


app.listen('3000',()=>{
    console.log("port is running on 3000")
})