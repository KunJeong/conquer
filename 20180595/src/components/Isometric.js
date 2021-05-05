import { observer } from 'mobx-react-lite'
import IsometricGrid from '../components/IsometricGrid';

const Isometric = observer(function Isometric({ store }) {
  return (
    <IsometricGrid
      width={600}
      height={600}
      childWidth={160}
      spacing={5}
      cells={store.allCells}
      store={store}/>
  )
})

export default Isometric