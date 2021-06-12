//@ts-check
import PropTypes from "prop-types";
import CellView from "./CellView";
import Anime, { anime } from "react-animejs-wrapper";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import React, { Fragment } from "react";

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
              width: props.width,
              height: props.height,
              willChange: "transform",
            }}
            width={ui.width}
            selected={cell.id === ui.selectedCell}
            type={cell.type}
            index={index}
            i={cell.i}
            j={cell.j}
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

_IsometricGrid.defaultProps = {
  width: 500,
  height: 400,
  childwidth: 80,
  spacing: 100,
  cells: [
    { _id: "1", i: 0, j: 0 },
    { _id: "2", i: 1, j: 0 },
    { _id: "3", i: 0, j: 1 },
    { _id: "4", i: 1, j: 1 },
  ],
};

const IsometricGrid = observer(_IsometricGrid);

export default IsometricGrid;
