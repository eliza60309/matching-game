/*export class linker {
  constructor() {
    this.buttons = [];
    // button = {
    //   id: Number,
    //   X: {
    //     start: Number,
    //     end: Number
    //   },
    //   Y: {
    //     start: Number,
    //     end: Number
    //   },
    //   Z: Number,
    //   onDestroy: function,
    //   notifyDestroy: function,
    //   notifyLinkCreate: function,
    //   notifyLockCreate: function
    // }
    this.addButton = (newButton) => {
      this.buttons.map((button) => {
        if(overlap(button, newButton)) {
          if(button.Z > newButton.Z) {
            button.notifyLinkCreate(newButton);
            newButton.notifyLockCreate(button);
          }
          else if (button.Z < newButton.Z) {
            button.notifyLockCreate(newButton);
            newButton.notifyLinkCreate(button);
          }
          else {
            throw("Conflicting buttons");
          }
        }
      });
      this.buttons.push(newButton);
    };
  }
};*/

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