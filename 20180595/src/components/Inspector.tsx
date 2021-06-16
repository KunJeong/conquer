//@ts-check
import { Box, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import React from "react";
import { Mode } from "../stores";
import {
  FocusView,
  ListView,
  SelectedView,
  AddingTodoView,
  AddingTimerView,
  EditView,
} from "./views";

const useStyles = makeStyles({
  title: {
    fontSize: 18,
  },
  body: {
    fontSize: 20,
  },
  seconds: {
    fontSize: 30,
  },
  paper: {
    padding: "20px",
    textAlign: "center",
  },
});

interface InspectorProps {
  [rest: string]: any;
}

const Inspector = observer(function Inspector(props: InspectorProps) {
  const classes = useStyles();
  const { todos, cells, ui } = useStores();

  const view = (mode: Mode) => {
    switch (mode) {
      case Mode.Focus:
        return <FocusView />;
      case Mode.Selected:
        return <SelectedView cell={cells.cellById(ui.selectedCell)} />;
      case Mode.AddingTodo:
        return <AddingTodoView />;
      case Mode.List:
        return <ListView />;
      case Mode.AddingTimer:
        return <AddingTimerView />;
      case Mode.Edit:
        return <EditView />;
    }
  };
  return (
    <Box {...props}>
      <Paper className={classes.paper} elevation={2}>
        {view(ui.mode)}
      </Paper>
      {/* DEBUG */}
      <Button
        color="secondary"
        onClick={() => {
          ui.deselect();
          cells.initStore();
          todos.initStore();
        }}
      >
        Reset
      </Button>
      {/* DEBUG */}
      <Button
        color="secondary"
        onClick={() => {
          ui.deselect();
          cells.getCells();
          todos.getTodos();
        }}
      >
        Get
      </Button>
    </Box>
  );
});

export default Inspector;
