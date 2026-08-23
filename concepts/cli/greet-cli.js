#!/usr/bin/env node

// process.argv is an array: [0] the node executable, [1] this script's path,
// [2..] whatever the user actually typed after the script name
const args = process.argv.slice(2);
const name = args[0] || 'stranger';

console.log(`Hello, ${name}!`);
console.log('Full process.argv:', process.argv);
