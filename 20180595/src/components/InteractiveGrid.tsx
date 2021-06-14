import IsometricGrid from "./IsometricGrid";
import { observer } from "mobx-react-lite";
import { Box } from "@material-ui/core";
import { useStores } from "../hooks";
import React, { Fragment } from "react";
import { Cell } from "../stores";

interface InteractiveGridProps {
  cells: Cell[];
  [rest: string]: any;
}

const InteractiveGrid = observer(function _InteractiveGrid({
  ...props
}: InteractiveGridProps) {
  const { ui } = useStores();

  return (
    // <Box
    //   width={800}
    //   height={600}
    //   ml={ui.offsetX}
    //   mb={ui.offsetY}
    //   bgcolor="#ff00ff"
    // >
    <IsometricGrid {...props} />
    // </Box>
  );
});

export default IsometricGrid;
