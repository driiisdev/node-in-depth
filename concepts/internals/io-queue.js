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

// output:
// This is process.nextTick callback 1
// This is promise.then callback 1
// This is setTimeout callback 1
// This is fs.readFile callback 1
