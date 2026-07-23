import {Router} from "express";
import {users} from '../utils/value.mjs';

const router = Router();

router.get('/users',(req,res)=>{
    res.send({users});
});

router.post('/users',(req,res)=>{
    const { body } = req;
    const newuser = {id:users[users.length-1].id+1,...body};
    users.push(newuser);    
    return res.status(201).send(newuser);
});

export default router;