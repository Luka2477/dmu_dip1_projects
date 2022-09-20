export const update = (turn, turnElement, dice, scores) => {
  turnElement.innerHTML = `Turn ${turn}`;

  for (let die of dice) {
    die.element.innerHTML = `<img src="./assets/images/terning${die.value}.jpg" width="75vw" />`;
    die.element.style.border = die.locked ? "2px solid black" : "none";
  }

  for (let score of scores) {
    score.element.value = score.value;
    score.element.disabled = score.locked;
  }
};
