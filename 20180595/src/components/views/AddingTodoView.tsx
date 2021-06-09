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

const AddingTodoView = observer(function AddingTodoView() {
  const { cells, ui, todos } = useStores();
  const [name, setName] = useState("");

  return (
    <Box component="span" display="block">
      <Grid container justify="flex-start">
        <TextField
          id="outlined-textarea"
          label="Todo Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid container justify="flex-end">
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            // ui.setMode(Mode.AddingTodo);
            // let name = "item" + todos.count;
            let cellId = cells.cells[ui.selection].id;
            // console.log(`found id: ${cellId}`);
            let todoId = uuidv4();
            cells.addTodo(ui.selection, todoId);
            todos.addTodo(name, todoId, cellId);
          }}
        >
          Add Todo
        </Button>
      </Grid>
    </Box>
  );
});

export default AddingTodoView;
