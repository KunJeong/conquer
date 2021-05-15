"use strict";
module.exports = function (app) {
  const cell = require("../controllers/cellController");
  const cors = require("cors");

  app
    .route("/cells", cors())
    .get(cell.getCells)
    .post(cell.addCell)
    .patch(cell.editCell)
    .delete(cell.deleteAllCells);
};
