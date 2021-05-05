//@ts-check
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const sqrt2 = 1.41421;
const sqrt1over2= 0.70711;
const sqrt3 = 1.73205;
const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  rhombus: props => ({
    ...props.style,
		// backgroundColor: props.backgroundColor,
    boxSizing: 'border-box',
    position: 'absolute',
    pointerEvents: 'visibleFill',
    // padding: '5px',
    // willChange: 'transform',
		left: '50%',
		bottom: '50%',
    // border: '3px dashed',
		marginLeft: props.width * sqrt1over2 * -0.5 + 'px',
		marginBottom: props.width * sqrt1over2 * -0.5 + 'px',
    width: props.width * sqrt1over2 + 'px',
    height: props.width * sqrt1over2 + 'px',
    transform: `scale(1, ${sqrt1over3}) rotate(45deg)`,
    // borderRadius: '6px',
    
    // props.borderWidth * sqrt3 * sqrt1over2 + 'px',
    
    borderColor: '#000000'
  })
})

function Rhombus(props) {
  const classes = useStyles(props);
  return <div
    onClick={props.onClick}
    className={`${classes.rhombus} ${props.className}`}
  ></div>
}

Rhombus.defaultProps = {
  width: 160,
  borderWidth: 3,
  backgroundColor: '#af1234'
}

export default Rhombus