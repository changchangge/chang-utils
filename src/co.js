// co模块实现解析

const slice = Array.prototype.slice;

function isObject(val) {
  return Object === val.constructor;
}

function isPromise(obj) {
  return 'function' === typeof obj.then;
}

function isGenerator(obj) {
  return 'function' === typeof obj.next && 'function' === typeof obj.then;
}

function isGeneratorFunction(obj) {
  const constructor = obj.constructor;
  if (!constructor) return false;
  if (
    'GeneratorFunction' === constructor.name ||
    'GeneratorFunction' === constructor.display
  )
    return true;
  return isGenerator(constructor.prototype);
}

function co(gen) {
  const ctx = this;
  const args = slice.call(arguments, 1);

  return new Promise((resolve, reject) => {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
    onFulfilled();

    function onFulfilled(res) {
      let ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function onRejected(err) {
      let ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      const value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(
        new TypeError(
          'You may only yield a function, promise, generator, array, or object, ' +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
      );
    }
  });
}

function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGenerator(obj) || isGeneratorFunction(obj)) return co.call(this, obj);
  if ('function' === typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

function thunkToPromise(fn) {
  const ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

function objectToPromise(obj) {
  // 定义一个空对象
  const results = new obj.constructor();
  const keys = Object.keys(obj);
  const promises = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }

  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    promises.push(
      promise.then((res) => {
        results[key] = res;
      })
    );
  }
}

