var mongoose = require('mongoose')
var Message = mongoose.model('Message')
var User = mongoose.model('User')
var Messages = require('./messages')


module.exports = function(server){

	var io = require('socket.io').listen(server)

	io.sockets.on('connection', function(socket){
		console.log('working')
		console.log(socket.id)
		socket.on('send msg', function(data){
			//save into messeage database
			Messages.create(data)

			//broadcast to all users
			io.emit('get msg', {data:data, socket_id: socket.id})
		})
	})

}
