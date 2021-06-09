"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellSchema = Schema({
  _id: String,
  i: Number,
  j: Number,
  hasElement: String,
  layer: {
    type: Number,
    default: function () {
      return this.i + this.j;
    },
  },
  type: {
    type: String,
    enum: ["grass", "todo", "timer", "add"],
    default: "grass",
  },
});

const Cell = mongoose.model("Cell", CellSchema);

module.exports = Cell;
