//@ts-check
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import { Box, IconButton } from "@material-ui/core";
import Draggable, { DraggableCore } from "react-draggable";
import { Add, Done, Edit, Remove } from "@material-ui/icons";
import { Mode } from "../stores";
import { autorun, toJS } from "mobx";
import React, { Fragment } from "react";
import IsometricGrid from "./IsometricGrid";

const Map = observer(function _Map() {
  const { cells, ui } = useStores();
  // autorun(() => {
  //   console.log(toJS(cells.cells));
  // });
  // console.log(cells.sortedCells);
  // const onStop = () => {
  //   const wasPanning = ui.isPanning;
  //   ui.endPan();
  //   if (wasPanning) {
  //     // onDrop()
  //   } else {
  //   }
  // };
  return (
    <Fragment>
      <IconButton
        onClick={() => ui.zoom(false)}
        disabled={ui.width >= ui.maxWidth}
      >
        <Add />
      </IconButton>
      <IconButton
        onClick={() => ui.zoom(true)}
        disabled={ui.width <= ui.minWidth}
      >
        <Remove />
      </IconButton>
      {ui.mode == Mode.Edit ? (
        <IconButton onClick={() => ui.setMode(Mode.List)}>
          <Done />
        </IconButton>
      ) : (
        <IconButton onClick={() => ui.setMode(Mode.Edit)}>
          <Edit />
        </IconButton>
      )}
      <Draggable
        position={{ x: 0, y: 0 }}
        onStart={(e, data) => {
          console.log(data.x, data.y);
          ui.saveMouse(data.x, data.y);
        }}
        onStop={(e, data) => {
          console.log(data.x, data.y);
          ui.panMap(data.x, data.y);
        }}
      >
        <Box
          component="span"
          display="block"
          // height={1}
          style={{
            height: "600px",
            width: "1000px",
            // backgroundColor: "#ffffff",
            // overflow: "hidden",
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
              // backgroundColor: "#aaaaaa",
              position: "relative",
              left: ui.offsetX,
              top: ui.offsetY + 300,
              pointerEvents: "none",
            }}
          >
            <Box
              // onDrag={(e) => {
              //   e.stopPropagation();
              // }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <IsometricGrid
                // width={600}
                // height={600}
                childWidth={160}
                spacing={5}
                cells={cells.sortedCells}
              />
            </Box>
          </Box>
        </Box>
      </Draggable>
    </Fragment>
  );
});

export default Map;
