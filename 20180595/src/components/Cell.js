//@ts-check
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Rhombus from '../components/Rhombus';

const sqrt2 = 1.41421;
const sqrt1over2= 0.70711;
const sqrt3 = 1.73205;
const sqrt1over3 = 0.57735;

const useStyles = makeStyles({
  cell: props => ({
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderWidth: '3px',
    position: 'absolute',
    left: '50%',
    bottom: '50%',
    width: props.width + 'px',
    height: props.width * sqrt1over3 + 'px',
    marginLeft: props.width * (props.x - 1) * 0.5 + props.x * props.marginX + 'px',
	  marginBottom: (props.width * (props.y - 1) * 0.5 + props.y * props.marginX) * sqrt1over3 +'px',
  })
})

function Cell(props) {
  const classes = useStyles({x: props.i - props.j, y: props.i + props.j, ...props});
  return <div className={classes.cell}>
    <Rhombus
      width={props.width}
      backgroundColor={props.backgroundColor}
      
    ></Rhombus>
  </div>
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
  width: 160,
  marginX: 20,
}

export default Cell