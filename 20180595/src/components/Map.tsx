//@ts-check
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import { Box, IconButton } from "@material-ui/core";
import Draggable, { DraggableCore } from "react-draggable";
import IsometricGrid from "./IsometricGrid";
import { Add, Done, Edit, Remove } from "@material-ui/icons";
import { Mode } from "../stores";
import { autorun, toJS } from "mobx";

const sqrt3 = 1.73205;

function _Map() {
  const { cells, ui } = useStores();
  autorun(() => {
    console.log(toJS(cells.cells));
  });
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
    <Box>
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
            <IsometricGrid
              // width={600}
              // height={600}
              childWidth={160}
              spacing={5}
              cells={cells.sortedCells}
            />
          </Box>
        </Box>
      </Draggable>
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
