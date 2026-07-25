// ─── Asynchronous callbacks ─────────────────────────────────────────────
/**
 * JavaScript (and Node.js) runs on a single thread, so it can only execute one piece of code at a time. If every operation had to finish before the next line could run, a slow operation (reading a file, querying a database, waiting on a network request) would freeze the whole program.
    
 * Node.js avoids this by handing operations like file I/O off to the underlying OS/libuv thread pool instead of doing them on the main thread. The function that starts the operation (fs.readFile below) returns immediately, and the main thread moves on to the next line without waiting for it to finish.

 * The callback passed to that operation doesn't run right away either — once the operation completes, its callback is placed in a queue. Node's event loop only picks callbacks up off that queue once the call stack is empty, i.e. once all the synchronous code currently running has finished. That's what makes it "asynchronous": it runs later, out of the original line order.
*/

/**
 * Walking through the example below:
 *   1. 'start' logs first — synchronous code always runs before any
 *      queued callback.
 *   2. fs.readFile() is called. It kicks off the file read in the
 *      background and returns immediately, without waiting for the file.
 *   3. 'end' logs next, synchronously, even though the file hasn't been
 *      read yet.
 *   4. Only once the file read finishes AND the call stack is clear does
 *      the event loop dequeue the readFile callback, logging the file's
 *      length.
 */

// Expected output order: start -> end -> file read, length: <n>
const fs = require('node:fs');
const path = require('node:path');

console.log('start');

fs.readFile(path.join(__dirname, 'asynchronous.js'), 'utf8', (err, data) => {
  if (err) throw err;
  // Runs later, once the event loop dequeues this callback.
  console.log('file read, length:', data.length);
});

// Logs before the file finishes reading — proof the main thread wasn't blocked.
console.log('end');
