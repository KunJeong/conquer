//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AddCell, TodoCell, GrassCell, TimerCell } from "./cells";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { Mode } from "../stores";

const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  cell: (props: CellProps) => ({
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

interface CellProps {
  width: number;
  marginX: number;
  x: number;
  y: number;
}

function _Cell(props) {
  const { ui } = useStores();
  const { selectionI, selectionJ } = ui.selectionPos;
  // console.log(`selected: ${ui.selection}, index: ${props.index}`);
  const classes = useStyles({
    x: props.i - props.j,
    y: props.i + props.j,
    ...props,
  });
  if (props.type === "add" && ui.mode == Mode.Focus)
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
          index={props.index}
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
          index={props.index}
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
          index={props.index}
          i={props.i}
          j={props.j}
          cells={props.cells}
        ></TimerCell>
      </div>
    );
  else if (props.type === "todo")
    return (
      <div className={classes.cell}>
        <TodoCell
          style={props.style}
          onClick={props.onClick}
          width={props.width}
          cell={props.cell}
          selected={props.i == selectionI && props.j == selectionJ}
          backgroundColor={props.backgroundColor}
          borderWidth={props.borderWidth}
          index={props.index}
          i={props.i}
          j={props.j}
          cells={props.cells}
        ></TodoCell>
      </div>
    );
}

_Cell.defaultProps = {
  i: 0,
  j: 0,
  type: "empty",
  width: 160,
  marginX: 20,
};

const Cell = observer(_Cell);
export default Cell;
