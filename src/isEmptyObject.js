function isEmptyObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  } else if (Reflect.ownKeys(value).length === 0) {
    return true;
  } else {
    return false;
  }
}
