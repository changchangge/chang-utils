function baseGet(object, path) {
  let index = 0;
  const length = path.length;

  while (object !== null && index < length) {
    object = object[path[index++]];
  }

  return index && index === length ? object : undefined;
}

function get(object, path, defaultValue) {
  const result = object === null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

export default get;
