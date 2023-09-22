// в .json файла като променим скрипта можем да стартираме index.js с npm start
//console.log('Hello!');

const queryString = require('querystring'); // това е от node modules
const myUrl = new URL('https://localhost:5000/path?query=year=20');
const qs = queryString.parse(myUrl.search); // Така си взимаме ресурси от url-a


console.log(qs["?query"]);
