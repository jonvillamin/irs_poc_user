var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

const connectDB = require('./DBConnection/Connection');

const port = process.env.port || 3000;

let app = express();

var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
connectDB();

//create a cors middleware
app.use(function(req, res, next) {
	//set headers to allow cross origin request.
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

app.use(express.json({extended:false}));
app.use('/api/userModel', require('./API/User'));
app.use('/api/logModel', require('./API/Log'));
app.use('/api/tallyModel', require('./API/Freq'));
app.use('/api/incidentModel', require('./API/Incident'));
app.use('/api/deptModel', require('./API/Dept'));
app.use('/api/incidentRecordModel', require('./API/IncidentRecord'));
app.use('/api/chatModel', require('./API/Chat'));
app.use('/api/fileModel', require('./API/File'));

var index = require('./routes/index');
var users = require('./routes/users');
var types = require('./routes/incidentTypes');
var reports = require('./routes/incidentReports');
var depts = require('./routes/depts');
var freq = require('./routes/freq');
var logs = require('./routes/logs');
var chat = require('./routes/chat');
var file = require('./routes/file');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client_sample')));
console.log(__dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/api', users);
app.use('/api', types);
app.use('/api', reports);
app.use('/api', depts);
app.use('/api', freq);
app.use('/api', logs);
app.use('/api', chat);
app.use('/api', file);

app.listen(port, function(){
	console.log('Server started on port ' + port);
});