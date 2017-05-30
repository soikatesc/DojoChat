var mongoose = require("mongoose");

var Question = mongoose.model("Question");
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');

module.exports = {
	index: function(req, res){
		Answer.find({}, function(err, answers){
			if(err){
				return res.json(err)
			}
			return res.json(answers)
		})
	},
	create: function(req, res){
		Answer.create(req.body, function(err, answer){
			if(err){
				return res.json(err)
			}
			Question.findByIdAndUpdate(req.body.question, { $push: { answers: answer._id }}, function(err, question){
				if(err){
					return res.json(err);
				}
				User.findByIdAndUpdate(req.body.user, { $push : { answers: answer._id }}, function(err, user){
					if(err){
						return res.json(err);
					}
					return res.json(answer);
				})
			})

		})
	},
	updateLikes: function(req, res){
		Answer.findByIdAndUpdate(req.params.id, { $inc: { "likes.count": 1 }, $push: { "likes.users": req.body.user }}, { new: true }, function(err, answer){
			if(err){
				return res.json(err);
			}
			return res.json(answer);
		})

	}
}