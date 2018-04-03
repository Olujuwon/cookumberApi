//Import/require dependencies
//const http = require('http');
//const app = require('./App');
const express = require('express');

const app = express();
//create and specify port to use, wit option to use server variable
const port = process.env.PORT || 9000;

//create and configure server with the API specified in app
//const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('hello world!');
})
//fireup server to listen on port
app.listen(port);

//print message to console
console.log(`Server Listening on Port ${port}`);
