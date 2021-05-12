//@ts-check
import PropTypes from 'prop-types';
import Cell from './Cell';
import Anime, { anime } from 'react-animejs-wrapper';
import {observer} from 'mobx-react-lite';
import { useStores } from '../hooks/useStores';

const sqrt3 = 1.73205;

function _IsometricGrid(props) {
  const { cells } = useStores()
  const [clickedI, setClickedI] = React.useState(0);
  const [clickedJ, setClickedJ] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const animationRef = React.useRef(null)

  const halfSpan = Math.max(
    Math.floor(props.width / props.childWidth),
    Math.floor(props.height * sqrt3 / props.childWidth)
  );
  const totalSpan = halfSpan * 2 + 1;
  console.log(`width: ${props.width}, child: ${props.childWidth}`)

  console.log(`half: ${halfSpan}, total: ${totalSpan}`)

  const onClick = (i, j, index) => {
    animationRef.current.restart();
    // if(props.onClickCell) props.onClickCell(i, j);
    console.log(`clicked: ${i}, ${j}, ${index}`)
    setClickedI(i);
    setClickedJ(j);
    setIndex(index)
  }

  const {minI, minJ, maxI, maxJ} = cells.mapSize
  const iSize = maxI - minI + 1
  const jSize = maxJ - minJ + 1
  console.log(`size: ${iSize}, ${jSize}`)
  console.log(`selected 0, 0: ${(0-minI)*iSize + 0-minJ + 1}`)
  
  return (
    <Anime
      ref={animationRef}
      style={{
        width: props.width, height: props.height,
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        willChange: 'transform',
      }}
      config={{
        targets: ".cell",
        // translateY: [
        //   {value: -20, easing: 'easeOutExpo', duration: 300},
        //   {value: 0, easing: 'easeInOutQuad', duration: 700}
        // ],
        scale: [1, 0.5, 1],
        // loop: true,
        // direction: 'alternate',
        // autoplay: false,
        delay: anime.stagger(100, {grid: [4, 4], start: 0, from: index}),
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)'
      }}
    >
      {props.cells.map((cell, index) => {
        // console.log(`inmap index: ${index}`);
        // const newi = index;
        return (<Cell
          key={cell.i * 2 + cell.j}
          classes={{ cell: 'cell'}}
          width={120}
          type={cell.type}
          i={cell.i}
          j={cell.j}
          onClick={()=>onClick(cell.i, cell.j, index)}
          backgroundColor='#ddef77'
          borderWidth={0}
          marginX={props.spacing}>
        </Cell>)
      })}
    </Anime>
  )
}

_IsometricGrid.defaultProps = {
  width: 500,
  height: 400,
  childwidth: 80,
  spacing: 100,
  cells: [
    {_id: '1', i: 0, j: 0},
    {_id: '2', i: 1, j: 0},
    {_id: '3', i: 0, j: 1},
    {_id: '4', i: 1, j: 1},
  ]
}

const IsometricGrid = observer(_IsometricGrid)


export default IsometricGrid