import {
  Box,
  Checkbox,
  Grid,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { Edit, Save } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import React from "react";
import { Todo } from "../../../stores";
import { TodoRow } from "../ListView";
import Image from "next/image";
import { imageUrls, mapDimensions } from "../../../constants";
import { useStores } from "../../../hooks";
import { useState } from "react";
import { useEffect } from "react";

interface TodoSelectedViewProps {
  todo: Todo;
  editing: boolean;
  [rest: string]: any;
}

const TodoSelectedView = observer(function TodoSelectedView({
  todo,
  editing = false,
  ...props
}: TodoSelectedViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [imageName, setImageName] = useState("");
  const onChangeImage = (e) => {
    setImageName(e.target.value);
  };

  useEffect(() => {
    setName(todo.name);
    setImageName(todo.imageName);
  }, [todo]);

  useEffect(() => {
    setIsEditing(editing);
  }, [editing]);
  const onSave = () => {
    setIsEditing(false);
    console.log(name, imageName);
    todo.modify({ name, imageName });
    todo.modifyToServer({ name, imageName });
  };
  if (isEditing)
    return (
      <Box>
        <Grid container justify="flex-start">
          <Box mb={2}>
            <Grid item container justify="flex-start" xs={12}>
              <TextField
                id="todoNameEdit"
                label="Title"
                // variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></TextField>
            </Grid>
          </Box>
          <Grid item container justify="flex-start" xs={12}>
            <FormControl>
              <InputLabel id="imageSelect">Image</InputLabel>
              <Select
                labelId="imageSelect"
                value={imageName}
                onChange={onChangeImage}
              >
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
        <Grid container justify="flex-end">
          <Button startIcon={<Save />} onClick={onSave}>
            Save
          </Button>
        </Grid>
      </Box>
    );
  else
    return (
      <Box>
        <List>
          <ListItem dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.completed}
                tabIndex={-1}
                disableRipple
                onClick={() => todo.setComplete(!todo.completed)}
              />
            </ListItemIcon>

            <ListItemText primary={todo.name} />
          </ListItem>
        </List>
        <Grid container justify="center">
          <Image
            src={todo ? imageUrls[todo.imageName] : imageUrls.towerRed}
            width={120}
            height={120 * 2 * mapDimensions.sqrt1over3}
            priority
          />
        </Grid>
        <Grid container justify="flex-end">
          <Button startIcon={<Edit />} onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Grid>
      </Box>

      // <Box component="span" display="block">
      // </Box>
    );
});

export default TodoSelectedView;
