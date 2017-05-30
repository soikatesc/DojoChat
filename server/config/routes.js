var Users = require('../controllers/users')

var Questions = require('../controllers/questions')
var Answers = require('../controllers/answers')


module.exports = function(app){
	//users route
	app.get('/users', Users.index)
	app.post('/users', Users.create)
	app.post('/sessions', Users.login)
	app.get('/users/:id', Users.show)
	app.delete('/users/:id', Users.destroy)
	app.put('/users/:id', Users.update)

	//question route
	app.get('/questions', Questions.index)
	app.post('/questions', Questions.create)
	app.get('/questions/:id', Questions.show)

	//answers route
	app.get('/answers', Answers.index)
	app.post('/answers', Answers.create)
	app.put('/answers/:id/likes', Answers.updateLikes)
}