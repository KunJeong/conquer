import { Box, Checkbox, Typography, ListItem } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { Todo } from "../../../stores";

interface TodoSelectedViewProps {
  todo: Todo;
  [rest: string]: any;
}

const TodoSelectedView = observer(function TodoSelectedView({
  todo,
  ...props
}: TodoSelectedViewProps) {
  return (
    <Box component="span" display="block">
      <Checkbox
        checked={todo.completed}
        onClick={() => todo.setComplete(!todo.completed)}
      ></Checkbox>
      <Typography>{todo.name}</Typography>
    </Box>
  );
});

export default TodoSelectedView;
