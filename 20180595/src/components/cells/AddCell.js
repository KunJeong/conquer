//@ts-check
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import Rhombus from '../Rhombus';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx'
import { useStores } from '../../hooks/useStores';

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
    // pointerEvents: 'none',
		textAlign: 'center',
    lineHeight: '30px',
    marginLeft: '-15px',
    marginBottom: '-15px',
    display: 'none',
  }),
  rhombus: {
    // backgroundColor: '#f3f3f3',
    '&:hover': {
      // borderStyle: 'dashed',
      // borderColor: '#777777',
      borderRadius: '10px',
      backgroundColor: '#f3f3f3'
    },
    '&:hover + $plus': {
      display: 'block'
    }
  }
})

const AddCell = observer(function AddCell(props) {
  const { cells } = useStores();
  const classes = useStyles();
  console.log(`cells: ${cells}`)
  return (
    <div>
      <Rhombus
        className={classes.rhombus}
        onClick={() => {
          props.onClick();
          cells.addCell(props.i, props.j)
        }}
        width={props.width}
        borderWidth={props.borderWidth}
      ></Rhombus>
      <AddIcon className={classes.plus}/>
    </div>

  )
})

export default AddCell