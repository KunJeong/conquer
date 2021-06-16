import {
  Box,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStores } from "../../hooks";

const AddingTimerView = observer(function AddingTimerView() {
  const { cells, ui } = useStores();
  const [time, setTime] = useState(0.1);

  const onChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <Box component="span" display="block">
      <Grid container justify="flex-start">
        <FormControl>
          <InputLabel id="timerSelect">Focus Length</InputLabel>
          <Select labelId="timerSelect" value={time} onChange={onChange}>
            <MenuItem value={0.1}>Six Seconds</MenuItem>
            <MenuItem value={15}>Fifteen Minutes</MenuItem>
            <MenuItem value={30}>Thirty Minutes</MenuItem>
            <MenuItem value={60}>One Hour</MenuItem>
            <MenuItem value={120}>Two Hours</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container justify="flex-end">
        <Button
          color="primary"
          startIcon={<PlayArrow />}
          onClick={() => {
            let cell = cells.cellById(ui.selectedCell);
            cells.startTimer(ui.selectedCell);
            ui.startTimer(time, cell.id);
            ui.runTimer(cell.id);
          }}
        >
          Start Timer
        </Button>
      </Grid>
    </Box>
  );
});

export default AddingTimerView;
