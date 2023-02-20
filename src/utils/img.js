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
  "./img/witch-hat.png"
];

export const getImg = (label) => {
  return imgList[label];
};

export const randLabel = () => {
  let label = Math.floor(Math.random() * imgList.length);
  return label;
}