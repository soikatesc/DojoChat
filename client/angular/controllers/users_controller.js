app.controller('UsersController', function(UserFactory, MessageFactory, SocketConnector, $scope, $cookies, $location, $window){
	console.log('Initializing UsersController...')

	var self = this
	self.current_user = {}  //user object saved
	self.registration_errors = []
	self.login_errors = []
	self.message = ''

	self.session = function(){
		UserFactory.session(function(user){
			console.log('user: ', user)
			if(user){
				self.current_user = user
			}else{
				$location.url('/')
			}
		})
	}

	self.logout = function(){
		$cookies.remove('user_id')
		SocketConnector.emit('send_user_status', self.current_user.username + " just left.")
		$window.localStorage.removeItem('token')
		if(!$window.localStorage.getItem('token')){
			console.log('token removed')
		}
		$location.url('/')
	}

	self.login = function(loginUser){
		console.log(loginUser)
		self.login_errors = []
		UserFactory.login(loginUser, function(res){
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key]
					self.login_errors.push(error.message)
				}
			}else{
				self.message = "Welcome to the DojoChat box " + res.data.user.username + "!!!"
				$cookies.put('user_id', res.data.user._id)
				$window.localStorage.setItem('token', res.data.token)
				SocketConnector.emit('send_user_status', res.data.username + " just joined.")
				$location.url('dashboard')
			}
		})
	}

	self.create = function(newUser){
		self.registration_errors = []
		console.log('newUser:', newUser)

		// if(newUser.password != newUser.confirmPassword){
		// 	self.registration_errors.push("password didn't match")
		// }

		UserFactory.create(newUser, function(res){
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key]
					self.registration_errors.push(error.message)
				}
			}

			else{
				//save the user into session
				var user_id = (res.data.user._id)
				$cookies.put('user_id', user_id)
				$window.localStorage.setItem('token', res.data.token)
				SocketConnector.emit('send_user_status', res.data.user.username + " just joined.")
				$location.url('dashboard')
				//redirect to next page
			}
		})
	}

})
