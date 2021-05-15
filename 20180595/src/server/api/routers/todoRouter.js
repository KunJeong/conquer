"use strict";
module.exports = function (app) {
  var todo = require("../controllers/todoController");

  app.route("/todos").post(todo.createTodo);
};
