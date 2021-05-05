'use strict';
var mongoose = require('mongoose'),
  Cell = mongoose.model('Cell')

  exports.addCell = function(req, res) {
    var cell = new Cell();
    cell.i = req.body.i;
    cell.j = req.body.j;
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
  
  exports.getCells = function(req, res) {
    Cell.find().sort('layer').exec(function(err, cells) {
      if(err) return res.status(500).send({error: 'database failure'});
      console.log(`got cells: ${cells}`)
      res.json(cells)
    })
  }
