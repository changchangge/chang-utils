function createTwoDimensionalArray(x) {
  return new Array(x).fill(undefined).map((e) => new Array());
}

export default createTwoDimensionalArray;
