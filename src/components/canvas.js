import React, { useCallback, useEffect, useState } from "react";
import { Card, ButtonElement } from "./button";
import { link } from "../utils/linker";

const CanvasElement = (props) => {
  const [ buttons, setButtons ] = useState([]);
  const [ cards, setCards ] = useState([]);
  const [ toUnmount, setToUnmount ] = useState();
  const [ maxID, setMaxID ] = useState(0);

  const generateLayer = (args, nowCards, nowID) => {
    const { startX = 0, startY = 0, endX = props.width, endY = props.height, z = 0, size = 50} = args;
    let rows = Math.floor((endY - startY) / size);
    let cols = Math.floor((endX - startX) / size);
    let tmpCards = [...nowCards];
    let tmpID = nowID;
    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++) {
        let newCard = new Card({
          id: tmpID,
          X: { start: startX + j * size, end: startX + (j + 1) * size },
          Y: { start: startY + i * size, end: startY + (i + 1) * size },
          Z: z,
        }, setToUnmount);
        link(newCard, tmpCards);
        tmpCards.push(newCard);
        tmpID++;
      }
    }
    nowCards = tmpCards;
    nowID = tmpID;
    return {nowCards: nowCards, nowID: nowID};
    //let link = new linker();
    /*let buttonsArr = [];

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
    return buttonsArr;*/
  };
  


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
    let ret = {};
    for(let i = 0; i < 3; i++) {
      ret = generateLayer({
        startX: 0,
        startY: 0,
        endY: 400,
        z:i * 2 + 1
      }, nowCards, nowID);
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
      }, nowCards, nowID);
      nowCards = ret.nowCards; 
      nowID = ret.nowID;
    }

    for(let i = 0; i < 5; i++) {
      ret = generateLayer({
        startX: 0,
        startY: 500 + i * 10,
        endY: 570,
        z:i
      }, nowCards, nowID);
      nowCards = ret.nowCards; 
      nowID = ret.nowID; 
    }

    setMaxID(nowID);
    setCards(nowCards);
  }, []);

  return (  
    <div
      style={{
        position: "relative",
        width: props.width,
        height: props.height,
        backgroundColor: props.color,
      }}
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
          {[0, 1, 2, -1, 4, 5, -1].map((imgLabel, index) => {
              if(imgLabel == -1) {
                return;
              }
              return(
                <ButtonElement
                  args={{
                    id: 1,
                    X: { start: 50 * index, end: 50 * (index + 1)},
                    Y: { start: 0, end: 50 },
                    Z: 1,
                  }}
                  label={imgLabel}
                  onClick={() => {}}
                  enabled={true}
                  key={index}
                />);
            })}
        </div>
      </div>
    </div>
  );
};
export default CanvasElement;