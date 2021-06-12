import { autorun } from "mobx";
import { useCallback, useRef, useState, useEffect } from "react";

// const useLongPress = (
//   onLongPress = () => {},
//   onClick = () => {},
//   { shouldPreventDefault = true, delay = 300 } = {}
// ) => {
//   const [longPressTriggered, setLongPressTriggered] = useState(false);
//   const timeout = useRef();
//   const target = useRef();

//   const start = useCallback(
//     (event) => {
//       if (shouldPreventDefault && event.target) {
//         event.target.addEventListener("touchend", preventDefault, {
//           passive: false,
//         });
//         target.current = event.target;
//       }
//       timeout.current = setTimeout(() => {
//         onLongPress(event);
//         setLongPressTriggered(true);
//       }, delay);
//     },
//     [onLongPress, delay, shouldPreventDefault]
//   );

//   const clear = useCallback(
//     (event, shouldTriggerClick = true) => {
//       timeout.current && clearTimeout(timeout.current);
//       shouldTriggerClick && !longPressTriggered && onClick();
//       setLongPressTriggered(false);
//       if (shouldPreventDefault && target.current) {
//         target.current.removeEventListener("touchend", preventDefault);
//       }
//     },
//     [shouldPreventDefault, onClick, longPressTriggered]
//   );

//   return {
//     onMouseDown: (e) => start(e),
//     onTouchStart: (e) => start(e),
//     onMouseUp: (e) => clear(e),
//     onMouseLeave: (e) => clear(e, false),
//     onTouchEnd: (e) => clear(e),
//   };
// };

// const isTouchEvent = (event) => {
//   return "touches" in event;
// };

// const preventDefault = (event) => {
//   if (!isTouchEvent(event)) return;

//   if (event.touches.length < 2 && event.preventDefault) {
//     event.preventDefault();
//   }
// };

// export default useLongPress;

export default function useLongPress(onLongPress = () => {}, ms = 300) {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // let timerId;
    if (longPressTriggered) {
      console.log(`pressed`);
      if (!timeout.current)
        timeout.current = setTimeout(() => {
          onLongPress();
          setLongPressTriggered(true);
        }, ms);
    } else {
      console.log(`leaved`);

      clearTimeout(timeout.current);
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, [longPressTriggered]);

  // const reset = useCallback(())

  return {
    onMouseDown: () => setLongPressTriggered(true),
    onMouseUp: () => setLongPressTriggered(false),
    onMouseLeave: () => setLongPressTriggered(false),
    onTouchStart: () => setLongPressTriggered(true),
    onTouchEnd: () => setLongPressTriggered(false),
  };
}
