app.factory('QuestionFactory', function($http, $cookies){
	var factory = {}

	factory.index = function(callback){
		$http.get('/questions').then(callback)
	}

	factory.create = function(newQuestion, callback){
		console.log(newQuestion)
		$http.post('/questions', newQuestion).then(callback)
	}


	factory.show = function(id, callback){
		$http.get('/questions/' + id).then(callback)
	}

	return factory
})