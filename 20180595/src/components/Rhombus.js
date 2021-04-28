//@ts-check
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const sqrt2 = 1.41421;
const sqrt1over2= 0.70711;
const sqrt3 = 1.73205;
const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  rhombus: props => ({
		backgroundColor: props.backgroundColor,
    boxSizing: 'border-box',
    position: 'absolute',
		left: '50%',
		bottom: '50%',
		marginLeft: props.width * sqrt1over2 * -0.5 + 'px',
		marginBottom: props.width * sqrt1over2 * -0.5 + 'px',
    transform: `scale(1, ${sqrt1over3}) rotate(45deg)`,
    width: props.width * sqrt1over2 + 'px',
    height: props.width * sqrt1over2 + 'px',
    borderStyle: 'solid',
    borderWidth: props.borderWidth * sqrt3 * sqrt1over2 + 'px'
  })
})

function Rhombus(props) {
  const classes = useStyles(props);
  return <div className={classes.rhombus}/>
}

Rhombus.defaultProps = {
  width: 160,
  borderWidth: 3,
  backgroundColor: '#af1234'
}

export default Rhombus