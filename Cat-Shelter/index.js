const http = require('http');
const fs = require('fs/promises');
// const queryString = require('querystring');

// const addBreedUrl = new URL('http://localhost:5000/cats/add-breed?breed=');
// let qs = queryString.parse(addBreedUrl.search);



const PORT = 5000;

const cats = [
    {
        id: 1,
        imageURL: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        catName: 'Bobo',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats.Will probably eat you in your sleep. Very cute tho.'
    },
    {
        id: 2,
        imageURL: 'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
        catName: 'Lisa',
        breed: 'Bombay Cat',
        description: 'Cute cat.'
    },
    {
        id: 3,
        imageURL: 'https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg',
        catName: 'Maks',
        breed: 'White Angora',
        description: 'lovi mishki.'
    },
    {
        id: 4,
        imageURL: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
        catName: 'Perry',
        breed: 'Siams',
        description: 'djflnvdvjdk.'
    },
    {
        id: 5,
        imageURL: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
        catName: 'Tom',
        breed: 'Persian',
        description: 'Mnogo myrzeliva'
    }

];
const server = http.createServer(async (req, res) => {
    const { url } = req;
    console.log(url);
    if (url == '/' && req.method === 'GET') {
        const imgUrlToken = /{{imageUrl}}/g;
        const catNameToken = /{{catName}}/g;
        const descriptionToken = /{{description}}/g;
        const breedToken = /{{breed}}/g;

        const catTemplate = await fs.readFile('./views/catTemplate.html', 'utf-8');
        const homeHtml = await fs.readFile('./views/home/index.html', 'utf-8');

        const catHtml = cats.map((cat) =>
            catTemplate
                .replace(imgUrlToken, cat.imageURL)
                .replace(catNameToken, cat.catName)
                .replace(descriptionToken, cat.description)
                .replace(breedToken, cat.breed)
        ).join('');
        const homeHtmlTemplate = homeHtml.replace('{{CATS}}', catHtml);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(homeHtmlTemplate);
    } else if (url == '/content/styles/site.css' && req.method === 'GET') {
        const cssTemplate = await fs.readFile('./content/styles/site.css', 'utf-8');
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        res.write(cssTemplate);
    } else if (url == '/cats/add-breed' && req.method === 'GET') {
        const breedHtml = await fs.readFile('./views/addBreed.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(breedHtml);
    } else if (url == '/cats/add-cat' && req.method === 'GET') {
        const addCatHtml = await fs.readFile('./views/addCat.html', 'utf-8');

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(addCatHtml);
    } else {
        res.write('<h2>404 Not found</h2>');
    }

    res.end();
});
server.listen(PORT, () => console.log(`Node.js server is running on port ${PORT}`));