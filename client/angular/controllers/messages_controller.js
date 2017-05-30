app.controller('ChatsController', function(ChatFactory, $scope, $cookies, $location){
	console.log('Initializing ChatController...')

	var self = this
	self.msgs = []


	self.sendMsg = function(msg, user){
		console.log($location)
		var audio = new Audio('../../assets/sound/track1.mp3');
		audio.play();
		msg.user = user.username
		ChatFactory.emit('send msg', msg)
		msg.text = ''
		console.log(msg);
	}

	ChatFactory.on('get msg', function(data){
		self.msgs.push(data)
		$scope.$digest()
	})
	
})
