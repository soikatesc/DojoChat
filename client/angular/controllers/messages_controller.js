app.controller('MessagesController', function(SocketConnector, MessageFactory, $scope, $cookies, $location, $interval, $http){
	console.log('Initializing ChatsController...')

	var recent_msg = {}
	var self = this
	self.msgs = []

	self.events = MessageFactory.events

	self.reloadEvent = function(){
		self.events = MessageFactory.events
	}

	self.updateScroll = function(){
		var element = document.getElementById('chat-wrap')
		if(element){
			element.scrollTop = element.scrollHeight
		}
	}
	setTimeout(self.updateScroll, 200);

	self.index = function(){
		MessageFactory.index(function(res){
			recent_msg = res.data[res.data.length-1]
			console.log(res.data);
			if(recent_msg){
				if(recent_msg.user._id != $cookies.get('user_id')){
					var audio = new Audio('../../assets/sound/recv.mp3');
					audio.play();
				}
			}
			self.msgs = res.data
			$interval(function(){
				self.reloadEvent()
			}, 100);
		})
	}

	self.sendMsg = function(msg, user) {
		if (!msg) {
			return;
		}

		var audio = new Audio('../../assets/sound/track1.mp3');
		audio.play();

		msg.user = user._id
		SocketConnector.emit('send msg', msg)
		msg.content = ''
	}

	self.send_typing_status = function(name){
		var event = name + " is typing"
		SocketConnector.emit('send_typing_status', event)
	}

	SocketConnector.on('recv_status', function(content){
		if (content.event !== MessageFactory.events[MessageFactory.events.length - 1]) {
			MessageFactory.events.push(content.event)
		}
		setTimeout(function(){
			MessageFactory.events.splice(MessageFactory.events.indexOf(content.event),1)
			self.reloadEvent()
			},
			10000
		)
		if (MessageFactory.events.length > 10){
			MessageFactory.events.splice(0,1)
		}
		$scope.$digest()
	})

	SocketConnector.on('get msg', function(data){
		self.index();
		$scope.$digest()
		setTimeout(self.updateScroll, 200);
	})
})
