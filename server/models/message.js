var mongoose = require('mongoose')


var MessageSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	content: {
		type: String,
		required: [true, 'Message cannot be blank.']
	}
}, { timestamps: true })

mongoose.model('Message', MessageSchema)