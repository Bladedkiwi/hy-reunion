const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const index = require('./server/routes/app');
const scheduleRoutes = require('./server/routes/schedules');
// initialize express
const app = express();

// Post data using JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// app.use(cookieParser());

// app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Specified root directory for site
app.use(express.static(path.join(__dirname, 'dist/family-reunion')));
app.use('/', index);

// Establishing mongo database connection
mongoose.connect('mongodb://localhost:27017/family-reunion',
  {useNewUrlParser: true}, (err,res) => {
  err ? console.log('Connection failed: ' + err) : console.log('Connected to database!');
  })

// Schedule Page Route
app.use('/schedules', scheduleRoutes);

// Redirect route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/hy-reunion/index.html'));
});

// Local Port express uses
const port = process.env.PORT || '3000';
app.set('port', port);

// server start and listen
const server = http.createServer(app);
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});

