const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home Page');
  } else if (req.url === '/slow-page') {
    for (let i = 0; i < 1e9; i++) {
      // Simulate a slow operation
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is a slow page.');
  }
});

server.listen(8000, () => {
  console.log('Server running on port 8000');
});
