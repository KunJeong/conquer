"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cell = require("./cellModel");

const TodoSchema = Schema({
  cell: {
    type: Schema.Types.ObjectId,
    ref: Cell,
  },
  title: {
    type: String,
    default: "제목이 없습니다.",
  },
  completed: Boolean,
  imageName: {
    type: String,
    enum: ["Tower"],
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
