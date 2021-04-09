function createRandomKey(value) {
  return {
    key: (Date.now() + Math.random() * Date.now()).toFixed(0),
    value: value,
  };
}

export default createRandomKey;
