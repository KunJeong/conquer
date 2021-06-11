//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Rhombus from "../Rhombus";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { useStores } from "../../hooks/useStores";
import { Cell } from "../../stores";

const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  text: (props: TodoCellProps) => ({
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
    display: props.selected ? "block" : "none",
    transform: `scale(1, ${sqrt1over3}) rotate(45deg)`,
    color: "#ffffff",
  }),
  rhombus: (props) => ({
    backgroundColor: props.selected ? "#e174ff" : "#ad14da",
    "&:hover + $text": {
      display: "block",
    },
  }),
});

interface TodoCellProps {
  cell: Cell;
  width: number;
  selected: boolean;
  [rest: string]: any;
}

const TodoCell = observer(function TodoCell({ cell, ...props }: TodoCellProps) {
  const { todos } = useStores();
  const classes = useStyles({ cell, ...props });
  console.log(`cell:${cell.id}`);
  return (
    <div>
      <Rhombus
        className={classes.rhombus}
        onClick={() => {
          props.onClick();
        }}
        {...props}
      ></Rhombus>
      <Typography className={classes.text}>
        {/* {`todos:${todos.todos}`} */}
        {todos.todoById(props.cell.hasElement)?.name}
      </Typography>
    </div>
  );
});

export default TodoCell;
