const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello i am from here</h1>');
    console.log(req.url);
});

// app.get('/about',(req,res,next)=>{
//     res.send('<h3>Hello there this is about be </h3>')
//     console.log(req.url)  // gives the path of the url 
//     next();
// })

app.get('/about',(req,res)=>{
    res.status(200).sendFile('./docs/about.html',{root:__dirname})
    console.log(req.url)  // gives the path of the url 
})

app.get('/index',(req,res)=>{
    res.status(200).sendFile('./docs/index.html',{root:__dirname})
});

app.get('/join',(req,res)=>{
    res.status(200).sendFile('./docs/join.html',{root:__dirname})
})

app.use((req,res)=>{
    res.status(400).sendFile('./docs/notFound.html',{root:__dirname})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});   