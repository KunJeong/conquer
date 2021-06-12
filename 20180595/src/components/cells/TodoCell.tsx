//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Rhombus from "../Rhombus";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { Cell } from "../../stores";
import { mapColors } from "../../constants";

const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  text: ({
    selected,
    ...props
  }: {
    selected: boolean;
    editing: boolean;
    [rest: string]: any;
  }) => ({
    ...props.style,
    position: "absolute",
    fontSize: "12pt",
    // color: "#777777",
    left: "35%",
    bottom: "35%",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    marginLeft: "-30px",
    marginBottom: "-15px",
    display: selected ? "block" : "none",
    transform: `scale(1, ${sqrt1over3}) rotate(45deg)`,
    color: "#ffffff",
  }),
  rhombus: ({
    selected,
    editing,
    ...props
  }: {
    selected: boolean;
    editing: boolean;
    [rest: string]: any;
  }) => ({
    borderStyle: "dashed",
    borderColor: mapColors.BORDER_EDITING,
    borderWidth: editing && selected ? "4px" : "0px",
    backgroundColor:
      editing && selected
        ? mapColors.TODO_EDITING
        : selected
        ? mapColors.TODO_SELECTED
        : mapColors.TODO,
    "&:hover + $text": {
      display: "block",
    },
  }),
});

interface TodoCellProps {
  width: number;
  cell: Cell;
  selected: boolean;
  editing: boolean;
  [rest: string]: any;
}

const TodoCell = observer(function TodoCell({ cell, ...props }: TodoCellProps) {
  const { todos } = useStores();
  const classes = useStyles(props);
  console.log(`cell:${cell.id}`);
  return (
    <div>
      <Rhombus {...props} className={classes.rhombus}></Rhombus>
      <Typography className={classes.text}>
        {/* {`todos:${todos.todos}`} */}
        {todos.todoById(cell.hasElement)?.name}
      </Typography>
    </div>
  );
});

export default TodoCell;
