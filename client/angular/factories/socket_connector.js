app.factory('SocketConnector', function($location){

	var socket = io.connect('http://'+$location.$$host+':'+$location.$$port)

	return socket
})

