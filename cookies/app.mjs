import cookieParser, { signedCookie } from "cookie-parser";
import express from "express";

const users=[
    {id:1,username:"kishan"},
    {id:2,username:"Ashwin"},
    {id:3,username:"sridhar"},
    {id:4,username:"Harry"}
];

const app = express();
// app.use(express.json);
app.use(cookieParser("kishan"));

app.get("/profile",(req,res)=>{

    res.cookie("username", "kishan",{maxAge:60000, signed:true});
    // return res.send(req.cookies);
     console.log(req.headers.cookie);
     console.log(req.signedCookies);
     if(req.signedCookies.username&&req.signedCookies.username=="kishan"){
            return res.send(users);
     }else{
        return res.send({msg:"you are not the admin/ you don't have the cookies"});
     }
   
});

app.get('/users',(req,res)=>{
    res.cookie("username","Ashwin",{maxAge:70000});
    console.log(req.cookies);
    res.send(req.cookies);
    
})

app.listen("3000",()=>{
    console.log("app is running on the port 3000");
});