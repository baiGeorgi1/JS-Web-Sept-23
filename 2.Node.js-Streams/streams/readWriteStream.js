const fs = require('fs');
const path = require('path');  // library koqto namira tochniqt path kym faila

// Copy ?
const readStream = fs.createReadStream(path.resolve(__dirname, 'input.txt')); // така намира пътя за правилният файл!!!
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'output.txt'));

// react on readStream's events

readStream.on('data', (chunk) => {
    // write in the stream 
    writeStream.write(chunk);
});

readStream.on('end', () => {
    console.log('Reading has finished!');
    writeStream.end();
});
