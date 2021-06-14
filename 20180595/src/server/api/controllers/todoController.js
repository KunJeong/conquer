"use strict";
var mongoose = require("mongoose"),
  Todo = mongoose.model("Todo"),
  Cell = mongoose.model("Cell");

exports.addTodo = function (req, res) {
  var todo = new Todo();
  todo.name = req.body.name;
  todo._id = req.body.id;
  todo.onCell = req.body.onCell;
  console.log(`title: ${todo.name}, id: ${todo.id}`);
  todo.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    console.log("created todo");
    res.json({ todo });
  });
};

exports.editTodo = function (req, res) {
  Todo.findOne({ _id: req.params.todoId }).exec(function (err, todo) {
    if (err) return res.status(500).send({ error: "database failure" });
    console.log(`editing todo: ${todo}`);
    if (req.body.name !== undefined) todo.name = req.body.name;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;
    if (req.body.onCell) todo.onCell = req.body.onCell;
    todo.save(function (err) {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      console.log(`edited todo: ${todo}`);
      res.status(200).json({ result: 1 });
    });
  });
};

exports.getTodos = function (req, res) {
  Todo.find().exec(function (err, todos) {
    if (err) return res.status(500).send({ error: "database failure" });
    console.log(`got todos: ${todos}`);
    res.status(200);
    res.json({ todos });
  });
};

exports.deleteAllTodos = function (req, res) {
  Todo.remove({}).exec(function (err) {
    if (err) return res.status(500).send({ error: "database failure" });
    res.status(200);
    res.json({ result: 1 });
  });
};
