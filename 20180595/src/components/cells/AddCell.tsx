//@ts-check
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Rhombus from "../Rhombus";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { Mode } from "../../stores/UIStore";

const useStyles = makeStyles({
  plus: (props) => ({
    // ...props.style,
    position: "absolute",
    // fontWeight: 'bold',
    fontSize: "20pt",
    color: "#777777",
    left: "50%",
    bottom: "50%",
    width: "30px",
    height: "30px",
    // pointerEvents: 'none',
    textAlign: "center",
    lineHeight: "30px",
    marginLeft: "-15px",
    marginBottom: "-15px",
    display: "none",
  }),
  rhombus: {
    // backgroundColor: '#f3f3f3',
    "&:hover": {
      // borderStyle: 'dashed',
      // borderColor: '#777777',
      borderRadius: "10px",
      backgroundColor: "#f3f3f3",
    },
    "&:hover + $plus": {
      display: "block",
    },
  },
});

const AddCell = observer(function AddCell(props) {
  const { cells, ui } = useStores();
  const classes = useStyles();
  return (
    <div>
      <Rhombus
        className={classes.rhombus}
        onClick={() => {
          props.onClick();
          cells.startTimer(props.i, props.j);
          ui.startTimer();

          const interval = setInterval(() => {
            if (ui.mode == Mode.Focus) ui.decreaseTimer();
            else {
              ui.select(props.index, props.i, props.j);
              cells.addCell(props.i, props.j);
              clearInterval(interval);
            }
          }, 1000);
        }}
        width={props.width}
        borderWidth={props.borderWidth}
      ></Rhombus>
      <AddIcon className={classes.plus} />
    </div>
  );
});

export default AddCell;
