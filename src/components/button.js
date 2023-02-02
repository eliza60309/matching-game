import React from "react";
import { useState } from "react";

const ButtonElement = (props) => {
  let { XStart, XEnd, YStart, YEnd, Layer } = props;
  let { clickable } = props;
  let [ display, setDisplay ] = useState();
  const click = () => {
    if(clickable()) {
      setDisplay("none");
    }
    else {
      console.log("Boo");
    }
  };
  

  return (
    <button
      style={{
        borderWidth: 1,
        backgroundColor: "lightblue",
        borderRadius: 5,
        position: "absolute",
        display: display,

        fontSize: 30,


        width: XEnd - XStart,
        height: YEnd - YStart,
        top: YStart,
        left: XStart,
        zIndex: Layer
      }}
      onClick={click}
    >{props.text}
    </button>
  );
}
export default ButtonElement;