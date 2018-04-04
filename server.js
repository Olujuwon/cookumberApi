//Import/require dependencies
const express = require('express');
const https = require ( 'https' );
const http = require ( 'http' );
const morgan = require('morgan'); //for logging to console
const bodyParser = require('body-parser'); //for parsing data to and fro json
const mongoose = require('mongoose'); // for connecting to MongoDB
const fs = require ( 'fs' )
const Menu = require('./api/models/menus');
const app = express();

const options = {
    key: fs.readFileSync( './key.pem', 'utf8'),
    cert: fs.readFileSync( './server.crt', 'utf8' ),
    passphrase: '1234'
};

const menusRoutes = require('./api/routes/menu');
const usersRoutes = require('./api/routes/users');
const ordersRoutes = require('./api/routes/orders');

mongoose.connect('mongodb://kitan:Olujuwon86~@kitan-shard-00-00-t4x8i.mongodb.net:27017,kitan-shard-00-01-t4x8i.mongodb.net:27017,kitan-shard-00-02-t4x8i.mongodb.net:27017/test?ssl=true&replicaSet=kitan-shard-0&authSource=admin', function() { /* dummy function */ })
.then(() => {
    console.error('App started without errors');
})
.catch(err => { // mongoose connection error will be handled here
    console.error('App starting error:', err.stack);
    process.exit(1);
});

app.use(morgan('dev'));

//app.use('/useruploads', express.static('userUploads')); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('hello world!');
})

app.use('/menus', menusRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);

//create and specify port to use, wit option to use server variable
const portOne = process.env.PORT || 9000;
const portTwo = process.env.PORT || 9001;

//create and configure server with the API specified in app
http.createServer(app).listen(portOne, () => console.log(`Server Listening on Port ${portOne}`));
https.createServer(options, app).listen(portTwo, () => console.log(`Server Listening on Port ${portTwo}`));


//fireup server to listen on port & print message to console
//app.listen(port, () => console.log(`Server Listening on Port ${port}`));

//Error Handling middleware
 app.use((req, res, next) => {
     const error = new Error('Resource can not be located or has been moved');
    error.status = 404;
     next(error);
 });

 app.use((error, req, res, next) => {
     res.status(error.status || 500);
    res.json({
         error: {
            message: error.message
        }
     })
 })


