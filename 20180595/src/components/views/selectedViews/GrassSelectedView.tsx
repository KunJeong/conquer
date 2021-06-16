import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../../hooks";
import { Mode } from "../../../stores/UIStore";

const GrassSelectedView = observer(function GrassSelectedView() {
  const { ui } = useStores();

  return (
    <Box>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          ui.setMode(Mode.AddingTodo);
        }}
      >
        Add Todo
      </Button>
    </Box>
  );
});

export default GrassSelectedView;
