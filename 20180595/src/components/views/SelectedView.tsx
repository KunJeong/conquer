import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../hooks/useStores";
import { GrassSelectedView, TodoSelectedView } from "./selectedViews";
import { Cell, CellType, Mode } from "../../stores";

const SelectedView = observer(function SelectedView(props) {
  console.log(props.cell.id);
  const { cells, ui, todos } = useStores();

  const selectedView = (cell: Cell) => {
    switch (cell.type) {
      case CellType.Grass:
        return <GrassSelectedView />;
      case CellType.Todo:
        return <TodoSelectedView todo={todos.todoById(cell.hasElement)} />;
    }
  };
  return <Box>{selectedView(props.cell)}</Box>;
});

export default SelectedView;
