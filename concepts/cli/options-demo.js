#!/usr/bin/env node

const { parseArgs } = require('node:util');

// util.parseArgs (built into Node 18+) turns argv into named options instead
// of having to manually walk process.argv and match on '--flag' strings
const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    name: {
      type: 'string',
      short: 'n',
      default: 'stranger'
    },
    shout: {
      type: 'boolean',
      short: 's',
      default: false
    },
    help: {
      type: 'boolean',
      short: 'h',
      default: false
    }
  },
  allowPositionals: true
});

if (values.help) {
  console.log(`
Usage: node options-demo.js [options] [positionals...]

Options:
  -n, --name <name>   Who to greet (default: "stranger")
  -s, --shout         Print the greeting in all caps
  -h, --help          Show this help message
`);
  process.exit(0);
}

let greeting = `Hello, ${values.name}!`;
if (values.shout) greeting = greeting.toUpperCase();

console.log(greeting);
if (positionals.length > 0) {
  console.log('Positional arguments:', positionals);
}
