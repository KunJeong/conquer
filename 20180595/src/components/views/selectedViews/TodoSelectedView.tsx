import { Box, Checkbox, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { Todo } from "../../../stores";

const TodoSelectedView = observer(function TodoSelectedView(props: {
  todo: Todo;
}) {
  return (
    <Box>
      <Typography>{props.todo.name}</Typography>
      <Checkbox checked={props.todo.completed}></Checkbox>
    </Box>
  );
});

export default TodoSelectedView;
