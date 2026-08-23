module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      // 'cluster' mode is PM2's own wrapper around node's cluster module -
      // it forks `instances` copies of script and load-balances between them
      exec_mode: 'cluster',
      instances: 'max', // one instance per CPU core - same guidance as cluster.fork()
      autorestart: true, // restart the process automatically if it crashes
      watch: false, // set true in development to restart on file changes
      max_memory_restart: '300M' // restart an instance if it grows past this
    }
  ]
};
