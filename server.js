const http = require('http');
const app = require('./App');


const port = process.env.PORT || 9000;

const server = http.createServer(app);


//fireup server to listen on port
server.listen(port);
//print message to console
console.log('Server listening on port' + port);