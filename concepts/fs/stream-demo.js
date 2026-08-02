const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const gzip = zlib.createGzip();

// relative paths resolve against process.cwd(), not this file's folder,
// so __dirname keeps this working no matter where you run it from
const file1Path = path.join(__dirname, "..", "..", "assets", "static", "file1.txt");
const file2Path = path.join(__dirname, "..", "..", "assets", "static", "file2.txt");
  
const readableStream = fs.createReadStream(file1Path, {
  encoding: 'utf8',
  highWaterMark: 6, // 6KB chunk size
});


readableStream.on('error', (err) => {
  console.error('Error reading file1:', err.message);
});

const writableStream = fs.createWriteStream(file2Path);

readableStream.pipe(writableStream);

// readableStream.on('data', (chunk) => {
//   console.log('Received chunk:', chunk);
//   writableStream.write(chunk);
// });

readableStream.pipe(gzip).pipe(fs.createWriteStream(`${file2Path}.gz`));

readableStream.on('end', () => {
  console.log('Finished reading the file.');
  writableStream.end();
});
