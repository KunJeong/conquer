import {
  Box,
  makeStyles,
  Typography,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List,
} from "@material-ui/core";
import { Edit, More } from "@material-ui/icons";
// import { CommentIcon } from "@material-ui/icons";
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

const TodoRow = observer(function TodoRow({ todo }) {
  // const { todos } = useStores();

  const onClick = () => {
    todo.toggleComplete();
  };
  return (
    <ListItem role={undefined} dense button onClick={onClick}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={todo.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit">
          <Edit />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

const ListView = observer(function ListView() {
  const classes = useStyles();
  const { cells, ui, todos } = useStores();

  return (
    <Box>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Todo Items
      </Typography>
      <List>
        {todos.todos.map((todo) => {
          return <TodoRow todo={todo} />;
        })}
      </List>
    </Box>
  );
});

export default ListView;
