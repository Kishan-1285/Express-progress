import express from 'express';

const app = express();

const users = [
    { id:2, name:"Ashwin" },
    { id:3, name:"Kishan" },
    { id:1, name:"Rahul" }
]

// sorting the elements and display it in json format
app.get("/users", (req, res) => {
    const { sort } = req.query;
    
    if (sort === "asc") {
        users.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "desc") {
        users.sort((a, b) => b.name.localeCompare(a.name));
    }
    res.json(users);
});

app.listen(3000,()=>{
    console.log("app is running on port 3000")
})