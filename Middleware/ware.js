const express = require('express')

const app = express();

app.get('/about',(req,res)=>{
    res.status(200).sendFile('./docs/about.html',{root:__dirname});
})

app.use((req,res,next)=>{
    console.log("\nmiddleware 1\n");
    next();
})

app.get('/index',(req,res)=>{
    res.status(200).sendFile('./docs/index.html',{root:__dirname});
})

app.use((req,res,next)=>{
    console.log("\nmiddleware 2\n");
    next();
})

app.get('/join',(req,res)=>{
    res.status(200).sendFile('./docs/join.html',{root:__dirname});
})

app.use((req,res)=>{
    res.status(404).sendFile('./docs/notFound.html',{root:__dirname})
})

app.listen(3000,()=>{
    console.log("the port is running on 3000")
})

