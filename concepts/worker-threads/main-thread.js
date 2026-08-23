const http = require('http');
const {Worker} = require('worker_threads');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home Page');
  } else if (req.url === '/slow-page') {
    const worker = new Worker("./worker-thread.js");
    worker.on('message', (j) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`This is a slow page. Counted to ${j}`);
    });
  }
});

server.listen(8000, () => {
  console.log(`Worker ${process.pid} is listening on port 8000`);
});
