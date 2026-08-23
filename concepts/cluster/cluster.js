const cluster = require('cluster');
const http = require('http');
if (cluster.isPrimary) {
  const numCPUs = require('os').cpus().length;
  console.log(`Master process is running. Forking ${numCPUs} workers...`);
  console.log(`Master PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`);
    console.log('Forking a new worker...');
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);
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
    console.log(`Worker ${process.pid} is listening on port 8000`);
  });
}

