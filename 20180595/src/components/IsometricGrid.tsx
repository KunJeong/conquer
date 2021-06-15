//@ts-check
import CellView from "./CellView";
import { observer } from "mobx-react-lite";
import { Box } from "@material-ui/core";
import { useStores } from "../hooks";
import React, { Fragment } from "react";
import { Cell, Mode } from "../stores";

interface IsometricGridProps {
  cells: Cell[];
  [rest: string]: any;
}

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

export default IsometricGrid;
