import React from "react";
import ButtonElement from "./button";
import { linker } from "../utils/linker";

const CanvasElement = (props) => {
  let sw = true;
  const func = (index) => {
    return sw;
  };

  const generateLayer = (args) => {
    let link = new linker();
    let { pivotX = 0, pivotY = 0, z = 0} = args;
    let buttonsArr = [];
    const size = 50;
    let rows = Math.floor((props.height - pivotY) / size);
    let cols = Math.floor((props.width - pivotX) / size);
    for(let i = 0; i < rows; i++) {
      let rowArr = [];
      for(let j = 0; j < cols; j++) {
        rowArr.push(<ButtonElement
          XStart={pivotX + j * size}
          XEnd={pivotX + j * size + 50}
          YStart={pivotY + i * size}
          YEnd={pivotY + i * size + 50}
          Layer={z}
          linker={link}
          clickable={func}
          key={`${i} ${j}`}
          text={z}
        />);
      }
      buttonsArr.push(rowArr);
    }
    return buttonsArr;
  };
  let buttonsArr = [];
  buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:1}));
  buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:2}));
  buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:3}));
  buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:4}));
  buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:5}));
  buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:6}));
  buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:7}));
  buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:8}));
  buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:9}));
  buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:10}));
  buttonsArr.push(generateLayer({pivotX: 0, pivotY: 0, z:11}));
  buttonsArr.push(generateLayer({pivotX: 25, pivotY: 25, z:12}));
  
  return (  
    <div
      style={{
        position: "relative",
        width: props.width,
        height: props.height,
        backgroundColor: props.color,
      }}
    >
      {buttonsArr}
    </div>
  );
};
export default CanvasElement;