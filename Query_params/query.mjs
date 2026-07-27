import express from 'express';

const app = express();

const users = [
    {id:1,name:"Ashwin",age:21},
    {id:2,name:"Kishan",age:21},
    {id:3,name:"Rahul",age:22}
];

const devices = [
{ id:1, category:"mobile", brand:"Apple"},
{ id:2, category:"mobile", brand:"Samsung"},
{ id:3, category:"laptop", brand:"Dell"},
{ id:4, category:"mobile", brand:"Apple"},
{ id:5, category:"laptop", brand:"Dell"}
];

// app.get('/users',(req,res)=>{
//     console.log(req.query);
//     res.send(req.query);
// })

app.get('/users',(req,res)=>{
    const {name} = req.query;
    const user = users.find(user=>user.name===name);
     res.json(user);
     console.log(req.query);
});

app.get('/devices',(req,res)=>{
    const {category,brand} = req.query;
    const result = devices.filter(dev=>{
        return dev.category===category|| dev.brand===brand;
    });
    res.json(result);
});

app.listen(3000,()=>{
    console.log("port is running");
});