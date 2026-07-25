// ─── Synchronous callbacks ─────────────────────────────────────────────
//
// A synchronous callback is invoked immediately, on the same call stack,
// before the function that received it returns. There's no queue and no
// waiting on the event loop involved — it behaves exactly like a normal,
// direct function call. Array.prototype.forEach works the same way.
function processItems(items, callback) {
  for (const item of items) {
    callback(item);
  }
}

console.log('start');

// Each call to the callback finishes before processItems() returns, so all
// three 'processed: n' lines are guaranteed to log before 'end' — compare
// this ordering with asynchronous.js, where the callback runs after 'end'.
processItems([1, 2, 3], (item) => console.log('processed:', item));

console.log('end');
