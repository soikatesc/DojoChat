app.controller('MessagesController', function(SocketConnector, MessageFactory, $scope, $cookies, $location, $http, upload){
	console.log('Initializing ChatController...')

	var self = this
	self.msgs = []

	self.updateScroll = function(){
		var element = document.getElementById('chat-wrap')
		if(element){
			element.scrollTop = element.scrollHeight
		}
	}
	setTimeout(self.updateScroll, 200);

	self.index = function(){
		MessageFactory.index(function(res){
			var recent_msg = res.data[res.data.length-1]
			if(recent_msg.user._id != $cookies.get('user_id')){
				var audio = new Audio('../../assets/sound/recv.mp3');
				audio.play();
			}
			self.msgs = res.data;
		})
	}

	self.sendMsg = function(msg, user) {
		// if message is blank, prevent user from generate any message or sound
		if (!msg) {
			return;
		}

		var audio = new Audio('../../assets/sound/track1.mp3');
		audio.play();

		msg.user = user._id
		SocketConnector.emit('send msg', msg)
		msg.content = ''
	}

	SocketConnector.on('get msg', function(data){
		self.index()
		$scope.$digest()
		setTimeout(self.updateScroll, 200);
	})


})
