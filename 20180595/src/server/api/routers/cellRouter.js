"use strict";
module.exports = function (app) {
  const cell = require("../controllers/cellController");

  app
    .route("/cells")
    .get(cell.getCells)
    .post(cell.addCell)
    .patch(cell.editCell)
    .delete(cell.deleteAllCells);
};
