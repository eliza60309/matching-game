import React, { useRef, useEffect, useState } from "react";
import { ButtonElement } from "./button";
//import { link } from "../utils/linker";
import { LabelGenerator } from "../utils/img";

import { generateLayer } from "../utils/generator";

const CanvasElement = (props) => {
  const canvasRef = useRef(null);

  const [ cards, setCards ] = useState([]);
  const [ toUnmount, setToUnmount ] = useState();
  const [ cardsCount, setCardsCount ] = useState(0);
  const [ buffer, setBuffer ] = useState([]);
  const [ addbuffer, setAddBuffer ] = useState(-1);
  const [ fail, setFail ] = useState(false);
  const cardsLimit = 678;
  
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
    if(cnt === 3) {
      tmpBuffer = tmpBuffer.filter((label) => { return label !== addbuffer });
    }
    else if(cnt === 2) {
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
    for(let i = 1; i < 13 && cardsInfo.cardsCount < cardsLimit; i++) {
      let pivot = i % 2 === 0? 25: 0;
      cardsInfo = generateLayer({
        X: { start: pivot, end: 400 },
        Y: { start: pivot, end: 400 },
        Z: i,
        size: 50
      }, cardsInfo, labelGenerator, {
        notifyGameCardDestroy: receiveDestroy
      });
    }
    cardsInfo.newCards.map((card) => card.topLayer());

    setCardsCount(cardsInfo.cardsCount);
    setCards(cardsInfo.allCards);

    console.log(cardsInfo.cardsCount);

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
        if(!card.render) {
          return null;
        }
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