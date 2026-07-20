import express from "express";

const app = express();

const users = [
    {id:1,name:"Ashwin"},
    {id:2,name:"Kishan"},
    {id:3,name:"Rahul"}
];

const devices = [
{ id:1, category:"mobile", brand:"Apple"},
{ id:2, category:"mobile", brand:"Samsung"},
{ id:3, category:"laptop", brand:"Dell"},
{ id:4, category:"mobile", brand:"Apple"},
{ id:5, category:"laptop", brand:"Dell"}
];

app.use(express.json());

app.post('/users',(req,res)=>{
    console.log(req.body);
    const {body} = req;
    const newuser = {id:users[users.length-1].id+1,...body};
    users.push(newuser);    
    return res.status(201).send(newuser);
})

app.get('/users',(req,res)=>{
    res.send(users);
})

const cred = [
    {id:1,username:"kishan", password:"asdf"}
];

app.post("/login", (req, res) => {

    // const username = req.body.username;
    // const password = req.body.password;
   
//      -------0r-------
 
    const{username,password} = req.body;
    const {body} = req;
     const id = cred.length === 0
        ? 1
        : cred[cred.length - 1].id + 1;

    const newUser = {
        id,
        username,
        password
    };
    cred.push(newUser);
    res.send(newUser);

    // res.send("Login Request Received");

});

app.get('/devices',(req,res)=>{
    const {category,brand} = req.query;
    const result = devices.filter(dev=>{
        return dev.category===category|| dev.brand===brand;
    })
    res.json(result)
})

app.listen(3000,()=>{
    console.log("App is running on port 3000");
})