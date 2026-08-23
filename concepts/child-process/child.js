console.log(`Child process ${process.pid} waiting for a message...`);

process.on('message', () => {
  let count = 0;
  for (let i = 0; i < 1e9; i++) {
    count++;
  }
  // process.send() only exists because this process was started with fork() -
  // it's how a child process reports back to whichever process forked it
  process.send(count);
  process.exit(0);
});
