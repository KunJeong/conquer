//@ts-check
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import { Box } from "@material-ui/core";
import Draggable from "react-draggable";
import React from "react";
import IsometricGrid from "./isometricGrid/IsometricGrid";

const Map = observer(function _Map() {
  const { cells, ui } = useStores();
  return (
    <Draggable
      position={{ x: 0, y: 0 }}
      onStart={(e, data) => {
        ui.saveMouse(data.x, data.y);
      }}
      onStop={(e, data) => {
        ui.panMap(data.x, data.y);
      }}
    >
      <Box
        component="span"
        display="block"
        style={{
          height: "100vh",
          width: "100vw",
          willChange: "transform",
        }}
        onClick={() => {
          ui.deselect();
        }}
      >
        <Box
          component="span"
          display="block"
          style={{
            position: "relative",
            left: ui.offsetX,
            top: `calc(${ui.offsetY}px + 50%)`,
            willChange: "transform",
            pointerEvents: "none",
          }}
        >
          <Box
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IsometricGrid
              childWidth={160}
              spacing={5}
              cells={cells.sortedCells}
            />
          </Box>
        </Box>
      </Box>
    </Draggable>
  );
});

export default Map;
