const express = require('express');
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Menu = require('../models/menus');
const User = require('../models/users');

const  router = express.Router();

// GET method router configurations
router.get('/', (req, res, next) => {
	Order.find()
	.exec()
	.then(orders => {
		const response = {
			count: orders.length,
			orders: orders.map(order => {
				return{
					_id: order._id,
                    date: order.date,
                    orderCount: order.orderCount,
                    userName: order.userName,
                    orderOne: order.orderOne,
					orderQuantity: order.orderQuantity,
					orderStatus: order.orderStatus
				}
			}),
			Methods: 'GET, DELETE, POST, PATCH'
		}
		res.status(200).json({orders:response})
	})
	.catch(error => {
		res.status(500).json({error:error})
	})
});

//POST method router configurations
router.post('/', (req, res, next) => {
//we check to see if passed menu exists else it does not save 
Menu.findById(req.body.menu_id)
.then(menu => {
	if(!menu){
		res.status(404).json({
			message: "An Error has Occured: Menu does not exist"
		})
	}else{
		//this constructs a new menu instance to save to the DB
	const order = new Order({
		_id: new mongoose.Types.ObjectId(),
		date: req.body.date,
        orderCount: req.body.orderCount,
        userName: req.body.user_id,
        orderOne: req.body.menu_id,
	   orderQuantity: req.body.orderQuantity,
	   orderStatus:req.body.orderStatus
	});  
//store data in DB
	return order.save()
}})
.then(result => {
	res.status(201).json({
		message: 'Order Created!',
		order: result
	});
})
.catch(error => {
	error: error
});
});

//PATCH method router configurations
router.patch('/:order_id', (req, res, next) => {
	const id = req.params.order_id;
	const updateOps = {};
	for (const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Order.update({_id: id}, {$set: updateOps})
	.exec()
	.then(result => {
		res.status(200).json({result: result})
	})
	.catch(error => {
		res.status(500).json({error: error})
	})
});

//DELETE method router configurations
router.delete('/:order_id', (req, res, next) => {
	const id = req.params.order_id;
	Order.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json({result: result})
	})
	.catch(error => {
		res.status(500).json({error: error})
	})
});

//DETAIL GET method router configuration
router.get('/:order_id', (req, res, next) => {
	const id = req.params.order_id;
	Order.findById(id)
	.populate({ path: 'orderOne', select: 'name price' })
	.populate({ path: 'userName', select: 'userName firstName address' })
	.exec()
	.then(order => {
		const response = {
			count: 1,
			order: {
					_id: order._id,
                    date: order.date,
                    orderCount: order.orderCount,
                    userName: order.userName,
                    orderOne: order.orderOne,
					orderQuantity: order.orderQuantity,
					orderStatus: order.orderStatus
			},
			Methods: 'GET, DELETE, POST, PATCH'
		}
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json({error:error})
	})
});
module.exports = router;

