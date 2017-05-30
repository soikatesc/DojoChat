var app = angular.module('app', ['ngRoute', 'ngCookies', 'ng-ip-address'])

console.log('loading config file....')

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/login_user.html',
		controller: 'UsersController as UC'
	})
	// .when('/register', {
	// 	templateUrl: 'partials/registration_user.html',
	// 	controller: 'UsersController as UC'
	// })
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'UsersController as UC'

	})
	.when('/question/:id', {
		templateUrl: 'partials/question.html',
		controller: 'UsersController as UC'

	})
	.when('/new_question', {
		templateUrl: 'partials/new_question.html',
		controller: 'UsersController as UC'
	})
	.when('/question/:id/new_answer', {
		templateUrl: 'partials/new_answer.html',
		controller: 'UsersController as UC'
	})
	.when('/chats', {
		templateUrl: 'partials/chat_page.html',
		controller: 'UsersController as UC'
	})
	.otherwise({
		redirectTo: '/'
	})
})