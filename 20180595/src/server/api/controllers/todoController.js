'use strict';
var mongoose = require('mongoose'),
  Todo = mongoose.model('Todos')

  exports.createTodo = function(req, res) {
    var todo = new Todo();
    todo.title = req.body.title
    todo.save(function(err) {
      if(err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      console.log("created tdo")
      res.json({result: 1});
    });
  }
