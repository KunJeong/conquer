import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStores } from "../../hooks/useStores";
import { Mode } from "../../stores/UIStore";

const AddingTimerView = observer(function AddingTimerView() {
  const { cells, ui, todos } = useStores();
  const [name, setName] = useState("");

  return (
    <Box component="span" display="block">
      <Grid container justify="flex-start"></Grid>
      <Grid container justify="flex-end">
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            let cell = cells.cells[ui.selection];
            cells.startTimer(cell.i, cell.j);
            ui.startTimer();

            const interval = setInterval(() => {
              if (ui.mode == Mode.Focus) ui.decreaseTimer();
              else {
                ui.select(-1, cell.i, cell.j);
                cells.addCell(cell.i, cell.j);
                clearInterval(interval);
              }
            }, 1000);
          }}
        >
          Add Timer
        </Button>
      </Grid>
    </Box>
  );
});

export default AddingTimerView;
