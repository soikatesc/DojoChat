var mongoose = require('mongoose')
var User = mongoose.model('User')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var secret = 'secret'


module.exports = {
	index: function(req, res){
		console.log('index route for user')
		User.find({}, function(err, users){
			if(err){
				return res.json(err)
			}
			return res.json(users)
		})
	},
	create: function(req, res){
		console.log('hitting user_create route')
		// if(req.body.password != req.body.password_confirmation){
		// 	return res.json({
		// 		"errors":{
		// 			"password": {
		// 				"message": "Your passwords do not match"
		// 			}
		// 		}
		// 	})
		// }
		User.create(req.body, function(err, user){
			if(err){
				return res.json(err)
			}else{
				var token = jwt.sign({
					'username': user.username, 
					'email': user.email
				}, secret, { expiresIn: '24h' })

				return res.json({
					'user': user,
					'token': token
				})
			}
		})
	},
	login: function(req, res){
		//lookup the email
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				return res.json(err)
			}
			//check for null, and authenticate the password
			if(user && user.authenticate(req.body.password)){
				//using web token data, secret, and expiration time
				var token = jwt.sign({
					'username': user.username, 
					'email': user.email
				}, secret, { expiresIn: '24h' })
				
				return res.json({
					'user': user,
					'token': token
				})
			}

			return res.json({
				"errors": {
					"password": {
						"message": "Invalid credentials."
					}
				}
			})
		})
	},
	show: function(req, res){
		console.log(req.body)
		console.log('show route')
		User.findById(req.params.id).exec(function(err, user){
			if(err){
				res.json(err)
			}
			if(!user){
				return res.json({
					"errors": "404 - user not found"
				})
			}
			return res.json(user)
		})
	},
	destroy: function(req, res){
		User.findById(req.params.id, function(err, user){
			if(err){
				return res.json(err);
			}
			user.remove(function(err, user){
				if(err){
					return res.json(err);
				}
				if(!user){
					return res.json({
						"errors": "404 - User not found"
					})
				}
				return res.json(user);
			})
		})
	},
	update: function(req, res){
		console.log('hitting update route')
		User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, function(err, user){
			if(err){
				return res.json(err)
			}
			if(!user){
				return res.json({
					"errors": "404 - user not found"
				})
			}
			return res.json(user)
		})
	}

}


