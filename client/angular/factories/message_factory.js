app.factory('MessageFactory', function($http, $window){
	var factory = {}

	factory.events = []
	
	factory.index = function(callback){
		var token = $window.localStorage.getItem('token')
		console.log(token)
		$http.post('/messages', { "token" : token }).then(callback)
	}

	return factory
})
