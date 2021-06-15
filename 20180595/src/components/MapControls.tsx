//@ts-check
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import { IconButton, Paper } from "@material-ui/core";
import { Add, Done, Edit, Remove } from "@material-ui/icons";
import { Mode } from "../stores";
import React from "react";

interface MapControlsProps {
  [rest: string]: any;
}
const MapControls = observer(function _MapControls(props: MapControlsProps) {
  const { ui } = useStores();
  return (
    <Paper {...props} elevation={2}>
      <IconButton
        onClick={() => ui.zoom(false)}
        disabled={ui.width >= ui.maxWidth}
      >
        <Add />
      </IconButton>
      <IconButton
        onClick={() => ui.zoom(true)}
        disabled={ui.width <= ui.minWidth}
      >
        <Remove />
      </IconButton>
      {ui.mode == Mode.Edit ? (
        <IconButton onClick={() => ui.setMode(Mode.List)}>
          <Done />
        </IconButton>
      ) : (
        <IconButton onClick={() => ui.setMode(Mode.Edit)}>
          <Edit />
        </IconButton>
      )}
    </Paper>
  );
});

export default MapControls;
