const http = require('http');

let countRequest = 0;
const server = http.createServer((req, res) => {
  setTimeout(() => {
    res.writeHead(200);
    res.write(`Response ${++countRequest}`)
    res.end();
  }, 100);
});

server.listen(8888, () => {
  console.log('Server listening on port 8888...');
})
