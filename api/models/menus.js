//import required dependencies
const mongoose = require('mongoose');

const  menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: String, default: Date.now },
    day: { type: String, default: "today" },
    type: { type: String, default: "null" },
    name: { type: String, default: "Name of Food" },
    price: { type: String, default: 0000}
});

module.exports = mongoose.model('Menu', menuSchema)