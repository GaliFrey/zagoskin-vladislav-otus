const request = require('request'); 
const url = 'http://127.0.0.1:8888';

const countRequests = process.argv[2];
const typeRequests = process.argv[3];

if ((typeRequests !== 'async' && typeRequests !== 'sync') || (!countRequests)) {
  console.log(`Необходимо указать 2 параметра:
  1. Количесвто запросов для отправки. От 1 до 999
  2. Тип запросов. Может быть sync или async.`);
}


async function foo(cnt, type) {
  for (let i = 0; i < cnt; i++) {
    if (type == 'async') {
      let res = await asyncReq();
      console.log(res.statusCode);
    }

    if (type == 'sync') {
      syncReq();
    }
  }
}

function asyncReq() {
  return new Promise((resolve) => {
    request(url, (err, res) => {
      resolve(res);
    });
  })
}

function syncReq() {
  request(url, function (error, res) {
    console.log(res.statusCode);
  })
}

foo(countRequests, typeRequests);
