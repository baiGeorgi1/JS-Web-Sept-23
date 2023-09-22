const fs = require('fs');

// Stream
const readStream = fs.createReadStream('./streams/input.txt', {
    highWaterMark: 10000,  // с това казваме колко МБ да е буфера
    encoding: 'utf-8' // формат за четене
});

// Events 
readStream.on('data', (chunk) => {
    console.log('Reading chunk....');
    console.log(chunk);
});

readStream.on('end', () => {
    console.log('Reading has finished!');
});

