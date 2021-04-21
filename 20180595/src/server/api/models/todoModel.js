'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema ({
  title: {
    type: String,
    default: '제목이 없습니다.'
  },
  completed: Boolean
});

module.exports = mongoose.model('Todos', TodoSchema);