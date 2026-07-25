// Runs once, the first time this module is required — proves require() executes the module's code, not just its export.
console.log('greet.js module executed');

function greet(name) {
  return `Hello, ${name}!`;
}

// module.exports is how a CommonJS module exposes something to whoever requires it.
module.exports = greet;
