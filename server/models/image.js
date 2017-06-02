var mongoose = require('mongoose')

var ImageSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	
}, { timestamps: true })

mongoose.model('Image', ImageSchema)
