"use strict";
var mongoose = require("mongoose"),
  Todo = mongoose.model("Todo"),
  Cell = mongoose.model("Cell");

exports.createTodo = function (req, res) {
  var todo = new Todo();
  todo.title = req.body.title;
  todo.i = req.body.i;
  todo.j = req.body.j;
  console.log(`title: ${todo.title}, i: ${todo.i}, j: ${todo.j}`);
  todo.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    console.log("created todo");
    res.json({ result: 1 });
  });
};
