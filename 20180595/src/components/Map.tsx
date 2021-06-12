//@ts-check
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import { Box, IconButton } from "@material-ui/core";
import Draggable from "react-draggable";
import IsometricGrid from "./IsometricGrid";
import { Add, Done, Edit, Remove } from "@material-ui/icons";
import { Mode } from "../stores";

const sqrt3 = 1.73205;

function _Map() {
  const { cells, ui } = useStores();
  // const onStop = () => {
  //   const wasPanning = ui.isPanning;
  //   ui.endPan();
  //   if (wasPanning) {
  //     // onDrop()
  //   } else {
  //   }
  // };
  return (
    <Box
      component="span"
      display="block"
      // height={1}
      style={{
        height: "100%",
        // position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
      onClick={() => {
        ui.deselect();
      }}
    >
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Draggable
          defaultPosition={{ x: 0, y: 400 }}
          onDrag={() => ui.startPan()}
          onStop={(e) => {
            e.stopPropagation();
            ui.endPan();
          }}
        >
          {/* <MapInteractionCSS
            showControls
            disablePan
            defaultValue={{ scale: 1, translation: { x: 300, y: 400 } }}
          > */}
          <Box>
            <IsometricGrid
              // width={600}
              // height={600}
              childWidth={160}
              spacing={5}
              cells={cells.sortedCells}
            />
          </Box>
          {/* </MapInteractionCSS> */}
        </Draggable>
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
      </Box>
    </Box>
  );
}

// _Map.defaultProps = {
//   width: 600,
//   height: 1000,
//   childwidth: 80,
//   spacing: 100,
//   cells: [
//     { _id: "1", i: 0, j: 0 },
//     { _id: "2", i: 1, j: 0 },
//     { _id: "3", i: 0, j: 1 },
//     { _id: "4", i: 1, j: 1 },
//   ],
// };

const Map = observer(_Map);

export default Map;
