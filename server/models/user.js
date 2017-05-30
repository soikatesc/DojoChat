var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var Question = mongoose.model('Question')
var Answer = mongoose.model('Answer')

var UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, "First name field cannot be blank"],
		maxlength: [100, "First name should be less then 100"],
	},
	last_name: {
		type: String,
		required: [true, "Last name field cannot be blank"],
		maxlength: [100, "Last name should be less then 100"],
	},
	birthday: {
		type: Date,
		required: [true, "birthday field cannot be empty"]
	},
	email: {
		type: String,
		required: [true, "Email cannot be blank"],
		validate: {
			validator: function(v){
				return /\S*\@\S*\.\S+/g.test(v)
			},
			message: "You must provide a valid email"
		},
		unique: true
	},
	username: {
		type: String,
		required: [true, "User name cannot be blank"],
		maxlength: [100, "Maximum username length should be less then 100"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "password canot be blank"],
		minlength: [2, "length of password should be greaer then 2"]
	},
	questions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question'
	}],
	answers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Answer'
	}]

}, {timestamps: true})

UserSchema.methods.hashPassword = function(password){
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.authenticate = function(password){
	console.log(password)
	return bcrypt.compareSync(password, this.password)
}

UserSchema.pre('save', function(callback){
	this.hashPassword(this.password)
	callback()
})

mongoose.model('User', UserSchema)

