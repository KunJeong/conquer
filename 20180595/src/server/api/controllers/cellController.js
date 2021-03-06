"use strict";
var mongoose = require("mongoose"),
  Cell = mongoose.model("Cell");

exports.addCell = function (req, res) {
  var cell = new Cell();
  console.log(`creating cell: ${req.body.i}, ${req.body.j}, ${req.body.type}`);
  cell.i = req.body.i;
  cell.j = req.body.j;
  cell.layer = req.body.i + req.body.j;
  cell.type = req.body.type;
  cell.hasElement = req.body.hasElement;
  cell._id = req.body.id;
  cell.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    console.log(`created cell: ${cell}`);
    res.status(200).json({ result: 1 });
  });
};

exports.editCell = function (req, res) {
  Cell.findOne({ i: req.body.i, j: req.body.j }).exec(function (err, cell) {
    if (err) return res.status(500).send({ error: "database failure" });
    console.log(`editing cell: ${cell}`);
    cell.type = req.body.type;
    cell.hasElement = req.body.hasElement;
    cell._id = req.body.id;
    cell.save(function (err) {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      console.log(`edited cell: ${cell}`);
      res.status(200).json({ result: 1 });
    });
  });
};

exports.editCellById = function (req, res) {
  Cell.findOne({ _id: req.params.cellId }).exec(function (err, cell) {
    if (err) return res.status(500).send({ error: "database failure" });
    console.log(`editing cell: ${cell}`);
    if (req.body.type) cell.type = req.body.type;
    if (req.body.hasElement) cell.hasElement = req.body.hasElement;
    if (req.body.i !== undefined) cell.i = req.body.i;
    if (req.body.j !== undefined) cell.j = req.body.j;
    cell.save(function (err) {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      console.log(`edited cell: ${cell}`);
      res.status(200).json({ result: 1 });
    });
  });
};

exports.getCells = function (req, res) {
  Cell.find()
    .sort("layer i")
    .exec(function (err, cells) {
      if (err) return res.status(500).send({ error: "database failure" });
      console.log(`got cells: ${cells}`);
      res.status(200);
      res.json({ cells });
    });
};

exports.deleteAllCells = function (req, res) {
  Cell.remove({}).exec(function (err) {
    if (err) return res.status(500).send({ error: "database failure" });
    res.status(200);
    res.json({ result: 1 });
  });
};
