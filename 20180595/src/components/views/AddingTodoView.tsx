import {
  Box,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStores } from "../../hooks";
import Image from "next/image";
import { imageUrls, mapDimensions } from "../../constants";
import { Mode } from "../../stores";

const AddingTodoView = observer(function AddingTodoView() {
  const { cells, ui, todos } = useStores();
  const [name, setName] = useState("");
  const [imageName, setImageName] = useState("towerRed");

  const onChangeImage = (e) => {
    setImageName(e.target.value);
  };
  return (
    <Box component="span" display="block">
      <Grid container justify="flex-start">
        <Grid item container justify="flex-start" xs={12}>
          <TextField
            id="outlined-textarea"
            label="Title"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></TextField>
        </Grid>
        {/* <Typography variant="caption">Image</Typography> */}
        <Grid item container justify="flex-start" xs={12}>
          <FormControl>
            <InputLabel>Image</InputLabel>
            <Select value={imageName} onChange={onChangeImage}>
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={"towerRed"}>
                <Image
                  src={imageUrls.towerRed}
                  width={120}
                  height={120 * 2 * mapDimensions.sqrt1over3}
                  priority
                />
              </MenuItem>
              <MenuItem value={"towerBlue"}>
                <Image
                  src={imageUrls.towerBlue}
                  width={120}
                  height={120 * 2 * mapDimensions.sqrt1over3}
                  priority
                />
              </MenuItem>
              <MenuItem value={"towerDarkRed"}>
                <Image
                  src={imageUrls.towerDarkRed}
                  width={120}
                  height={120 * 2 * mapDimensions.sqrt1over3}
                  priority
                />
              </MenuItem>
              <MenuItem value={"towerDarkBlue"}>
                <Image
                  src={imageUrls.towerDarkBlue}
                  width={120}
                  height={120 * 2 * mapDimensions.sqrt1over3}
                  priority
                />
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* <Grid container>
        <Image
          src={imageUrls[imageName]}
          width={120}
          height={120 * 2 * mapDimensions.sqrt1over3}
          priority
        />
      </Grid> */}
      <Grid container justify="flex-end">
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            let cellId = ui.selectedCell;
            let todoId = uuidv4();
            cells.addTodo(cellId, todoId);
            todos.addTodo(name, todoId, imageName, cellId);
            ui.setMode(Mode.Selected);
          }}
        >
          Add Todo
        </Button>
      </Grid>
    </Box>
  );
});

export default AddingTodoView;
