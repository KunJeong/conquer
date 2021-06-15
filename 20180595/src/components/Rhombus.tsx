//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { mapDimensions } from "../constants";

const useStyles = makeStyles({
  rhombus: ({ width, ...props }: { width: number; [rest: string]: any }) => ({
    ...props.style,
    // backgroundColor: "#ffffff",
    // boxSizing: "border-box",
    position: "absolute",
    pointerEvents: "visibleFill",
    // padding: '5px',
    // willChange: "transform",
    left: "50%",
    bottom: "0px",
    marginLeft: width * -0.5 * mapDimensions.sqrt1over2,
    marginBottom: `${
      -width * 0.5 * mapDimensions.sqrt1over2 +
      width * 0.5 * mapDimensions.sqrt1over3
    }px`,
    // width: width,
    // height: width * mapDimensions.sqrt1over3,
    width: width * mapDimensions.sqrt1over2 + "px",
    height: width * mapDimensions.sqrt1over2 + "px",
    transform: `scale(1, ${mapDimensions.sqrt1over3}) rotate(45deg)`,
  }),
});

interface RhombusProps {
  width: number;
  [rest: string]: any;
}

function Rhombus(props: RhombusProps) {
  const classes = useStyles(props);
  return (
    <div {...props} className={`${classes.rhombus} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Rhombus;
