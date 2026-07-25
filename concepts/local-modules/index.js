// require() loads a local module by relative path (extension inferred).
const greet = require('./greet');

console.log(greet('Node.js'));

// Every module is wrapped in an IIFE with 5 params (exports, require, module, __filename, __dirname).
// Logging `module` here shows that wrapper's `module` object in action.
console.log(module);
