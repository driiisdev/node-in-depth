// Buffer is a global in Node.js (no require needed) - it represents a fixed-length chunk of raw binary data
// This is what streams hand you chunk by chunk instead of loading everything into memory at once

// alloc() creates a zero-filled buffer of the given byte length - safe default when you don't know the contents yet
const empty = Buffer.alloc(4);
console.log('alloc(4):', empty);

// from() creates a buffer directly from existing data - a string, an array of bytes, or another buffer
const fromString = Buffer.from('Hello');
console.log('from("Hello"):', fromString); // <Buffer 48 65 6c 6c 6f> - each byte is the char's UTF-8 code point in hex

const fromArray = Buffer.from([72, 101, 108, 108, 111]);
console.log('from([72,101,108,108,111]):', fromArray.toString()); // decodes bytes back to text

// toString() defaults to utf-8, but you can request other encodings
console.log('toString("utf-8"):', fromString.toString('utf-8'));
console.log('toString("hex"):', fromString.toString('hex'));
console.log('toString("base64"):', fromString.toString('base64'));

// buffers are array-like: indexing gives you the raw byte value, not the character
console.log('fromString[0]:', fromString[0]); // 72 -> the byte for "H"

// buffers are mutable - writing into one modifies its bytes in place
const mutable = Buffer.alloc(5);
mutable.write('abcde');
mutable[0] = 65; // overwrite the first byte with the code for "A"
console.log('mutated buffer:', mutable.toString());

// length is fixed at creation - it's the number of bytes, not characters (multi-byte chars can differ)
console.log('length:', fromString.length);

// concat() joins multiple buffers into one new buffer
const combined = Buffer.concat([Buffer.from('Hello, '), Buffer.from('World!')]);
console.log('concat:', combined.toString());
