import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import IsometricGrid from "./IsometricGrid";

const Isometric = observer(function Isometric() {
  const { cells } = useStores();
  return (
    <IsometricGrid
      width={600}
      height={600}
      childWidth={160}
      spacing={5}
      cells={cells.sortedCells}
    />
  );
});

export default Isometric;
