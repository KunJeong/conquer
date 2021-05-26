//@ts-check
import { Box, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { useEffect } from "react";
import { Inspector, Map } from "../components";

const Index = observer(function Index() {
  const { cells, ui } = useStores();
  useEffect(() => {
    cells.getCells();
  }, []);

  return (
    <Box mx={2}>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Inspector />
        </Grid>
        <Grid item xs={8}>
          <Map />
        </Grid>
      </Grid>
    </Box>
  );
});

export default Index;
