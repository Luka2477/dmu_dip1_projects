export const createScore = (element) => {
  return {
    element,
    value: 0,
    locked: element.disabled,
  };
};
