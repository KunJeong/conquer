//@ts-check
import Rhombus from '../components/Rhombus';
import Cell from '../components/Cell';
import Anime, { anime } from 'react-animejs-wrapper';

export default function Isometric() {
  return (
    <Anime
      style={{
        width: 500, height: 400,
        backgroundColor: '#dddddd',
        position: 'relative',
        overflow: 'hidden'
      }}
      config={{
        targets: ".cell",
        scale: [
          {value: .8, easing: 'easeOutSine', duration: 500},
          {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        loop: true,
        delay: anime.stagger(100, {grid: [3, 3], from: 'last'}),
        duration: 1000
      }}
    >
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={0}
        j={0}
        backgroundColor='#af1234'
        borderWidth={4}>
      </Cell>
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={1}
        j={0}
        backgroundColor='#123456'
        borderWidth={4}>
      </Cell>
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={2}
        j={0}
        backgroundColor='#444444'
        borderWidth={4}>
      </Cell>
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={0}
        j={1}
        backgroundColor='#afafaf'
        borderWidth={4}>
      </Cell>
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={1}
        j={1}
        backgroundColor='#afafaf'
        borderWidth={4}>
      </Cell>
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={2}
        j={1}
        backgroundColor='#afafaf'
        borderWidth={4}>
      </Cell>
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={0}
        j={2}
        backgroundColor='#afafaf'
        borderWidth={4}>
      </Cell>
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={1}
        j={2}
        backgroundColor='#afafaf'
        borderWidth={4}>
      </Cell>
      <Cell
        classes={{ cell: 'cell'}}
        width={120}
        i={2}
        j={2}
        backgroundColor='#afafaf'
        borderWidth={4}>
      </Cell>
    </Anime>
  )
}
