# Node.js In Depth

Personal study notes and runnable code examples from working through Node.js internals - modules, built-in APIs, and how libuv drives the event loop under the hood.

## Contents

- **[Note.md](Note.md)** - the formatted, canonical notes (start here)
- **[note.txt](note.txt)** - raw/scratch notes, gradually cleaned up into `Note.md`
- **[concepts/](concepts/)** - small runnable scripts referenced from the notes, one topic per folder:
  - [`buffers/`](concepts/buffers/) - working with `Buffer`
  - [`callbacks/`](concepts/callbacks/) - synchronous vs. asynchronous callbacks
  - [`events/`](concepts/events/) - the `events` module and custom emitters
  - [`fs/`](concepts/fs/) - file system access and streams
  - [`http/`](concepts/http/) - a basic HTTP server
  - [`internals/`](concepts/internals/) - libuv experiments: thread pool sizing, network I/O vs. thread pool, microtask queue ordering
  - [`local-modules/`](concepts/local-modules/) - CommonJS module loading
  - [`path/`](concepts/path/) - the `path` module
- **[assets/img/](assets/img/)** - diagrams and experiment screenshots embedded in `Note.md`

## Running the examples

No dependencies or `package.json` - every script is plain Node.js. Run any file directly:

```sh
node concepts/internals/microtask-queue.js
```

Some scripts under `concepts/internals/` are meant to be compared against each other (e.g. thread pool size experiments) - read the surrounding notes in [Note.md](Note.md) for what each one demonstrates and what output to expect.
