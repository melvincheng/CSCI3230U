// basic node + express

// library/package imports
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('node-uuid');

// middleware

// body parser (parses URL-encoded body content)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// session (parses session IDs and loads data)
app.use(session({
  genid: function(request) { return uuid.v4(); },
  resave: false /* save only when changes */,
  saveUninitialized: false /* save only when data */,
  /*cookie: { secure: true; },*/
  secret: 'apollo slackware propositional expectations'
}));

// configure view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


// TODO:  Replace this with real login functionality
var usernames = [];

// utility functions
function userExists(toFind) {
  for (var i = 0; i < usernames.length; i++) {
    if (usernames[i] === toFind) {
      return true;
    }
  }
  return false;
}

// routes (map URI -> code)
app.get('/', function(request, response) {
  var uname = request.session.username;
  response.render('index', {title: 'Main Page',
                            description: 'This is a dynamic paragraph.',
                            username: uname});
});
app.get('/profile', function(request, response) {
  var uname = request.session.username;
  response.render('profile', {title: 'Profile',
                            username: uname});
});
app.get('/students', function(request, response) {
  var students = [
    {sid: '200000001', firstName: 'Bender', lastName: 'Rodriguez'},
    {sid: '200000002', firstName: 'Taranga', lastName: 'Leela'},
    {sid: '200000003', firstName: 'Philip', lastName: 'Fry'},
    {sid: '200000004', firstName: 'Amy', lastName: 'Wong'},
    {sid: '200000005', firstName: 'Hermes', lastName: 'Conrad'}
  ];
  response.render('studentList', 
                  {title: 'Class List',
                   students: students});
});
app.get('/login', function(request, response) {
  // no data being passed
  response.render('login');
});
app.get('/register', function(request, response) {
  response.render('register');
});

/*
app.get('/hello', function(request, response) {
	response.send('Hello, ' + request.query.name);
});

app.get('/cats', function(request, response) {
	response.sendFile(__dirname + '/cats.html');
});

app.post('/dogs', function(request, response) {
	response.send('Woof woof!');
});

app.get('/users/:userid', function(request, response) {
  var id = request.params.userid;
  console.log('accessing users for ' + id);
});

app.get('/login', function(request, response) {
	response.sendFile(__dirname + '/login.html');
});
*/

app.post('/processLogin', function(request, response) {
  console.log('form submitted: ' + request.body);
  var username = request.body['username'];
  if (userExists(username)) {
    // store the username in the session
    request.session.username = username;
    
    // redirect to the index
    response.redirect('/');
  } else {
    // show the login page again, with an error msg
    response.render('login', {errorMessage: 'Login Incorrect'});
  }
});

app.post('/processRegistration', function(request, response) {
  console.log('register form submitted: ' + request.body);
  
  var username = request.body['username'];
  if (userExists(username)) {
    // show the register page again, with an error msg
    response.render('register', {errorMessage: 'Username already taken'});
  } else {
    // remember the username
    usernames.push(username);
    
    // store the username in the session
    request.session.username = username;
    
    // redirect to the index
    response.redirect('/');
  }
});
app.get('/logout', function(request, response) {
  request.session.username = '';
  response.redirect('/');
});

// express setup
app.set('port', process.env.PORT || 3000);

// setup the HTTP listener
app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});

