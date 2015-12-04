var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./database');
var http = require('http');
var pg = require('pg');
var secret;
var instagramkey;

if (!process.env.SECRET) {
	instagramKey = require('./instagramKey');
	secret = require('./secret');
} else {
	secret = process.env.SECRET;
	instagramKey = process.env.INSTAGRAM;
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: secret, resave: true, saveUninitialized: true}));
app.use(express.static('app'));

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
	res.send("App is up");
});

// Checks if user is still logged in
app.get('/auth', function(req, res){
	if (req.session.username) {
		var user = {
			username: req.session.username,
			instagramkey: instagramKey
		}
		res.send(user);
	} else {
		res.send(false);
	}
});

// User sign up
app.post('/signup', function(req, res){
	db.User.create({
		username: req.body.username,
		password: req.body.password
	});

	res.send("complete");
})

// Checks if user exist 
app.post('/userinfo', function(req, res){
	return db.User.findOne({
		where: {
			username: req.body.username,
			password: req.body.password
		}
	}).then(function(user){
		req.session.username = req.body.username;
		res.send(user);
	});

});

// Adds instagram photo info into DB
app.post('/addcollection', function(req, res){
	db.pixInfo.create({
		imgurl: req.body.imgurl,
		username: req.body.username,
		link: req.body.link,
		uploader: req.body.uploader
	}).then(function(results){
		res.send(results);
	});
});

// Fetching user's collection
app.get('/collection', function(req, res){
	db.pixInfo.findAll({
		where: {
			username: req.session.username
		}
	}).then(function(result) {
		res.send(result);
	})
})


if (process.env.NODE_ENV === "Production") {
  var server = app.listen(port, function() {
    db.sequelize.sync();
    console.log("Listening on " + port);
  });
} else {
  var server = db.sequelize.sync().then(function() {
    http.createServer(app).listen(port, function(){
      console.log('Express server listening on port ' + port);
    });
  });
}

// app.listen(port);
// console.log("Using:", port);



