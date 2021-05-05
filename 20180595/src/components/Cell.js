//@ts-check
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Rhombus from '../components/Rhombus';
import AddCell from './cells/AddCell';
import GrassCell from './cells/GrassCell'

const sqrt2 = 1.41421;
const sqrt1over2= 0.70711;
const sqrt3 = 1.73205;
const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  cell: props => ({
    pointerEvents: 'none',
    position: 'absolute',
    willChange: 'transform',
    left: '50%',
    bottom: '50%',
    width: props.width + 'px',
    height: props.width * sqrt1over3 + 'px',
    marginLeft: props.width * (props.x + 1) * -0.5 - props.x * props.marginX + 'px',
	  marginBottom: (props.width * (props.y + 1) * -0.5 - props.y * props.marginX) * sqrt1over3 +'px',
  })
})

function Cell(props) {
  const classes = useStyles({x: props.i - props.j, y: props.i + props.j, ...props});
  if(props.type === 'add') return (
    <div className={classes.cell}>
      <AddCell
        style={props.style}
        onClick={props.onClick}
        width={props.width}
        backgroundColor={props.backgroundColor}
        borderWidth={props.borderWidth}
      ></AddCell>
    </div>
  )
  else if (props.type === 'grass') return (
    <div className={classes.cell}>
      <GrassCell
        style={props.style}
        onClick={props.onClick}
        width={props.width}
        backgroundColor={props.backgroundColor}
        borderWidth={props.borderWidth}
      ></GrassCell>
    </div>
  )
    
}

Cell.propTypes = {
  i: PropTypes.number,
  j: PropTypes.number,
  cell: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.number,
}

Cell.defaultProps = {
  i: 0,
  j: 0,
  type: 'empty',
  width: 160,
  marginX: 20,
}

export default Cell