import { Box } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStores } from "../../hooks";
import { GrassSelectedView, TodoSelectedView } from "./selectedViews";
import { Cell, CellType } from "../../stores";

interface SelectedViewProps {
  cell: Cell;
}
const SelectedView = observer(function SelectedView({
  cell,
  ...props
}: SelectedViewProps) {
  const { ui, todos } = useStores();

  const selectedView = (cell: Cell) => {
    switch (cell.type) {
      case CellType.Grass:
        return <GrassSelectedView {...props} />;
      case CellType.Todo:
        return (
          <TodoSelectedView
            {...props}
            editing={ui.editing}
            todo={todos.todoById(cell.hasElement)}
          />
        );
    }
  };
  return <Box>{selectedView(cell)}</Box>;
});

export default SelectedView;
