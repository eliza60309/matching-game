import React, { useCallback, useEffect, useState } from "react";
import { Card, ButtonElement } from "./button";
// import { linker } from "../utils/linker";

const CanvasElement = (props) => {
  const [ buttons, setButtons ] = useState([]);
  const [ cards, setCards ] = useState([]);
  const [ toUnmount, setToUnmount ] = useState();

  const generateLayer = (args) => {
    //let link = new linker();
    let { pivotX = 0, pivotY = 0, z = 0} = args;
    let buttonsArr = [];
    const size = 50;
    let rows = Math.floor((props.height - pivotY) / size);
    let cols = Math.floor((props.width - pivotX) / size);
    let callbacks = (callbacksObject) => {
      return callbacksObject;
    }
    for(let i = 0; i < rows; i++) {
      let rowArr = [];
      for(let j = 0; j < cols; j++) {
        rowArr.push(<ButtonElement
          XStart={pivotX + j * size}
          XEnd={pivotX + j * size + 50}
          YStart={pivotY + i * size}
          YEnd={pivotY + i * size + 50}
          Layer={z}
          key={`${i} ${j}`}
          text={z}
          callbacks={callbacks}
        />);
      }
      buttonsArr.push(rowArr);
    }
    return buttonsArr;
  };
  // buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:1}));
  // buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:2}));
  // buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:3}));
  // buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:4}));
  // buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:5}));
  // buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:6}));
  // buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:7}));
  // buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:8}));
  // buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:9}));
  // buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:10}));
  // buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:11}));
  // buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:12}));
  


  useEffect(() => {
    if(!toUnmount) {
      return;
    }
    setButtons(buttons.filter((button) => button.key !== toUnmount.args.id.toString()));
    setCards(cards.filter((card) => card.args.id !== toUnmount.args.id));
  }, [toUnmount]);

  useEffect(() => {
    let arr = [];
    arr.push(new Card({
      id: 1,
      X: { start: 0, end: 50 },
      Y: { start: 0, end: 50 },
      Z: 1
    }, setToUnmount));
    arr.push(new Card({
      id: 2,
      X: { start: 25, end: 75 },
      Y: { start: 25, end: 75 },
      Z: 2
    }, setToUnmount));
  
    arr[0].notifyLockCreate(arr[1]);
    arr[1].notifyLinkCreate(arr[0]);
    setButtons([...buttons, arr[0].button, arr[1].button]);
    setCards([...cards, ...arr]);
  }, []);

  const show = () => {
    console.log(buttons);
    console.log(cards);
  }

  return (  
    <div
      style={{
        position: "relative",
        width: props.width,
        height: props.height,
        backgroundColor: props.color,
      }}
    >
    {buttons}
    </div>
  );
};
export default CanvasElement;