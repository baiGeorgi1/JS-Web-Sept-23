const express = require('express');
const validator = require('validator'); // npm validator => няма огромна нужда от тази библиотека
const { body, query, param, header, cookie, validationResult } = require('express-validator'); // npm i express-validator 
const PORT = 5000;
const { isValidName, isValidAge } = require('./utils/validations');
const { validName, validAge } = require('./middleWares/middleware');


const expValidator = body('password').isLength({ min: 5, max: 20 }).withMessage('Invalid password!');
const emailValidator = body('email').isEmail().normalizeEmail();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send(`
    <form method="POST">
  <label for="name">Name</label>
  <input type="text" name="name" id="name" />

  <label for="age">Age</label>
  <input type="number" name="age" id="age" />

  <label for="email">Email</label>
  <input type="email" name="email" id="email" />
  
  <label for="password">Password</label>
  <input type="password" name="password" id="password" />
 
  <input type="submit"  value="Send" />
</form>
    `);
});
app.post('/',
    validName,                                       // middleware validator
    validAge,                                        // middleware validator
    expValidator,                                    // EXPRESS VALIDATOR - middleware buider
    emailValidator,
    (req, res) => {
        const { name, age, password, email } = req.body;

        if (!isValidName(name)) {
            return res.send('Wrong username!');
        }
        if (!isValidAge(age)) {
            return res.send('Wrong Ages!');
        }

        // from express validator => така връщаме грешката 
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).send(err.array()[0].msg);
        }



        res.send('Successfull!' + email);
    });


app.listen(PORT, () => console.log(`Server is on ${PORT}...`));