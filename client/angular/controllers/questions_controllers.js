app.controller('QuestionsController', function(AnswerFactory,UserFactory,QuestionFactory,$cookies, $location, $routeParams){
	console.log('Initializing QuestionController...')

	var self = this;
	self.questions = [];
	self.new_question_errors = [];
	self.newQuestion = {};
	self.newAnswer = {};
	self.new_answer_errors = [];
	self.question = []

	self.index = function(){
		QuestionFactory.index(function(res){
			console.log(res)
			self.questions = res.data
		})
	}

	self.createQuestion = function(newQuestion){
		console.log(newQuestion)
		self.newQuestion = {}
		self.new_question_errors = []

		UserFactory.session(function(user){
			newQuestion.user = user._id
			QuestionFactory.create(newQuestion, function(res){
				console.log(res)
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.new_question_errors.push(error.message)
					}
				} else {
					self.index();
					self.show();
					$location.url('dashboard')
				}
			})
		})
	}

	self.show = function(){
		QuestionFactory.show($routeParams.id, function(res){
			self.question = res.data
			console.log(res)
		})
	}

	self.createAnswer = function(newAnswer){
		// console.log(newAnswer)
		self.new_answer_errors = []
		// console.log($routeParams.id)
		newAnswer.question = $routeParams.id
		newAnswer.user = $cookies.get('user_id')

		AnswerFactory.create(newAnswer, function(res){
			self.newAnswer = {}
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key]
					self.new_answer_errors.push(error.message)
				}
			}else{
				self.index()
				self.show()
				$location.url('dashboard')
			}
		})
	}

	self.likes = function(answerId){
		console.log(answerId)
		AnswerFactory.likes(answerId, function(res){
			console.log(res)
			if(res.data.errors){
				console.log('could not add like, something went wront')
			}
			else{
				self.index()
				self.show()
			}
		})
	}

	
})


