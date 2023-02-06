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
    let nowID = maxID;
    let nowCards = cards;
    let ret = {};
    for(let i = 0; i < 5; i++) {
      ret = generateLayer({
        startX: 0,
        startY: 0,
        endY: 400,
        z:i * 2 + 1
      }, nowCards, nowID);
      nowCards = ret.nowCards; 
      nowID = ret.nowID;
      if(i == 3) {
        ret = generateLayer({
          startX: 25,
          startY: 25,
          endY: 400,
          size: 100,
          z:i * 2 + 2
        }, nowCards, nowID);
        nowCards = ret.nowCards; 
        nowID = ret.nowID;
        continue;
      }
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
    /*let newCards = [];
    newCards.push(new Card({
      id: 1,
      X: { start: 0, end: 50 },
      Y: { start: 0, end: 50 },
      Z: 1,
    }, setToUnmount));
    newCards.push(new Card({
      id: 2,
      X: { start: 25, end: 75 },
      Y: { start: 25, end: 75 },
      Z: 2
    }, setToUnmount));
  
    newCards[0].notifyLockCreate(newCards[1]);
    newCards[1].notifyLinkCreate(newCards[0]);
    //setButtons([...buttons, newCards[0].button, newCards[1].button]);
    setCards([...cards, ...newCards]);*/
  }, []);

  const execute = () => {
    //console.log(buttons);
    //console.log(cards);
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
    <button onClick={execute}>execute</button>
    {/*buttons*/}
    {cards.map((card) => {
      return (<ButtonElement
        args={card.args}
        text={card.args.Z}
        onClick={card.onClick}
        key={card.args.id}
        enabled={card.clickable}
        />);
    })}
    </div>
  );
};
export default CanvasElement;