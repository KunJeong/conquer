"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = Schema({
  // cell: {
  //   type: Schema.Types.ObjectId,
  //   ref: Cell,
  // },
  _id: String,
  onCell: String,
  completed: {
    type: Boolean,
    default: false,
  },
  name: String,
  imageName: {
    type: String,
    default: "towerRed",
    enum: ["towerRed", "towerBlue", "towerDarkRed", "towerDarkBlue"],
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
