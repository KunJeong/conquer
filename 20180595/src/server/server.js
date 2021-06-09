var path = require("path");
var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Todo = require("./api/models/todoModel"),
  Cell = require("./api/models/cellModel"),
  bodyParser = require("body-parser"),
  cors = require("cors");

// mongoose instance connection url connection
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Userdb");

var todoRouter = require("./api/routers/todoRouter");
var cellRouter = require("./api/routers/cellRouter");
var corsOptions = {
  origin: "*",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

cellRouter(app);
todoRouter(app);

app.listen(port);

console.log("RESTful API server started on: " + port);
