var mongoose = require('mongoose')


var AnswerSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	question: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question'
	},
	answer: {
		type: String,
		required: [true, "Answer cannot be empty"],
		minlength: [5, 'Your answer is too short']
	},
	details: {
		type: String
	},
	likes: {
		count:{
			type: Number,
			default: 0
		},
		users: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}]
	}

}, { timestamps: true })

mongoose.model('Answer', AnswerSchema)

