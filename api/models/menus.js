const mongoose = require('mongoose');

const  menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: String,
    day: String,
    type: String,
    name: String,
    price: Number
});

module.exports = mongoose.model('Menu', menuSchema)