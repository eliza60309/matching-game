const imgList = [
  "./img/armor.png",
  "./img/ax.png",
  "./img/bomb.png",
  "./img/crossbow.png",
  "./img/gem.png",
  "./img/heal.png",
  "./img/money-bag.png",
  "./img/poison.png",
  "./img/ring.png",
  "./img/sword.png",
  "./img/treasure-chest.png",
  "./img/witch-hat.png",
  "./img/diamond.png",
  "./img/gold-ingots.png",
  "./img/potion.png",
  "./img/shield.png",
];

export const getImg = (label) => {
  if(label === -1) {
    return "";
  }
  else {
    return imgList[label];
  }
};

export const randLabel = () => {
  let label = Math.floor(Math.random() * imgList.length);
  return label;
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export class LabelGenerator{
  constructor(total) {
    this.total = total;
    this.assigned = 0;
    this.array = Array.from({ length: total })
    let tmplabel = 0;
    this.array = this.array.map((_, index) => {
      if(index % 3 === 0) {
        tmplabel = randLabel();
      }
      return tmplabel;
    });

    this.array = shuffleArray(this.array);


    this.rand = () => {
      let label = this.array[this.assigned];
      this.assigned++;
      return label;
    }
  }


}