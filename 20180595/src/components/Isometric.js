import { observer } from 'mobx-react-lite'
import { useStores } from '../hooks/useStores'
import IsometricGrid from '../components/IsometricGrid';

const Isometric = observer(function Isometric({ store }) {
  const { cells } = useStores()
  return (
    <IsometricGrid
      width={600}
      height={600}
      childWidth={160}
      spacing={5}
      cells={cells.allCells}/>
  )
})

export default Isometric