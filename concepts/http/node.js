// ─── Creating a server ──────────────────────────────────────────────────
/**
 * http.createServer() takes a listener function that fires once per
 * incoming request, with a (req, res) pair. req describes what the client
 * asked for (method, url, headers); res is what we write the response
 * onto. Nothing is sent to the client until res.end() is called — before
 * that, writeHead() lets us set the status code and headers.
 */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer((req, res) => {
  // console.log(`Request received: ${req.method} ${req.url}`);

  // ─── Plain text response ────
  /**
   * The simplest possible response: one status line, one content type.
   */
  // res.writeHead(200, { "Content-Type": "text/plain" });
  // res.end("Hello, World!\n");

  // ─── JSON response ────
  /**
   * The body of an HTTP response is always a string/buffer, so an object
   * has to be serialized with JSON.stringify() before res.end() can send
   * it. Content-Type: application/json is what tells the client to parse
   * it back into JSON rather than display it as plain text.
   */
  // const data = {
  //   firstName: "driiis",
  //   lastName: "dev",
  // };
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.end(JSON.stringify(data));

  // ─── HTML response + templating ────
  /**
   * fs.readFileSync() blocks the main thread until the whole file is in
   * memory — fine for a small template, but it means the event loop can't
   * handle any other request while this file is being read.
   * {{name}} is a hand-rolled placeholder; String.replace() with a plain
   * string only swaps the FIRST match, so if {{name}} appeared more than
   * once in the template only one occurrence would get replaced (use
   * replaceAll(), or a /{{name}}/g regex, to catch them all).
   */
  // const pathname = path.join(__dirname, "..", "..", "assets", "static", "http.html");
  // let html = fs.readFileSync(pathname, "utf-8");
  // html = html.replace("{{name}}", "IDRIS");
  // res.writeHead(200, { "Content-Type": "text/html" });
  // res.end(html);

  /**
   * Streaming alternative to readFileSync(): reads the file in chunks and
   * pipes them straight into the response as they arrive, instead of
   * loading the entire file into memory before sending anything.
   */
  // fs.createReadStream(pathname).pipe(res);

  // ─── Routing ────
  /**
   * req.url is the raw path the client requested. Branching on it lets a
   * single server behave differently per route. This is a minimal,
   * hand-rolled router — it only works because it matches the exact
   * pathname; it ignores the HTTP method (GET vs POST) and would break on
   * a query string (e.g. "/about?x=1" would fall through to 404 since it
   * doesn't strictly equal "/about"). A real router typically parses
   * req.url and checks req.method before dispatching.
   */
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the home page!");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the about page.");
  } else if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is the API endpoint." }));
  } else {
    /**
     * Catch-all: anything that didn't match above is a 404. This has to
     * be the last branch since it matches everything.
     */
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
