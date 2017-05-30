var mongoose = require("mongoose");

var Question = mongoose.model('Question')
var User = mongoose.model('User')


module.exports = {
	index: function(req, res){
		Question.find({}).populate({
			path: 'user',
			model: 'User'
		}).populate({
			path: 'answers',
			model: 'Answer',
			options: { sort: { createdAt: 1 }},
			populate: {
				path: 'user',
				model: 'User'
			}
		}).sort('-createdAt').exec(function(err, questions){
			if(err){
				return res.json(err);
			}
			return res.json(questions);
		})
	},
	create: function(req, res){
		Question.create(req.body, function(err, question){
			if(err){
				return res.json(err)
			}
			User.findByIdAndUpdate(req.body.user, { $push : { questions: question._id }}, function(err, user){
				if(err){
					return res.json(err);
				}
				return res.json(question);
			})
		})
	},
	// show: function(req, res){
	// 	Question.findById(req.params.id, function(err, question){
	// 		if(err){
	// 			return res.json(err);
	// 		}
	// 		return res.json(question);
	// 	})
	// },
	show: function(req, res){
		Question.findById(req.params.id).populate({
			path: 'user',
			model: 'User'
		}).populate({
			path: 'answers',
			model: 'Answer',
			// options: { sort: { 'likes.count': -1 }},
			populate: {
				path: 'user',
				model: 'User'
			}
		}).exec(function(err, question){
			if(err){
				return res.json(err);
			}
			return res.json(question);
		})
	}
}



