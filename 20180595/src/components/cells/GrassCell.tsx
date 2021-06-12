//@ts-check
import Rhombus from "../Rhombus";
import { mapColors } from "../../constants";

interface GrassCellProps {
  width: number;
  [rest: string]: any;
}
function GrassCell(props: GrassCellProps) {
  return (
    <Rhombus
      {...props}
      style={{
        borderRadius: "0px",
        backgroundColor: props.selected
          ? mapColors.GRASS_SELECTED
          : mapColors.GRASS,
      }}
    ></Rhombus>
  );
}

export default GrassCell;
