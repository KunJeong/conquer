//@ts-check
import { Box, Grid, Paper, IconButton } from "@material-ui/core";
import { Add, Remove, Edit, Done } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import { autorun, toJS } from "mobx";
import { useStores } from "../hooks";
import { useEffect } from "react";
import { Inspector, Map } from "../components";
import { mapColors } from "../constants";
import { Mode } from "../stores";
import MapControls from "../components/MapControls";

const Index = observer(function Index() {
  const { todos, cells, ui } = useStores();
  useEffect(() => {
    cells.getCells();
    todos.getTodos();
  }, []);
  autorun(() => {
    console.log(toJS(cells.cells));
    console.log(toJS(todos.todos));
  });

  return (
    <Box p={2} height="100vh" overflow="hidden" bgcolor={mapColors.BACKGROUND}>
      <Inspector
        style={{
          zIndex: 400,
          position: "absolute",
          width: "25vw",
          left: "16px",
        }}
      />
      <MapControls
        style={{ zIndex: 400, position: "absolute", right: "16px" }}
      />
      <Map />
    </Box>
  );
});

export default Index;
