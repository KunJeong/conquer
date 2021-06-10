//@ts-check
import { Box, Paper, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import React, { useEffect, useState } from "react";
import { Mode } from "../stores/UIStore";
import {
  FocusView,
  ListView,
  SelectedView,
  AddingTodoView,
  AddingTimerView,
} from "./views";

const useStyles = makeStyles({
  title: (props) => ({
    ...props.style,
    fontSize: 18,
  }),
  body: (props) => ({
    ...props.style,
    fontSize: 20,
  }),
  seconds: (props) => ({
    ...props.style,
    fontSize: 30,
  }),
  paper: {
    padding: "20px",
    textAlign: "center",
  },
});

function AddTodo(props) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const editTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Box>
        <TextField
          label="Title"
          value={title}
          onChange={editTitle}
          margin="normal"
        ></TextField>
        <Button onClick={props.addTodo(title)}>Create</Button>
      </Box>
    </Paper>
  );
}

const Inspector = observer(function Inspector() {
  const classes = useStyles();
  const { todos, cells, ui } = useStores();
  const seconds = new Date(ui.secondsRemaining * 1000)
    .toISOString()
    .substr(11, 8);

  // useEffect(() => {
  //   todos.getTodos();
  // }, []);
  const view = (mode: Mode) => {
    switch (mode) {
      case Mode.Focus:
        return <FocusView />;
      case Mode.Selected:
        return <SelectedView />;
      case Mode.AddingTodo:
        return <AddingTodoView />;
      case Mode.List:
        return <ListView />;
      case Mode.AddingTimer:
        return <AddingTimerView />;
    }
  };
  return (
    <Box>
      <Paper className={classes.paper} elevation={3}>
        {view(ui.mode)}
      </Paper>

      <Button
        onClick={() => {
          cells.initStore();
          todos.initStore();
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
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
