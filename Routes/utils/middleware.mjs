import {users} from "./value.mjs";

//middleware
export const getUserIndexById = (req,res,next)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400).send({msg:'bad request,invalid id'})
    }
    const userIndex = users.findIndex((user)=>user.id ===id);
    if(userIndex===-1){
        return res.status(404).send({msg:"User not Found"});
    }
    req.userIndex = userIndex;
    next();
}
//middleware
export const getparamsById = (req,res,next)=>{
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ msg: "invalid id is given" });
    }
    req.id = id;
    next();
}

