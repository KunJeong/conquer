"use strict";
module.exports = function (app) {
  const todo = require("../controllers/todoController");
  const cors = require("cors");

  app
    .route("/todos", cors())
    .get(todo.getTodos)
    .post(todo.addTodo)
    .delete(todo.deleteAllTodos);
};
