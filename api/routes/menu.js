//schema auto icrement for orders, more on dates and password
//create descriptive apis 

const express = require('express');
const mongoose = require('mongoose');

const Menu = require('../models/menus');

const  router = express.Router();

// GET method router configurations
router.get('/', (req, res, next) => {
	Menu.find()
	.select('date day type name price')
	.exec()
	.then(menus => {
		const response = {
			count: menus.length,
			menu: menus.map(menu => {
				return{
					_id:menu._id,
					date:menu.date,
					day:menu.day,
					type:menu.type,
					name:menu.name,
					price:menu.price
				}
			}),
			Methods: 'GET, DELETE, POST, PATCH'
		}
		res.status(200).json({menus:response})
	})
	.catch(error => {
		res.status(500).json({error:error})
	})
});

//POST method router configurations
router.post('/', (req, res, next) => {
//this constructs a new menu instance to save to the DB
	const menu = new Menu({
		_id: new mongoose.Types.ObjectId(),
		date: req.body.date,
		day:req.body.day,
		type: req.body.type,
		name: req.body.name,
		price: req.body.price
	});  
//store data in DB
	menu.save()
	.then(result => {
		res.status(201).json({
			message: 'Handling POST requests is my job!',
			menu: result
		});
	})
	.catch(error => {
		console.log(error);
	}); 
});

//PATCH method router configurations
router.patch('/:menuId', (req, res, next) => {
	const id = req.params.menuId;
	const updateOps = {};
	for (const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Menu.update({_id: id}, {$set: updateOps})
	.select('date day type name price')
	.exec()
	.then(result => {
		res.status(200).json({result: result})
	})
	.catch(error => {
		res.status(500).json({error: error})
	})
});

//DELETE method router configurations
router.delete('/:menuId', (req, res, next) => {
	const id = req.params.menuId;
	Menu.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json({result: result})
	})
	.catch(error => {
		res.status(500).json({error: error})
	})
});

//DETAIL GET method router configuration
router.get('/:menuId', (req, res, next) => {
	const id = req.params.menuId;
	Menu.findById(id)
	.select('date day type name price')
	.exec()
	.then(result => {
		res.status(200).json({"menu":result})
	})
	.catch(error => {
		res.status(500).json({error:error})
	})
});

module.exports = router;