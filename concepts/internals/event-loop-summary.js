const fs = require('fs');

// --- timer queue: three 0ms timers, each nesting its own microtasks ---
setTimeout(() => {
  console.log('[timer] callback 1');
  process.nextTick(() => console.log('  [nextTick] after timer callback 1'));
  Promise.resolve().then(() => console.log('  [promise] after timer callback 1'));
}, 0);

setTimeout(() => {
  console.log('[timer] callback 2');
  process.nextTick(() => console.log('  [nextTick] after timer callback 2'));
  Promise.resolve().then(() => console.log('  [promise] after timer callback 2'));
}, 0);

setTimeout(() => {
  console.log('[timer] callback 3');
  process.nextTick(() => console.log('  [nextTick] after timer callback 3'));
  Promise.resolve().then(() => console.log('  [promise] after timer callback 3'));
}, 0);

// --- i/o queue ---
fs.readFile(__filename, () => {
  console.log('[i/o] fs.readFile callback');
  process.nextTick(() => console.log('  [nextTick] after i/o callback'));
  Promise.resolve().then(() => console.log('  [promise] after i/o callback'));
});

// --- check queue: three setImmediate, each nesting its own microtasks ---
setImmediate(() => {
  console.log('[check] callback 1');
  process.nextTick(() => console.log('  [nextTick] after check callback 1'));
  Promise.resolve().then(() => console.log('  [promise] after check callback 1'));
});

setImmediate(() => {
  console.log('[check] callback 2');
  process.nextTick(() => console.log('  [nextTick] after check callback 2'));
  Promise.resolve().then(() => console.log('  [promise] after check callback 2'));
});

setImmediate(() => {
  console.log('[check] callback 3');
  process.nextTick(() => console.log('  [nextTick] after check callback 3'));
  Promise.resolve().then(() => console.log('  [promise] after check callback 3'));
});

// --- close queue ---
const readableStream = fs.createReadStream(__filename);
readableStream.close();
readableStream.on('close', () => {
  console.log('[close] readable stream closed');
  process.nextTick(() => console.log('  [nextTick] after close callback'));
  Promise.resolve().then(() => console.log('  [promise] after close callback'));
});

// --- top-level microtasks, queued before the loop even starts ---
process.nextTick(() => console.log('[nextTick] top-level callback'));
Promise.resolve().then(() => console.log('[promise] top-level callback'));


// output:
// [nextTick] top-level callback
// [promise] top-level callback
// [timer] callback 1
//   [nextTick] after timer callback 1
//   [promise] after timer callback 1
// [timer] callback 2
//   [nextTick] after timer callback 2
//   [promise] after timer callback 2
// [timer] callback 3
//   [nextTick] after timer callback 3
//   [promise] after timer callback 3
// [check] callback 1
//   [nextTick] after check callback 1
//   [promise] after check callback 1
// [check] callback 2
//   [nextTick] after check callback 2
//   [promise] after check callback 2
// [check] callback 3
//   [nextTick] after check callback 3
//   [promise] after check callback 3
// [close] readable stream closed
//   [nextTick] after close callback
//   [promise] after close callback
// [i/o] fs.readFile callback
//   [nextTick] after i/o callback
//   [promise] after i/o callback
