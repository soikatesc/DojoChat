app.factory('AnswerFactory', function($http, $cookies){
	var factory = {}

	factory.create = function(newAnswer, callback){
		console.log(newAnswer)
		$http.post('/answers', newAnswer).then(callback)
	}

	factory.likes = function(answer_id, callback){
		$http.put('/answers/'+ answer_id + '/likes', { user: $cookies.get('user_id')}).then(callback)
	}

	return factory
})