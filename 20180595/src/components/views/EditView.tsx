import { Box, makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";

const useStyles = makeStyles({
  title: {
    fontSize: 18,
  },
  body: {
    fontSize: 14,
  },
});

const FocusView = observer(function FocusView() {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Map Edit Mode
      </Typography>
      <Typography className={classes.body} color="textSecondary" gutterBottom>
        Select a cell to highlight it, <br />
        then select a destination.
        <br />
        You can click empty space to de-select.
      </Typography>
    </Box>
  );
});

export default FocusView;
