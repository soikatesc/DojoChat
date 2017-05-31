app.controller('ChatsController', function(ChatFactory, $scope, $cookies, $location){
	console.log('Initializing ChatController...')

	var self = this
	self.msgs = []


	self.sendMsg = function(msg, user){
		// console.log($location)
		var audio = new Audio('../../assets/sound/track1.mp3');
		audio.play();
		msg.user = user.username
		msg.user_id = $cookies.get('user_id')
		ChatFactory.emit('send msg', msg)
		msg.text = ''
		console.log(msg);
	}

	ChatFactory.on('get msg', function(data){
		if(data.data.user_id != $cookies.get('user_id')){
			var audio = new Audio('../../assets/sound/recv.mp3');
			audio.play();
		}
		self.msgs.push(data)
		$scope.$digest()
	})
	
})
