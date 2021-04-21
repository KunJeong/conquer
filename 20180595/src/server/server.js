var path = require('path');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Todo = require('./api/models/todoModel')
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.set('useNewUrlParser', true); 
mongoose.set('useUnifiedTopology', true); 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Userdb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { request } = require('express');
const cors = require('cors');
var todoRouter = require('./api/routers/todoRouter');
todoRouter(app);

app.use(cors());
app.listen(port);

console.log('RESTful API server started on: ' + port);