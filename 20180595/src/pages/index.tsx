//@ts-check
import { Box, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { autorun, toJS } from "mobx";
import { useStores } from "../hooks";
import { useEffect } from "react";
import { Inspector, Map } from "../components";
import { mapColors } from "../constants";

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
      <Grid
        container
        spacing={2}
        // alignItems="center"
        justify="center"
      >
        <Grid item xs={4}>
          {/* <Box m={2}></Box> */}
          <Inspector />
        </Grid>
        <Grid item xs={8} style={{ height: "100vh" }}>
          <Map />
        </Grid>
      </Grid>
    </Box>
  );
});

export default Index;
