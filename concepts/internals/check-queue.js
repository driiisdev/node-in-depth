
const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('This is fs.readFile callback 1');
  setImmediate(() => {
    console.log('This is inner setImmediate inside fs.readFile callback 1');
  });
  process.nextTick(() => {
    console.log('This is inner process.nextTick inside fs.readFile callback 1');
  });
  Promise.resolve().then(() => {
    console.log('This is inner promise.then inside fs.readFile callback 1');
  });
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
setImmediate(() => {
  console.log('This is setImmediate callback 2');
  process.nextTick(() => {
    console.log('This is inner process.nextTick inside setImmediate callback 2');
  });
  Promise.resolve().then(() => {
    console.log('This is inner promise.then inside setImmediate callback 2');
  });
});
setTimeout(() => {
  console.log('This is setTimeout callback 2');
}, 0);
setImmediate(() => {
  console.log('This is setImmediate callback 3');
});


// output:
// This is process.nextTick callback 1
// This is promise.then callback 1
// This is setTimeout callback 1
// This is setTimeout callback 2 // the order of this two setTimeout callbacks is not guaranteed, they may be swapped because of the 0ms delay
// This is setImmediate callback 1
// This is setImmediate callback 2
// This is inner process.nextTick inside setImmediate callback 2
// This is inner promise.then inside setImmediate callback 2
// This is setImmediate callback 3
// This is fs.readFile callback 1
// This is inner process.nextTick inside fs.readFile callback 1
// This is inner promise.then inside fs.readFile callback 1
// This is inner setImmediate inside fs.readFile callback 1
