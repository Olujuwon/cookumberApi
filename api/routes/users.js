const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const verifyAuth = require('../auth/check.js');

const User = require('../models/users')

//configure storage settings for multer
const imgStorage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './userUploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

//configure filefilter settings for multer
const fileFilter = (req, file, cb) => {
	(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' )? cb(null, true) : cb(null, false)
	//rejects file - cb(null, false);  & //rejects file - cb(null, false);  
} 

const  router = express.Router();

//multer initialized ---
const upload = multer({
	storage: imgStorage, 
	limits:{
	filesize: 1024 * 1024 * 1   //1megabyte limit
},
	fileFilter: fileFilter
}); 

// GET method router configurations
router.get('/', (req, res, next) => {
	User.find()
	.select('firstName lastName userId date address userImg email password')
	.exec()
	.then(users => {
		const response = {
			count: users.length,
			users: users.map(user => {
				return{
					_id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userId:user.userId,
					date:user.date,
					address: user.address,
					userImg:user.userImg,
					email:user.email
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
router.post('/signup', upload.single('userImage'), (req, res, next) => {
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if(user.length >= 1){
			return res.status(409).json({
				message: 'Email already exists on our server'
			});
		}else{
			//encrypt password before storage to DB
			bcrypt.hash(req.body.psswrd, 10, (error, hash) => {
				if(error){
					return res.status(500).json({
						error: error
					});
				}else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						userId:req.body.userId,
						date:req.body.date,
						userStatus: req.body.userStatus,
						userName: req.body.userName,
						psswrd: hash,
						address:req.body.address,
						userImg: req.file.path,
						email: req.body.email
					}); 
					//store data in DB
					user.save()
					.then(result => {
						res.status(201).json({
							message: 'New User Successfully Added!',
							user: result
						});
					})
					.catch(error => {
						console.log(error);
					}); 
				}
			});
		}
	})
//console.log(req.file); multer passes body automatically and therefore sends file str8 to folder/storage
});

//PATCH method router configurations
router.patch('/:user_id', (req, res, next) => {
	const id = req.params.user_id;
	const updateOps = {};
	for (const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	User.update({_id: id}, {$set: updateOps})
	.exec()
	.then(result => {
		res.status(200).json({result: result})
	})
	.catch(error => {
		res.status(500).json({error: error})
	})
});

//DELETE method router configurations
router.delete('/:user_id', (req, res, next) => {
	const id = req.params.user_id;
	User.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json({result: result})
	})
	.catch(error => {
		res.status(500).json({error: error})
	})
});

//DETAIL POST method router configuration for login
router.post('/login', (req, res, next) => {
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if (user.length < 1){
			return res.status(401).json({
				message: 'User could not be authorized'
			});
		}
		bcrypt.compare(req.body.psswrd, user[0].psswrd, function (error, result) {
			if (error){
				return res.status(401).json({
					message: 'User could not be authorized'
				});
			}
			if(result){
				const token = jwt.sign({
					email: user[0].email,
					username: user[0].userName,
					id: user[0]._id
				}, process.env.JWT_KEY, 
			{
				expiresIn: '1h'
			})
				return res.status(201).json({
					message: 'User  authorization successful',
					token: token
				})
			}
			res.status(401).json({
				message: "User could not be authorized"
			})
		})
	})
	.catch(error => {
		res.status(500).json({error:error})
	})
});


//DETAIL GET method router configuration
router.get('/:user_id', (req, res, next) => {
	const id = req.params.user_id;
	User.findById(id)
	.select('firstName lastName userId date address userImg email')
	.exec()
	.then(result => {
		res.status(200).json({"menu":result})
	})
	.catch(error => {
		res.status(500).json({error:error})
	})
});


module.exports = router;