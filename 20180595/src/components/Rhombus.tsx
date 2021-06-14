//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { mapDimensions } from "../constants";

const useStyles = makeStyles({
  rhombus: (props: { width: number; [rest: string]: any }) => ({
    ...props.style,
    // backgroundColor: props.backgroundColor,
    boxSizing: "border-box",
    position: "absolute",
    pointerEvents: "visibleFill",
    // padding: '5px',
    // willChange: 'transform',
    left: "50%",
    bottom: "50%",
    // border: '3px dashed',
    marginLeft: props.width * mapDimensions.sqrt1over2 * -0.5 + "px",
    marginBottom: props.width * mapDimensions.sqrt1over2 * -0.5 + "px",
    width: props.width * mapDimensions.sqrt1over2 + "px",
    height: props.width * mapDimensions.sqrt1over2 + "px",
    transform: `scale(1, ${mapDimensions.sqrt1over3}) rotate(45deg)`,
    // borderRadius: '6px',

    // props.borderWidth * sqrt3 * sqrt1over2 + 'px',

    borderColor: "#000000",
  }),
});

function Rhombus(props) {
  const classes = useStyles(props);
  return (
    <div {...props} className={`${classes.rhombus} ${props.className}`}></div>
  );
}

export default Rhombus;
