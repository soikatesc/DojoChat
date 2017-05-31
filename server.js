var express = require('express')
var bp = require('body-parser')
var passport = require('passport')
var port  = process.env.PORT || 8000
var ip = require('ip')
var getUserMedia = require('getusermedia');


var app = express()
var path = require('path')
//getting the ip address of current server
var ip_address = ip.address()

app.use('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, sid")
  next();
});

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

require('./server/controllers/socket_controller')(server)
