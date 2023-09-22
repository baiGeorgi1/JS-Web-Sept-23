const calculator = require('./calc-default-export');

const { subtract, sum, devide, multiply } = require('./calc-named-export');

console.log(calculator.sum(2, 4));
console.log(sum(2, 6));
console.log(calculator.multiply(10, 4));
console.log(devide(20, 4));

