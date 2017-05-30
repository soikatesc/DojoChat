var Users = require('../controllers/users')

var Messages = require('../controllers/messages')



module.exports = function(app){
	//users route
	app.get('/users', Users.index)
	app.post('/users', Users.create)
	app.post('/sessions', Users.login)
	app.get('/users/:id', Users.show)
	app.delete('/users/:id', Users.destroy)
	app.put('/users/:id', Users.update)

	//messages route
	app.get('/messages', Messages.index)
	app.post('/messages', Messages.create)
	app.delete('/messages/:id', Messages.destroy)


}