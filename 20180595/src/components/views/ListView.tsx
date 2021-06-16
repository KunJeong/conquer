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
import { Edit } from "@material-ui/icons";
// import { CommentIcon } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../hooks";
import { Todo } from "../../stores";

const useStyles = makeStyles({
  title: {
    fontSize: 18,
  },
});

interface TodoRowProps {
  todo: Todo;
  [rest: string]: any;
}
const TodoRow = observer(function TodoRow({ todo, ...props }: TodoRowProps) {
  const { ui } = useStores();

  const onClick = () => {
    ui.selectWithoutModeChange(todo.onCell);
    ui.panToCell(todo.onCell);
    // ui.panToCell(cells.cellById(todo.onCell).i, cells.cellById(todo.onCell).j);
  };

  const onEdit = () => {
    ui.select(todo.onCell);
    ui.setEditing(true);
  };
  return (
    <ListItem dense button onClick={onClick}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          color="primary"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
          onClick={() => todo.setComplete(!todo.completed)}
        />
      </ListItemIcon>
      <ListItemText primary={todo.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={onEdit}>
          <Edit />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

const ListView = observer(function ListView() {
  const classes = useStyles();
  const { todos } = useStores();

  return (
    <Box>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Todo Items
      </Typography>
      <List>
        {todos.todos.map((todo, i) => {
          return <TodoRow key={i} todo={todo} />;
        })}
      </List>
    </Box>
  );
});

export default ListView;
export { TodoRow };
