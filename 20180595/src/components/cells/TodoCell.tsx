//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, duration } from "@material-ui/core";
import Rhombus from "../Rhombus";
import { Observer, observer } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { Cell, Todo } from "../../stores";
import { imageUrls, mapColors, mapDimensions } from "../../constants";
import { useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useEffect } from "react";
import { observable } from "mobx";

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
  // cell: Cell;
  todo: Todo;
  selected: boolean;
  editing: boolean;
  [rest: string]: any;
}

class Opacity {
  @observable completed: number;
  @observable incomplete: number;
  constructor(completed: boolean) {
    console.log("starting");
    if (completed) {
      this.completed = 0;
      gsap.fromTo(
        this,
        {
          completed: 0,
          incomplete: 1,
        },
        {
          completed: 1,
          incomplete: 0,
          snap: {
            completed: 0.05,
            incomplete: 0.05,
          },
        }
      );
    } else {
      gsap.fromTo(
        this,
        {
          completed: 1,
          incomplete: 0,
        },
        {
          completed: 0,
          incomplete: 1,
          snap: {
            completed: 0.05,
            incomplete: 0.05,
          },
        }
      );
    }
  }
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
