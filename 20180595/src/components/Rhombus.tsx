//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const sqrt2 = 1.41421;
const sqrt1over2 = 0.70711;
const sqrt3 = 1.73205;
const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  rhombus: (props: RhombusProps) => ({
    ...props.style,
    // backgroundColor: props.backgroundColor,
    boxSizing: "border-box",
    position: "absolute",
    pointerEvents: "visibleFill",
    // padding: '5px',
    // willChange: 'transform',
    left: "50%",
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
  }),
});

interface RhombusProps {
  width: number;
  [rest: string]: any;
}

function Rhombus({ width = 120, ...props }: RhombusProps) {
  const classes = useStyles({ width, ...props });
  return (
    <div className={`${classes.rhombus} ${props.className}`} {...props}></div>
  );
}

export default Rhombus;
