//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Rhombus from "../components/Rhombus";
import AddCell from "./cells/AddCell";
import GrassCell from "./cells/GrassCell";
import TimerCell from "./cells/TimerCell";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";

const sqrt2 = 1.41421;
const sqrt1over2 = 0.70711;
const sqrt3 = 1.73205;
const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  cell: (props) => ({
    // backgroundColor: "#dddddd",
    // borderStyle: 'solid',
    pointerEvents: "none",
    position: "absolute",
    willChange: "transform",
    left:
      "calc(50% + " +
      (props.width * (props.x + 1) * -0.5 - props.x * props.marginX) +
      "px)",
    bottom:
      "calc(50% + " +
      (props.width * (props.y + 1) * -0.5 - props.y * props.marginX) *
        sqrt1over3 +
      "px)",
    width: props.width + "px",
    height: props.width * sqrt1over3 + "px",
  }),
});

function _Cell(props) {
  const { ui } = useStores();
  const { selectionI, selectionJ } = ui.selectionPos;
  console.log(`selected: ${ui.selection}, index: ${props.index}`);
  const classes = useStyles({
    x: props.i - props.j,
    y: props.i + props.j,
    ...props,
  });
  if (props.type === "add" && ui.timerMode)
    return <div className={classes.cell}></div>;
  else if (props.type === "add")
    return (
      <div className={classes.cell}>
        <AddCell
          style={props.style}
          onClick={props.onClick}
          width={props.width}
          selected={props.i == selectionI && props.j == selectionJ}
          backgroundColor={props.backgroundColor}
          borderWidth={props.borderWidth}
          i={props.i}
          j={props.j}
        ></AddCell>
      </div>
    );
  else if (props.type === "grass")
    return (
      <div className={classes.cell}>
        <GrassCell
          style={props.style}
          onClick={props.onClick}
          width={props.width}
          selected={props.i == selectionI && props.j == selectionJ}
          backgroundColor={props.backgroundColor}
          borderWidth={props.borderWidth}
          i={props.i}
          j={props.j}
          cells={props.cells}
        ></GrassCell>
      </div>
    );
  else if (props.type === "timer")
    return (
      <div className={classes.cell}>
        <TimerCell
          style={props.style}
          onClick={props.onClick}
          width={props.width}
          selected={props.i == selectionI && props.j == selectionJ}
          backgroundColor={props.backgroundColor}
          borderWidth={props.borderWidth}
          i={props.i}
          j={props.j}
          cells={props.cells}
        ></TimerCell>
      </div>
    );
}

_Cell.propTypes = {
  i: PropTypes.number,
  j: PropTypes.number,
  cell: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.number,
};

_Cell.defaultProps = {
  i: 0,
  j: 0,
  type: "empty",
  width: 160,
  marginX: 20,
};

const Cell = observer(_Cell);
export default Cell;
