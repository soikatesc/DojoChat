var mongoose = require('mongoose')
var Message = mongoose.model('Message')
var User = mongoose.model('User')

module.exports = {
	index: function(req, res){
		console.log(req.body)
		Message.find({}).populate('user').exec(function(err, messages){
			if(err){
				return res.json(err);
			}
			return res.json(messages);
		})
	},
	create: function(req, res){
		console.log('create', req)
		Message.create(req, function(err, message){
			if(err){
				return err;
			}
			User.findByIdAndUpdate(req.user, { $push : { messages: message._id }}, function(err, user){
				if(err){
					return err;
				}
				return message;
			})
		})
	},
	destroy: function(req, res){
		Message.findById(req.params.id, function(err, message){
			if(err){
				return res.json(err);
			}
			message.remove(function(err, message){
				if(err){
					return res.json(err);
				}
				return res.json(message);
			})
		})
	}

}
