//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Rhombus from "../Rhombus";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { useStores } from "../../hooks/useStores";

const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  text: (props) => ({
    ...props.style,
    position: "absolute",
    fontSize: "12pt",
    color: "#777777",
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

const TodoCell = observer(function AddCell(props) {
  const { cells, todos } = useStores();
  const classes = useStyles(props);
  console.log(`cells: ${cells}`);
  return (
    <div>
      <Rhombus
        className={classes.rhombus}
        onClick={() => {
          props.onClick();
        }}
        width={props.width}
        borderWidth={props.borderWidth}
      ></Rhombus>
      <Typography className={classes.text}>
        {todos.todoById(props.cell.id).name}
      </Typography>
    </div>
  );
});

export default TodoCell;
