var Users = require('../controllers/users')

var Messages = require('../controllers/messages')
var multer = require('multer')
var jwt = require('jsonwebtoken');
var secret = 'secret'


module.exports = function(app){
	//users route
	app.get('/users', Users.index)
	app.post('/users', Users.create)
	app.post('/sessions', Users.login)
	app.post('/users/:id', auth, Users.show)
	app.delete('/users/:id', auth, Users.destroy)
	app.put('/users/:id', auth, Users.update)

	//messages route
	app.post('/messages', auth, Messages.index)
	app.post('/messages', Messages.create)
	app.delete('/messages/:id', auth, Messages.destroy)

	//authentication using web token
	function auth(req, res, next){
		console.log("in the app.use!");
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			//verify token
			jwt.verify(token, secret, function(err, decoded){
				if(err){
					res.json({ success: false, message: 'Token invalid'})
				}else{
					req.decoded = decoded;
					next();
				}
			})
		}else{
			res.json({ success: false, message: 'No token provided'})
		}
	}



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