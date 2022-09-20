export const createDie = (element) => {
  return {
    element,
    value: 0,
    locked: false,
    roll: function () {
      this.value = 1 + Math.round(Math.random() * 5);
    },
  };
};
