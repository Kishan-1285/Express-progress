import express from 'express';

const app = express();

app.get('/users', (req, res) => {

    const age = req.query.age;

    res.send(`Age is ${age}`);

});
app.listen(3000,()=>{
    console.log("Running on the port 3000");
})