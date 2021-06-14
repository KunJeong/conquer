import { Box, Checkbox, Typography } from "@material-ui/core";
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
    <Box>
      <Typography>{todo.name}</Typography>
      <Checkbox
        checked={todo.completed}
        onClick={() => todo.toggleComplete(!todo.completed)}
      ></Checkbox>
    </Box>
  );
});

export default TodoSelectedView;
