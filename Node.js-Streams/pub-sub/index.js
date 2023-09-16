
const eventBus = require('./eventBus');

eventBus.subscribe('kitten-added', () => {
    console.log('Cat added!');
});
const unsubscribe = eventBus.subscribe('kitten-added', (catName, age) => {
    console.log(`Cat added again!Name ${catName} and it's ${age} years old!`);
});

// eventBus.subscribe('kitten-added', () => {
//     console.log('Cat removed 555!');
// });
eventBus.publisher('kitten-added', 'Puffy', 8);
eventBus.publisher('kitten-removed');
eventBus.publisher('party');

unsubscribe();

console.log('------------------------');
eventBus.subscribe('cat-add', 'Bobo');