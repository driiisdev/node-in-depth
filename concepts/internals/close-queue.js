const fs = require('fs');

const readableStream = fs.createReadStream(__filename);
readableStream.close();

readableStream.on('close', () => {
  console.log('The readable stream has been closed.');
});
setImmediate(() => {
  console.log('This is setImmediate 1.');
});
setTimeout(() => {
  console.log('This is setTimeout 1.');
}, 0);
Promise.resolve().then(() => {
  console.log('This is Promise 1.');
});
process.nextTick(() => {
  console.log('This is process.nextTick 1.');
});


//output:
// This is process.nextTick 1.
// This is Promise 1.
// This is setTimeout 1.
// This is setImmediate 1.
// The readable stream has been closed.

