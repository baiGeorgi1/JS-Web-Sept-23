const http = require('http');
const fs = require('fs/promises');

const PORT = 5000;
const cats = [
    {
        imageURL: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
        catName: 'Bobo',
        breed: 'Bombay Cat',
        description: 'Dominant and aggressive to other cats.Will probably eat you in your sleep. Very cute tho.'
    },
    {
        imageURL: 'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
        catName: '',
        breed: 'Bombay Cat 1',
        description: 'Cute cat.'
    },
    {
        imageURL: 'https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg',
        catName: '',
        breed: 'White Angora',
        description: 'lovi mishki.'
    },
    {
        imageURL: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
        catName: '',
        breed: 'Ulichna',
        description: 'djflnvdvjdk.'
    },
    {
        imageURL: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
        catName: '',
        breed: 'Orange pomiqr',
        description: 'Mnogo myrzeliva'
    }

];
const breedObj = {
    breed: []
};



const server = http.createServer(async (req, res) => {
    const { url } = req;
    console.log(url);
    if (url == '/' && req.method === 'GET') {
        const imgUrlToken = /{{imageUrl}}/g;
        const catNameToken = /{{catName}}/g;
        const descriptionToken = /{{description}}/g;
        const breedToken = /{{breed}}/g;

        const catTemplate = await fs.readFile('./views/home/catTemplate.html', 'utf-8');
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
        function createSubmitHandler(callback) {
            return function (event) {
                event.preventDefault();
                const form = event.currentTarget;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                callback(data, form);
            };
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(addCatHtml);
    } else if (url === '/cats/add-breed?breed=') {
        let breedName = document.getElementById('breed-name').value;
        console.log(breedName);
        // if(!breedObj[breed]==)
        console.log('Breed');
    }
    else {
        res.write('<h2>404 Not found</h2>');
    }

    // to DO
    // res.write('Hi, Bai Georgi!');
    res.end();
});
server.listen(PORT, () => console.log(`Node.js server is running on port ${PORT}`));