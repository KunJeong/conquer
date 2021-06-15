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
import { useStores } from "../../hooks";
import Image from "next/image";
import { mapDimensions } from "../../constants";

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
      <Grid container>
        <Typography variant="caption">Image</Typography>
        <Image
          src="/tower-red.png"
          width={120}
          height={120 * 2 * mapDimensions.sqrt1over3}
          priority
          // objectPosition="center bottom"
        />
      </Grid>
      <Grid container justify="flex-end">
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            // ui.setMode(Mode.AddingTodo);
            // let name = "item" + todos.count;
            let cellId = ui.selectedCell;
            // console.log(`found id: ${cellId}`);
            let todoId = uuidv4();
            cells.addTodo(cellId, todoId);
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
