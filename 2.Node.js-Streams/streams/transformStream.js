const fs = require('fs');
const zlib = require('zlib'); // compress library

const gzip = zlib.createGzip();

const readStream = fs.createReadStream('./streams/input.txt');
const writeStream = fs.createWriteStream('./streams/output.txt');

readStream.pipe(gzip).pipe(writeStream);  // kompresira datata