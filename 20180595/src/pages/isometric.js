//@ts-check
import Rhombus from '../components/Rhombus';
import Cell from '../components/Cell';
import Anime, { anime } from 'react-animejs-wrapper';

export default function Isometric() {
  const [clickedI, setClickedI] = React.useState(0);
  const [clickedJ, setClickedJ] = React.useState(0);

  const animationRef = React.useRef(null)

  const onClick = (i, j) => {
    console.log(`${i}, ${j}`)
    setClickedI(i);
    setClickedJ(j);
    animationRef.current.restart();
  }
  var cells = [];

  for(var i=-5;i<=5;i++) {
    for (var j=-5;j<=5;j++) {
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
          marginX={10}>
      </Cell>
      )
    }
  }
  return (
    <Anime
      ref={animationRef}
      style={{
        width: 500, height: 400,
        backgroundColor: '#dddddd',
        position: 'relative',
        overflow: 'hidden'
      }}
      config={{
        targets: ".cell",
        translateY: [
          {value: -10, easing: 'easeOutExpo', duration: 500},
          {value: 0, easing: 'easeInOutQuad', duration: 700}
        ],
        // loop: true,
        // direction: 'alternate',
        delay: anime.stagger(150, {grid: [11, 11], start: 0, from: (clickedI+5)*11 + (clickedJ+5)}),
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)'
      }}
    >
      {cells}
    </Anime>
  )
}
