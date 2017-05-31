var Users = require('../controllers/users')

var Messages = require('../controllers/messages')
var multer = require('multer')


module.exports = function(app){
	//users route
	app.get('/users', Users.index)
	app.post('/users', Users.create)
	app.post('/sessions', Users.login)
	app.get('/users/:id', Users.show)
	app.delete('/users/:id', Users.destroy)
	app.put('/users/:id', Users.update)

	//messages route
	app.get('/messages', Messages.index)
	app.post('/messages', Messages.create)
	app.delete('/messages/:id', Messages.destroy)

	var storage = multer.diskStorage({
		  destination: function (req, file, cb) {
		    cb(null, 'uploads/')
		  },
		  filename: function (req, file, cb) {
		    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
		  }
		})

	var upload = multer({ storage: storage }).single('image')


	app.post('/upload', function (req, res) {
		console.log('hitting upload route')
  		upload(req, res, function (err) {
	    if (err) {
	      // An error occurred when uploading 
	      return res.json(err)
	    }
	    else{
	    	return res.json('successfully uploaded file')
	    }
	 
	    // Everything went fine 
	  })
	})


}