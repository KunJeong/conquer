//@ts-check
import Rhombus from "./Rhombus";
import { mapColors } from "../../../constants";
import { useStores } from "../../../hooks";
import { Mode } from "../../../stores";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  rhombus: ({ selected, editing, ...props }: GrassCellProps) => ({
    borderStyle: "dashed",
    borderColor: mapColors.BORDER_EDITING,
    borderWidth: editing && selected ? "4px" : "0px",
    backgroundColor:
      editing && selected
        ? mapColors.GRASS_EDITING
        : selected
        ? mapColors.GRASS_SELECTED
        : mapColors.GRASS,
  }),
});

interface GrassCellProps {
  width: number;
  selected: boolean;
  editing: boolean;
  [rest: string]: any;
}

const GrassCell = observer(function GrassCell(props: GrassCellProps) {
  const classes = useStyles(props);
  return <Rhombus {...props} className={classes.rhombus}></Rhombus>;
});

export default GrassCell;
