'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema ({
  title: {
    type: String,
    default: '제목이 없습니다.'
  },
  i: Number,
  j: Number
  // completed: Boolean
});

module.exports = mongoose.model('Todos', TodoSchema);