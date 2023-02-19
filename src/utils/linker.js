
export const link = (newCard, cardList) => {
  cardList.map((card) => {
    if(overlap(card.args, newCard.args)) {
      if(card.args.Z > newCard.args.Z) {
        newCard.notifyLockCreate(card);
        card.notifyLinkCreate(newCard);
      }
      else if(card.args.Z < newCard.args.Z) {
        card.notifyLockCreate(newCard);
        newCard.notifyLinkCreate(card);
      }
      else {
        throw(Error("Conflicting Cards"));
      }
    }
  })
};

const overlap = (obj1, obj2) => {
  return overlap1d(obj1.X, obj2.X) && overlap1d(obj1.Y, obj2.Y);
}

const overlap1d = (line1, line2) => {
  return(
    (line1.start <= line2.start && line1.end > line2.start) ||
    (line2.start <= line1.start && line2.end > line1.start));
};