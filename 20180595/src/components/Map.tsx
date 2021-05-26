//@ts-check
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { Box } from "@material-ui/core";
import Draggable from "react-draggable";
import IsometricGrid from "./IsometricGrid";

const sqrt3 = 1.73205;

function _Map(props) {
  const { cells, ui } = useStores();
  return (
    <Box
      style={{
        width: 600,
        height: 800,
        backgroundColor: "#ffffff",
        position: "relative",
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
        <Draggable>
          <Box>
            <IsometricGrid
              // width={600}
              // height={600}
              childWidth={160}
              spacing={5}
              cells={cells.sortedCells}
            />
          </Box>
        </Draggable>
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
