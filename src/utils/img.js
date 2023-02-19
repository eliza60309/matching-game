export const getImg = (id) => {
  let url = [
    "./img/armor.png",
    "./img/crossbow.png",
    "./img/gem.png",
    "./img/heal.png",
    "./img/poison.png",
    "./img/ring.png",
    "./img/sword.png",
    "./img/treasure-chest.png",
    "./img/witch-hat.png"
  ];
  return url[id];
};