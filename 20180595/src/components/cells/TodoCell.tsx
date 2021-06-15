//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Rhombus from "../Rhombus";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { Cell } from "../../stores";
import { mapColors, mapDimensions } from "../../constants";
import { useState } from "react";
import Image from "next/image";

const sqrt1over3 = 0.57735;

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
    fontSize: width >= 160 ? "11pt" : "8pt",
    // backgroundColor: "#777777",
    left: "50%",
    bottom: "0%",
    width: width * mapDimensions.sqrt1over2,
    height: width >= 160 ? "30px" : "15px",
    textAlign: "center",

    verticalAlign: "text-bottom",
    lineHeight: width >= 160 ? "13px" : "8px",
    marginLeft: `${-0.5 * width * mapDimensions.sqrt1over2}px`,
    marginBottom: "3px",
    display: "block",
    color: "#ffffff",
  }),
  image: {
    position: "absolute",
    bottom: "0%",
  },
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
  cell: Cell;
  selected: boolean;
  editing: boolean;
  [rest: string]: any;
}

const TodoCell = observer(function TodoCell({
  cell,
  selected,
  ...props
}: TodoCellProps) {
  const { todos } = useStores();
  const classes = useStyles({ selected, ...props });
  const [hover, setHover] = useState(false);
  const todo = todos.todoById(cell.hasElement);
  console.log(`cell:${cell.id}`);
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
            {todos.todoById(cell.hasElement)?.name}
          </Typography>
        ) : (
          <Box></Box>
        )}
      </Rhombus>
      {/* <img
        style={{ zIndex: 10000 }}
        src="/tower-red.png"
        width={props.width}
        height={props.width * 2 * mapDimensions.sqrt1over3}
      /> */}
      <div style={{ position: "absolute", bottom: 0 }}>
        {todo.completed ? (
          <Image
            className={classes.image}
            src="/tower-red-complete.png"
            width={props.width}
            height={props.width * 2 * mapDimensions.sqrt1over3}
            priority
            // objectPosition="center bottom"
          />
        ) : (
          <Image
            src="/tower-red.png"
            width={props.width}
            height={props.width * 2 * mapDimensions.sqrt1over3}
            priority
            // objectPosition="center bottom"
          />
        )}
      </div>
    </div>
  );
});

export default TodoCell;
