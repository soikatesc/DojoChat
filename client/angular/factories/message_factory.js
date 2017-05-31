app.factory('MessageFactory', function($http){
	var factory = {}

	factory.index = function(callback){
		$http.get('/messages').then(callback)
	}

	return factory
})