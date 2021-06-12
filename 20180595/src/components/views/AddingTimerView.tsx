import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStores } from "../../hooks/useStores";
import { Mode } from "../../stores/UIStore";

const AddingTimerView = observer(function AddingTimerView() {
  const { cells, ui, todos } = useStores();
  const [time, setTime] = useState(0.1);

  const onChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <Box component="span" display="block">
      <Grid container justify="flex-start">
        <Select value={time} onChange={onChange}>
          <MenuItem value={0.1}>Six Seconds</MenuItem>
          <MenuItem value={15}>Fifteen Minutes</MenuItem>
          <MenuItem value={30}>Thirty Minutes</MenuItem>
          <MenuItem value={60}>One Hour</MenuItem>
          <MenuItem value={120}>Two Hours</MenuItem>
        </Select>
      </Grid>
      <Grid container justify="flex-end">
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            let cell = cells.cellById(ui.selectedCell);
            cells.startTimer(ui.selectedCell);
            ui.startTimer(time);

            const interval = setInterval(() => {
              if (ui.mode == Mode.Focus) ui.decreaseTimer();
              else {
                console.log(`added: ${cell.id}`);
                ui.select(cell.id);
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
