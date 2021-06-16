//@ts-check
import CellView from "./CellView";
import { observer } from "mobx-react-lite";
<<<<<<< HEAD
import { Box } from "@material-ui/core";
import { useStores } from "../hooks";
import React, { Fragment } from "react";
import { Cell, Mode } from "../stores";

interface IsometricGridProps {
  cells: Cell[];
  [rest: string]: any;
}
=======
import { useStores } from "../hooks/useStores";
import React from "react";

const sqrt3 = 1.73205;

const IsometricGrid = observer(function _IsometricGrid(props) {
  const { cells, ui } = useStores();
  const animationRef = React.useRef(null);

  const halfSpan = Math.max(
    Math.floor(props.width / props.childWidth),
    Math.floor((props.height * sqrt3) / props.childWidth)
  );
  const totalSpan = halfSpan * 2 + 1;
  console.log(`width: ${props.width}, child: ${props.childWidth}`);

  console.log(`half: ${halfSpan}, total: ${totalSpan}`);

  const { minI, minJ, maxI, maxJ } = cells.mapSize;
  const iSize = maxI - minI + 1;
  const jSize = maxJ - minJ + 1;
  console.log(`size: ${iSize}, ${jSize}`);
  const onClick = (index, i, j) => {
    // if (!ui.isPanning) {
    console.log("clicked");
>>>>>>> master

const IsometricGrid = observer(function _IsometricGrid({
  cells,
  spacing,
  ...props
}: IsometricGridProps) {
  const { ui } = useStores();

  return (
    <Box {...props}>
      {cells.map((cell, index) => {
        return (
          <CellView
            key={cell.i * 300 + cell.j}
            // classes={{ cell: "cell" }}
            style={{
              willChange: "transform",
            }}
            width={ui.width}
            selected={cell.id === ui.selectedCell}
            editing={ui.mode == Mode.Edit}
            index={index}
            cell={cell}
            // backgroundColor="#ddef77"
            // borderWidth={0}
            marginX={spacing}
          ></CellView>
        );
      })}
    </Box>
  );
});
<<<<<<< HEAD
=======

// _IsometricGrid.defaultProps = {
//   width: 500,
//   height: 400,
//   childwidth: 80,
//   spacing: 100,
//   cells: [
//     { _id: "1", i: 0, j: 0 },
//     { _id: "2", i: 1, j: 0 },
//     { _id: "3", i: 0, j: 1 },
//     { _id: "4", i: 1, j: 1 },
//   ],
// };
>>>>>>> master

export default IsometricGrid;
