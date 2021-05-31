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

const ListView = observer(function ListView() {
  const classes = useStyles();
  const { cells, ui, todos } = useStores();

  return (
    <Box>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Todo Items
      </Typography>
      {todos.todos.map((todo) => {
        return <Box>{`name: ${todo.name}, id: ${todo.id}`}</Box>;
      })}
    </Box>
  );
});

export default ListView;
