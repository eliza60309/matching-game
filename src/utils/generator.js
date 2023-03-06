import { Card } from "./../components/button";
import { link } from "./linker";
export const generateLayer = (args, cardsInfo, labelGenerator, callbacks) => {

  const { X, Y, Z, size } = args;
  const { notifyGameCardDestroy } = callbacks;
  const {
    allCards = [],
    relatedCards = [],
    cardsCount = 0,
    cardsLimit = 10000,
    discardRelated = true
  } = cardsInfo;

  const rows = Math.floor((Y.end - Y.start) / size);
  const cols = Math.floor((X.end - X.start) / size);
  let tmpRelatedCards = [...relatedCards];
  let tmpAllCards = [...allCards];
  let newCards = [];
  let tmpCount = cardsCount;
  for(let i = 0; i < rows && tmpCount < cardsLimit; i++) {
    for(let j = 0; j < cols && tmpCount < cardsLimit; j++) {
      let newCard = new Card({
        id: tmpCount,
        X: { start: X.start + j * size, end: X.start + (j + 1) * size },
        Y: { start: Y.start + i * size, end: Y.start + (i + 1) * size },
        Z: Z,
        label: labelGenerator.rand(),
      }, notifyGameCardDestroy);
      link(newCard, tmpRelatedCards);
      tmpAllCards.push(newCard);
      tmpRelatedCards.push(newCard);
      newCards.push(newCard);
      tmpCount++;
    }
  }
  return {
    allCards: tmpAllCards,
    relatedCards: discardRelated? [...newCards]: tmpRelatedCards,
    cardsCount: tmpCount,
    cardsLimit: cardsLimit,
    newCards: [...newCards],
  };
};