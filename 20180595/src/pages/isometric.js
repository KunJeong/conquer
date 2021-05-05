import { render } from 'react-dom';
import IsometricGrid from '../components/IsometricGrid';

export default function Isometric(){
  return (
    <IsometricGrid
      width={600}
      height={600}
      childWidth={160}
      spacing={5}
      cells={[
        {_id: '1', type: 'grass', i: 0, j: 0},
        {_id: '2', type: 'grass', i: 0, j: 1},
        {_id: '3', type: 'add', i: 1, j: 0},
        {_id: '4', type: 'add', i: 1, j: 1},
      ]}/>
  )
}