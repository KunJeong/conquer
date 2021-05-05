//@ts-check
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Rhombus from '../Rhombus';

function GrassCell(props) {
  return (
    <Rhombus
      style={{
        borderRadius: '0px',
        backgroundColor: '#ddef77'
      }}
      onClick={props.onClick}
      width={props.width}
      
      borderWidth={props.borderWidth}
    ></Rhombus>
  )
}

export default GrassCell