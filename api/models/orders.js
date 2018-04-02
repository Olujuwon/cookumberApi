//import required dependencies
const mongoose = require('mongoose');

const  orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: Date},
    orderCount: { type: Number},
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}, //relation to users schema
    orderOne: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required:true },//relational
    orderQuantity: { type: Number, default:1},
    orderStatus:{type:Number, default:1}
});

module.exports = mongoose.model('Order', orderSchema)