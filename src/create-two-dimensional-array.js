function createTwoDimensionalArray(x, y = 0, c = 0) {
  return new Array(x).fill(undefined).map((e) => new Array(y).fill(c));
}

export default createTwoDimensionalArray;
