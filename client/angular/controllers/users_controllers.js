app.controller('UsersController', function(UserFactory,$cookies, $location){
	console.log('Initializing UserController...')

	var self = this
	self.current_user = {}  //user object saved
	self.registration_errors = []
	self.login_errors = []

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
				$cookies.put('user_id', res.data._id)
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
				var user_id = res.data._id
				$cookies.put('user_id', user_id)
				$location.url('dashboard')
				//redirect to next page
			}
		})		
	}

})