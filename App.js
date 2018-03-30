const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//implements all other routes
const menusRoutes = require('./api/routes/menu');
const usersRoutes = require('./api/routes/users');
const ordersRoutes = require('./api/routes/orders');

//connect to mongoDB using mongoose
mongoose.connect('mongodb+srv://kitan:' + process.env.MONGO_ATLAS_PW+ '@kitan-t4x8i.mongodb.net/test', 
{useMongoClient: true}) 

//connecting logging functionality via morgan
app.use(morgan('dev'));

//body parsing functionality
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS handling
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    '*'); //Origin, X-Requested-With, Content-Type, Accept, Authorization
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        return res.status(200).json({});
    }
})*/

//connecting app to routes
app.use('/menus', menusRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);

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

module.exports = app;
