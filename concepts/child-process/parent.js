const { fork } = require('node:child_process');

console.log(`Parent process ${process.pid} starting a child process...`);

// fork() starts a brand new node.exe process running child.js - a separate
// OS process with its own PID, its own V8 instance, its own memory, and its
// own single-threaded event loop, completely isolated from this one
const child = fork('./child.js');

// the only way to talk to it is through message passing (IPC) - values are
// serialized (structured-cloned) across the process boundary, not shared
child.send('start counting');

child.on('message', (result) => {
  console.log(`Parent received from child ${child.pid}: counted to ${result}`);
});

child.on('exit', (code) => {
  console.log(`Child process ${child.pid} exited with code ${code}`);
});
