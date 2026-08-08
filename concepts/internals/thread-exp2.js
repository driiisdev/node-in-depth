const crypto = require('node:crypto');

const MAX_CALLS = 3;

const start = Date.now();

for (let i = 0; i < MAX_CALLS; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', (err) => {
    console.log(`Hashing ${i + 1} took  ${Date.now() - start} milliseconds`);
  });
}
