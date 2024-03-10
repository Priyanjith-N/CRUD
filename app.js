const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // parsing data

dotenv.config({path: 'config.env'}); // Config the env file

const connectDB = require('./server/database/connection'); // import connection.js
const route = require('./server/router/router'); // import router.js

connectDB();

app.use(session({
    secret: 'noOne',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
    res.setHeader("Pragma", "no-cache"); 
    res.setHeader("Expires", "0");
    next();
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', route);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}`));