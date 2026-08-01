const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, 'sample.txt');

// writeFileSync blocks the main thread until the write completes - fine for small scripts/setup code
fs.writeFileSync(filePath, 'Hello from the fs module!\n');
console.log('sync write done');

// readFileSync also blocks; without an encoding it returns a Buffer instead of a string
const syncContent = fs.readFileSync(filePath, 'utf-8');
console.log('sync read:', syncContent.trim());

// callback-based readFile is non-blocking - the rest of the script keeps running before this fires
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log('callback read:', data.trim());
});

// appendFile adds to the end of the file instead of overwriting it
fs.appendFile(filePath, 'Appended line\n', (err) => {
  if (err) throw err;
  console.log('append done');
});

// this logs before the callbacks above fire, proving the callback-based calls didn't block
console.log('this runs before the async callbacks above');

// fs/promises mirrors the callback API but returns promises, so it plays nicely with async/await
async function readWithPromises() {
  const data = await fsPromises.readFile(filePath, 'utf-8');
  console.log('promise read:', data.trim());

  const stats = await fsPromises.stat(filePath);
  console.log('isFile:', stats.isFile(), '| size (bytes):', stats.size);

  const entries = await fsPromises.readdir(__dirname);
  console.log('directory contents:', entries);

  // cleanup: remove the file this demo created
  await fsPromises.unlink(filePath);
  console.log('cleanup done - sample.txt removed');
}

readWithPromises();
