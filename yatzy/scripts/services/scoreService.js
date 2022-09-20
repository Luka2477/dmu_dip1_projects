const calc_1s = (dice) => count(1, dice);
const calc_2s = (dice) => count(2, dice) * 2;
const calc_3s = (dice) => count(3, dice) * 3;
const calc_4s = (dice) => count(4, dice) * 4;
const calc_5s = (dice) => count(5, dice) * 5;
const calc_6s = (dice) => count(6, dice) * 6;

const calc_1pair = (dice) => {
  for (let value = 6; value > 0; value--) {
    if (count(value, dice) >= 2) {
      return value * 2;
    }
  }
  return 0;
};

const calc_2pair = (dice) => {
  let found = 0;
  for (let value = 6; value > 0; value--) {
    if (count(value, dice) >= 2) {
      if (found) {
        return found * 2 + value * 2;
      }
      found = value;
    }
  }
  return 0;
};

const calc_3same = (dice) => {
  for (let value = 6; value > 0; value--) {
    if (count(value, dice) >= 3) {
      return value * 3;
    }
  }
  return 0;
};

const calc_4same = (dice) => {
  for (let value = 6; value > 0; value--) {
    if (count(value, dice) >= 4) {
      return value * 4;
    }
  }
  return 0;
};

const calc_fullhouse = (dice) => {
  const threesame = calc_3same(dice);
  if (!threesame) return 0;

  for (let value = 6; value > 0; value--) {
    if (count(value, dice) >= 2 && value !== threesame / 3) {
      return threesame + value * 2;
    }
  }
  return 0;
};

const calc_smallstraight = (dice) => {
  for (let value = 5; value > 0; value--) {
    if (count(value, dice) === 0) {
      return 0;
    }
  }
  return 15;
};

const calc_largestraight = (dice) => {
  for (let value = 6; value > 1; value--) {
    if (count(value, dice) === 0) {
      return 0;
    }
  }
  return 20;
};

const calc_chance = (dice) => {
  let sum = 0;
  for (let die of dice) {
    sum += die.value;
  }
  return sum;
};

const calc_yatzy = (dice) => {
  for (let value = 6; value > 0; value--) {
    if (count(value, dice) === 5) {
      return 50;
    }
  }
  return 0;
};

const calc_sum = (scores) => {
  let sum = 0;
  const ids = ["1s", "2s", "3s", "4s", "5s", "6s"];
  for (let score of scores) {
    if (ids.includes(score.element.id) && score.locked) {
      sum += score.value;
    }
  }
  return sum;
};

const calc_bonus = (scores) => {
  return calc_sum(scores) >= 63 ? 50 : 0;
};

const calc_total = (scores) => {
  let sum = 0;
  for (let score of scores) {
    if (score.element.id !== "sum" && score.element.id !== "total")
      sum += score.locked ? score.value : 0;
  }
  return sum;
};

const count = (value, dice) => {
  let sum = 0;
  for (let die of dice) {
    if (die.value === value) {
      sum++;
    }
  }
  return sum;
};

const score_links = {
  "1s": calc_1s,
  "2s": calc_2s,
  "3s": calc_3s,
  "4s": calc_4s,
  "5s": calc_5s,
  "6s": calc_6s,
  sum: calc_sum,
  bonus: calc_bonus,
  "1pair": calc_1pair,
  "2pair": calc_2pair,
  "3same": calc_3same,
  "4same": calc_4same,
  fullhouse: calc_fullhouse,
  smallstraight: calc_smallstraight,
  largestraight: calc_largestraight,
  chance: calc_chance,
  yatzy: calc_yatzy,
  total: calc_total,
};

export const calcScores = (scores, dice) => {
  for (let score of scores) {
    if (
      score.element.id !== "sum" &&
      score.element.id !== "bonus" &&
      score.element.id !== "total" &&
      score.locked
    )
      continue;

    const params =
      score.element.id === "sum" ||
      score.element.id === "bonus" ||
      score.element.id === "total"
        ? scores
        : dice;
    score.value = score_links[score.element.id](params);
  }
};

export const lockScore = (element, scores) => {
  for (let score of scores) {
    if (score.element.id === element.id) {
      score.locked = true;
    }
  }
};
