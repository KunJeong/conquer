"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellSchema = Schema({
  i: Number,
  j: Number,
  layer: {
    type: Number,
    default: function () {
      return this.i + this.j;
    },
  },
  // item: {
  //   type: Schema.Types.ObjectId,
  //   refPath: 'ofType'
  // },
  type: {
    type: String,
    enum: ["grass", "add", "timer"],
  },
});

const Cell = mongoose.model("Cell", CellSchema);

module.exports = Cell;
