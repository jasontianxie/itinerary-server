const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const router = require("./routers/index");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456ABCabc',
    database: 'itinerary'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

app.use('/public', express.static('static'));

app.use(bodyParser.json()); // for parsing application/json

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))