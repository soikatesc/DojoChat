var mongoose = require('mongoose')
var Answer = mongoose.model('Answer')

var QuestionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	question: {
		type: String,
		required: [true, 'cannot be blank'],
		minlength: [10, 'Your question should have minimum 10 characters']
		
	},
	description: {
		type: String
	},
	answers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Answer'
	}],

}, {timestamps: true})

QuestionSchema.pre('remove', function(callback){
	Answer.remove({ question: this._id }, callback)
})

mongoose.model('Question', QuestionSchema)