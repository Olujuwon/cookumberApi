//Import/require dependencies
//const http = require('http');
const app = require('./App');

//create and specify port to use, wit option to use server variable
const port = process.env.PORT || 9000;

//create and configure server with the API specified in app
//const server = http.createServer(app);


//fireup server to listen on port & print message to console
app.listen(port, () => console.log(`Server Listening on Port ${port}`));



