"use strict";
module.exports = function (app) {
  const todo = require("../controllers/todoController");

  app
    .route("/todos")
    .get(todo.getTodos)
    .post(todo.addTodo)
    .delete(todo.deleteAllTodos);

  app.route("/todos/:todoId").patch(todo.editTodo);
};
