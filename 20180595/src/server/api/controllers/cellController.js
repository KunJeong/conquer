'use strict';
var mongoose = require('mongoose'),
  Cell = mongoose.model('Cell')

  exports.addCell = function(req, res) {
    var cell = new Cell();
    console.log(`creating cell: ${req.body.i}, ${req.body.j}, ${req.body.type}`)
    cell.i = req.body.i;
    cell.j = req.body.j;
    cell.layer = req.body.i + req.body.j
    cell.type = req.body.type;
    cell.save(function(err) {
      if(err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      console.log(`created cell: ${cell}`)
      res.json({result: 1});
    });
  }

  exports.editCell = function(req, res) {
    Cell.findOne({i: req.body.i, j: req.body.j}).exec(function(err, cell) {
      if(err) return res.status(500).send({error: 'database failure'});
      console.log(`editing cell: ${cell}`)
      cell.type = req.body.type;
      cell.save(function(err) {
        if(err) {
          console.error(err);
          res.json({result: 0});
          return;
        }
        console.log(`edited cell: ${cell}`)
        res.json({result: 1});
      });
    })
    
  }
  
  exports.getCells = function(req, res) {
    Cell.find().sort('layer i').exec(function(err, cells) {
      if(err) return res.status(500).send({error: 'database failure'});
      console.log(`got cells: ${cells}`)
      res.json({cells})
    })
  }
  
  exports.deleteAllCells = function(req, res) {
    Cell.remove({}).exec(function (err) {
      if(err) return res.status(500).send({error: 'database failure'});
      res.json({result:1});
    })
  }
