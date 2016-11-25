// Loading of dependencies

var express = require('express');
var app = express();
var session = require('express-session');
var uuid = require('node-uuid');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');


// Database-related

mongoose.connect('localhost:27017/university');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
	sid: {type: String, 
         validate: [/^1[0-9]{8}$/, 'must be 9 digits'],
         unique: true,
         index: true},
	firstName: String,
	lastName: {type: String,
              index: true},
	gpa: {type: Number,
         min: 0.0,
         max: 4.3},
	startDate: Date,
	fullTime: Boolean
}, {collection: 'students'});
var Student = mongoose.model('student', studentSchema);

var userSchema = new Schema({
	username: {type: String, 
              unique: true,
              index: true},
	email: String,
	hashedPassword: String
}, {collection: 'users'});
var User = mongoose.model('user', userSchema);


// utility functions

function getUsername(request) {
	var username = '';
	var session = request.session;
	if (session.username) {
		username = session.username;
	}
	return username;
}

function reloadStudentList(request, response, errorMessage) {
	console.log('reloadStudenList::errorMessage:', errorMessage);
	Student.find().then(function(results) {
		console.log('reloadStudentList::results.length:', results.length);
		response.render('students', {students: results, 
		                             username: getUsername(request),
		                             errorMessage: errorMessage});
	});
}

// Configuration

// parsing POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server port
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static('public'));

// templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// sessions
app.use(session({
	genid: function(request) {
		return uuid.v4();
	},
	resave: false,             // save only when changed
	saveUninitialized: false,  // save even when no data
	// this is used when signing the session cookie
	//cookie: { secure: true; }, // encrypted cookies only
	secret: 'apollo slackware prepositional expectations'
}));


// Routes

app.get('/', function(request, response) {
	response.render('index', {
		title: 'Index', 
	   description: 'This is the main page', 
	   username: getUsername(request)});
});

app.get('/profile', function(request, response) {
	response.render('profile', {username: getUsername(request)});
});

// student list
app.get('/students', function(request, response) {
	reloadStudentList(request, response);
});

app.post('/addOrUpdateStudent', function(request, response) {
	var sid = request.body.sid;
	var firstName = request.body.firstName;
	var lastName = request.body.lastName;
	var gpa = parseFloat(request.body.gpa);
	
	var studentData = {sid: sid, 
				       firstName: firstName, 
				       lastName: lastName, 
				       gpa: gpa};

	Student.find({sid: sid}).then(function(results) {
		if (results.length > 0) {
			// found the student, we want to update
			Student.update({sid: sid}, studentData, {multi: false}, function (error, numAffected) {
				if ((error) || (numAffected.nModified != 1)) {
					// the student was not updated
					console.log('error while updating student:', error);
					reloadStudentList(request, response, 'Unable to update student');
				} else {
					// the student was updated
					reloadStudentList(request, response, 'Student updated');
				}
			});
		} else {
			// student not in the database, we want to insert
			var newStudent = new Student(studentData);
			newStudent.save(function(error) {
				if (error) {
					// insert failed
					console.log('error while adding student:', error);
					reloadStudentList(request, response, 'Unable to add student');
				} else {
					// insert successful
					reloadStudentList(request, response, 'Student added');
				}
			});        
		}
	});
});

app.post('/deleteStudent', function(request, response) {
	var sid = request.body.sid;
	Student.remove({sid: sid}, function (error) {
		if (error) {
			// delete failed
			console.log('error while deleting student:', error);
			reloadStudentList(request, response, 'Unable to delete student');
		} else {
			// delete successful
			reloadStudentList(request, response, 'Student deleted');
		}
	});
});


// a registration form
var usernames = [];
app.get('/register', function(request, response) {
	response.render('register');
});

app.post('/processRegistration', function(request, response) {
	var username = request.body.username;
	var email = request.body.email;
	var password = request.body.password;

	// store the username in the session (i.e. log the user in)
	var session = request.session;
	session.username = username;
    session.save();

	// hash the password
	var hash = bcrypt.hashSync(password);
			
	// store the user data to the database
	var newUser = new User({username: username,
	                        email: email,
	                        hashedPassword: hash});
	newUser.save(function(error) {
		if (error) {
			// register failed:  show the registration page again, passing an error string
			response.render('register', {errorMessage: 'Unable to register user.  Have you already registered?'});
		} else {
			// register succeeded:  show the confirmation page
			response.render('registerSuccess', {username: username});
		}
	});        
});


// a login form
app.get('/login', function(request, response) {
	response.render('login');
});

app.post('/processLogin', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	
	User.find({username: username}).then(function(results) {
		if ((results.length > 0) && (bcrypt.compareSync(password, results[0].hashedPassword))) {
				// login successful

				// store the username in the session
				req.session = request.session;
				req.session.username = username;

				// show a confirmation page
				response.render('loginSuccess', {username: username});
		} else {
			// login failed:  show the login page again, passing an error string
			response.render('login', {errorMessage: 'Login Incorrect'});
		}
	});
});

// logout functionality
app.get('/logout', function(request, response) {
	request.session.username = '';
	response.redirect('/');
});



app.listen(app.get('port'), function() {
	console.log('Node/Express listening on port ' + app.get('port'));
	console.log('Use CTRL-C to exit');
});
