
setTimeout(() => {
  console.log('This is setTimeout callback 1')
  Promise.resolve().then(() => {
    console.log('This is the inner promise.then inside setTimeout');
  });
}, 1000);
setTimeout(() => {
  console.log('This is setTimeout callback 2');
  process.nextTick(() => {
    console.log('This is the inner next tick inside setTimeout');
  });
}, 500);
setTimeout(() => {
  console.log('This is setTimeout callback 3')
}, 0);


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

// output:
// This is process.nextTick callback 1
// This is process.nextTick callback 2
// This is process.nextTick callback 3
// This is the nested process.nextTick callback
// This is promise.then callback 1
// This is promise.then callback 2
// This is promise.then callback 3
// This is the nested promise.then callback
// This is process.nextTick callback 4
// This is setTimeout callback 3
// This is setTimeout callback 2
// This is the inner next tick inside setTimeout
// This is setTimeout callback 1
// This is the inner promise.then inside setTimeout
