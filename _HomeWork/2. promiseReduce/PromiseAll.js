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

function promiseReduce(asyncFunctions, reduce, initialValue) {
  let fnPromises = asyncFunctions.map((fn) => fn());

  return Promise.all(fnPromises)
  .then((resolve) => {
    return resolve.reduce(reduce, initialValue || 2);
  })
  .catch(() => {
    return 'Один или несколько промисов, возвращаемых функциями, вернул(-и) ошибку!';
  })
}

promiseReduce([], reduce).then(console.log);
promiseReduce([], reduce, 2).then(console.log);
promiseReduce([fn1, fn2], reduce).then(console.log);
promiseReduce([fn1, fn2], reduce, 2).then(console.log);
promiseReduce([fn1, fn2, fn3], reduce).then(console.log);
promiseReduce([fn1, fn2, fn3], reduce, 2).then(console.log);
promiseReduce([fn1, fnReturnErr], reduce, 2).then(console.log);
