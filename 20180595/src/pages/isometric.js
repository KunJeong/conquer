import { render } from 'react-dom';
import IsometricGrid from '../components/IsometricGrid';

export default function Isometric(){
  return (
    <IsometricGrid
      width={600}
      height={600}
      childWidth={160}
      spacing={10}/>
  )
}