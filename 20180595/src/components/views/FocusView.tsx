import { Box, makeStyles, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../hooks/useStores";

const useStyles = makeStyles({
  title: (props) => ({
    // ...props.style,
    fontSize: 18,
  }),
  seconds: (props) => ({
    // ...props.style,
    fontSize: 30,
  }),
  paper: {
    padding: "20px",
    textAlign: "center",
  },
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
    </Box>
  );
});

export default FocusView;
