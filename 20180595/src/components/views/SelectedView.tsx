import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../hooks/useStores";

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

const SelectedView = observer(function SelectedView() {
  const classes = useStyles();
  const { cells, ui, todos } = useStores();

  return (
    <Box>
      <Button
        startIcon={<AddIcon />}
        onClick={() => {
          // let id = uuidv4();
          // console.log(`addingid:${id}`);
          console.log("YYAYAYAYAYYA");
          let name = "item" + todos.count;
          let id = cells.cells[ui.selection].id;
          console.log(`found id: ${id}`);
          cells.addTodo(ui.selection);
          todos.addTodo(name, id);
        }}
      >
        Add Todo Yay!!!
      </Button>
    </Box>
  );
});

export default SelectedView;
