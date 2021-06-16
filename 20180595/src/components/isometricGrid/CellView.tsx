//@ts-check
import { makeStyles } from "@material-ui/core/styles";
import { AddCell, TodoCell, GrassCell, TimerCell } from "./cells";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { Mode, Cell, CellType } from "../../stores";
import { mapDimensions } from "../../constants";

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
    pointerEvents: "none",
    position: "absolute",
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
  const { ui, cells, todos } = useStores();

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
  else if (
    cell.type == CellType.Todo &&
    todos.todoById(cell.hasElement) === undefined
  )
    return (
      <div className={classes.cell}>
        <GrassCell {...props} onClick={onClick}></GrassCell>
      </div>
    );
  else if (cell.type == CellType.Todo)
    return (
      <div className={classes.cell}>
        <TodoCell
          {...props}
          onClick={onClick}
          todo={todos.todoById(cell.hasElement)}
        ></TodoCell>
      </div>
    );
});

export default CellView;
