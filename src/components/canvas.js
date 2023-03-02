import React, { useRef, useEffect, useState } from "react";
import { Card, ButtonElement } from "./button";
import { link } from "../utils/linker";
import { LabelGenerator } from "../utils/img";

const CanvasElement = (props) => {
  const canvasRef = useRef(null);

  const [ buttons, setButtons ] = useState([]);
  const [ cards, setCards ] = useState([]);
  const [ toUnmount, setToUnmount ] = useState();
  const [ maxID, setMaxID ] = useState(0);
  const [ buffer, setBuffer ] = useState([]);
  const [ addbuffer, setAddBuffer ] = useState(-1);
  const [ fail, setFail ] = useState(false);
  const totalCards = 567;

  const generateLayer = (args, nowCards, nowID, labelGenerator) => {
    const dims = canvasRef.current?.getBoundingClientRect();

    const { startX = 0, startY = 0, endX = dims.width, endY = dims.height, z = 0, size = 50} = args;
    let rows = Math.floor((endY - startY) / size);
    let cols = Math.floor((endX - startX) / size);
    let tmpCards = [...nowCards];
    let tmpID = nowID;
    for(let i = 0; i < rows && tmpID < totalCards; i++) {
      for(let j = 0; j < cols && tmpID < totalCards; j++) {
        let newCard = new Card({
          id: tmpID,
          X: { start: startX + j * size, end: startX + (j + 1) * size },
          Y: { start: startY + i * size, end: startY + (i + 1) * size },
          Z: z,
          label: labelGenerator.rand(),
        }, receiveDestroy);
//        }, setToUnmount);
        link(newCard, tmpCards);
        tmpCards.push(newCard);
        tmpID++;
      }
    }
    nowCards = tmpCards;
    nowID = tmpID;
    return {nowCards: nowCards, nowID: nowID};
  };
  
  useEffect(() => {
    if(addbuffer === -1) {
      return;
    }
    let tmpBuffer = [...buffer];
    let cnt = 1;
    tmpBuffer.forEach((label) => {
      if(label === addbuffer) {
        cnt++;
      }
    });
    if(cnt == 3) {
      tmpBuffer = tmpBuffer.filter((label) => { return label !== addbuffer });
    }
    else if(cnt == 2) {
      tmpBuffer.splice(tmpBuffer.indexOf(addbuffer), 0, addbuffer);
      tmpBuffer = [...tmpBuffer];
    }
    else {
      tmpBuffer = [...tmpBuffer, addbuffer];
    }
    if(tmpBuffer.length === 7) {
      setFail(true);
    }
    setAddBuffer(-1);
    setBuffer(tmpBuffer);
  }, [addbuffer]);

  useEffect(() => {
    if(!toUnmount) {
      return;
    }
    setButtons(buttons.filter((button) => button.key !== toUnmount.args.id.toString()));
    setCards(cards.filter((card) => card.args.id !== toUnmount.args.id));
  }, [toUnmount]);

  useEffect(() => {
    let nowID = maxID;
    let nowCards = cards;
    let labelGenerator = new LabelGenerator(totalCards);
    let ret = {};
    for(let i = 0; i < 100 && nowID <= totalCards; i++) {
      ret = generateLayer({
        startX: 0,
        startY: 0,
        endY: 400,
        z:i * 2 + 1
      }, nowCards, nowID, labelGenerator);
      nowCards = ret.nowCards; 
      nowID = ret.nowID;

      // if(i == 3) {
      //   ret = generateLayer({
      //     startX: 25,
      //     startY: 25,
      //     endY: 400,
      //     size: 100,
      //     z:i * 2 + 2
      //   }, nowCards, nowID);
      //   nowCards = ret.nowCards; 
      //   nowID = ret.nowID;
      //   continue;
      // }
      ret = generateLayer({
        startX: 25,
        startY: 25,
        endY: 400,
        z:i * 2 + 2
      }, nowCards, nowID, labelGenerator);
      nowCards = ret.nowCards; 
      nowID = ret.nowID;
    }
    console.log(nowID);

    /*for(let i = 0; i < 5; i++) {
      ret = generateLayer({
        startX: 0,
        startY: 500 + i * 10,
        endY: 570,
        z:i
      }, nowCards, nowID);
      nowCards = ret.nowCards; 
      nowID = ret.nowID; 
    }*/

    setMaxID(nowID);
    setCards(nowCards);

  }, []);

  const receiveDestroy = (item) => {
    setToUnmount(item);
    setAddBuffer(item.args.label);
  }

  return (  
    <div
      style={{
        position: "relative",
        width: props.width,
        minWidth: 400,
        height: props.height,
        backgroundColor: props.color,
      }}
      ref={canvasRef}
    >
      {cards.map((card) => {
        return (<ButtonElement
          args={card.args}
          label={card.args.Z}
          onClick={card.onClick}
          key={card.args.id}
          enabled={card.clickable}
          />);
      })}
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: "0%",
          width: "100%",
          height: "200px",
          backgroundColor: "lightblue"
          
        }}
      >
        <div
          style={{
            borderWidth: "1px",
            borderColor: "black",
            borderStyle: "solid",
            borderRadius: "5px",
            position: "absolute",
            width: "350px",
            height: "50px",
            display: "block",
            
            backgroundColor: "lightgreen"
          }}
        >
          {buffer.map((imgLabel, index) => {
              if(imgLabel === -1) {
                return null;
              }
              return(
                <ButtonElement
                  args={{
                    id: 1,
                    X: { start: 50 * index, end: 50 * (index + 1)},
                    Y: { start: 0, end: 50 },
                    Z: 1,
                    label: imgLabel,
                  }}
                  onClick={() => {}}
                  enabled={true}
                  key={index}
                />);
            })}
        </div>
      </div>
      {fail && 
        (<div
          style={{
            opacity: "70%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            zIndex: 9999999,
            backgroundColor: "grey",
            fontSize: 100,
            fontWeight: "bold",
          }}
          onClick={() => window.location.reload(false)}
        >You Failed</div>)}
    </div>
  );
};
export default CanvasElement;