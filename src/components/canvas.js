import React, { useRef, useEffect, useState } from "react";
import { Card, ButtonElement } from "./button";
import { link } from "../utils/linker";
import { LabelGenerator } from "../utils/img";

import { generateLayer } from "../utils/generator";

const CanvasElement = (props) => {
  const canvasRef = useRef(null);

  //const [ buttons, setButtons ] = useState([]);
  const [ cards, setCards ] = useState([]);
  const [ toUnmount, setToUnmount ] = useState();
  const [ cardsCount, setCardsCount ] = useState(0);
  const [ buffer, setBuffer ] = useState([]);
  const [ addbuffer, setAddBuffer ] = useState(-1);
  const [ fail, setFail ] = useState(false);
  const cardsLimit = 567;

//   const generateLayer = (args, nowCards, nowID, labelGenerator) => {
//     const dims = canvasRef.current?.getBoundingClientRect();

//     const { startX = 0, startY = 0, endX = dims.width, endY = dims.height, z = 0, size = 50} = args;
//     let rows = Math.floor((endY - startY) / size);
//     let cols = Math.floor((endX - startX) / size);
//     let tmpCards = [...nowCards];
//     let tmpID = nowID;
//     for(let i = 0; i < rows && tmpID < totalCards; i++) {
//       for(let j = 0; j < cols && tmpID < totalCards; j++) {
//         let newCard = new Card({
//           id: tmpID,
//           X: { start: startX + j * size, end: startX + (j + 1) * size },
//           Y: { start: startY + i * size, end: startY + (i + 1) * size },
//           Z: z,
//           label: labelGenerator.rand(),
//         }, receiveDestroy);
// //        }, setToUnmount);
//         link(newCard, tmpCards);
//         tmpCards.push(newCard);
//         tmpID++;
//       }
//     }
//     nowCards = tmpCards;
//     nowID = tmpID;
//     return {nowCards: nowCards, nowID: nowID};
//   };
  
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
    //setButtons(buttons.filter((button) => button.key !== toUnmount.args.id.toString()));
    setCards(cards.filter((card) => card.args.id !== toUnmount.args.id));
  }, [toUnmount]);

  useEffect(() => {
    let labelGenerator = new LabelGenerator(cardsLimit);
    let cardsInfo = {
      allCards: cards,
      relatedCards: [],
      cardsCount: cardsCount,
      cardsLimit: cardsLimit,
      discardRelated: true
    };
    for(let i = 0; i < 100 && cardsInfo.cardsCount < cardsLimit; i++) {
      cardsInfo = generateLayer({
        X: { start: 0, end: 400 },
        Y: { start: 0, end: 400 },
        Z: i * 2 + 1,
        size: 50
      }, cardsInfo, labelGenerator, {
        notifyGameCardDestroy: receiveDestroy
      });
      cardsInfo = generateLayer({
        X: { start: 25, end: 400 },
        Y: { start: 25, end: 400 },
        Z: i * 2 + 2,
        size: 50
      }, cardsInfo, labelGenerator, {
        notifyGameCardDestroy: receiveDestroy
      });
    }
    console.log(cardsInfo.cardsCount);

    setCardsCount(cardsInfo.cardsCount);
    setCards(cardsInfo.allCards);

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
        // if(!card.top) {
        //   return null;
        // }
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