var express = require('express')
var bp = require('body-parser')
var passport = require('passport')
var port  = process.env.PORT || 8000
var ip = require('ip')

var app = express()
var path = require('path')
//getting the ip address of current server
var ip_address = ip.address()


app.use(express.static(__dirname + '/client'))
app.use(express.static(__dirname + '/bower_components'))
app.use(bp.json())

//connecting to mongoose
require('./server/config/mongoose')

//setup routes
require('./server/config/routes')(app)

var server = app.listen(port, ip_address , function(){
	console.log('/'.repeat(40))
	console.log('listening to port %s:%s ....', ip_address, port)
	console.log('/'.repeat(40))
})

var io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket){
	console.log('working')
	console.log(socket.id)
	socket.on('send msg', function(data){
		console.log(data)
		io.emit('get msg', {data:data, socket_id: socket.id})
	})
})
