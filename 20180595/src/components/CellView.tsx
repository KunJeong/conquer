//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AddCell, TodoCell, GrassCell, TimerCell } from "./cells";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { Mode, Cell } from "../stores";

const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  cell: (props: {
    width: number;
    x: number;
    y: number;
    marginX: number;
    [rest: string]: any;
  }) => ({
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

interface CellViewProps {
  width: number;
  marginX: number;
  cell: Cell;
  selected: boolean;
  [rest: string]: any;
}

function _CellView({ cell, ...props }: CellViewProps) {
  const { ui, cells } = useStores();
  // const selectedCell = cells.cellById(ui.selectedCell);

  const onClick = () => {
    console.log(`clicked ${cell.id}`);

    ui.select(cell.id);
    // console.log(
    //   `selected from ${i}, ${j}: ${(i - minI) * jSize + j - minJ + 1}`
    // );
    // animationRef.current.play();
    // if(props.onClickCell) props.onClickCell(i, j);
    // }
  };

  // console.log(`selected: ${ui.selection}, index: ${props.index}`);
  const classes = useStyles({
    x: cell.i - cell.j,
    y: cell.i + cell.j,
    ...props,
  });
  if (props.type === "add" && ui.mode == Mode.Focus)
    return <div className={classes.cell}></div>;
  else if (props.type === "add")
    return (
      <div className={classes.cell}>
        <AddCell {...props} onClick={onClick}></AddCell>
      </div>
    );
  else if (props.type === "grass")
    return (
      <div className={classes.cell}>
        <GrassCell {...props} onClick={onClick}></GrassCell>
      </div>
    );
  else if (props.type === "timer")
    return (
      <div className={classes.cell}>
        <TimerCell onClick={onClick} {...props}></TimerCell>
      </div>
    );
  else if (props.type === "todo")
    return (
      <div className={classes.cell}>
        <TodoCell onClick={onClick} cell={cell} {...props}></TodoCell>
      </div>
    );
}

const CellView = observer(_CellView);
export default CellView;
