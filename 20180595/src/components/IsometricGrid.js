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
    console.log(`${i}, ${j}`)
    setClickedI(i);
    setClickedJ(j);
    animationRef.current.restart();
  }
  var cells = [];

  for(var i=-halfSpan;i<=halfSpan;i++) {
    for (var j=-halfSpan;j<=halfSpan;j++) {
      const curI = i;
      const curJ = j;
      cells.push(
        <Cell
          key={i*11 + j}
          classes={{ cell: 'cell'}}
          width={120}
          i={curI}
          j={curJ}
          onClick={()=>onClick(curI, curJ)}
          backgroundColor='#7ec850'
          borderWidth={0}
          marginX={props.spacing}>
      </Cell>
      )
    }
  }
  return (
    <Anime
      ref={animationRef}
      style={{
        width: props.width, height: props.height,
        backgroundColor: '#dddddd',
        position: 'relative',
        overflow: 'hidden'
      }}
      config={{
        targets: ".cell",
        translateY: [
          {value: -10, easing: 'easeOutExpo', duration: 300},
          {value: 0, easing: 'easeInOutQuad', duration: 700}
        ],
        // loop: true,
        // direction: 'alternate',
        // autoplay: false,
        delay: anime.stagger(150, {grid: [totalSpan, totalSpan], start: 0, from: (clickedI+halfSpan)*(totalSpan) + (clickedJ+halfSpan)}),
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)'
      }}
    >
      {cells}
    </Anime>
  )
}

IsometricGrid.defaultProps = {
  width: 500,
  height: 400,
  childwidth: 80
}

export default IsometricGrid