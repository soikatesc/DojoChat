var mongoose = require('mongoose')
var fs = require('fs')
var colors = require('colors');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/dojo_chat')
.then(
    function(){
      console.log('Connected to database' .bgGreen)
    },
    function(){
      console.log('failed to connect to database' .red)
    }
)


var models_path = __dirname + '/../models'

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') != -1){
		console.log('loading' + file + '...')
		require(models_path+'/'+file)
	}
})
