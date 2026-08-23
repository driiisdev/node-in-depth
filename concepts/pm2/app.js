const http = require('node:http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Handled by process ${process.pid}\n`);
});

server.listen(8000, () => {
  console.log(`Process ${process.pid} listening on port 8000`);
});
