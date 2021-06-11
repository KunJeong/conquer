//@ts-check
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Rhombus from "../Rhombus";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { Mode } from "../../stores";
import { mapColors } from "../../constants";

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
    "&:hover": {
      borderRadius: "10px",
      backgroundColor: mapColors.BACKGROUND_HOVER,
    },
    "&:hover + $plus": {
      display: "block",
    },
  },
});

interface AddCellType {
  width: number;
  [rest: string]: any;
}

const AddCell = observer(function AddCell({ ...props }: AddCellType) {
  const { ui } = useStores();
  const classes = useStyles();
  return (
    <div>
      <Rhombus
        className={classes.rhombus}
        onClick={() => {
          props.onClick();
          ui.setMode(Mode.AddingTimer);
        }}
        {...props}
        // borderWidth={props.borderWidth}
      ></Rhombus>
      <AddIcon className={classes.plus} />
    </div>
  );
});

export default AddCell;
