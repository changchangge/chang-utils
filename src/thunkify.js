function thunkify(fn) {
  if ('function' !== typeof fn) return;
  return function () {
    const args = new Array(arguments.length);
    const ctx = this;

    for (let i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return (done) => {
      let called;

      args.push(function () {
        // 回调函数只会被运行一次
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    };
  };
}

export default thunkify

// function run(fn) {
//   const gen = fn();

//   function next(err, data) {
//     if (err) {
//       throw error;
//     }
//     const result = gen.next(data);
//     if (result.done) return;
//     result.value(next);
//   }

//   next();
// }
