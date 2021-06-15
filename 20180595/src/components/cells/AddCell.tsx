//@ts-check
import { makeStyles, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Rhombus from "../Rhombus";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { Mode } from "../../stores";
import { mapColors } from "../../constants";

const useStyles = makeStyles({
  plus: (props: { selected: boolean; [rest: string]: any }) => ({
    position: "absolute",
    color: "#777777",
    left: "50%",
    bottom: "25%",
    width: "30px",
    height: props.width >= 150 ? "30px" : "20px",
    textAlign: "center",
    lineHeight: props.width >= 150 ? "30px" : "20px",
    marginLeft: "-15px",
    marginBottom: props.width >= 150 ? "-15px" : "-10px",
    display: "none",
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
    display: editing ? "none" : "block",
    borderRadius: "15px",
    backgroundColor: selected && !editing ? mapColors.ADD_SELECTED : "",
    "&:hover": {
      borderRadius: "15px",
      backgroundColor: mapColors.ADD_HOVER,
    },
    "&:hover + $plus": {
      display: "block",
    },
  }),
});

interface AddCellProps {
  width: number;
  selected: boolean;
  editing: boolean;
  [rest: string]: any;
}

const AddCell = observer(function AddCell(props: AddCellProps) {
  const { ui } = useStores();
  const classes = useStyles(props);
  return (
    <div>
      <Rhombus
        {...props}
        className={classes.rhombus}
        onClick={() => {
          props.onClick();
          ui.setMode(Mode.AddingTimer);
        }}
      ></Rhombus>
      <AddIcon className={classes.plus} />
    </div>
  );
});

export default AddCell;
