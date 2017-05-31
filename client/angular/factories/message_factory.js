
app.factory('ChatFactory', function($location){

	var socket = io.connect('http://'+$location.$$host+':'+$location.$$port)

	return socket
})

