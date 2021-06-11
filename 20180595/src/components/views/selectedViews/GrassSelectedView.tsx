import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../../hooks/useStores";
import { Mode } from "../../../stores/UIStore";

const GrassSelectedView = observer(function GrassSelectedView() {
  const { cells, ui, todos } = useStores();

  return (
    <Box>
      <Button
        startIcon={<AddIcon />}
        onClick={() => {
          ui.setMode(Mode.AddingTodo);
          // let name = "item" + todos.count;
          // let cellId = cells.cells[ui.selection].id;
          // // console.log(`found id: ${cellId}`);
          // let todoId = uuidv4();
          // cells.addTodo(ui.selection, todoId);
          // todos.addTodo(name, todoId, cellId);
        }}
      >
        Add Todo
      </Button>
    </Box>
  );
});

export default GrassSelectedView;
