//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AddCell, TodoCell, GrassCell, TimerCell } from "./cells";
import { observer } from "mobx-react-lite";
import { useStores, useLongPress } from "../hooks";
import { Mode, Cell, CellType } from "../stores";
import { mapDimensions } from "../constants";
import Image from "next/image";

const useStyles = makeStyles({
  cell: ({
    width,
    marginX,
    x,
    y,
  }: {
    width: number;
    marginX: number;
    x: number;
    y: number;
    [rest: string]: any;
  }) => ({
    // backgroundColor: "#dddddd",
    // borderStyle: 'solid',
    pointerEvents: "none",
    position: "absolute",
    // willChange: "transform",
    padding: 0,
    left: `calc(50% + ${width * (x + 1) * -0.5 - x * marginX}px)`,
    bottom: `calc(50% + ${
      (width * (y + 1) * -0.5 - y * marginX) * mapDimensions.sqrt1over3
    }px)`,
    width: `${width}px`,
    height: `${width * 2 * mapDimensions.sqrt1over3}px`,
  }),
});

interface CellViewProps {
  width: number;
  marginX: number;
  cell: Cell;
  selected: boolean;
  editing: boolean;
  [rest: string]: any;
}

const CellView = observer(function _CellView({
  cell,
  ...props
}: CellViewProps) {
  const { ui, cells } = useStores();

  const onClick = () => {
    console.log(`clicked ${cell.id}`);

    if (ui.mode == Mode.Edit && ui.selectedCell) {
      console.log(ui.selectedCell, cell.id);
      cells.swapCells(ui.selectedCell, cell.id);
    } else {
      ui.select(cell.id);
    }
  };

  const classes = useStyles({
    x: cell.x,
    y: cell.y,
    ...props,
  });

  if (cell.type == CellType.Add && ui.mode == Mode.Focus)
    return <div className={classes.cell}></div>;
  else if (cell.type === "add")
    return (
      <div className={classes.cell}>
        <AddCell {...props} onClick={onClick}></AddCell>
      </div>
    );
  else if (cell.type == CellType.Grass)
    return (
      <div className={classes.cell}>
        <GrassCell {...props} onClick={onClick}></GrassCell>
      </div>
    );
  else if (cell.type == CellType.Timer)
    return (
      <div className={classes.cell}>
        <TimerCell {...props} onClick={onClick}></TimerCell>
      </div>
    );
  else if (cell.type == CellType.Todo)
    return (
      <div className={classes.cell}>
        {/* <div
          style={{
            // height: props.width * mapDimensions.sqrt1over3,
            bottom: "0px",
            backgroundColor: "#ffffff",
          }}
        > */}
        <TodoCell {...props} onClick={onClick} cell={cell}></TodoCell>
        {/* </div> */}
      </div>
    );
});

export default CellView;
