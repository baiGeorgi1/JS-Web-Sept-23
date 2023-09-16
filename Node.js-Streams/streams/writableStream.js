const fs = require('fs');


const writeStream = fs.createWriteStream('./streams/output.txt'); // check the path!!!

writeStream.write(`Maraba `);
writeStream.write('Chunk1 ');
writeStream.write('Chunk2 ');
writeStream.write('Chunk3 ');
writeStream.write('Chunk4 ');
writeStream.end(); // when stream must finish!