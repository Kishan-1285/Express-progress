import express from  'express';

const app = express();

const PORT = 3000;

const users = [
    {id:1,user_name:"Gokul"},
    {id:2,user_name:"Guru"},
    {id:3,user_name:"Ashwin"},
    {id:4,user_name:"Sridar"},
    {id:5,user_name:"Kishan"},
]

app.get("/",(req,res)=>{
    res.send({msg:"Root"});
});

app.get("/api/users",(req,res)=>{
    res.send(users)
})

app.get("/api/users/:id",(req,res)=>{
    
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        res.send({mes:"Bad Request , Invalid"})
    }

    const user = users.find((user)=>user.id===id);

    if(user){
        return res.send(user);
    }

    return res.status(404).send({msg: "User not found"});
})
app.listen(PORT,()=>{
    console.log(`App is running on the port ${PORT}`);
})