var path = require("path");
var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Todo = require("./api/models/todoModel");
Cell = require("./api/models/cellModel");
bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Userdb");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var todoRouter = require("./api/routers/todoRouter");
var cellRouter = require("./api/routers/cellRouter");
var cors = require("cors");
app.use(cors({ credentials: true, origin: true }));
cellRouter(app);
todoRouter(app);

app.listen(port);

console.log("RESTful API server started on: " + port);
