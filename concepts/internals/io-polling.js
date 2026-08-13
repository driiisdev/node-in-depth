// i/o checking is done by the event loop, which is implemented in libuv. The event loop uses a mechanism called "polling" to check for events on file descriptors (like sockets, files, etc.). When an event occurs, the event loop invokes the appropriate callback function to handle the event. This allows Node.js to perform non-blocking I/O operations, making it efficient for handling many concurrent connections.

// The event loop continuously checks for events in a loop, and when it finds an event, it processes it and then goes back to checking for more events. This is why Node.js can handle many connections simultaneously without blocking the execution of other code.

// In summary, the event loop in Node.js is responsible for managing asynchronous I/O operations by polling for events and invoking callbacks when those events occur. This design allows Node.js to be highly efficient and scalable for handling concurrent connections.

const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('This is fs.readFile callback 1');
});

process.nextTick(() => {
  console.log('This is process.nextTick callback 1');
});

Promise.resolve().then(() => {
  console.log('This is promise.then callback 1');
});

setTimeout(() => {
  console.log('This is setTimeout callback 1');
}, 0);

setImmediate(() => {
  console.log('This is setImmediate callback 1');
});

// output:
// This is process.nextTick callback 1
// This is promise.then callback 1
// This is setTimeout callback 1
// This is setImmediate callback 1
// This is fs.readFile callback 1