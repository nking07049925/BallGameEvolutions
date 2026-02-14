/** constrain value to be between min and max */
export const constrain = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;
