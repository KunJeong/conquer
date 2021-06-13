//@ts-check
import CellView from "./CellView";
import Anime, { anime } from "react-animejs-wrapper";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks";
import React, { Fragment } from "react";
import { Mode } from "../stores";

const sqrt3 = 1.73205;

function _IsometricGrid(props) {
  const { cells, ui } = useStores();

  const selectionI = cells.cellById(ui.selectedCell)?.i;
  const selectionJ = cells.cellById(ui.selectedCell)?.j;
  const animationRef = React.useRef(null);

  // const halfSpan = Math.max(
  //   Math.floor(props.width / props.childWidth),
  //   Math.floor((props.height * sqrt3) / props.childWidth)
  // );
  // const totalSpan = halfSpan * 2 + 1;
  // console.log(`width: ${props.width}, child: ${props.childWidth}`);

  // console.log(`half: ${halfSpan}, total: ${totalSpan}`);

  // const { minI, minJ, maxI, maxJ } = cells.mapSize;
  // const iSize = maxI - minI + 1;
  // const jSize = maxJ - minJ + 1;
  // console.log(`size: ${iSize}, ${jSize}`);

  return (
    // <Anime
    //   ref={animationRef}
    //   style={{
    //     // width: props.width,
    //     // height: props.height,
    //     position: "relative",
    //     willChange: "transform",
    //   }}
    //   config={{
    //     targets: ".cell",
    //     // translateY: [
    //     //   {value: -20, easing: 'easeOutExpo', duration: 300},
    //     //   {value: 0, easing: 'easeInOutQuad', duration: 700}
    //     // ],
    //     scale: [1, 0.5, 1],
    //     // loop: true,
    //     // direction: 'alternate',
    //     autoplay: true,
    //     delay: anime.stagger(100, {
    //       grid: [4, 4],
    //       start: 0,
    //       from: ui.selection,
    //     }),
    //     duration: 1000,
    //     easing: "spring(1, 80, 10, 0)",
    //   }}
    // >
    <Fragment>
      {props.cells.map((cell, index) => {
        return (
          <CellView
            key={cell.i * 300 + cell.j}
            // classes={{ cell: "cell" }}
            style={{
              // width: props.width,
              // height: props.height,
              willChange: "transform",
            }}
            width={ui.width}
            selected={cell.id === ui.selectedCell}
            editing={ui.mode == Mode.Edit}
            type={cell.type}
            index={index}
            x={cell.x}
            y={cell.y}
            cell={cell}
            backgroundColor="#ddef77"
            borderWidth={0}
            marginX={props.spacing}
          ></CellView>
        );
      })}
    </Fragment>
    // </Anime>
  );
}

const IsometricGrid = observer(_IsometricGrid);

export default IsometricGrid;
