import { Box, makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Add, Cancel, Stop } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../hooks";

const useStyles = makeStyles({
  title: (props) => ({
    // ...props.style,
    fontSize: 18,
  }),
  seconds: (props) => ({
    // ...props.style,
    fontSize: 30,
  }),
});

const FocusView = observer(function FocusView() {
  const classes = useStyles();
  const { ui } = useStores();

  const seconds = new Date(ui.secondsRemaining * 1000)
    .toISOString()
    .substr(11, 8);
  return (
    <Box>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Focus on a task for {ui.secondsTotal} seconds!
      </Typography>
      <Typography
        className={classes.seconds}
        color="textSecondary"
        gutterBottom
      >
        {seconds}
      </Typography>
      <Grid container justify="flex-end">
        <Button
          startIcon={<Cancel />}
          onClick={() => {
            ui.stopTimer();
          }}
          color="secondary"
        >
          Cancel Timer
        </Button>
      </Grid>
    </Box>
  );
});

export default FocusView;
