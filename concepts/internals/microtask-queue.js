
process.nextTick(() => {
  console.log('This is process.nextTick callback 1');
});

process.nextTick(() => {
  console.log('This is process.nextTick callback 2');
  process.nextTick(() => {
    console.log('This is the nested process.nextTick callback');
  });
});

process.nextTick(() => {
  console.log('This is process.nextTick callback 3');
});

Promise.resolve().then(() => {
  console.log('This is promise.then callback 1');
});

Promise.resolve().then(() => {
  console.log('This is promise.then callback 2');
  Promise.resolve().then(() => {
    console.log('This is the nested promise.then callback');
  });
});

Promise.resolve().then(() => {
  console.log('This is promise.then callback 3');
  process.nextTick(() => {
    console.log('This is process.nextTick callback 4');
  });
});

// -- The output of this code will be: --
// This is process.nextTick callback 1
// This is process.nextTick callback 2
// This is process.nextTick callback 3
// This is the nested process.nextTick callback
// This is promise.then callback 1
// This is promise.then callback 2
// This is promise.then callback 3
// This is the nested promise.then callback
// This is process.nextTick callback 4