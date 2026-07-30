import express from 'express';
import bodyParser from 'body-parser';
import users from "./user.json" with { type: "json" };
import cars from "./cars.json" with { type: "json" };
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

function checktoken(req,res,next){ 
  //  const token = req.header["Authorization"];
        const token = req.headers.authorization
    console.log(token);
    if(token){
        jwt.verify(token,"secret",(err,decoded)=>{
            if(err){
                res.status(401).send({message: "Access denied"});
                return;
            }else{
                console.log(decoded);
                req.userID = decoded.userID;
                next();
            }
        });
    }else{
        res.status(401).send({message:"Access Denied"});
    }
}

// function checktoken(req, res, next) {
//     const authHeader = req.headers.authorization;

//     console.log("Authorization Header:", authHeader);

//     if (!authHeader) {
//         return res.status(401).send({ message: "Access Denied" });
//     }

//     const token = authHeader.startsWith("Bearer ")
//         ? authHeader.split(" ")[1]
//         : authHeader;

//     jwt.verify(token, "secret", (err, decoded) => {
//         if (err) {
//             return res.status(401).send({ message: "Invalid Token" });
//         }

//         req.userID = decoded.userID;
//         next();
//     });
// }

app.post("/login",(req,res)=>{
    const user = users.find((user)=> user.username === req.body.username);
    if(user){
        if(user.password===req.body.password){
            const token = jwt.sign({userID:user.id},"secret");
            res.status(200).send({token:token});
        }else{
            res.status(401).send({message:"Access Denied"});
        }
    }else{
        res.status(401).send({message:"Access Denied"});
    }
});

app.get("/data",checktoken,(req,res)=>{
    console.log(req.userID);
    const filtered = cars.filter((car) => Number(car.userID) === Number(req.userID));
    res.status(200).send({data:filtered});
});

app.get("/summa",(req,res)=>{
    res.send(users);
})

app.listen(3000,()=>{
    console.log("app is running on the port 3000");
});