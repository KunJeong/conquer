//@ts-check
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Rhombus from "./Rhombus";
import { observer } from "mobx-react-lite";
import { Todo } from "../../../stores";
import { imageUrls, mapColors, mapDimensions } from "../../../constants";
import { useState } from "react";
import Image from "next/image";

const useStyles = makeStyles({
  text: ({
    selected,
    editing,
    width,
    ...props
  }: {
    selected: boolean;
    editing: boolean;
    [rest: string]: any;
  }) => ({
    ...props.style,
    position: "absolute",
    fontSize: width >= 150 ? "11pt" : "8pt",
    left: "50%",
    bottom: "0%",
    width: width * mapDimensions.sqrt1over2,
    height: width >= 150 ? "30px" : "15px",
    textAlign: "center",

    verticalAlign: "text-bottom",
    lineHeight: width >= 150 ? "13px" : "8px",
    marginLeft: `${-0.5 * width * mapDimensions.sqrt1over2}px`,
    marginBottom: "3px",
    display: "block",
    color: "#ffffff",
  }),
  rhombus: ({
    selected,
    editing,
    ...props
  }: {
    selected: boolean;
    editing: boolean;
    [rest: string]: any;
  }) => ({
    outlineStyle: "dashed",
    outlineColor: mapColors.BORDER_EDITING,
    outlineWidth: editing && selected ? "4px" : "0px",
    backgroundColor:
      editing && selected
        ? mapColors.TODO_EDITING
        : selected
        ? mapColors.TODO_SELECTED
        : mapColors.TODO,
    "&:hover + $text": {
      display: "block",
    },
  }),
});

interface TodoCellProps {
  width: number;
  todo: Todo;
  selected: boolean;
  editing: boolean;
  [rest: string]: any;
}

const TodoCell = observer(function TodoCell({
  todo,
  selected,
  ...props
}: TodoCellProps) {
  const classes = useStyles({ selected, ...props });
  const [hover, setHover] = useState(false);

  return (
    <div>
      <Rhombus
        {...props}
        className={classes.rhombus}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover || selected ? (
          <Typography className={classes.text}>
            {/* {`todos:${todos.todos}`} */}
            {todo.name}
          </Typography>
        ) : (
          <Box></Box>
        )}
      </Rhombus>
      <Box
        style={{
          position: "absolute",
          bottom: 0,
          opacity: todo.completedOpacity,
        }}
      >
        <Image
          src={
            todo ? imageUrls[todo.imageName + "Completed"] : imageUrls.towerRed
          }
          width={props.width}
          height={props.width * 2 * mapDimensions.sqrt1over3}
          priority
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          bottom: 0,
          opacity: todo.incompleteOpacity,
        }}
      >
        <Image
          src={todo ? imageUrls[todo.imageName] : imageUrls.towerRed}
          width={props.width}
          height={props.width * 2 * mapDimensions.sqrt1over3}
          priority
        />
      </Box>
    </div>
  );
});

export default TodoCell;
