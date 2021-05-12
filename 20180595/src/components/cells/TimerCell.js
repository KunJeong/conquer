//@ts-check
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import HourglassIcon from '@material-ui/icons/HourglassEmptyRounded'
import Rhombus from '../Rhombus';
import Anime, { anime } from 'react-animejs-wrapper';
// import { useStores } from '../../hooks/useStores';


const useStyles = makeStyles({
  plus: props => ({
    ...props.style,
    position: 'absolute',
    // fontWeight: 'bold',
    fontSize: '20pt',
    color: '#777777',
    left: '50%',
		bottom: '50%',
    width: '30px',
    height: '30px',
		textAlign: 'center',
    lineHeight: '30px',
    marginLeft: '-15px',
    marginBottom: '-15px',
  }),
  rhombus: {
    background: `linear-gradient(45deg, #ddef77, 40%, #ddef77, 40%, #f3f3f3)`,
    borderWidth: '0px'
  }
})
function TimerCell(props) {
  const classes = useStyles();
  return (
    <div>
      <Rhombus
        onClick={props.onClick}
        className={classes.rhombus}
        width={props.width}
        borderWidth={props.borderWidth}
      ></Rhombus>
      <Anime
    config={{
      rotate: '1turn',
      duration: 800,
      easing: 'spring(1, 80, 11, 0)',
      loop: true,
    }}
    >
      <HourglassIcon className={classes.plus}/>
      </Anime>
    </div>
  )
}

export default TimerCell