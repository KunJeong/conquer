//@ts-check
import Rhombus from "../Rhombus";
import { mapColors } from "../../constants";
import { useStores } from "../../hooks";
import { Mode } from "../../stores";
import { observer } from "mobx-react-lite";
interface GrassCellProps {
  width: number;
  [rest: string]: any;
}

const GrassCell = observer(function GrassCell(props: GrassCellProps) {
  const { ui } = useStores();
  return (
    <Rhombus
      {...props}
      style={{
        borderStyle: "dashed",
        borderColor: mapColors.BORDER,
        borderWidth: props.selected && ui.mode == Mode.Edit ? "4px" : "0px",
        backgroundColor: props.selected
          ? ui.mode == Mode.Edit
            ? mapColors.GRASS_EDITING
            : mapColors.GRASS_SELECTED
          : mapColors.GRASS,
      }}
    ></Rhombus>
  );
});

export default GrassCell;
