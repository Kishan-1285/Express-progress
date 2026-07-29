import express from "express";
import session from "express-session";
import passport from "passport";
import "./auth.js";

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret:process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Authentication with google</a>');
});

app.get('/auth/google',
    passport.authenticate('google',{scope:["profile", "email"]})
);

app.get('/auth/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/auth/failure',
    })
);

app.get('/auth/failure',(req,res)=>{
    res.send("something is went wrong..");
});

app.get("/protected",isLoggedIn,(req,res)=>{
    res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout',(req,res)=>{
    // req.logout();
    req.session.destroy();
    res.send("GoodBye...");
});

app.listen("3000", () => {
    console.log("app is running on the port 3000");
});