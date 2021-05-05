import { observer } from 'mobx-react-lite'
import IsometricGrid from '../components/IsometricGrid';

const Isometric = observer(function Isometric({ cells }) {
  return (
    <IsometricGrid
      width={600}
      height={600}
      childWidth={160}
      spacing={5}
      cells={cells.groundCells}/>
  )
})

export default Isometric