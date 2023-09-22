const express = require('express');
const handlebars = require('express-handlebars');  // npm i express-handlebars

const PORT = 5550;
const server = express();

// add handlebars to express (after install express-handlebars)
// !!! Този engine винаги търси by default папка views, където се очаква да са нашите темплейти!
// !!! затова трябва така да се казва,иначе трябва да му зададем името на папката с темплейти!!!
server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars');

//Add third-party middleware
const bodyParser = express.urlencoded({ extended: false });
server.use(bodyParser);
// middleware for static files
server.use(express.static('public'));

// ADD  global middlewares
server.use((req, res, next) => {
    console.log(`HTTP Request ${req.method} : ${req.path}`);
    next();  // извиква следващия middleware or action
});
server.use((req, res, next) => {
    console.log('middleware2');
    next();
});
// ADD Partial route middleware
server.use('/cats', (req, res, next) => {
    console.log('Custom middleware');
    next();
});
// Route specific middleware
const specificMiddleware = (req, res, next) => {
    console.log('Middleqware only for this route');
    next();
};

// EXPRESS ROUTER /ACTIONS 
server.get('/specific', specificMiddleware, (req, res) => {
    res.send('Some specific route with middleware!');
});
server.get('/', (req, res) => {
    //res.status(200).send('Hi Gogo!'); //можем да чейнваме и статуса
    res.render('home'); // with handlebars  ({ layout: false } - use this when layouts dir missing)

});
server.get('/about', (req, res) => {
    res.render('about');
});
// Route Methods
server.get('/cats', (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <title>Document</title>
</head>
<body>
{{cats}}
    <form method="post">
        <label for="name">Name</label>
        <input type="text" id="name" name="name"/>
        <label for="age">Age</label>
        <input type="number" id="age" name="age"/>
        <input type="submit" value="Create"/>
    </form>
    </body>
</html>
    `);
});
//GET by params **********
server.get('/cats/:catId', (req, res) => {
    const paramObj = req.params;
    const catId = Number(paramObj.catId);
    if (!catId) {
        return res.status(404).send('Cannot find cat!');
    }
    res.send(paramObj);
});
// *** download file !!!!!!!!!!!!!!!!!!!
server.get('/download', (req, res) => {
    res.download('./some.pdf'); //  Must full path to insert
    // res.sendFile(path.resolve(__dirname,'some.pdf'))   //--- Taka go otvarq w brauzyra za chetene!
});

/// redirect
server.get('/old-page', (req, res) => {
    res.redirect('cats');
});

server.post('/cats', (req, res) => {
    console.log(req.body); // from thirtd-party middleware
    res.status(201).send('Cat created!'); //201 => created status
});
// Страничка за грешка!
server.get('*', (req, res) => {
    res.status(404).send('Page Not Found!');
});
//END expres router & actions

server.listen(PORT, () => console.log(`Server is listening on ${PORT} port!`));