app.factory('MessageFactory', function($http){
	var factory = {}

	factory.events = []
	
	factory.index = function(callback){
		$http.get('/messages').then(callback)
	}

	return factory
})
