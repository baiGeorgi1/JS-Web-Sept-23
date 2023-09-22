const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const path = require('path');
const cats = require('./data/cats.json');

const PORT = 3000;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);
app.use(express.static('content'));

app.get('/', (req, res) => {
    res.render('home', { cats });

});
app.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});
app.get('/cats/add-cat', (req, res) => {
    res.render('addCat');
});




app.get('*', (req, res) => {
    res.status(404).send(`Page not found!`);
});

app.listen(PORT, () => console.log(`Server is on ${PORT} port`));