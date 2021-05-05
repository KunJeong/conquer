//@ts-check
import PropTypes from 'prop-types';
import Cell from './Cell';
import Anime, { anime } from 'react-animejs-wrapper';

const sqrt3 = 1.73205;

function IsometricGrid(props) {
  const [clickedI, setClickedI] = React.useState(0);
  const [clickedJ, setClickedJ] = React.useState(0);

  const animationRef = React.useRef(null)

  const halfSpan = Math.max(
    Math.floor(props.width / props.childWidth),
    Math.floor(props.height * sqrt3 / props.childWidth)
  );
  const totalSpan = halfSpan * 2 + 1;
  console.log(`width: ${props.width}, child: ${props.childWidth}`)

  console.log(`half: ${halfSpan}, total: ${totalSpan}`)

  const onClick = (i, j) => {
    animationRef.current.restart();
    if(props.onClickCell) props.onClickCell(i, j);
    console.log(`${i}, ${j}`)
    setClickedI(i);
    setClickedJ(j);
  }
  // var cells = [];

  // for(var i=-halfSpan;i<=halfSpan;i++) {
  //   for (var j=-halfSpan;j<=halfSpan;j++) {
  //     const curI = i;
  //     const curJ = j;
  //     cells.push(
  //       <Cell
  //         key={i*11 + j}
  //         classes={{ cell: 'cell'}}
  //         width={120}
  //         i={curI}
  //         j={curJ}
  //         onClick={()=>onClick(curI, curJ)}
  //         backgroundColor='#ddef77'
  //         borderWidth={0}
  //         marginX={props.spacing}>
  //     </Cell>
  //     )
  //   }
  // }
      
      
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
        translateY: [
          {value: -20, easing: 'easeOutExpo', duration: 300},
          {value: 0, easing: 'easeInOutQuad', duration: 700}
        ],
        // loop: true,
        // direction: 'alternate',
        // autoplay: false,
        delay: anime.stagger(150, {grid: [2, 2], start: 0, from: clickedI*2 + clickedJ}),
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)'
      }}
    >
      {props.cells.map((cell) => (
        <Cell
          key={cell.i * 2 + cell.j}
          classes={{ cell: 'cell'}}
          width={120}
          type={cell.type}
          i={cell.i}
          j={cell.j}
          onClick={()=>onClick(cell.i, cell.j)}
          backgroundColor='#ddef77'
          borderWidth={0}
          marginX={props.spacing}>
        </Cell>
      ))}
    </Anime>
  )
}

IsometricGrid.defaultProps = {
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

export default IsometricGrid