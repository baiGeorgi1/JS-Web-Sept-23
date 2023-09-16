const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.resolve(__dirname, 'input.txt'));
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'output.txt'));

readStream.pipe(writeStream);