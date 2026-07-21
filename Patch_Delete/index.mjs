import express from "express";

const app = express();

const users = [
    { id: 1, user_name: "kishan" },
    { id: 2, user_name: "Ashwin" },
    { id: 3, user_name: "Gokul" },
    { id: 4, user_name: "Guru" },
    { id: 5, user_name: "Sridar" },
]

app.use(express.json());

app.get("/api/users",(req,res)=>{
    res.status(200).send(users);
})

app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ msg: "invalid id is given" });
    }
    const user = users.find((user) => user.id === id);
    if (user) {
        return res.send(user);
    }
    return res.status(404).send({ msg: "user not found" });
})

app.patch("/api/users/:id",(req,res)=>{
    // console.log(req);
     const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(404).send({msg:'bad request,invalid id'})
    }
    const userIndex = users.findIndex((user)=>user.id ===id);
    if(userIndex===-1){
        return res.status(404).send({msg:"User not Found"});
    }
    const {body} = req;
    users[userIndex]={...users[userIndex] ,...body};

    res.sendStatus(200);
});

app.delete('/api/users/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(404).send({msg:"User not found"});
    }
    const userIndex = users.findIndex((user)=>user.id===id);
    if(userIndex===-1){
        return res.status(404).send({msg:"User not exist"});
    }
    users.splice(userIndex,1);
    res.sendStatus(200); 
});

app.listen("3000", () => {
    console.log("app is running on the port 3000");
});