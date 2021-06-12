//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Rhombus from "../Rhombus";

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
        backgroundColor: props.selected ? "#eeff99" : "#ddef77",
      }}
    ></Rhombus>
  );
}

export default GrassCell;
