//import required dependencies for the API
const express = require('express');
const morgan = require('morgan'); //for logging to console
const bodyParser = require('body-parser'); //for parsing data to and fro json
const mongoose = require('mongoose'); // for connecting to MongoDB
const Menu = require('./api/models/menus');
//Configure app with express web framework
const app = express();

//implements all other routes
const menusRoutes = require('./api/routes/menu');
const usersRoutes = require('./api/routes/users');
const ordersRoutes = require('./api/routes/orders');

//connect to mongoDB using mongoose
mongoose.connect('mongodb://kitan:'+ process.env.MONGO_ATLAS_PW+'@kitan-shard-00-00-t4x8i.mongodb.net:27017,kitan-shard-00-01-t4x8i.mongodb.net:27017,kitan-shard-00-02-t4x8i.mongodb.net:27017/test?ssl=true&replicaSet=kitan-shard-0&authSource=admin');

//mongoose.Promise = global.Promise; //solves mongoose promise deprecated issues

//connecting logging functionality via morgan
app.use(morgan('dev'));

//converts the file folder to publicly available resources
app.use('/useruploads', express.static('userUploads')); 

//body parsing functionality
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS handling ---not working yet
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    '*'); //Origin, X-Requested-With, Content-Type, Accept, Authorization
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        return res.status(200).json({});
    }
})*/
app.get('/', (req, res) => {
   res.send('hello world!');
})

//connecting app to routes
app.use('/menus', menusRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);

//Error Handling middleware
// app.use((req, res, next) => {
//     const error = new Error('Resource can not be located or has been moved');
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// })

module.exports = app;
