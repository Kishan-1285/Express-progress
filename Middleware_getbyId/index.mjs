import express from "express";

const app = express();

const users = [
    { id: 1, user_name: "kishan" },
    { id: 2, user_name: "Ashwin" },
    { id: 3, user_name: "Gokul" },
    { id: 4, user_name: "Guru" },
    { id: 5, user_name: "Sridar" },
];
 //middleware
const getUserIndexById = (req,res,next)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(404).send({msg:'bad request,invalid id'})
    }
    const userIndex = users.findIndex((user)=>user.id ===id);
    if(userIndex===-1){
        return res.status(404).send({msg:"User not Found"});
    }
    req.userIndex = userIndex;
    next();
}
//middleware
const getparamsById = (req,res,next)=>{
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ msg: "invalid id is given" });
    }
    req.id = id;
    next();
}

app.use(express.json());

app.get("/api/users",(req,res)=>{
    res.status(200).send(users);
});

app.get("/api/users/:id",getparamsById, (req, res) => {
    const id = req.id;
    const user = users.find((user) => user.id === id);
    if (user) {
        return res.send(user);
    }
    return res.status(404).send({ msg: "user not found" });
});

app.post('/api/users',(req,res)=>{
    console.log(req.body);
    const {body} = req;
    const newuser = {id:users[users.length-1].id+1,...body};
    users.push(newuser);    
    return res.status(201).send(newuser);
});

app.patch("/api/users/:id",getUserIndexById,(req,res)=>{
    // console.log(req);
    // const id = parseInt(req.params.id);
    // if(isNaN(id)){
    //     res.status(404).send({msg:'bad request,invalid id'})
    // }
    // const userIndex = users.findIndex((user)=>user.id ===id);
    // if(userIndex===-1){
    //     return res.status(404).send({msg:"User not Found"});
    // }

    const userIndex = req.userIndex;
    const {body} = req;
    users[userIndex]={...users[userIndex] ,...body};

    res.sendStatus(200);
});

app.delete('/api/users/:id',getUserIndexById,(req,res)=>{
    const userIndex = req.userIndex;
    console.log(userIndex)
    users.splice(userIndex,1);
    res.sendStatus(200); 
});

app.listen('3000',()=>{
    console.log("app is running on the port 3000");
})