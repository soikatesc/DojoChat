app.factory('UserFactory', function($http, $cookies, $window){
	var factory = {}

	factory.create = function(newUser, callback){
		$http.post('/users', newUser).then(callback)
	}

	factory.session = function(callback){
		var user_id = $cookies.get('user_id')
		var token = $window.localStorage.getItem('token')
		console.log(token)
		if(!user_id){
			return callback(false)
		}
		$http.post('/users/' + user_id, { "token" : token }).then(function(res){
			if(res.data.errors){
				return callback(false)
			}
			return callback(res.data)
		})
	}

	factory.login = function(loginUser, callback){
		$http.post('/sessions', loginUser).then(callback)
	}

	factory.show = function(id, callback){
		// console.log(id)
		$http.get('/users/' + id).then(callback)
	}
	return factory


})