const fn1 = () => {
  // console.log('start fn1');
  return Promise.resolve(1);
};

const fn2 = () => {
  return new Promise((resolve) => {
    // console.log('start fn2');
    setTimeout(() => {
      resolve(2);
    }, 1000);
  })
};

const fn3 = () => {
  // console.log('start fn3');
  return Promise.resolve(4);
};

const fnReturnErr = () => {
  // console.log('start fnReturnErr');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(8);
    }, 2000);
  })
};

const reduce = (memo, value) => {
  // console.log('reduce');
  return memo * value;
};

async function promiseReduce(asyncFunctions, reduce, initialValue) {
  let result = initialValue || 2;
  let errFn = null;

  try {
    for (let i = 0; i < asyncFunctions.length; i++) {
      errFn = asyncFunctions[i].name;
      result = reduce(await asyncFunctions[i](), result);
    }
  } catch (err) {
    result = `Промис, возвращаемый функцией ${errFn} вернул ошибку!`
  }

  return result;
}

promiseReduce([], reduce).then(console.log);
promiseReduce([], reduce, 2).then(console.log);
promiseReduce([fn1, fn2], reduce).then(console.log);
promiseReduce([fn1, fn2], reduce, 2).then(console.log);
promiseReduce([fn1, fn2, fn3], reduce).then(console.log);
promiseReduce([fn1, fn2, fn3], reduce, 2).then(console.log);
promiseReduce([fn1, fnReturnErr], reduce, 2).then(console.log);
