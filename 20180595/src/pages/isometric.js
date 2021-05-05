import cellStore from '../stores/cellStore' 
import Isometric from '../components/Isometric';

export default function IsometricPage() {
  return (
    <Isometric store={cellStore}/>
  )
}
