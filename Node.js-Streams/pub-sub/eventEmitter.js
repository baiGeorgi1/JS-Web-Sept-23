const { log } = require('console');
const EventEmitter = require('events'); // NODE.js class
const eventEmitter = new EventEmitter();

eventEmitter.on('new Cat', () => {
    console.log('Cat has been added!');
});

eventEmitter.on('kitten-added', (catName, age) => {
    console.log(`Kitty has been added again! ${catName} and it's ${age} y/o!`);
});

eventEmitter.on('kitten-removed', () => {
    console.log('Cat has been removed!');
});

eventEmitter.emit('kitten-added', 'Bobo', 4); // invoke with .emit
eventEmitter.emit('new Cat');
eventEmitter.emit('kitten-removed')

