//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { mapDimensions } from "../constants";

const useStyles = makeStyles({
<<<<<<< HEAD
  rhombus: ({ width, ...props }: { width: number; [rest: string]: any }) => ({
=======
  rhombus: (props: RhombusProps) => ({
>>>>>>> master
    ...props.style,
    // backgroundColor: "#ffffff",
    // boxSizing: "border-box",
    position: "absolute",
    pointerEvents: "visibleFill",
    // padding: '5px',
    // willChange: "transform",
    left: "50%",
<<<<<<< HEAD
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
=======
    bottom: "50%",
    // borderWidth: props.style.borderwidth * sqrt3,
    marginLeft: props.width * sqrt1over2 * -0.5 + "px",
    marginBottom: props.width * sqrt1over2 * -0.5 + "px",
    width: props.width * sqrt1over2 + "px",
    height: props.width * sqrt1over2 + "px",
    transform: `scale(1, ${sqrt1over3}) rotate(45deg)`,
    // borderRadius: '6px',

    // props.borderWidth * sqrt3 * sqrt1over2 + 'px',

    borderColor: "#000000",
>>>>>>> master
  }),
});

interface RhombusProps {
  width: number;
  [rest: string]: any;
}

<<<<<<< HEAD
function Rhombus(props: RhombusProps) {
  const classes = useStyles(props);
  return (
    <div {...props} className={`${classes.rhombus} ${props.className}`}>
      {props.children}
    </div>
=======
function Rhombus({ width = 120, ...props }: RhombusProps) {
  const classes = useStyles({ width, ...props });
  return (
    <div className={`${classes.rhombus} ${props.className}`} {...props}></div>
>>>>>>> master
  );
}

export default Rhombus;
