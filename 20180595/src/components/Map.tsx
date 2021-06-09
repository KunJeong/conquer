//@ts-check
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { Box } from "@material-ui/core";
import Draggable from "react-draggable";
import IsometricGrid from "./IsometricGrid";
import { MapInteractionCSS } from "react-map-interaction";

const sqrt3 = 1.73205;

function _Map(props) {
  const { cells, ui } = useStores();
  // const onStop = () => {
  //   const wasPanning = ui.isPanning;
  //   ui.endPan()
  //   if (wasPanning) {
  //     onDrop()
  //   } else {

  //   }
  // }
  return (
    <Box
      style={{
        width: 600,
        height: 800,
        backgroundColor: "#ffffff",
        // position: "relative",
        // overflow: "hidden",
        willChange: "transform",
      }}
      onClick={() => {
        ui.deselect();
      }}
    >
      <Box
        component="span"
        width={1}
        height={1}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* <Draggable
          onDrag={() => ui.startPan()}
          onStop={(e) => {
            e.stopPropagation();
            ui.endPan();
          }}
        > */}
        <MapInteractionCSS
          showControls
          defaultValue={{ scale: 1, translation: { x: 300, y: 400 } }}
        >
          <IsometricGrid
            // width={600}
            // height={600}
            childWidth={160}
            spacing={5}
            cells={cells.sortedCells}
          />
        </MapInteractionCSS>

        {/* </Draggable> */}
      </Box>
    </Box>
  );
}

_Map.defaultProps = {
  width: 600,
  height: 1000,
  childwidth: 80,
  spacing: 100,
  cells: [
    { _id: "1", i: 0, j: 0 },
    { _id: "2", i: 1, j: 0 },
    { _id: "3", i: 0, j: 1 },
    { _id: "4", i: 1, j: 1 },
  ],
};

const Map = observer(_Map);

export default Map;
