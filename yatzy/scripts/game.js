import { createDie } from "./components/Die.js";
import { createScore } from "./components/Score.js";
import * as ScoreService from "./services/scoreService.js";
import * as GUIService from "./services/guiService.js";

let turn = 0;
const turnElement = document.getElementById("turn");
const rollElement = document.getElementById("roll");

const diceElements = document.getElementsByClassName("die");
let dice = [];

const scoreTitles = document.getElementsByTagName("p");
const scoreElements = document.getElementsByTagName("input");
let scores = [];

const initGame = () => {
  rollElement.onclick = roll;

  for (let element of diceElements) {
    const die = createDie(element);
    dice.push(die);
    element.onclick = () => lockDie(die);
  }

  for (let i = 0; i < scoreTitles.length; i++) {
    scores.push(createScore(scoreElements[i]));
    scoreTitles[i].onclick = () => lockScore(scoreTitles[i]);
    scoreElements[i].onclick = () => lockScore(scoreElements[i]);
    if (
      scoreElements[i].id === "sum" ||
      scoreElements[i].id === "bonus" ||
      scoreElements[i].id === "total"
    ) {
      scores[i].locked = true;
    }
  }

  updateGUI();
};

const roll = () => {
  for (let die of dice) {
    if (!die.locked) {
      die.roll();
    }
  }
  turn++;
  rollElement.disabled = turn === 3;
  updateScores();
  updateGUI();
};

const lockDie = (die) => {
  if (turn === 0) return;

  die.locked = !die.locked;
  updateGUI();
};

const lockScore = (element) => {
  if (turn === 0) return;

  ScoreService.lockScore(element, scores);
  endTurn();
};

const endTurn = () => {
  for (let die of dice) {
    die.value = 0;
    die.locked = false;
  }
  rollElement.disabled = false;
  turn = 0;

  updateScores();
  updateGUI();

  if (scores.every((score) => score.locked)) {
    return gameover();
  }
};

const gameover = () => {
  for (let score of scores) {
    if (score.element.id === "total") {
      alert(`You have completed the game! Your final score was ${score.value}`);
      dice = [];
      scores = [];
      return initGame();
    }
  }
};

const updateScores = () => {
  ScoreService.calcScores(scores, dice);
};

const updateGUI = () => {
  GUIService.update(turn, turnElement, dice, scores);
};

initGame();
