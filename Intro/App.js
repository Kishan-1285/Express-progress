const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello i am from here</h1>');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});