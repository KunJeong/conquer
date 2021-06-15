//@ts-check
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";
import HourglassIcon from "@material-ui/icons/HourglassEmptyRounded";
import Rhombus from "../Rhombus";
import Anime, { anime } from "react-animejs-wrapper";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { mapColors } from "../../constants";

const useStyles = makeStyles({
  hourglass: (props: any) => ({
    ...props.style,
    position: "absolute",
    color: "#777777",
    left: "50%",
    bottom: "25%",
    width: "30px",
    height: props.width >= 150 ? "30px" : "20px",
    textAlign: "center",
    lineHeight: props.width >= 150 ? "30px" : "20px",
    marginLeft: "-15px",
    marginBottom: props.width >= 150 ? "-15px" : "-10px",
  }),
  rhombus: {
    // background: `linear-gradient(45deg, #ddef77, 40%, #ddef77, 40%, #f3f3f3)`,
    borderWidth: "0px",
    borderRadius: "15px",
  },
});

interface TimerCellProps {
  width: number;
  [rest: string]: any;
}

const TimerCell = observer(function _TimerCell(props: TimerCellProps) {
  const classes = useStyles(props);
  const { ui } = useStores();
  return (
    <div>
      <Rhombus
        {...props}
        className={classes.rhombus}
        style={{
          background: `linear-gradient(45deg, ${mapColors.GRASS}, ${ui.percentage}%, ${mapColors.GRASS}, ${ui.percentage}%, ${mapColors.ADD_HOVER})`,
        }}
      ></Rhombus>
      <Anime
        config={{
          rotate: "1turn",
          duration: 800,
          easing: "spring(1, 80, 11, 0)",
          loop: true,
        }}
      >
        <HourglassIcon
          fontSize={props.width >= 150 ? "default" : "small"}
          className={classes.hourglass}
        />
      </Anime>
    </div>
  );
});

export default TimerCell;
