# Node.js

## Course Overview

- Terms & concepts to understand what Node.js is
- Modules (user defined)
- Built-in modules
- Node.js internals
- npm - Node Package Manager
- CLI tool
- Misc

---

## Terms & Concepts to Understand What Node.js Is

### ECMAScript Summary

- ECMA-262 is the language specification
- ECMAScript is the language that implements ECMA-262
- JavaScript is basically ECMAScript at its core but builds on top of that

### Chrome's V8 Engine Summary

- A JavaScript engine is a program that executes JavaScript code
- In 2008, Google created its own JavaScript engine called V8
- V8 is written in C++ and can be used independently or can be embedded into other C++ programs
- That allows you to write your own C++ programs which can do everything that V8 can do and more
- Your C++ program can run ECMAScript and additional features that you choose to incorporate
- For example, features that are available in C++ but not available with JavaScript

### Chrome Browser JavaScript Engine

![Chrome Browser JavaScript Engine](assets/img/chrome%20browser%20javascript%20engine.png)

### Node.js Summary

- Node.js is an open source, cross platform JavaScript runtime environment
- It is not a language, it is not a framework
- Capable of executing JavaScript code outside a browser
- It can execute not only the standard ECMAScript language but also new features that are made available through C++ bindings using the V8 engine
- It consists of C++ files which form the core features and JavaScript files which expose common utilities and some of the C++ features for easier consumption

![Node.js JavaScript Runtime](assets/img/nodejs%20javascript%20runtime.png)

### Executing JavaScript with Node

1. **Node REPL**
   - Read
   - Evaluate
   - Print
   - Loop

2. **Executing code in a JavaScript file in the command line**

### Browser vs Node.js

- In the browser, most of the time what you are doing is interacting with the DOM, or other web platform APIs like cookies
- In Node.js, you don't have the `document`, `window` and all the other objects that are provided by the browser
- In the browser, we don't have all the nice APIs that Node.js provides through its modules. For example the file-system access functionality
- With Node.js, you control the environment
- With a browser, you are at the mercy of what the users choose

---

## Modules

- A module is an encapsulated and reusable chunk of code that has its own context
- In Node.js, each file is treated as a separate module

### Types of Modules

- **Local modules** - modules that we create in our application
- **Built-in modules** - modules that Node.js ships with out of the box
- **Third party modules** - modules written by other developers that we can use in our application

### CommonJS

- CommonJS is a standard that states how a module should be structured and shared
- Node.js adopted CommonJS when it started out and is what you will see in code bases

### Local Modules Summary

- In Node.js, each file is a module that is isolated by default
- To load a module into another file, we use the `require` functionality
- When `index.js` is executed, the code in the module is also executed
- If the file we are requiring is a JavaScript file, we can skip specifying the extension and Node.js will infer it on our behalf

### Module Scope Summary

- Each loaded module in Node.js is wrapped with an IIFE that provides private scoping of code
- IIFE allows you to repeat variable or function names without any conflicts

![IIFE in Node.js](assets/img/iife.png)

### Module Wrapper

- Every module in Node.js gets wrapped in an IIFE before being loaded
- IIFE helps keep top-level variables scoped to the module rather than the global object
- The IIFE that wraps every module contains 5 parameters which are pretty important for the functioning of a module

![Module Wrapper - before wrapping](assets/img/module%20wrapper%281%29.png)

![Module Wrapper - wrapped in an IIFE](assets/img/module%20wrapper%282%29.png)

![Module Wrapper - with its 5 parameters](assets/img/module%20wrapper%283%29.png)

### ES Modules Summary

- ES Modules is the ECMAScript standard for modules
- It was introduced with ES2015
- Node.js 14 and above support ES Modules
- Instead of `module.exports`, we use the `export` keyword
- The export can be default or named
- We import the exported variables or functions using the `import` keyword
- If it is a default export, we can assign any name while importing
- If it is a named export, the import name must be the same

### Built-in Modules

- Modules that Node.js ships with
- Also referred to as core modules
- Import the module before you can use it

#### Focus

- `path`
- `events`
- `fs`
- `stream`
- `http`

#### Path Module

- The `path` module provides utilities for working with file and directory paths
  - `__filename`
  - `__dirname`
  - `basename()`
  - `extname()`
  - `parse()`
  - `format()`
  - `isAbsolute()`
  - `join()`
  - `resolve()`

> **`node:` protocol**
>
> - Makes it perfectly clear that the import is a Node.js builtin module
> - Makes the import identifier a valid absolute URL
> - Avoids conflicts for future Node.js built-in modules

#### Callback Pattern

- In JavaScript, functions are first class objects
- An object is a standalone entity that stores data as key-value pairs
- A class is a blueprint used to create those objects systematically
- Functions that are passed into another function as parameters, and are also called from inside that function, are called callback functions
- Functions that take another function as a parameter/argument, or return a function, are called higher order functions

#### Types of Callbacks

- Synchronous callbacks
- Asynchronous callbacks

##### Synchronous Callbacks

- A callback which is executed immediately is called a synchronous callback

![Synchronous Callbacks](assets/img/synchronous%20callbacks.png)

##### Asynchronous Callbacks

- A callback that is often used to continue or resume code execution after an asynchronous operation has completed
- Callbacks are used to delay the execution of a function until a particular time or event has occurred
- Node.js has an asynchronous nature to prevent blocking of execution
- E.g. reading data from a file, fetching data from a database, or handling a network request

![Asynchronous Callbacks in Browser](assets/img/asynchronous%20callbacks%20in%20browser.png)

#### Events Module

- The `events` module allows us to work with events in Node.js
- An event is an action or an occurrence that has happened in our application that we can respond to
- Using the `events` module, we can dispatch our own custom events and respond to those custom events in a non-blocking manner

#### Character Sets and Encoding

![Character Encoding](assets/img/character%20encoding.png)

![Character & Binary Format](assets/img/character%20%20binary%20format.png)

![Binary Data](assets/img/binary%20data.png)

#### Streams and Buffers

- A stream is a sequence of data that is being moved from one point to another over time
- E.g. a stream of data over the internet being moved from one computer to another
- E.g. a stream of data being transferred from one file to another within the same computer
- Process streams of data in chunks as they arrive instead of waiting for the entire data to be available before processing
- E.g. watching a video on YouTube
  - The data arrives in chunks and you watch in chunks while the rest of the data arrives over time
- E.g. transferring file contents from fileA to fileB
  - The contents arrive in chunks and you transfer in chunks while the remaining contents arrive over time
- Prevents unnecessary data download and memory usage
- Stream is in fact a built-in Node.js module that inherits from the `EventEmitter` class
- Stream is rarely used directly - instead, other modules internally use streams for their functioning

![Buffers Overview](assets/img/buffer%200.png)

![Buffers in a Stream](assets/img/buffer%201.png)

![Buffers as Chunks of Data](assets/img/buffer%202.png)

#### Streams & `pipe()`

- `fs.createReadStream()` and `fs.createWriteStream()` create a readable and a writable stream respectively, without loading the whole file into memory at once
- A readable stream emits a `'data'` event for every chunk it reads, and an `'end'` event once there is no more data to read
- `readableStream.pipe(writableStream)` connects the two directly - it forwards every chunk from the readable stream into the writable stream automatically, and calls `.end()` on the writable stream once the readable stream finishes
  - This replaces manually wiring up `.on('data', chunk => writableStream.write(chunk))` and `.on('end', () => writableStream.end())` yourself
  - `pipe()` also manages backpressure automatically - it pauses the readable stream if the writable stream's internal buffer is still full, and resumes it once there's room
- `pipe()` returns the destination stream, so pipes can be chained (`readable.pipe(transform).pipe(writable)`) to build a processing pipeline, e.g. piping through `zlib.createGzip()` to compress data on the way to disk
- A single readable stream can be piped to more than one destination, e.g. writing the plain file to `file2.txt` while also piping it through gzip into `file2.txt.gz`
- The `highWaterMark` option controls the internal buffer size (in bytes) for how much data is read into memory per chunk - a smaller value means more, smaller reads
- Always attach an `'error'` listener to the readable stream - a missing/incorrect file path throws an unhandled `'error'` event instead of failing loudly in an obvious way

#### Asynchronous JavaScript

- **JavaScript in its basic form is a <u>Synchronous</u>, <u>Blocking</u>, <u>Single-Threaded</u> language.**
- **<u>Synchronous</u>**: If we have two functions which log messages to the console, code executes top down, with only one line executing at any given time.
- **<u>Blocking</u>**: No matter how long a previous process takes, the subsequent processes won't kick off until the former is completed. If a web app runs in a browser and it executes an intensive chunk of code without returning control to the browser, the browser can appear to be frozen.
- **<u>Single threaded</u>**: A thread is simply a unit of a process that JavaScript programs use to run tasks. Each thread can only do one task at a time. JavaScript has just the one thread, called the main thread, for executing any code.

**<u>NB:</u>**
- Just JavaScript is not enough - we need new pieces which are outside of JavaScript to help us write asynchronous code.
- For front end, this is where web browsers come into play. For back end, this is where Node.js comes into play.
- Web browsers and Node.js define functions and APIs that allow us to register functions that should not be executed synchronously, and should instead be invoked asynchronously when some kind of event occurs.
- For example, that could be the passage of time (`setTimeout` or `setInterval`), the user's interaction with the mouse (`addEventListener`), data being read from the file system, or the arrival of data over the network (callbacks, promises, async/await).
- You can let your code do several things at the same time without stopping or blocking your main thread.

#### fs Module

- The file system (`fs`) module allows you to work with the file system on your computer
- It supports reading, writing, updating, deleting, and watching files and directories
- Most methods are available in three flavors:
  - **Synchronous** - blocks the main thread until the operation completes, e.g. `readFileSync()`
  - **Callback-based (asynchronous)** - non-blocking, takes a callback that runs once the operation completes, e.g. `readFile()`
  - **Promise-based** - non-blocking, returned via `fs/promises`, works well with `async`/`await`
- Prefer the asynchronous or promise-based APIs in production code so file I/O doesn't block the single main thread

##### Common `fs` Methods

- `readFile()` / `writeFile()` / `appendFile()` - read from, write to, or append to a file
- `readdir()` - read the contents of a directory
- `mkdir()` / `rmdir()` - create or remove a directory
- `unlink()` - delete a file
- `stat()` - get information about a file or directory (size, type, timestamps, etc.)
- `rename()` - rename or move a file
- `existsSync()` - synchronously check whether a path exists
- `createReadStream()` / `createWriteStream()` - read from or write to a file as a stream, useful for large files

#### HTTP and Node

![How the Web Works - Client and Server](assets/img/how%20the%20web%20works%201.png)

![How the Web Works - Request and Response](assets/img/how%20the%20web%20works%202.png)

- HTTP stands for HyperText Transfer Protocol
- It's a protocol that defines a format for clients and servers to speak to each other
- The client sends an HTTP request and the server responds with an HTTP response
- We can create a web server using Node.js
- Node.js has access to operating system functionality like networking
- Node has an event loop to run tasks asynchronously, which makes it well suited for a web server that needs to handle large volumes of requests simultaneously
- The server we create with Node still needs to respect the HTTP format
- The `http` module allows creation of web servers that can transfer data over HTTP

---

## Node.js Internals

![Node.js Runtime](assets/img/nodejs%20runtime.png)

### libuv

- **<u>What?</u>** libuv is a cross platform, open source library written in C
- **<u>Why?</u>** Handles asynchronous, non-blocking operations in Node.js
- **<u>How?</u>**
  - Thread pool
  - Event loop

#### Thread Pool

- **<u>Main thread</u>**: "Hey libuv, I need to read file contents but that's a time consuming task. I don't want to block further code from being executed during this time. Can I offload this task to you?"
- **<u>libuv</u>**: "Sure, main thread. Unlike you, who is single-threaded, I have a pool of threads that I can use to run some of these time-consuming tasks. When the task is done, the file contents are retrieved and the associated callback function can be run."

![Thread Pool Visualization](assets/img/thread%20pool%20visualization.png)

#### Experiment 1 - Synchronous Methods

- Every method in Node.js that has the `Sync` suffix always runs on the main thread and is blocking
- [`concepts/internals/thread-exp1.js`](concepts/internals/thread-exp1.js) runs three sequential `crypto.pbkdf2Sync()` calls - since each one blocks the main thread until it completes, the total logged time is roughly the sum of all three hashes

![Synchronous Methods Execution](assets/img/synchronous%20methods%20execution.png)

#### Experiment 2 - Asynchronous Methods

- A few async methods, like `fs.readFile` and `crypto.pbkdf2`, run on a separate thread in libuv's thread pool
- They do run synchronously in their own thread, but as far as the main thread is concerned, it appears as if the method is running asynchronously
- [`concepts/internals/thread-exp2.js`](concepts/internals/thread-exp2.js) fires three `crypto.pbkdf2()` calls in a loop - because they run in parallel across libuv's thread pool, all three callbacks report roughly the same elapsed time instead of stacking up one after another

![Asynchronous Methods Execution](assets/img/asynchronous%20methods%20execution.png)

#### Experiment 3 - Thread Pool Size (Default)

- libuv's thread pool has 4 threads by default
- [`concepts/internals/thread-exp3.js`](concepts/internals/thread-exp3.js) fires 5 `crypto.pbkdf2()` calls in a loop - with only 4 threads available, the first 4 hashes complete together while the 5th has to wait for a thread to free up, so it reports roughly double the time of the others

![5 Asynchronous Method Execution](<assets/img/5 asynchronous method execution.png>)

#### Experiment 4 - Increasing Thread Pool Size

- By increasing the thread pool size, we are able to improve the total time taken to run multiple calls of an asynchronous method like `pbkdf2`
- [`concepts/internals/thread-exp4.js`](concepts/internals/thread-exp4.js) sets `process.env.UV_THREADPOOL_SIZE = 5` before the loop, so all 5 `crypto.pbkdf2()` calls get their own thread and complete together, unlike in Experiment 3

#### Experiment 5 - Thread Pool Size vs. CPU Cores

- Increasing the thread pool size can help with performance, but that improvement is limited by the number of available CPU cores
- Once the thread pool size exceeds the number of CPU cores, threads start competing for the same cores and additional gains taper off

> **NB:** The CPU used in the images below has just 8 cores

![Asynchronous Methods vs Cores - 0 pbkdf2 calls (baseline)](<assets/img/asynchronous methods vs cores (0).png>)

- 0 `pbkdf2` calls - baseline, idle state - no thread pool work running, so no core is being driven by libuv

![Asynchronous Methods vs Cores - 1 pbkdf2 call](<assets/img/asynchronous methods vs cores (1).png>)

- 1 `pbkdf2` call - a single async call occupies a single thread, so only 1 of the 8 cores is put to work

![Asynchronous Methods vs Cores - 8 pbkdf2 calls](<assets/img/asynchronous methods vs cores (8).png>)

- 8 `pbkdf2` calls - matches the number of CPU cores exactly, so each call runs on its own core in parallel - full utilization and the fastest possible completion time for this many calls

![Asynchronous Methods vs Cores - 16 pbkdf2 calls](<assets/img/asynchronous methods vs cores (16).png>)

- 16 `pbkdf2` calls - double the number of cores, so calls now have to share cores two at a time - all 8 cores are maxed out, but since each core is time-slicing 2 calls, total completion time roughly doubles instead of improving further, showing the CPU core ceiling on thread pool gains

#### Experiment 6 - Network I/O

- `https.request` is a network I/O operation, not a CPU-bound operation
- It does not use the thread pool
- Instead, libuv delegates the work to the operating system kernel, and, where possible, polls the kernel to see whether the request has completed
- [`concepts/internals/network-io.js`](concepts/internals/network-io.js) fires 2 `https.request()` calls in a loop - since network I/O relies on the OS's native async mechanism instead of the thread pool, both requests complete in roughly the same amount of time, with none of the "waiting for a free thread" delay seen in Experiment 3
- Although both `crypto.pbkdf2` and `https.request` are asynchronous, `https.request` does not use the thread pool, and it is not affected by the number of CPU cores either

#### libuv and Async Methods Summary

- In Node.js, async methods are handled by libuv, in one of two ways:
  1. **Native async mechanism**
  2. **Thread pool**
- Whenever possible, libuv uses the OS's native async mechanism so as to avoid blocking the main thread
- Since this is part of the kernel, there is a different mechanism per OS - `epoll` for Linux, `kqueue` for macOS, and I/O Completion Ports (IOCP) on Windows
- Relying on native async mechanisms makes Node.js scalable, since the only limitation is the operating system kernel
- An example of this type of operation is network I/O
- If there is no native async support and the task is file I/O or CPU-intensive, libuv falls back to the thread pool to avoid blocking the main thread
- Although the thread pool preserves asynchrony with respect to Node's main thread, it can still become a bottleneck if all threads are busy

> **Thread pool**: a thread pool is a group of pre-instantiated, idle threads that stand ready to receive work. When many short tasks need to be done rather than a few long ones, using a thread pool is preferred over instantiating a new thread per task. This avoids the performance cost of constantly creating and tearing down threads. If you tune the thread pool size, server components can reuse threads instead of creating new ones at runtime for every request, which improves overall system performance.
>
> **Native async mechanism**: libuv's *preferred* way of handling async work, used whenever the operating system itself can notify libuv that a task has finished, instead of libuv having to occupy one of its own worker threads for the duration of the task. This applies to most **network I/O** - TCP/UDP sockets, HTTP(S) requests, etc. When you call something like `https.request()`, the OS opens a non-blocking socket and hands it back to libuv immediately, and no worker thread sits around blocked on that connection.
>
> Instead, libuv registers the socket with the OS kernel's readiness/completion API - `epoll` on Linux, `kqueue` on macOS/BSD, and I/O Completion Ports (IOCP) on Windows. These APIs let a single thread ask the kernel "which of these sockets are ready to be read from/written to (or have completed)?" in one call, instead of needing a dedicated thread per socket to watch it. On every iteration of the event loop, in its **poll phase**, libuv checks in with this kernel API, and when a socket is ready (or an operation has completed), invokes the associated JavaScript callback on the main thread.
>
> This is fundamentally different from the thread pool: the thread pool occupies an actual OS thread, blocked for the task's duration, capped by pool size (default 4) and, beyond that, CPU core count. The native async mechanism occupies no worker thread at all while waiting - the kernel does the "waiting," and libuv is simply notified. That's why [`concepts/internals/network-io.js`](concepts/internals/network-io.js) can fire off multiple `https.request()` calls that all complete in roughly the same time, unaffected by `UV_THREADPOOL_SIZE` or the number of CPU cores - and it's a big part of why Node.js scales well as a web server: thousands of concurrent connections doesn't mean thousands of OS threads, just the kernel efficiently tracking sockets while libuv's single-threaded event loop reacts as it's notified.

### Event Loop

![Event Loop](<assets/img/event loop (0).png>)

- It is a C program, and part of libuv
- A design pattern that orchestrates/coordinates the execution of synchronous and asynchronous code in Node.js

#### Q&A

- **Q: Whenever an async task completes in libuv, at what point does Node decide to run the associated callback function on the call stack?**
  - A: Callback functions are only executed once the call stack is empty - the normal flow of execution is never interrupted to run a callback
- **Q: What about async methods like `setTimeout` and `setInterval`, which also delay the execution of a callback function?**
  - A: `setTimeout`/`setInterval` callbacks are given first priority among the async callbacks waiting to run
- **Q: If two async tasks, such as `setTimeout` and `readFile`, complete at the same time, how does Node decide which callback to run on the call stack first?**
  - A: Timer callbacks are executed before I/O callbacks, even if both become ready at the exact same time

#### Visual Representation

![Synchronous Code Execution in Node.js](assets/img/synchronous%20code%20execution%20in%20nodejs.png)

- With purely synchronous code, every function call is pushed onto and popped off the call stack top to bottom, with nothing else able to run in between

![Asynchronous Code Execution in Node.js (1)](<assets/img/asynchronous code execution in nodejs (1).png>)
![Asynchronous Code Execution in Node.js (2)](<assets/img/asynchronous code execution in nodejs (2).png>)
![Asynchronous Code Execution in Node.js (3)](<assets/img/asynchronous code execution in nodejs (3).png>)
![Asynchronous Code Execution in Node.js (4)](<assets/img/asynchronous code execution in nodejs (4).png>)

- With async code, calls that trigger async work (timers, I/O, etc.) return immediately and are handed off to libuv, letting the call stack continue emptying out
- Once the call stack is empty, the event loop picks up completed callbacks from their respective queues and pushes them onto the call stack to run, one at a time

#### Event Loop - Execution Order

- User-written synchronous JavaScript code always takes priority over any async code the runtime would like to execute
- Only once the call stack is empty does the event loop come into play

Per iteration of the loop:

1. Any callbacks in the microtask queues are executed - first the `nextTick` queue, then the Promise queue
2. All callbacks in the **timers** queue are executed
3. Microtask queues are drained again - `nextTick` queue, then Promise queue
4. Microtask queues are drained again - `nextTick` queue, then Promise queue
5. Microtask queues are drained again - `nextTick` queue, then Promise queue
6. All callbacks in the **check** queue are executed
7. Microtask queues are drained again - `nextTick` queue, then Promise queue
8. All callbacks in the **close** queue are executed
9. For one final time in the same loop iteration, the microtask queues are drained - `nextTick` queue, then Promise queue

- If there are more callbacks left to process, the loop stays alive for another iteration and the same steps repeat
- If all callbacks have been executed and there's no more code left to process, the event loop exits

#### Microtask Queue

![Event Loop](<assets/img/event loop (0).png>)

- The microtask queue is what steps 1, 3, 4, 5, 7 and 9 above are draining - it holds tasks that run after the current operation completes, but before the event loop moves on to the next phase (timers, check, I/O, close, etc.)
- There are two microtask queues, always processed in the same order: the **`nextTick` queue**, then the **Promise queue**

##### `process.nextTick()`

- Schedules a callback to run on the next microtask checkpoint, before any I/O events or timers
- Belongs to the `nextTick` queue, which is always drained before the Promise queue

##### `promise.then()`

- Schedules a callback on the **Promise queue** - when a promise resolves, its `.then()` callback is queued to run after the current operation completes and before any I/O events or timers

- `process.nextTick()` and `promise.then()` are both used to defer work until the next iteration of the event loop, but for different use cases:
  - `process.nextTick()` is for a callback that needs to run immediately after the current operation completes
  - `promise.then()` is for handling asynchronous work that may take some time to resolve
- Since the `nextTick` queue is processed before the Promise queue, `process.nextTick()` callbacks always run before `promise.then()` callbacks when both are scheduled

- [`concepts/internals/microtask-queue.js`](concepts/internals/microtask-queue.js) schedules three `process.nextTick()` calls (the second of which nests another `nextTick()` inside it), followed by three `Promise.resolve().then()` calls (the second nests another `.then()`, and the third nests a `process.nextTick()`). The logged output is:

  ```text
  This is process.nextTick callback 1
  This is process.nextTick callback 2
  This is process.nextTick callback 3
  This is the nested process.nextTick callback
  This is promise.then callback 1
  This is promise.then callback 2
  This is promise.then callback 3
  This is the nested promise.then callback
  This is process.nextTick callback 4
  ```

  - The `nextTick` queue is drained completely - including the nested `nextTick` callback added while it was still draining - before the Promise queue gets a turn
  - Even though `process.nextTick callback 4` is scheduled from inside `promise.then callback 3`, it doesn't jump the line - by that point the engine is already draining the Promise queue for this checkpoint, so the new `nextTick` callback has to wait for the next checkpoint, after the nested `promise.then` callback

> **Note on `process.nextTick()`**
>
> - Overusing `process.nextTick()` is discouraged, since it can starve the rest of the event loop
> - If you call `process.nextTick()` recursively without end, control never makes it past the microtask queue - timers, I/O, and everything else in the event loop is blocked indefinitely
>
> **Two main reasons to use `process.nextTick()`:**
>
> 1. To let users handle errors, clean up any now-unneeded resources, or perhaps retry the request, before the event loop continues
> 2. To let a callback run after the call stack has unwound but before the event loop continues to the next phase

#### Timer Queue

![Event Loop](<assets/img/event loop (0).png>)

- The timer queue is a priority queue implementation that holds scheduled `setTimeout`/`setInterval` timers, ordered by their expiration time
- It's implemented as a min-heap, so the timer with the earliest expiration time always sits at the root - this keeps inserting a new timer and finding the next one to run efficient
- On the **timers** phase of each event loop iteration, the queue is checked for any expired timers and their callbacks are executed in order of expiration

- [`concepts/internals/timer-queue.js`](concepts/internals/timer-queue.js) schedules three `setTimeout()` calls with different delays - `1000ms` (nesting a `promise.then()`), `500ms` (nesting a `process.nextTick()`), and `0ms` - alongside the same three `process.nextTick()` and three `promise.then()` calls used in the microtask queue experiment above. The logged output is:

  ```text
  This is process.nextTick callback 1
  This is process.nextTick callback 2
  This is process.nextTick callback 3
  This is the nested process.nextTick callback
  This is promise.then callback 1
  This is promise.then callback 2
  This is promise.then callback 3
  This is the nested promise.then callback
  This is process.nextTick callback 4
  This is setTimeout callback 3
  This is setTimeout callback 2
  This is the inner next tick inside setTimeout
  This is setTimeout callback 1
  This is the inner promise.then inside setTimeout
  ```

  - All of the top-level microtask work still drains completely before any timer callback runs - the event loop doesn't touch the `setTimeout` callbacks until every `nextTick`/`promise.then` callback above has run
  - With staggered delays, the timers no longer expire together and get processed as one batch (as they did when all three were `0ms`) - each timer callback now runs on its own turn as its delay elapses, in ascending order of expiration: callback 3 (`0ms`) → callback 2 (`500ms`) → callback 1 (`1000ms`)
  - Because each timer fires individually now instead of being snapshotted as a group, the event loop gets a chance to drain the microtask queue right after each timer callback finishes, before moving on - so callback 2's inner `process.nextTick` logs immediately after callback 2, and callback 1's inner `promise.then` logs immediately after callback 1, rather than both inner microtasks being deferred and bunched together at the end like in the original all-`0ms` version of this file

**Experiment inference:** callbacks in the microtask queues are executed in between the execution of callbacks in the timer queue - and with staggered delays this is even clearer, since each inner microtask now runs directly after its own timer callback and before the next timer fires

**Experiment inference:** timer queue callbacks execute in order of expiration time, not registration order - when delays are equal (as in the original `0ms`/`0ms`/`0ms` version of this file), that resolves as FIFO by registration order as a tiebreak, but with distinct delays of `1000ms`, `500ms`, and `0ms`, the shortest delay runs first and the longest runs last

#### I/O Queue

![Event Loop](<assets/img/event loop (0).png>)

- The I/O queue holds callbacks for completed I/O operations (e.g. `fs.readFile`), processed during the **poll** phase of the event loop
- Callbacks are queued in the order their operations complete, and are drained in that (FIFO) order

- [`concepts/internals/io-queue.js`](concepts/internals/io-queue.js) fires an `fs.readFile()` call alongside a `process.nextTick()`, a `promise.then()`, and a `setTimeout(0)`. The logged output is:

  ```text
  This is process.nextTick callback 1
  This is promise.then callback 1
  This is setTimeout callback 1
  This is fs.readFile callback 1
  ```

  - The microtask queues (`nextTick`, then Promise) drain first, before the event loop reaches either the timers phase or the poll phase
  - Even though `readFile` was called before `setTimeout`, its callback runs last - reading the file is genuinely asynchronous work that has to complete first, while the `0ms` timer is already expired by the time the event loop reaches the timers phase, so it's ready to run before the I/O callback ever queues up

**Experiment inference:** callbacks in the microtask queues are executed before callbacks in the I/O queue

**Experiment inference:** when running `setTimeout` with a `0ms` delay alongside an async I/O method, the order of execution between them can never be guaranteed - it depends on how long the I/O operation actually takes to complete relative to the timer

**Experiment inference:** I/O queue callbacks are executed after both the microtask queue callbacks and the timer queue callbacks

#### I/O Polling

![Event Loop](<assets/img/event loop (0).png>)

- I/O readiness checking happens during the event loop's **poll** phase, which uses the OS's native polling mechanism (`epoll`/`kqueue`/IOCP) to check file descriptors like sockets and files for pending events
- The poll phase doesn't block waiting on a single pending operation if there's other work already queued up - it polls, and a callback is only added to the I/O queue once its operation has actually completed
- This is what allows Node.js to handle many concurrent connections without blocking the execution of other code

- [`concepts/internals/io-polling.js`](concepts/internals/io-polling.js) extends the I/O queue experiment above by adding a `setImmediate()` call alongside the `fs.readFile()`, `process.nextTick()`, `promise.then()`, and `setTimeout(0)` calls. The logged output is:

  ```text
  This is process.nextTick callback 1
  This is promise.then callback 1
  This is setTimeout callback 1
  This is setImmediate callback 1
  This is fs.readFile callback 1
  ```

  - `setImmediate()` callbacks run in the **check** phase, which comes after the **poll** phase in a single loop iteration
  - Even so, `setImmediate callback 1` logs before `fs.readFile callback 1` - when the event loop reaches the poll phase, the file read hasn't finished yet, and since a `setImmediate` callback is already queued up, the loop doesn't block waiting for the read. It moves on to the check phase, and the `fs.readFile` callback only runs once the read has actually completed and been added to the I/O queue - on a later pass through the poll phase

**Experiment inference:** I/O events are polled, and their callbacks are only added to the I/O queue once the I/O has actually completed - the event loop won't block the poll phase waiting on them if there's other work already queued

#### Check Queue

![Event Loop](<assets/img/event loop (0).png>)

- The check queue holds callbacks scheduled with `setImmediate()`, drained during the event loop's **check** phase, which runs immediately after the **poll** phase (where I/O callbacks run) in each iteration

- [`concepts/internals/check-queue.js`](concepts/internals/check-queue.js) schedules a `process.nextTick()`, a `promise.then()`, two `setTimeout(0)` calls, three `setImmediate()` calls (the second nesting a `process.nextTick()` and a `promise.then()`), and an `fs.readFile()` call whose callback nests a `setImmediate()`, a `process.nextTick()`, and a `promise.then()`. The logged output is:

  ```text
  This is process.nextTick callback 1
  This is promise.then callback 1
  This is setTimeout callback 1
  This is setTimeout callback 2
  This is setImmediate callback 1
  This is setImmediate callback 2
  This is inner process.nextTick inside setImmediate callback 2
  This is inner promise.then inside setImmediate callback 2
  This is setImmediate callback 3
  This is fs.readFile callback 1
  This is inner process.nextTick inside fs.readFile callback 1
  This is inner promise.then inside fs.readFile callback 1
  This is inner setImmediate inside fs.readFile callback 1
  ```

  - Top-level microtasks drain first (`nextTick`, then Promise), then both `0ms` timers run - their relative order isn't strictly guaranteed since both expire at the same time, but they ran in registration order here
  - All three top-level `setImmediate` callbacks then run in registration order during the check phase - `setImmediate callback 2`'s inner `nextTick`/`promise.then` callbacks drain immediately after it finishes and before `setImmediate callback 3` runs, since the microtask queues are checked after every individual callback, not just once per phase
  - `fs.readFile callback 1` only runs after all three top-level `setImmediate` callbacks - the check phase for this iteration finishes before the loop cycles back around to the poll phase, where the now-completed read is finally picked up
  - The inner `setImmediate` scheduled inside `fs.readFile callback 1` has to wait for the check phase of the *next* loop iteration - but the inner `process.nextTick`/`promise.then` callbacks scheduled alongside it still drain immediately, before that

**Experiment inference:** check queue callbacks are executed after microtask queue callbacks, timer queue callbacks, and I/O queue callbacks have already run

**Experiment inference:** microtask queue callbacks are executed after I/O callbacks and before check queue callbacks - and in between check queue callbacks too, since the microtask queues are drained after every single callback rather than once per phase

**Experiment inference:** when running `setTimeout` with a `0ms` delay alongside `setImmediate` outside of an I/O callback, the relative order of execution between them can never be guaranteed - it depends on how quickly the loop reaches the timers phase relative to the poll/check phases on a given run

#### Close Queue

![Event Loop](<assets/img/event loop (0).png>)

- The close queue holds callbacks for `'close'` events - e.g. a socket destroyed with `socket.destroy()`, or a stream shut down with `.close()` - drained during the event loop's **close callbacks** phase, the final phase of a loop iteration
- It comes after timers, poll (I/O), and check in the documented phase order - though as the experiment below (and the next section) shows, that "documented order" only reliably holds when I/O completes within the same iteration. A stream's `'close'` event is emitted through Node's own internal stream scheduling rather than a genuine libuv close-handle completion, so it can resolve faster than a slower, genuinely async I/O operation competing with it

- [`concepts/internals/close-queue.js`](concepts/internals/close-queue.js) opens a readable stream on itself and immediately calls `.close()` on it, alongside a `setImmediate()`, a `setTimeout(0)`, a `promise.then()`, and a `process.nextTick()`. The logged output is:

  ```text
  This is process.nextTick 1.
  This is Promise 1.
  This is setTimeout 1.
  This is setImmediate 1.
  The readable stream has been closed.
  ```

  - Both microtask queues drain first, then the `0ms` timer, then the `setImmediate` in the check phase, and only then the stream's `close` callback - matching the documented timers → poll → check → close order, since there's no slower I/O operation here to compete with the close callback for a spot in an earlier loop iteration

**Experiment inference:** close queue callbacks are executed after microtask queue callbacks, timer queue callbacks, and check queue callbacks have already run - it's the last of the six queues drained in a given iteration of the event loop

#### Event Loop Summary

![Event Loop](<assets/img/event loop (0).png>)

- The event loop is a C program, part of libuv, that orchestrates/coordinates the execution of synchronous and asynchronous code in Node.js
- It coordinates the execution of callbacks across six different queues: `nextTick`, Promise, timer, I/O, check, and close
  - `process.nextTick()` queues a callback into the `nextTick` queue
  - Resolving or rejecting a promise queues its `.then()`/`.catch()` callback into the Promise queue
  - `setTimeout()`/`setInterval()` queue a callback into the timer queue
  - Firing off an async method (e.g. `fs.readFile()`, a network request) queues its callback into the I/O queue
  - `setImmediate()` queues a callback into the check queue
  - A handle or stream being closed (e.g. `socket.destroy()`, `readableStream.close()`) queues its `'close'` listener into the close queue
- The order of execution follows the order those queues are listed above: microtasks (`nextTick`, then Promise) → timer → microtasks → I/O → microtasks → check → microtasks → close → microtasks
- Crucially, the `nextTick` and Promise queues aren't only drained once per phase - they're drained **in between every single callback execution**, including in between each individual callback within the timer queue and within the check queue, not just once when the whole phase finishes

- [`concepts/internals/event-loop-summary.js`](concepts/internals/event-loop-summary.js) ties every queue from this section together in a single file, to make that last point concrete: three `setTimeout(0)` calls, an `fs.readFile()` call, three `setImmediate()` calls, and a closed readable stream's `'close'` event - each of which nests its own `process.nextTick()` and `promise.then()` callback - alongside one top-level `process.nextTick()` and `promise.then()` pair. The logged output is:

  ```text
  [nextTick] top-level callback
  [promise] top-level callback
  [timer] callback 1
    [nextTick] after timer callback 1
    [promise] after timer callback 1
  [timer] callback 2
    [nextTick] after timer callback 2
    [promise] after timer callback 2
  [timer] callback 3
    [nextTick] after timer callback 3
    [promise] after timer callback 3
  [check] callback 1
    [nextTick] after check callback 1
    [promise] after check callback 1
  [check] callback 2
    [nextTick] after check callback 2
    [promise] after check callback 2
  [check] callback 3
    [nextTick] after check callback 3
    [promise] after check callback 3
  [close] readable stream closed
    [nextTick] after close callback
    [promise] after close callback
  [i/o] fs.readFile callback
    [nextTick] after i/o callback
    [promise] after i/o callback
  ```

  - The top-level `nextTick`/`promise.then` pair runs first, before the loop touches any phase at all - the same "microtasks drain before the event loop continues" behavior seen at the start of every earlier experiment in this section
  - Each of the three timer callbacks fires, and its own nested `nextTick`/`promise.then` pair drains **immediately after it and before the next timer callback runs** - proving the microtask checkpoint happens after every individual callback within the timers phase, not once for the whole phase. The same pattern holds for all three check-phase (`setImmediate`) callbacks
  - The close callback fires *before* the I/O callback here, inverting the "documented" timer → I/O → check → close order from earlier in this section. That's not a contradiction - a stream's `'close'` event resolves through Node's internal stream scheduling and completes within this same loop iteration, while `fs.readFile()` reading this file back off disk is genuinely slower and only completes on a later pass through the poll phase - the same "order between I/O and everything else is never guaranteed" caveat from the I/O Queue and I/O Polling experiments, just made visible with more queues in the mix
  - No matter which major queue's callback runs or in what order, its nested `nextTick`/`promise.then` pair always drains immediately afterward, before control ever moves on to the next callback - confirming that the microtask queues sit in between every single callback execution across the whole event loop, not just between phases

**Experiment inference:** the `nextTick` and Promise queues are drained in between each of the six major queues, *and* in between every individual callback execution within the timer and check queues - a fresh microtask checkpoint runs after every single callback the event loop executes, not once per phase

---

## npm - Node Package Manager

### What Is npm?

1. It is the world's largest software library (registry)
2. It is a software package manager

### npm Is a Software Library

- Just like a book library contains books written by various authors
- npm is a library, or registry, which contains code packages written by various developers
- It is a large public database of JavaScript code that developers from all over the world can use to share and borrow code
- If you author a "code package," you can publish it to the npm registry for others to use
- If you come across a code package authored by someone else that solves the problem you have at hand, you can borrow that code without having to reinvent the wheel

### npm Is a Software Package Manager

- Developers publish and consume code packages
- How does a developer publish a package?
- How does a developer consume a package?
- What happens if the code package author decides to change a function name in a package?
- How would one update an already installed package?
- What if the package I am consuming is dependent on another package?
- A command line interface tool that lets us manage packages in a project
- Other package managers exist too, such as `pnpm` and `yarn`
- `npm` is the default package manager for Node.js
- `npm` did stand for Node Package Manager when it first started out
- Now, it is simply the package manager for the JavaScript programming language

### `package.json`

- **<u>What?</u>** `package.json` is npm's configuration file - a JSON file that typically lives in the root directory of your package and holds various metadata relevant to the package
- **<u>Why?</u>** `package.json` is the central place to configure and describe how to interact with and run your package - it is primarily used by the npm CLI
