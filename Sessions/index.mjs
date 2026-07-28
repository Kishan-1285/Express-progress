import express from "express";
import session from "express-session";

const app = express();

const isAuthenticated = (req,res,next)=>{   
        if(req.session.user){
            return next();
        }
        return res.status(401).send("please login");
}

app.use(express.json());

app.use(session({
    secret: "kishan",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000*60
        }
}));

app.get('/login',(req, res) => {
    req.session.user = {
        id: 1,
        username: "kishan"
    }
    res.send("Logged In");
});

app.get("/profile", isAuthenticated, (req, res) => {
    // if (req.session.user) {
    //     console.log(req.session);
    //     return res.send(req.session.user);
    // }
     console.log(req.session);
     return res.send(req.session.user);
    // return res.send("please login");
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");  //  deletes the cookies
        res.send("logged out");
    });
});

app.listen(3000, () => {
    console.log("app is running on the port 3000")
})