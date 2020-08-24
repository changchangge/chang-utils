function stringToPath(value){
    return value.split('.')
}

function baseGet(object, path) {
  path = typeof path === 'string'?stringToPath(path):path;
  let index = 0;
  const length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }

  return index && index === length ? object : undefined;
}

function get(object, path, defaultValue) {
  const result = object === null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

export default get;
