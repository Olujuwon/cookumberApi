const express = require('express');
const  router = express.Router();
Mongoose = require('mongoose');

const Menu = require('../models/menus')

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling GET requests is my job!'
	});
});

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
	Menu.save()
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log(error);
	}); 
	res.status(201).json({
		message: 'Handling POST requests is my job!'
	});
});

router.patch('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling PATCH requests is my job!'
	});
});

router.delete('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling DELETE requests is my job!'
	});
});

router.get('/:menuId', (req, res, next) => {
	const id = req.params.menuId;
	if(id === 'special'){
		res.status(200).json({
			message: 'you have discovered the special menu!',
			id: id
		});
	} else {
		res.status(200).json({
			message: 'You passed and ID!'
		});
	}
});

module.exports = router;