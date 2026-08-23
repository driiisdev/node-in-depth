#!/usr/bin/env node

const readline = require('node:readline');

// readline.createInterface wires stdin up as an input stream and stdout as
// an output stream, giving us a line-by-line prompt loop
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  // rl.question is callback-based - it suspends this function's flow until
  // the user presses enter, then resolves with whatever they typed
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const name = await ask('What is your name? ');
  const favoriteLanguageAnswer = await ask('Favorite programming language? ');

  console.log(`\nNice to meet you, ${name}!`);
  console.log(`${favoriteLanguageAnswer} is a solid choice.`);

  rl.close();
}

main();
